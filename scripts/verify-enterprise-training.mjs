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
const { Routes, Route } = await import('react-router-dom');
const { examScore, examStatus, summarizeExams } = await import('../src/features/course-participant-final-exams/utils/results.ts');
const { sessionDay, sessionDate, sessionSummary, localToday } = await import('../src/features/course-sessions/utils/schedule.ts');
for(const value of [null,undefined,'','  ','invalid',Infinity])assert.equal(examScore(value),null);
assert.equal(examScore(0),0);assert.equal(examStatus(0),'failed');assert.equal(examStatus(null),'pending');assert.equal(examStatus(50),'passed');
assert.equal(summarizeExams([{exam_score:null},{exam_score:0},{exam_score:100}]).average,50);
assert.equal(sessionDay('2026-02-29'),null);assert.equal(sessionDay('2024-02-29'),'2024-02-29');assert.equal(sessionDay('2026-11-09T23:00:00Z'),'2026-11-09');
assert.equal(sessionDate('invalid'),'تاريخ غير محدد');assert.equal(localToday(new Date(2026,10,9,23)),'2026-11-09');
assert.deepEqual(sessionSummary([{session_date:'invalid'},{session_date:'2026-11-09'},{session_date:'2026-11-10'}],'2026-11-09'),{total:3,today:1,upcoming:1});
const fixtures=JSON.parse(readFileSync(new URL('./fixtures.json',import.meta.url),'utf8'));
function render(Component,path,pattern,entries=[]) {
 const client=new QueryClient({defaultOptions:{queries:{retry:false,staleTime:Infinity}}});
 for(const [key,value] of entries)client.setQueryData(key,value);
 const html=renderToStaticMarkup(React.createElement(QueryClientProvider,{client},React.createElement(MemoryRouter,{initialEntries:[path]},React.createElement(Routes,{},React.createElement(Route,{path:pattern,element:React.createElement(Component)})))));
 client.clear();return html;
}
const {CourseParticipantFinalExamList:Exams}=await import('../src/features/course-participant-final-exams/components/List.tsx');
const {CourseParticipantDetail:Participant}=await import('../src/features/course-participants/components/Detail.tsx');
const {CourseSessionParticipantList:Attendance}=await import('../src/features/course-session-participants/components/List.tsx');
const {CourseSessionList:Sessions}=await import('../src/features/course-sessions/components/List.tsx');
const {AttendanceForm}=await import('../src/features/course-session-participants/components/AttendanceForm.tsx');
const {SessionForm}=await import('../src/features/course-sessions/components/SessionForm.tsx');
const exams=render(Exams,'/course-participant-final-exams?status=pending','/course-participant-final-exams',[[['course-participant-final-exams'],fixtures['/course-participant-final-exams']]]);
assert.equal((exams.match(/href="\/course-participant-final-exams\/\d+"/g)||[]).length,7);
const participant=render(Participant,'/course-participants/101','/course-participants/:id',[[['course-participant','101'],fixtures['/course-participant/101']]]);
assert.ok(participant.includes('لم تُرصد'));assert.ok(participant.includes('href="/persons/1"'));assert.ok(participant.includes('href="/courses/1"'));
const attendance=render(Attendance,'/course-session-participants?session=26','/course-session-participants',[[['course-session-participants'],fixtures['/course-session-participants']]]);
assert.ok(attendance.includes('value="26" selected=""'));assert.ok(attendance.includes('لا يوجد حضور مطابق'));
const sessions=render(Sessions,'/course-sessions','/course-sessions',[[['course-sessions'],fixtures['/course-sessions']]]);
assert.equal((sessions.match(/class="schedule-date-mark"/g)||[]).length,12);
const last=render(Sessions,'/course-sessions?page=3','/course-sessions',[[['course-sessions'],fixtures['/course-sessions']]]);
assert.ok(last.includes('تاريخ غير محدد'));assert.ok(!last.includes('قاعة التدريب'));
assert.ok(render(AttendanceForm,'/new','/new').includes('enterprise-skeleton'));
assert.ok(render(SessionForm,'/new','/new').includes('enterprise-skeleton'));
const emptySession=render(SessionForm,'/new','/new',[[['executed-courses',{}],[]]]);
assert.ok(emptySession.includes('لا توجد دورات منفذة متاحة للجدولة.'));assert.ok(emptySession.includes('disabled=""'));
console.log('PASS: score semantics, calendar validation, pending-result filtering, relationship links, retained session filter, bounded schedule rendering, and dependent-form loading/empty states.');
const {DepartmentList}=await import('../src/features/departments/components/List.tsx');
const {DepartmentCreate}=await import('../src/features/departments/components/Create.tsx');
const departmentEntries=[[['departments'],fixtures['/departments']],[['organizations'],fixtures['/organizations']]];
const departments=render(DepartmentList,'/departments?organization=2&q=DEP-002','/departments',departmentEntries);
assert.ok(departments.includes('href="/departments/2"'));assert.ok(!departments.includes('href="/departments/1"'));assert.ok(departments.includes('جهة اختبار ب'));
const departmentCreate=render(DepartmentCreate,'/departments/new','/departments/new',[[['organizations'],[]]]);
assert.ok(departmentCreate.includes('لا توجد جهات متاحة'));assert.ok(departmentCreate.includes('disabled=""'));
const departmentEdit=render(DepartmentCreate,'/departments/1/edit','/departments/:id/edit',[...departmentEntries,[['department','1'],fixtures['/department/1']]]);
assert.ok(departmentEdit.includes('تعديل الإدارة'));assert.ok(departmentEdit.includes('حفظ التغييرات'));
console.log('PASS: department search/organization composition, organization names, empty-lookup save guard, and edit-mode rendering.');
const {DocumentationList}=await import('../src/features/documentations/components/List.tsx');
const {DocumentationCreate}=await import('../src/features/documentations/components/Create.tsx');
const documentEntries=[[['documentations'],fixtures['/documentations']],[['documentation-types'],fixtures['/documentation-types']]];
const archive=render(DocumentationList,'/documentations','/documentations',documentEntries);
assert.equal((archive.match(/class="archive-card"/g)||[]).length,12);
const missingFile=render(DocumentationList,'/documentations?file=missing','/documentations',documentEntries);
assert.ok(missingFile.includes('href="/documentations/204"'));assert.equal((missingFile.match(/class="archive-card"/g)||[]).length,1);
const docEdit=render(DocumentationCreate,'/documentations/202/edit','/documentations/:id/edit',[...documentEntries,[['documentation','202'],fixtures['/documentation/202']],[['path-grade-subjects'],fixtures['/path-grade-subjects']]]);
assert.ok(docEdit.includes('value="path_grade_subject_id" selected=""'));assert.ok(docEdit.includes('مادة مسار اختبار')); // Input value hydration is verified in the browser.
const conflicting=render(DocumentationCreate,'/documentations/201/edit','/documentations/:id/edit',[...documentEntries,[['documentation','201'],fixtures['/documentation/201']]]);
assert.ok(conflicting.includes('السجل الحالي مرتبط بأكثر من جهة'));
console.log('PASS: archive rendering bound, missing-file filtering, saved document relationship selection and conflicting-relationship guidance.');
