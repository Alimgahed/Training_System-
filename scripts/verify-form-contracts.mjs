import fs from 'node:fs';
import assert from 'node:assert/strict';
import { z } from 'zod';
import ts from 'typescript';

function schema(feature) {
  const source = fs.readFileSync(`src/features/${feature}/components/Create.tsx`, 'utf8');
  const expression = source.slice(source.indexOf('const schema = ') + 15, source.indexOf('\ntype FormInputs')).trim().replace(/;$/, '');
  const compiled = ts.transpileModule(`const result = ${expression};`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
  return new Function('z', `${compiled}; return result;`)(z);
}
const document = schema('documentations');
const doc = { name: 'وثيقة', file_path: '/test.pdf', documentation_type_id: '', learning_subject_id: '', path_grade_subject_id: '', path_grade_subject_term_id: '', course_id: '', course_session_id: '' };
assert.equal(document.safeParse(doc).success, false, 'No attachment target must fail');
assert.equal(document.safeParse({ ...doc, learning_subject_id: '1' }).success, true, 'One target must pass');
assert.equal(document.safeParse({ ...doc, learning_subject_id: 1, course_id: 2 }).success, false, 'Multiple targets must fail');
const evaluation = schema('performance-evaluation-items');
assert.equal(evaluation.safeParse({ name: 'بند', minimum_score: 9, maximum_score: 5 }).success, false);
assert.equal(evaluation.safeParse({ name: 'بند', minimum_score: 0, maximum_score: 0 }).success, true);
const grade = schema('grades');
assert.equal(typeof grade.parse({ name: 'درجة', code: '3', grade_interval: '8' }).code, 'number');
assert.equal(grade.safeParse({ name: '  ', code: 3, grade_interval: 8 }).success, false);
assert.equal(schema('path-grades').safeParse({ learning_path_id: '', grade_id: '' }).success, false);
const course = schema('courses');
const c = { name: 'دورة', duration_in_days: 1, starting_date: '2026-11-08', room_id: 1, trainer_id: 1, subject_type: 'learning_subject', learning_subject_id: 1, is_planned: true, is_executed: false };
assert.equal(course.safeParse(c).success, true);
assert.equal(course.safeParse({ ...c, is_planned: false }).success, false);
assert.equal(course.safeParse({ ...c, is_executed: true }).success, false);
assert.equal(course.safeParse({ ...c, learning_subject_id: '' }).success, false);
for (const field of ['starting_date', 'room_id', 'trainer_id']) assert.equal(course.safeParse({ ...c, [field]: '' }).success, false, `${field} is required`);
assert.equal(course.safeParse({ ...c, starting_date: '2026-02-30' }).success, false);
assert.equal(course.safeParse({ ...c, duration_in_days: 1.5 }).success, false);
assert.equal(course.safeParse({ ...c, number_of_internal_participants: 1.5 }).success, false);
assert.equal(course.parse({ ...c, number_of_internal_participants: '' }).number_of_internal_participants, null);
assert.equal(course.parse({ ...c, number_of_internal_participants: 0 }).number_of_internal_participants, 0);
assert.equal(course.parse({ ...c, cost: '123456789012345678.99' }).cost, '123456789012345678.99');
console.log('21 contract assertions passed. Required course fields, dates, integer values, nullable counts and decimal precision verified.');
