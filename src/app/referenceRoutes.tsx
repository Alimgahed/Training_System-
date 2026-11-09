import { lazy } from 'react';
import { ReferenceEditor } from '../shared/components/ReferenceEditor';
const TrainerSubjectCreate = lazy(() => import('../features/trainer-subjects/components/Create').then(m => ({ default: m.TrainerSubjectCreate })));
const OrganizationTypeCreate = lazy(() => import('../features/organization-types/components/Create').then(m => ({ default: m.OrganizationTypeCreate })));
const OrganizationCreate = lazy(() => import('../features/organizations/components/Create').then(m => ({ default: m.OrganizationCreate })));
const CountryCreate = lazy(() => import('../features/countries/components/Create').then(m => ({ default: m.CountryCreate })));
const GovernorateCreate = lazy(() => import('../features/governorates/components/Create').then(m => ({ default: m.GovernorateCreate })));
const WorkCenterCreate = lazy(() => import('../features/work-centers/components/Create').then(m => ({ default: m.WorkCenterCreate })));
const WorkSiteCreate = lazy(() => import('../features/work-sites/components/Create').then(m => ({ default: m.WorkSiteCreate })));
const QualificationTypeCreate = lazy(() => import('../features/qualification-types/components/Create').then(m => ({ default: m.QualificationTypeCreate })));
const QualificationCreate = lazy(() => import('../features/qualifications/components/Create').then(m => ({ default: m.QualificationCreate })));
const JobCreate = lazy(() => import('../features/jobs/components/Create').then(m => ({ default: m.JobCreate })));
const GradeCreate = lazy(() => import('../features/grades/components/Create').then(m => ({ default: m.GradeCreate })));
const LearningPathCreate = lazy(() => import('../features/learning-paths/components/Create').then(m => ({ default: m.LearningPathCreate })));
const LearningSubjectCreate = lazy(() => import('../features/learning-subjects/components/Create').then(m => ({ default: m.LearningSubjectCreate })));
const LearningTermCreate = lazy(() => import('../features/learning-terms/components/Create').then(m => ({ default: m.LearningTermCreate })));
const PathGradeCreate = lazy(() => import('../features/path-grades/components/Create').then(m => ({ default: m.PathGradeCreate })));
const PathGradeSubjectCreate = lazy(() => import('../features/path-grade-subjects/components/Create').then(m => ({ default: m.PathGradeSubjectCreate })));
const PathGradeSubjectTermCreate = lazy(() => import('../features/path-grade-subject-terms/components/Create').then(m => ({ default: m.PathGradeSubjectTermCreate })));
const DepartmentCreate = lazy(() => import('../features/departments/components/Create').then(m => ({ default: m.DepartmentCreate })));
const TrainingRoomCreate = lazy(() => import('../features/rooms/components/Create').then(m => ({ default: m.TrainingRoomCreate })));
const DocumentationTypeCreate = lazy(() => import('../features/documentation-types/components/Create').then(m => ({ default: m.DocumentationTypeCreate })));
const DocumentationCreate = lazy(() => import('../features/documentations/components/Create').then(m => ({ default: m.DocumentationCreate })));
const EvaluationTypeCreate = lazy(() => import('../features/evaluation-types/components/Create').then(m => ({ default: m.EvaluationTypeCreate })));
const PerformanceEvaluationCategoryCreate = lazy(() => import('../features/performance-evaluation-categories/components/Create').then(m => ({ default: m.PerformanceEvaluationCategoryCreate })));
const PerformanceEvaluationItemCreate = lazy(() => import('../features/performance-evaluation-items/components/Create').then(m => ({ default: m.PerformanceEvaluationItemCreate })));
const PerformanceEvaluationParticipantCategoryCreate = lazy(() => import('../features/performance-evaluation-participant-categories/components/Create').then(m => ({ default: m.PerformanceEvaluationParticipantCategoryCreate })));
const PerformanceEvaluationParticipantCategoryItemCreate = lazy(() => import('../features/performance-evaluation-participant-category-items/components/Create').then(m => ({ default: m.PerformanceEvaluationParticipantCategoryItemCreate })));
export const referenceRoutes = [
{ path: '/trainer-subjects/new', element: <ReferenceEditor resource="trainer-subjects" singular="trainer-subject"><TrainerSubjectCreate /></ReferenceEditor> },
{ path: '/trainer-subjects/:id/edit', element: <ReferenceEditor resource="trainer-subjects" singular="trainer-subject"><TrainerSubjectCreate /></ReferenceEditor> },
{ path: '/organization-types/new', element: <ReferenceEditor resource="organization-types" singular="organization-type"><OrganizationTypeCreate /></ReferenceEditor> },
{ path: '/organization-types/:id/edit', element: <ReferenceEditor resource="organization-types" singular="organization-type"><OrganizationTypeCreate /></ReferenceEditor> },
{ path: '/organizations/new', element: <ReferenceEditor resource="organizations" singular="organization"><OrganizationCreate /></ReferenceEditor> },
{ path: '/organizations/:id/edit', element: <ReferenceEditor resource="organizations" singular="organization"><OrganizationCreate /></ReferenceEditor> },
{ path: '/countries/new', element: <ReferenceEditor resource="countries" singular="country"><CountryCreate /></ReferenceEditor> },
{ path: '/countries/:id/edit', element: <ReferenceEditor resource="countries" singular="country"><CountryCreate /></ReferenceEditor> },
{ path: '/governorates/new', element: <ReferenceEditor resource="governorates" singular="governorate"><GovernorateCreate /></ReferenceEditor> },
{ path: '/governorates/:id/edit', element: <ReferenceEditor resource="governorates" singular="governorate"><GovernorateCreate /></ReferenceEditor> },
{ path: '/work-centers/new', element: <ReferenceEditor resource="work-centers" singular="work-center"><WorkCenterCreate /></ReferenceEditor> },
{ path: '/work-centers/:id/edit', element: <ReferenceEditor resource="work-centers" singular="work-center"><WorkCenterCreate /></ReferenceEditor> },
{ path: '/work-sites/new', element: <ReferenceEditor resource="work-sites" singular="work-site"><WorkSiteCreate /></ReferenceEditor> },
{ path: '/work-sites/:id/edit', element: <ReferenceEditor resource="work-sites" singular="work-site"><WorkSiteCreate /></ReferenceEditor> },
{ path: '/qualification-types/new', element: <ReferenceEditor resource="qualification-types" singular="qualification-type"><QualificationTypeCreate /></ReferenceEditor> },
{ path: '/qualification-types/:id/edit', element: <ReferenceEditor resource="qualification-types" singular="qualification-type"><QualificationTypeCreate /></ReferenceEditor> },
{ path: '/qualifications/new', element: <ReferenceEditor resource="qualifications" singular="qualification"><QualificationCreate /></ReferenceEditor> },
{ path: '/qualifications/:id/edit', element: <ReferenceEditor resource="qualifications" singular="qualification"><QualificationCreate /></ReferenceEditor> },
{ path: '/jobs/new', element: <ReferenceEditor resource="jobs" singular="job"><JobCreate /></ReferenceEditor> },
{ path: '/jobs/:id/edit', element: <ReferenceEditor resource="jobs" singular="job"><JobCreate /></ReferenceEditor> },
{ path: '/grades/new', element: <ReferenceEditor resource="grades" singular="grade"><GradeCreate /></ReferenceEditor> },
{ path: '/grades/:id/edit', element: <ReferenceEditor resource="grades" singular="grade"><GradeCreate /></ReferenceEditor> },
{ path: '/learning-paths/new', element: <ReferenceEditor resource="learning-paths" singular="learning-path"><LearningPathCreate /></ReferenceEditor> },
{ path: '/learning-paths/:id/edit', element: <ReferenceEditor resource="learning-paths" singular="learning-path"><LearningPathCreate /></ReferenceEditor> },
{ path: '/learning-subjects/new', element: <ReferenceEditor resource="learning-subjects" singular="learning-subject"><LearningSubjectCreate /></ReferenceEditor> },
{ path: '/learning-subjects/:id/edit', element: <ReferenceEditor resource="learning-subjects" singular="learning-subject"><LearningSubjectCreate /></ReferenceEditor> },
{ path: '/learning-terms/new', element: <ReferenceEditor resource="learning-terms" singular="learning-term"><LearningTermCreate /></ReferenceEditor> },
{ path: '/learning-terms/:id/edit', element: <ReferenceEditor resource="learning-terms" singular="learning-term"><LearningTermCreate /></ReferenceEditor> },
{ path: '/path-grades/new', element: <ReferenceEditor resource="path-grades" singular="path-grade"><PathGradeCreate /></ReferenceEditor> },
{ path: '/path-grades/:id/edit', element: <ReferenceEditor resource="path-grades" singular="path-grade"><PathGradeCreate /></ReferenceEditor> },
{ path: '/path-grade-subjects/new', element: <ReferenceEditor resource="path-grade-subjects" singular="path-grade-subject"><PathGradeSubjectCreate /></ReferenceEditor> },
{ path: '/path-grade-subjects/:id/edit', element: <ReferenceEditor resource="path-grade-subjects" singular="path-grade-subject"><PathGradeSubjectCreate /></ReferenceEditor> },
{ path: '/path-grade-subject-terms/new', element: <ReferenceEditor resource="path-grade-subject-terms" singular="path-grade-subject-term"><PathGradeSubjectTermCreate /></ReferenceEditor> },
{ path: '/path-grade-subject-terms/:id/edit', element: <ReferenceEditor resource="path-grade-subject-terms" singular="path-grade-subject-term"><PathGradeSubjectTermCreate /></ReferenceEditor> },
{ path: '/departments/new', element: <ReferenceEditor resource="departments" singular="department"><DepartmentCreate /></ReferenceEditor> },
{ path: '/departments/:id/edit', element: <ReferenceEditor resource="departments" singular="department"><DepartmentCreate /></ReferenceEditor> },
{ path: '/rooms/new', element: <ReferenceEditor resource="rooms" singular="room"><TrainingRoomCreate /></ReferenceEditor> },
{ path: '/rooms/:id/edit', element: <ReferenceEditor resource="rooms" singular="room"><TrainingRoomCreate /></ReferenceEditor> },
{ path: '/documentation-types/new', element: <ReferenceEditor resource="documentation-types" singular="documentation-type"><DocumentationTypeCreate /></ReferenceEditor> },
{ path: '/documentation-types/:id/edit', element: <ReferenceEditor resource="documentation-types" singular="documentation-type"><DocumentationTypeCreate /></ReferenceEditor> },
{ path: '/documentations/new', element: <ReferenceEditor resource="documentations" singular="documentation"><DocumentationCreate /></ReferenceEditor> },
{ path: '/documentations/:id/edit', element: <ReferenceEditor resource="documentations" singular="documentation"><DocumentationCreate /></ReferenceEditor> },
{ path: '/evaluation-types/new', element: <ReferenceEditor resource="evaluation-types" singular="evaluation-type"><EvaluationTypeCreate /></ReferenceEditor> },
{ path: '/evaluation-types/:id/edit', element: <ReferenceEditor resource="evaluation-types" singular="evaluation-type"><EvaluationTypeCreate /></ReferenceEditor> },
{ path: '/performance-evaluation-categories/new', element: <ReferenceEditor resource="performance-evaluation-categories" singular="performance-evaluation-category"><PerformanceEvaluationCategoryCreate /></ReferenceEditor> },
{ path: '/performance-evaluation-categories/:id/edit', element: <ReferenceEditor resource="performance-evaluation-categories" singular="performance-evaluation-category"><PerformanceEvaluationCategoryCreate /></ReferenceEditor> },
{ path: '/performance-evaluation-items/new', element: <ReferenceEditor resource="performance-evaluation-items" singular="performance-evaluation-item"><PerformanceEvaluationItemCreate /></ReferenceEditor> },
{ path: '/performance-evaluation-items/:id/edit', element: <ReferenceEditor resource="performance-evaluation-items" singular="performance-evaluation-item"><PerformanceEvaluationItemCreate /></ReferenceEditor> },
{ path: '/performance-evaluation-participant-categories/new', element: <ReferenceEditor resource="performance-evaluation-participant-categories" singular="performance-evaluation-participant-category"><PerformanceEvaluationParticipantCategoryCreate /></ReferenceEditor> },
{ path: '/performance-evaluation-participant-categories/:id/edit', element: <ReferenceEditor resource="performance-evaluation-participant-categories" singular="performance-evaluation-participant-category"><PerformanceEvaluationParticipantCategoryCreate /></ReferenceEditor> },
{ path: '/performance-evaluation-participant-category-items/new', element: <ReferenceEditor resource="performance-evaluation-participant-category-items" singular="performance-evaluation-participant-category-item"><PerformanceEvaluationParticipantCategoryItemCreate /></ReferenceEditor> },
{ path: '/performance-evaluation-participant-category-items/:id/edit', element: <ReferenceEditor resource="performance-evaluation-participant-category-items" singular="performance-evaluation-participant-category-item"><PerformanceEvaluationParticipantCategoryItemCreate /></ReferenceEditor> }
];
export const referenceResources: Record<string, string> = {
  "organization-types": "organization-type",
  "organizations": "organization",
  "countries": "country",
  "governorates": "governorate",
  "work-centers": "work-center",
  "work-sites": "work-site",
  "qualification-types": "qualification-type",
  "qualifications": "qualification",
  "jobs": "job",
  "grades": "grade",
  "learning-paths": "learning-path",
  "learning-subjects": "learning-subject",
  "learning-terms": "learning-term",
  "path-grades": "path-grade",
  "path-grade-subjects": "path-grade-subject",
  "path-grade-subject-terms": "path-grade-subject-term",
  "departments": "department",
  "rooms": "room",
  "documentation-types": "documentation-type",
  "documentations": "documentation",
  "evaluation-types": "evaluation-type",
  "performance-evaluation-categories": "performance-evaluation-category",
  "performance-evaluation-items": "performance-evaluation-item",
  "performance-evaluation-participant-categories": "performance-evaluation-participant-category",
  "performance-evaluation-participant-category-items": "performance-evaluation-participant-category-item"
};
