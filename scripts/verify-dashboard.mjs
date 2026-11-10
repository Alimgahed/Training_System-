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
const { Dashboard } = await import('../src/app/Dashboard.tsx');
const { dashboardSummary, dateLabel, timeLabel, dayKey } = await import('../src/app/dashboard/model.ts');
const today = dayKey(new Date());
const courses = [{id:1,name:'دورة اختبار',starting_date:today,is_planned:true}, {id:2,name:'منفذة',starting_date:today,is_executed:true}, {id:3,name:'غير مؤرخة'}];
const people = [{id:12,name:'موظف اختبار',is_active:true,is_trainer:true}];
const summary = dashboardSummary(people, courses, courses, [{id:4,course_id:1,session_date:today,start_time:'09:00:00'}],today);
assert.deepEqual(summary.upcomingCourses.map(c=>c.id), [1,3]);
assert.deepEqual(courses.map(c=>c.id),[1,2,3], 'Query data must not be reordered');
assert.equal(summary.activePersons,1);
assert.equal(summary.trainers,1);
assert.equal(summary.todaysSessions.length,1);
assert.equal(dateLabel('bad date'),'موعد غير محدد');
assert.equal(timeLabel('bad time'),'وقت غير محدد');
function render(mode) {
 const client = new QueryClient({defaultOptions:{queries:{retry:false,staleTime:Infinity}}});
 if(mode !== 'loading') {
  for(const key of ['persons','courses','dashboard-planned-courses','dashboard-executed-courses','course-participants','course-sessions']) client.setQueryData([key],[]);
 }
 if(mode === 'populated') {
  client.setQueryData(['persons'],people);
  client.setQueryData(['courses'],courses);
  client.setQueryData(['dashboard-planned-courses'],courses);
  client.setQueryData(['course-sessions'],[{id:4,course_id:1,session_date:today,start_time:'bad time'}]);
 }
 if(mode === 'error') client.getQueryCache().find({queryKey:['dashboard-executed-courses']}).setState({status:'error',error:new Error('synthetic test failure')});
 const html=renderToStaticMarkup(React.createElement(QueryClientProvider,{client},React.createElement(MemoryRouter,{},React.createElement(Dashboard))));
 client.clear();
 return html;
}
const empty=render('empty');
assert.ok(empty.includes('لا توجد جلسات مجدولة اليوم'));
assert.ok(empty.includes('لا توجد بيانات موظفين'));
const populated=render('populated');
assert.ok(populated.includes('href="/persons/12"'));
assert.ok(populated.includes('href="/courses/1"'));
assert.ok(populated.includes('href="/course-sessions/4"'));
assert.ok(populated.includes('وقت غير محدد'));
const loading=render('loading');
assert.equal((loading.match(/class="dashboard-value-skeleton"/g)||[]).length,6);
assert.equal((loading.match(/class="dashboard-row-skeletons"/g)||[]).length,4);
const error=render('error');
assert.ok(error.includes('إعادة تحميل الدورات المنفذة'));
console.log('PASS: dashboard populated/empty/loading/partial failure, record links, safe date/time, upcoming order, executed exclusion and immutable query data. Synthetic data only; no live API verification.');
