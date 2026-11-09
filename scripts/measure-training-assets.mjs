import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { gzipSync } from 'node:zlib';
import ts from 'typescript';
function measure(root) {
  const html=readFileSync(resolve(root,'index.html'),'utf8');
  const entry=html.match(/<script[^>]+src="([^"]+)"/)[1];
  const seen=new Set();
  function visit(path) {
    if(seen.has(path))return;
    seen.add(path);
    const source=ts.createSourceFile(path,readFileSync(path,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
    for(const statement of source.statements) {
      if((ts.isImportDeclaration(statement)||ts.isExportDeclaration(statement))&&statement.moduleSpecifier&&ts.isStringLiteral(statement.moduleSpecifier)) {
        const name=statement.moduleSpecifier.text;
        if(name.startsWith('.'))visit(resolve(dirname(path),name));
      }
    }
  }
  visit(resolve(root,entry.slice(1)));
  const assetDir=resolve(root,'assets');
  const all=readdirSync(assetDir).map(name=>resolve(assetDir,name));
  return { initialJsBytes:[...seen].reduce((sum,p)=>sum+statSync(p).size,0),initialJsGzipBytes:[...seen].reduce((sum,p)=>sum+gzipSync(readFileSync(p)).length,0),initialJsFiles:[...seen].map(p=>p.split('/').at(-1)),entryBytes:statSync(resolve(root,entry.slice(1))).size,totalJsBytes:all.filter(p=>p.endsWith('.js')).reduce((sum,p)=>sum+statSync(p).size,0),cssBytes:all.filter(p=>p.endsWith('.css')).reduce((sum,p)=>sum+statSync(p).size,0) };
}
const report={baseline:measure(process.argv[2]||'/tmp/training-ui-baseline/dist'),after:measure('dist')};
console.log(JSON.stringify(report,null,2));
if(process.argv[3])writeFileSync(process.argv[3],JSON.stringify(report,null,2));
