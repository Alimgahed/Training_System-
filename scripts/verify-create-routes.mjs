import assert from 'node:assert/strict';
import fs from 'node:fs';

const resources = {
  countries: 'country', governorates: 'governorate', jobs: 'job', grades: 'grade',
  organizations: 'organization', departments: 'department', qualifications: 'qualification',
  'organization-types': 'organization-type', 'qualification-types': 'qualification-type',
  'work-centers': 'work-center', 'work-sites': 'work-site', 'learning-paths': 'learning-path',
  'learning-subjects': 'learning-subject', 'learning-terms': 'learning-term',
  'path-grades': 'path-grade', 'path-grade-subjects': 'path-grade-subject',
  'path-grade-subject-terms': 'path-grade-subject-term', rooms: 'room',
  documentations: 'documentation', 'documentation-types': 'documentation-type',
  'evaluation-types': 'evaluation-type', 'performance-evaluation-categories': 'performance-evaluation-category',
  'performance-evaluation-items': 'performance-evaluation-item',
  'performance-evaluation-participant-categories': 'performance-evaluation-participant-category',
  'performance-evaluation-participant-category-items': 'performance-evaluation-participant-category-item',
};
for (const [resource, singular] of Object.entries(resources)) {
  const source = fs.readFileSync(`src/features/${resource}/api/create.ts`, 'utf8');
  assert.ok(source.includes(`/new-${singular}`), `${resource}: incorrect creation endpoint`);
}
console.log(`PASS: ${Object.keys(resources).length} documented creation endpoint paths (static verification only).`);
