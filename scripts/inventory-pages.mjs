import fs from 'node:fs';
import path from 'node:path';
const read = f => fs.readFileSync(f, 'utf8');
const walk = d => fs.readdirSync(d, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(d,e.name)) : [path.join(d,e.name)]);
const files = walk('src').filter(f => /\.tsx?$/.test(f));
function dependencies(file, visited = new Set()) {
  if (visited.has(file)) return visited;
  visited.add(file);
  for (const m of read(file).matchAll(/(?:from\s*|import\()['"]([^'"]+)['"]/g)) {
    if (!m[1].startsWith('.')) continue;
    const base = path.resolve(path.dirname(file),m[1]);
    const found = ['', '.ts','.tsx','/index.ts'].map(s=>base+s).find(f=>fs.existsSync(f)&&fs.statSync(f).isFile());
    if (found && !found.endsWith('.css') && !/\/app\/(?:router|referenceRoutes|AuthenticatedRoutes)\.tsx$/.test(found)) dependencies(path.relative(process.cwd(),found),visited);
  }
  return visited;
}
const routes=[];
for (const file of ['src/app/router.tsx','src/app/referenceRoutes.tsx']) {
  const text=read(file);
  const imports=Object.fromEntries([...text.matchAll(/const (\w+) = lazy\(\(\) => import\(['"]([^'"]+)/g)].map(m=>[m[1],path.normalize(path.join(path.dirname(file),m[2]+'.tsx'))]));
  for(const m of text.matchAll(/\{ path: ['"]([^'"]+)['"], element: (.*?) \},?/g)) {
    const names=[...m[2].matchAll(/<(\w+)/g)].map(v=>v[1]);
    const component=names.find(n=>imports[n]);
    routes.push({route:m[1],component:component||names[0],source:imports[component]||file,kind:component?'page':'redirect',wrapper:names.includes('ReferenceEditor')});
  }
}
routes.unshift({route:'unauthenticated (all paths)',component:'SignIn',source:'src/app/App.tsx',kind:'page'});
routes.sort((a,b)=>a.component==='SignIn'?-1:b.component==='SignIn'?1:a.route==='/'?-1:b.route==='/'?1:a.route.localeCompare(b.route));
const linked=new Set();
for (const item of routes) {
 const text=read(item.source); const deps=[...dependencies(item.source)]; deps.forEach(f=>linked.add(f));
 const scoped=item.kind==='redirect'?[]:deps.filter(f=>f.startsWith('src/features/')||f===item.source);
 item.components=[...new Set([...text.matchAll(/<([A-Z]\w+)/g)].map(m=>m[1]))];
 item.apis=[...new Set(scoped.flatMap(f=>[...read(f).matchAll(/apiClient\.(get|post|put|patch|delete)(?:<[^;\n]*?>)?\(\s*(['"`])([^'"`]+)/g)].map(m=>`${m[1].toUpperCase()} ${m[3]}`)))];
 item.dependencies=scoped.filter(f=>f!==item.source);
 item.headings=[...text.matchAll(/(?:title|label|header)=["']([^"']+)|<h[12][^>]*>([^<]+)/g)].map(m=>m[1]||m[2]);
 item.overlays=[...new Set([...text.matchAll(/<(Dialog|Modal|Drawer)\b[^>]*(?:title=["']([^"']+))?/g)].map(m=>m[2]||m[1]))];
 item.findings=[];
 if(/\bany\b/.test(text))item.findings.push('Untyped data: inspect malformed/null API values');
 if(/\.filter\(|\.sort\(/.test(text)&&!text.includes('useMemo'))item.findings.push('Render-time transforms: measure before memoizing');
 if(!/LoadingSkeleton|Skeleton|isSubmitting/.test(text))item.findings.push('No local layout-matched skeleton found');
 if(/style=/.test(text))item.findings.push('Inline layouts: check narrow viewport and RTL');
 item.status='Pending individual audit, implementation and functional verification';
}
const sourceOnly=files.filter(f=>/\/components\/.*\.tsx$/.test(f)&&f.startsWith('src/features/')&&!linked.has(f));
const overlays=files.filter(f=>/<Dialog\b|role=["']dialog|<Modal\b|<Drawer\b|window\.confirm\(|sidebar-scrim/.test(read(f))).map(f=>({source:f,controls:[...read(f).matchAll(/(?:title|label)=["']([^"']+)/g)].map(m=>m[1])}));
fs.writeFileSync('docs/enterprise/inventory.json',JSON.stringify({date:'2026-11-09',routes,sourceOnly,overlays},null,2)+'\n');
let md='# Sequential enterprise transformation\n\nSource-derived inventory; findings are audit leads, not claims of visual or functional verification. Prior redesign reports are historical evidence only. Each routed page must pass understand → audit → design → implement → optimize → skeleton → functional verification before the next page. Create and edit are separate routes even when sharing a component.\n\n';
md+=`${routes.filter(r=>r.kind==='page').length} page entries (including sign-in), ${routes.filter(r=>r.kind==='redirect').length} redirect entries, ${sourceOnly.length} unlinked feature component files, ${overlays.length} overlay-bearing files.\n\n`;
md+='## Shared system\n\nExisting tokens: src/index.css and src/training-theme.css. Arabic Tajawal typography; blue/teal actions; 4/8px spacing; existing Button, Input, Select, Table, Card, Tabs, Dialog, Badge, PageHeader, LoadingSkeleton, EmptyState, ErrorState, ReferenceEditor. Keep page changes scoped; inspect callers before shared edits. Shell: Sidebar mobile drawer, Header search and Layout route boundary.\n\n';
md+='## Execution checklist\n\n| # | Route | Component | Audit | Design | Implement | Test | Status |\n|---|---|---|---|---|---|---|---|\n';
routes.forEach((r,i)=>md+=`| ${i+1} | \`${r.route}\` | ${r.component} | Pending | Pending | Pending | Pending | ${r.kind==='redirect'?'Redirect review':'Pending'} |\n`);
for(const [i,r] of routes.entries()){
 const operation=r.route.endsWith('/new')?'Create':r.route.endsWith('/edit')?'Edit':r.route.includes(':id')?'Inspect record and related data':'Browse and manage';
 md+=`\n## ${i+1}. ${r.component} — ${r.route}\n\n- Source: \`${r.source}\`\n- Purpose: ${r.component==='SignIn'?'Authenticate staff and resume requested location':r.route==='/'?'Daily training operations overview':operation+' '+r.route.split('/')[1]}.\n- Existing UI: ${r.components.join(', ')}.\n- Labels / sections: ${r.headings.join('; ')||'Inspect rendered page'}.\n- API dependencies: ${r.apis.join('; ')||'See dependency graph; wrapper or redirect may own the request'}. ${r.wrapper?'ReferenceEditor also owns detail loading and edit submission.':''}\n- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.\n- Static audit leads: ${r.findings.join('; ')||'No automatic finding; individual audit still required'}.\n- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.\n- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.\n- Completion: pending.\n`;
}
md+='\n## Unlinked feature components\n\nThese are not counted as routed pages; inspect reachability before removing or exposing them.\n\n'+sourceOnly.map(f=>`- \`${f}\``).join('\n');
md+='\n\n## Modals and drawers\n\n'+overlays.map(o=>`- \`${o.source}\`: ${o.controls.join('; ')||'Inspect trigger and body'}`).join('\n')+'\n';
fs.writeFileSync('docs/enterprise/PAGE_INVENTORY.md',md);
console.log({pages:routes.filter(r=>r.kind==='page').length,redirects:routes.filter(r=>r.kind==='redirect').length,sourceOnly:sourceOnly.length,overlays:overlays.length});
