import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync } from 'node:fs';
import { filterCourses } from '../src/features/courses/catalog.ts';
import { moduleVisual, trainingVisual } from '../src/shared/trainingVisuals.ts';

// Isolated fixtures; never inserted into the API or shown in the application.
const courses = [
  { id: 1, name: 'صيانة المضخات', is_planned: true, learning_subject_id: 7, starting_date: '2026-12-02' },
  { id: 2, name: 'Digital skills', is_planned: true, is_executed: true, learning_subject_id: 8, starting_date: '2026-11-15' },
  { id: 3, name: null },
];
const defaults = { query: '', status: 'all', subject: 'all', sort: 'newest' };
test('planned excludes executed and subject/search filters compose', () => {
  assert.deepEqual(filterCourses(courses, { ...defaults, status: 'planned' }).map(c=>c.id), [1]);
  assert.deepEqual(filterCourses(courses, { ...defaults, subject: '8', query: '  DIGITAL ' }).map(c=>c.id), [2]);
  assert.equal(filterCourses(courses, { ...defaults, subject: '7', status: 'executed' }).length, 0);
});
test('date sorting puts unknown dates last and leaves query cache unchanged', () => {
  assert.deepEqual(filterCourses(courses, { ...defaults, sort: 'date' }).map(c=>c.id), [2,1,3]);
  assert.deepEqual(courses.map(c=>c.id), [1,2,3]);
  assert.deepEqual(filterCourses(courses, { ...defaults, status: 'other' }).map(c=>c.id), [3]);
  assert.equal(filterCourses([], defaults).length, 0);
});
test('Arabic subjects select relevant local artwork with safe fallback', () => {
  assert.equal(trainingVisual('صيانة محطات المياه'), 'technical');
  assert.equal(trainingVisual('المهارات الرقمية'), 'digital');
  assert.equal(trainingVisual('القيادة'), 'leadership');
  assert.equal(trainingVisual(''), 'workshop');
  assert.equal(moduleVisual('/performance-evaluations'), 'certification');
  assert.equal(moduleVisual('/persons/new'), 'teamwork');
  for (const subject of ['technical','digital','leadership','teamwork','certification','online','workshop']) {
    assert.ok(existsSync(`public/training/${subject}.jpg`));
    assert.ok(existsSync(`public/training/${subject}-card.jpg`));
  }
});
