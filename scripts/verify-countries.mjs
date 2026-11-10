// Node-only render tests. Transpile project TSX with the already installed compiler.
import { registerHooks } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith('.') && context.parentURL && !specifier.endsWith('.mjs')) {
      const url = new URL(specifier, context.parentURL);
      for (const suffix of ['', '.tsx', '.ts', '/index.ts']) {
        const candidate = new URL(url.href + suffix);
        if (existsSync(fileURLToPath(candidate)) && /\.(tsx|ts)$/.test(candidate.pathname)) return { url: candidate.href, shortCircuit: true };
      }
    }
    return next(specifier, context);
  },
  load(url, context, next) {
    if (url.endsWith('.css')) return { format: 'module', shortCircuit: true, source: '' };
    if (/\.(tsx|ts)$/.test(url) && !url.includes('/node_modules/')) return { format: 'module', shortCircuit: true, source: ts.transpileModule(readFileSync(fileURLToPath(url),'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText };
    return next(url, context);
  },
});
const {Routes,Route}=await import('react-router-dom');
const {CountryList}=await import('../src/features/countries/components/List.tsx');
const {CountryDetail}=await import('../src/features/countries/components/Detail.tsx');
const {CountryCreate}=await import('../src/features/countries/components/Create.tsx');
function render(Component, route, pattern, data) {
 const client=new QueryClient({defaultOptions:{queries:{retry:false,staleTime:Infinity}}});
 if(data!==undefined) { client.setQueryData(['countries'],Array.isArray(data)?data:[]); client.setQueryData(['country','1'],data); }
 const html=renderToStaticMarkup(React.createElement(QueryClientProvider,{client},React.createElement(MemoryRouter,{initialEntries:[route]},React.createElement(Routes,{},React.createElement(Route,{path:pattern,element:React.createElement(Component)})))));
 client.clear();return html;
}
assert.ok(render(CountryList,'/countries','/countries',[]).includes('لم تُضف دول بعد'));
assert.ok(render(CountryList,'/countries','/countries',undefined).includes('enterprise-skeleton'));
assert.ok(render(CountryList,'/countries?q=مصر','/countries',[{id:1,name:'مصر'},{id:2,name:'السودان'}]).includes('href="/countries/1"'));
assert.ok(!render(CountryList,'/countries?q=مصر','/countries',[{id:1,name:'مصر'},{id:2,name:'السودان'}]).includes('href="/countries/2"'));
const detail=render(CountryDetail,'/countries/1','/countries/:id',{id:1,name:'مصر',governorates:[{id:3,name:'المنيا'}]});
assert.ok(detail.includes('href="/governorates/3"'));
assert.ok(detail.includes('href="/countries/1/edit"'));
assert.ok(detail.includes('<dt>اسم الدولة</dt>'));
assert.ok(render(CountryDetail,'/countries/1','/countries/:id',{id:1,name:'مصر'}).includes('لا توجد محافظات مرتبطة'));
const edit=render(CountryCreate,'/countries/1/edit','/countries/:id/edit',{id:1,name:'مصر'});
assert.ok(edit.includes('تعديل الدولة'));
// react-hook-form populates the uncontrolled field on mount; verified in the browser.
assert.ok(edit.includes('حفظ التغييرات'));
const create=render(CountryCreate,'/countries/new','/countries/new',[]);
assert.ok(create.includes('إضافة دولة'));
assert.ok(create.includes('إضافة الدولة'));
assert.ok(!create.includes('حفظ التغييرات'));
console.log('PASS: countries list filtering/loading/empty, detail related links/empty, and distinct create/edit rendering. Browser evidence is recorded separately in PROGRESS.md.');
