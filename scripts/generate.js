import fs from 'fs';
import path from 'path';

const features = [
  { name: 'organization-types', singular: 'organization-type', typeName: 'OrganizationType' },
  { name: 'organizations', singular: 'organization', typeName: 'Organization' },
  { name: 'countries', singular: 'country', typeName: 'Country' },
  { name: 'clients', singular: 'client', typeName: 'Client' },
  { name: 'governorates', singular: 'governorate', typeName: 'Governorate' },
  { name: 'job-type-groups', singular: 'job-type-group', typeName: 'JobTypeGroup' },
  { name: 'work-centers', singular: 'work-center', typeName: 'WorkCenter' },
  { name: 'work-sites', singular: 'work-site', typeName: 'WorkSite' },
  { name: 'work-groups', singular: 'work-group', typeName: 'WorkGroup' },
  { name: 'qualification-types', singular: 'qualification-type', typeName: 'QualificationType' },
  { name: 'qualifications', singular: 'qualification', typeName: 'Qualification' },
  { name: 'jobs', singular: 'job', typeName: 'Job' },
  { name: 'grades', singular: 'grade', typeName: 'Grade' },
  { name: 'learning-paths', singular: 'learning-path', typeName: 'LearningPath' },
  { name: 'learning-subjects', singular: 'learning-subject', typeName: 'LearningSubject' },
  { name: 'path-grade-subjects', singular: 'path-grade-subject', typeName: 'PathGradeSubject' },
  { name: 'path-grade-subject-terms', singular: 'path-grade-subject-term', typeName: 'PathGradeSubjectTerm' },
  { name: 'persons', singular: 'person', typeName: 'Person' },
  { name: 'departments', singular: 'department', typeName: 'Department' },
  { name: 'trainer-subjects', singular: 'trainer-subject', typeName: 'TrainerSubject' },
  { name: 'learning-terms', singular: 'learning-term', typeName: 'LearningTerm' },
  { name: 'rooms', singular: 'room', typeName: 'Room' },
  { name: 'courses', singular: 'course', typeName: 'Course' },
  { name: 'course-sessions', singular: 'course-session', typeName: 'CourseSession' },
  { name: 'documentation-types', singular: 'documentation-type', typeName: 'DocumentationType' },
  { name: 'documentations', singular: 'documentation', typeName: 'Documentation' },
  { name: 'evaluation-types', singular: 'evaluation-type', typeName: 'EvaluationType' },
  { name: 'course-participants', singular: 'course-participant', typeName: 'CourseParticipant' },
  { name: 'course-session-participants', singular: 'course-session-participant', typeName: 'CourseSessionParticipant' },
  { name: 'course-participant-final-exams', singular: 'course-participant-final-exam', typeName: 'CourseParticipantFinalExam' },
  { name: 'performance-evaluation-categories', singular: 'performance-evaluation-category', typeName: 'PerformanceEvaluationCategory' },
  { name: 'performance-evaluation-items', singular: 'performance-evaluation-item', typeName: 'PerformanceEvaluationItem' },
  { name: 'participant-types', singular: 'participant-type', typeName: 'ParticipantType' },
  { name: 'path-grades', singular: 'path-grade', typeName: 'PathGrade' },
  { name: 'performance-evaluation-participant-categories', singular: 'performance-evaluation-participant-category', typeName: 'PerformanceEvaluationParticipantCategory' },
  { name: 'performance-evaluation-participant-category-items', singular: 'performance-evaluation-participant-category-item', typeName: 'PerformanceEvaluationParticipantCategoryItem' }
];

const basePath = path.join(process.cwd(), 'src', 'features');

features.forEach((feature) => {
  const featurePath = path.join(basePath, feature.name);
  const typesPath = path.join(featurePath, 'types');
  const apiPath = path.join(featurePath, 'api');

  fs.mkdirSync(typesPath, { recursive: true });
  fs.mkdirSync(apiPath, { recursive: true });

  const typeContent = `export interface ${feature.typeName} {
  id: number;
  name?: string;
  code?: string | number | null;
  client_id?: number;
  [key: string]: any;
}
`;
  fs.writeFileSync(path.join(typesPath, 'index.ts'), typeContent);

  const apiListContent = `import { apiClient } from '../../../core/api/apiClient';
import type { ${feature.typeName} } from '../types';

export const get${feature.typeName}s = async (): Promise<${feature.typeName}[]> => {
  const response = await apiClient.get<${feature.typeName}[]>('/${feature.name}');
  return response.data;
};
`;
  fs.writeFileSync(path.join(apiPath, 'list.ts'), apiListContent);

  const apiGetContent = `import { apiClient } from '../../../core/api/apiClient';
import type { ${feature.typeName} } from '../types';

export const get${feature.typeName} = async (id: string | number): Promise<${feature.typeName}> => {
  const response = await apiClient.get<${feature.typeName}>('/${feature.singular}/' + id);
  return response.data;
};
`;
  fs.writeFileSync(path.join(apiPath, 'get.ts'), apiGetContent);

  const hookListContent = `import { useQuery } from '@tanstack/react-query';
import { get${feature.typeName}s } from './list';

export const use${feature.typeName}s = () => {
  return useQuery({
    queryKey: ['${feature.name}'],
    queryFn: get${feature.typeName}s,
  });
};
`;
  fs.writeFileSync(path.join(apiPath, 'useListQuery.ts'), hookListContent);

  const hookGetContent = `import { useQuery } from '@tanstack/react-query';
import { get${feature.typeName} } from './get';

export const use${feature.typeName} = (id: string | number) => {
  return useQuery({
    queryKey: ['${feature.singular}', id],
    queryFn: () => get${feature.typeName}(id),
    enabled: !!id,
  });
};
`;
  fs.writeFileSync(path.join(apiPath, 'useGetQuery.ts'), hookGetContent);

  console.log("Generated " + feature.name);
});

console.log("All features generated successfully!");
