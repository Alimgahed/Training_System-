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
const {ClientList}=await import('../src/features/clients/components/List.tsx');
function render(data,route='/clients',failed=false) {
 const client=new QueryClient({defaultOptions:{queries:{retry:false,staleTime:Infinity}}});
 if(data!==undefined) client.setQueryData(['clients'],data);
 if(failed) client.getQueryCache().find({queryKey:['clients']}).setState({status:'error',error:new Error('fixture')});
 const html=renderToStaticMarkup(React.createElement(QueryClientProvider,{client},React.createElement(MemoryRouter,{initialEntries:[route]},React.createElement(ClientList))));
 client.clear(); return html;
}
assert.ok(render([]).includes('لا يوجد عملاء مسجلون'));
assert.ok(render(undefined).includes('clients-list-skeleton'));
assert.ok(render([{id:1,name:'مياه'}],'/clients?q=missing').includes('لا توجد نتائج مطابقة'));
const populated=render([{id:1,name:'مياه'},{id:2,name:'تدريب'}],'/clients?q=مياه');
assert.ok(populated.includes('href="/clients/1"'));
assert.ok(!populated.includes('href="/clients/2"'));
assert.ok(populated.includes('مسح البحث'));
assert.ok(render([], '/clients', true).includes('تعذر تحديث بيانات العملاء'));
assert.ok(!populated.includes('href="/clients/new"'));
console.log('PASS: clients list populated/empty/loading/error, URL search, clear action, record links and read-only controls.');
const {ClientDetail}=await import('../src/features/clients/components/Detail.tsx');
const {Routes,Route}=await import('react-router-dom');
function renderDetail(mode) {
 const client=new QueryClient({defaultOptions:{queries:{retry:false,staleTime:Infinity}}});
 if(mode!=='loading') client.setQueryData(['client','1'],mode==='missing'?null:{id:1,name:'عميل اختباري'});
 if(mode==='error') client.getQueryCache().find({queryKey:['client','1']}).setState({status:'error',error:new Error('fixture')});
 const html=renderToStaticMarkup(React.createElement(QueryClientProvider,{client},React.createElement(MemoryRouter,{initialEntries:['/clients/1']},React.createElement(Routes,{},React.createElement(Route,{path:'/clients/:id',element:React.createElement(ClientDetail)})))));
 client.clear();return html;
}
assert.ok(renderDetail('loading').includes('client-detail-skeleton'));
assert.ok(renderDetail('populated').includes('<dt>اسم العميل</dt>'));
assert.ok(renderDetail('populated').includes('عميل اختباري'));
assert.ok(renderDetail('missing').includes('العميل غير متاح'));
const failedDetail=renderDetail('error');
assert.ok(failedDetail.includes('تعذر تحميل بيانات العميل'));
assert.ok(failedDetail.includes('href="/clients"'));
assert.ok(!renderDetail('populated').includes('<button'));
console.log('PASS: client detail loading/populated/missing/error, semantic fields and recovery navigation.');
