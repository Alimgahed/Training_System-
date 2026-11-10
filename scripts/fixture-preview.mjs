// Isolated browser QA server. Never proxies to a real API; mutations live only in memory.
import http from 'node:http';
import fs from 'node:fs';
import { createServer } from 'vite';
let mode='normal';
let countries;
const referenceState=new Map();
let attendanceOverrides=new Map();
let sessionOverrides=new Map();
let courseOverrides=new Map();
let deletedCourses=new Set();
let deletedSessions=new Set();
let deletedAttendance=new Set();
const reset=()=> { countries=Array.from({length:27},(_,i)=>({id:i+1,name:i===0?'مصر — بيانات اختبار':`دولة اختبار ${String(i+1).padStart(2,'0')}`,governorates:i===0?[{id:1,name:'المنيا — اختبار'},{id:2,name:'القاهرة — اختبار'}]:[]})); };
reset();
const journal=[];
const server=http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://127.0.0.1:5180');
 const send=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
 if(url.pathname==='/__fixtures') {
  if(url.searchParams.has('mode')) mode=url.searchParams.get('mode');
  if(url.searchParams.has('reset')) {reset();referenceState.clear();attendanceOverrides.clear();deletedAttendance.clear();sessionOverrides.clear();deletedSessions.clear();courseOverrides.clear();deletedCourses.clear();journal.length=0;mode='normal';}
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
  res.end(`<html><body><h1>Isolated synthetic ERP fixtures</h1><p>Mode: ${mode}. No connection to a real backend.</p>${['normal','empty','error','slow','save-error','lookup-error'].map(m=>`<p><a href="/__fixtures?mode=${m}">${m}</a></p>`).join('')}<p><a href="/__fixtures?reset=1">Reset all fixture data</a></p><a href="http://127.0.0.1:5175/countries">Open ERP fixture preview</a><p>Login: fixture / fixture</p><h2>Mutation journal</h2><pre>${JSON.stringify(journal,null,2).replaceAll('<','&lt;')}</pre></body></html>`);return;
 }
 let body={};if(req.method!=='GET'){let raw='';for await(const chunk of req)raw+=chunk;try{body=JSON.parse(raw||'{}');}catch{return send(400,{message:'Invalid JSON'});}}
 if(url.pathname==='/login')return body.username==='fixture'&&body.password==='fixture'?send(200,{token:'isolated-fixture-token'}):send(401,{message:'Fixture credentials only'});
 if(req.headers.authorization!=='Bearer isolated-fixture-token')return send(401,{message:'Sign in to isolated fixture environment'});
 if(mode==='slow')await new Promise(r=>setTimeout(r,4000));
 if(mode==='lookup-error'&&JSON.parse(fs.readFileSync(new URL('./fixture-lookup-errors.json',import.meta.url),'utf8')).includes(url.pathname))return send(503,{message:'Synthetic lookup failure'});
 if(mode==='error'||(mode==='save-error'&&req.method!=='GET'))return send(503,{message:'Synthetic failure'});
 const id=Number(url.pathname.split('/')[2]);
 if(req.method==='GET'&&url.pathname==='/countries')return send(200,mode==='empty'?[]:countries);
 if(req.method==='GET'&&url.pathname.startsWith('/country/'))return countries.some(c=>c.id===id)?send(200,countries.find(c=>c.id===id)):send(404,{message:'Missing fixture'});
 if(req.method==='POST'&&url.pathname==='/new-country') {const record={id:Math.max(0,...countries.map(c=>c.id))+1,name:body.name,governorates:[]};countries.push(record);journal.push({method:'POST',path:url.pathname,body});return send(201,record);}
 if(req.method==='PUT'&&url.pathname.startsWith('/country/')) {const record=countries.find(c=>c.id===id);if(!record)return send(404,{});record.name=body.name;journal.push({method:'PUT',path:url.pathname,body});return send(200,record);}
 if(req.method==='DELETE'&&url.pathname.startsWith('/country/')) {countries=countries.filter(c=>c.id!==id);journal.push({method:'DELETE',path:url.pathname});return send(200,{success:true});}
 const extra=JSON.parse(fs.readFileSync(new URL('./fixtures.json',import.meta.url),'utf8'));
 const references=JSON.parse(fs.readFileSync(new URL('./fixture-crud.json',import.meta.url),'utf8'));
 for(const [plural,singular] of Object.entries(references)) {
  if(![ `/${plural}`, `/new-${singular}` ].includes(url.pathname)&&!url.pathname.startsWith(`/${singular}/`))continue;
  if(!referenceState.has(plural))referenceState.set(plural,structuredClone(extra[`/${plural}`]||[]));
  const records=referenceState.get(plural);
  if(req.method==='GET'&&url.pathname===`/${plural}`)return send(200,mode==='empty'?[]:records);
  const record=records.find(r=>r.id===id);
  if(req.method==='GET')return record?send(200,record):send(404,{message:'Missing fixture'});
  if(req.method==='POST'&&url.pathname===`/new-${singular}`){const created={id:Math.max(0,...records.map(r=>r.id))+1,...body};records.push(created);journal.push({method:req.method,path:url.pathname,body});return send(201,created);}
  if(!record)return send(404,{message:'Missing fixture'});
  if(req.method==='PUT'){Object.assign(record,body);journal.push({method:req.method,path:url.pathname,body});return send(200,record);}
  if(req.method==='DELETE'){referenceState.set(plural,records.filter(r=>r.id!==id));journal.push({method:req.method,path:url.pathname});return send(200,{success:true});}
 }
 if(url.pathname==='/courses'&&req.method==='GET')return send(200,mode==='empty'?[]:[...extra[url.pathname].filter(r=>!deletedCourses.has(r.id)).map(r=>courseOverrides.get(r.id)||r),...[...courseOverrides.values()].filter(r=>!extra[url.pathname].some(x=>x.id===r.id))]);
 if(url.pathname.startsWith('/course/')) {
  const record=courseOverrides.get(id)||extra[url.pathname];
  if(!record||deletedCourses.has(id))return send(404,{message:'Missing fixture'});
  if(req.method==='GET')return send(200,record);
  if(req.method==='DELETE'){deletedCourses.add(id);courseOverrides.delete(id);journal.push({method:req.method,path:url.pathname});return send(200,{success:true});}
  if(req.method==='PUT'){const changed={...record,...body};courseOverrides.set(id,changed);journal.push({method:req.method,path:url.pathname,body});return send(200,changed);}
 }
 if(url.pathname==='/new-course'&&req.method==='POST'){const nextId=Math.max(...extra['/courses'].map(r=>r.id),...courseOverrides.keys())+1;const record={id:nextId,...body};courseOverrides.set(nextId,record);journal.push({method:req.method,path:url.pathname,body});return send(201,record);}
 if(url.pathname==='/course-sessions'&&req.method==='GET')return send(200,mode==='empty'?[]:[...extra[url.pathname].filter(r=>!deletedSessions.has(r.id)).map(r=>sessionOverrides.get(r.id)||r),...[...sessionOverrides.values()].filter(r=>!extra[url.pathname].some(x=>x.id===r.id))]);
 if(url.pathname.startsWith('/course-session/')) {
  const record=sessionOverrides.get(id)||extra[url.pathname];
  if(!record||deletedSessions.has(id))return send(404,{message:'Missing fixture'});
  if(req.method==='GET')return send(200,record);
  if(req.method==='DELETE'){deletedSessions.add(id);sessionOverrides.delete(id);journal.push({method:req.method,path:url.pathname});return send(200,{success:true});}
  if(req.method==='PUT'){const changed={...record,...body};sessionOverrides.set(id,changed);journal.push({method:req.method,path:url.pathname,body});return send(200,changed);}
 }
 if(url.pathname==='/new-course-session'&&req.method==='POST'){const nextId=Math.max(...extra['/course-sessions'].map(r=>r.id),...sessionOverrides.keys())+1;const record={id:nextId,...body};sessionOverrides.set(nextId,record);journal.push({method:req.method,path:url.pathname,body});return send(201,record);}
 if(url.pathname==='/course-session-participants'&&req.method==='GET')return send(200,mode==='empty'?[]:[...extra[url.pathname].filter(r=>!deletedAttendance.has(r.id)).map(r=>attendanceOverrides.get(r.id)||r),...[...attendanceOverrides.values()].filter(r=>!extra[url.pathname].some(x=>x.id===r.id))]);
 if(url.pathname.startsWith('/course-session-participant/')) {
  const record=attendanceOverrides.get(id)||extra[url.pathname];
  if(!record||deletedAttendance.has(id))return send(404,{message:'Missing fixture'});
  if(req.method==='GET')return send(200,record);
  if(req.method==='DELETE'){deletedAttendance.add(id);attendanceOverrides.delete(id);journal.push({method:req.method,path:url.pathname});return send(200,{success:true});}
  if(req.method==='PUT'){const changed={...record,...body,course_participant:extra['/course-participants'].find(r=>r.id===body.course_participant_id)};attendanceOverrides.set(id,changed);journal.push({method:req.method,path:url.pathname,body});return send(200,changed);}
 }
 if(url.pathname==='/new-course-session-participant'&&req.method==='POST'){const nextId=Math.max(...extra['/course-session-participants'].map(r=>r.id),...attendanceOverrides.keys())+1;const record={id:nextId,...body};attendanceOverrides.set(nextId,record);journal.push({method:req.method,path:url.pathname,body});return send(201,record);}
 if(req.method==='GET' && Object.hasOwn(extra,url.pathname)) return send(200,mode==='empty'&&Array.isArray(extra[url.pathname])?[]:extra[url.pathname]);
 return send(501,{message:`No fixture implemented for ${req.method} ${url.pathname}`});
});
server.listen(5180,'127.0.0.1');
const vite=await createServer({server:{host:'127.0.0.1',port:5175,strictPort:true,proxy:{'/api':{target:'http://127.0.0.1:5180',changeOrigin:true,rewrite:p=>p.replace(/^\/api/,'')}}},plugins:[{name:'fixture-label',transformIndexHtml(html){return html.replace('<title>','<title>[SYNTHETIC QA] ').replace('<body>','<body><div style="background:#fff3cd;color:#513e00;padding:6px 12px;text-align:center;font:14px sans-serif" role="note">بيئة اختبار محلية · بيانات تجريبية · لا تتصل بالخادم الفعلي</div>');}}]});
await vite.listen();
console.log('Fixture ERP: http://127.0.0.1:5175/countries; controls: http://127.0.0.1:5180/__fixtures; login fixture / fixture');
const close=async()=>{await vite.close();server.close();process.exit();};process.on('SIGINT',close);process.on('SIGTERM',close);
