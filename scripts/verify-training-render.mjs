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
const { CourseList } = await import('../src/features/courses/components/List.tsx');
function render(courses) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
  client.setQueryData(['courses'], courses);
  client.setQueryData(['learning-subjects'], [{ id: 7, name: 'صيانة محطات المياه' }]);
  const html = renderToStaticMarkup(React.createElement(QueryClientProvider, { client }, React.createElement(MemoryRouter, {}, React.createElement(CourseList))));
  client.clear();
  return html;
}
const empty = render([]);
assert.ok(empty.includes('لم تُضف دورات بعد'));
assert.ok(!empty.includes('class="course-card"'));
const populated = render(Array.from({length:25}, (_,i)=>({ id:i+1, name:`اختبار معزول ${i+1}`, duration_in_days:0, learning_subject_id:7, is_planned:true })));
assert.equal((populated.match(/<tr/g)||[]).length,21);
assert.ok(populated.includes('href="/courses/25"'));
assert.ok(populated.includes('صيانة محطات المياه'));
assert.ok(!populated.includes('-card.jpg'));
assert.ok(populated.includes('صفحات الجدول'));
assert.ok(!populated.includes('TRN-'));
assert.ok(populated.includes('عدد المشاركين'));
assert.ok(!populated.includes('0 مشارك'));
console.log('PASS: API-backed course table, 20-row pagination, lookup names, empty state and no invented codes or imagery.');
