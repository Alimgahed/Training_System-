import { lazy } from 'react';
import { createBrowserRouter,Navigate,useParams } from 'react-router-dom';

const Dashboard = lazy(() => import('./Dashboard').then((module) => ({ default: module.Dashboard })));
const ClientList = lazy(() => import('../features/clients/components/List').then((module) => ({ default: module.ClientList })));
const ClientDetail = lazy(() => import('../features/clients/components/Detail').then((module) => ({ default: module.ClientDetail })));
const CountryList = lazy(() => import('../features/countries/components/List').then((module) => ({ default: module.CountryList })));
const CountryDetail = lazy(() => import('../features/countries/components/Detail').then((module) => ({ default: module.CountryDetail })));
const GovernorateList = lazy(() => import('../features/governorates/components/List').then((module) => ({ default: module.GovernorateList })));
const GovernorateDetail = lazy(() => import('../features/governorates/components/Detail').then((module) => ({ default: module.GovernorateDetail })));
const OrganizationTypeList = lazy(() => import('../features/organization-types/components/List').then((module) => ({ default: module.OrganizationTypeList })));
const OrganizationTypeDetail = lazy(() => import('../features/organization-types/components/Detail').then((module) => ({ default: module.OrganizationTypeDetail })));
const OrganizationList = lazy(() => import('../features/organizations/components/List').then((module) => ({ default: module.OrganizationList })));
const OrganizationDetail = lazy(() => import('../features/organizations/components/Detail').then((module) => ({ default: module.OrganizationDetail })));
const WorkGroupList = lazy(() => import('../features/work-groups/components/List').then((module) => ({ default: module.WorkGroupList })));
const WorkGroupDetail = lazy(() => import('../features/work-groups/components/Detail').then((module) => ({ default: module.WorkGroupDetail })));
const JobTypeGroupList = lazy(() => import('../features/job-type-groups/components/List').then((module) => ({ default: module.JobTypeGroupList })));
const JobTypeGroupDetail = lazy(() => import('../features/job-type-groups/components/Detail').then((module) => ({ default: module.JobTypeGroupDetail })));
const WorkCenterList = lazy(() => import('../features/work-centers/components/List').then((module) => ({ default: module.WorkCenterList })));
const WorkCenterDetail = lazy(() => import('../features/work-centers/components/Detail').then((module) => ({ default: module.WorkCenterDetail })));
const WorkSiteList = lazy(() => import('../features/work-sites/components/List').then((module) => ({ default: module.WorkSiteList })));
const WorkSiteDetail = lazy(() => import('../features/work-sites/components/Detail').then((module) => ({ default: module.WorkSiteDetail })));
const DepartmentList = lazy(() => import('../features/departments/components/List').then((module) => ({ default: module.DepartmentList })));
const DepartmentDetail = lazy(() => import('../features/departments/components/Detail').then((module) => ({ default: module.DepartmentDetail })));
const QualificationTypeList = lazy(() => import('../features/qualification-types/components/List').then((module) => ({ default: module.QualificationTypeList })));
const QualificationTypeDetail = lazy(() => import('../features/qualification-types/components/Detail').then((module) => ({ default: module.QualificationTypeDetail })));
const QualificationList = lazy(() => import('../features/qualifications/components/List').then((module) => ({ default: module.QualificationList })));
const QualificationDetail = lazy(() => import('../features/qualifications/components/Detail').then((module) => ({ default: module.QualificationDetail })));
const JobList = lazy(() => import('../features/jobs/components/List').then((module) => ({ default: module.JobList })));
const JobDetail = lazy(() => import('../features/jobs/components/Detail').then((module) => ({ default: module.JobDetail })));
const GradeList = lazy(() => import('../features/grades/components/List').then((module) => ({ default: module.GradeList })));
const GradeDetail = lazy(() => import('../features/grades/components/Detail').then((module) => ({ default: module.GradeDetail })));
const LearningPathList = lazy(() => import('../features/learning-paths/components/List').then((module) => ({ default: module.LearningPathList })));
const LearningPathDetail = lazy(() => import('../features/learning-paths/components/Detail').then((module) => ({ default: module.LearningPathDetail })));
const LearningTermList = lazy(() => import('../features/learning-terms/components/List').then((module) => ({ default: module.LearningTermList })));
const LearningTermDetail = lazy(() => import('../features/learning-terms/components/Detail').then((module) => ({ default: module.LearningTermDetail })));
const LearningSubjectList = lazy(() => import('../features/learning-subjects/components/List').then((module) => ({ default: module.LearningSubjectList })));
const LearningSubjectDetail = lazy(() => import('../features/learning-subjects/components/Detail').then((module) => ({ default: module.LearningSubjectDetail })));
const PathGradeList = lazy(() => import('../features/path-grades/components/List').then((module) => ({ default: module.PathGradeList })));
const PathGradeDetail = lazy(() => import('../features/path-grades/components/Detail').then((module) => ({ default: module.PathGradeDetail })));
const PathGradeSubjectList = lazy(() => import('../features/path-grade-subjects/components/List').then((module) => ({ default: module.PathGradeSubjectList })));
const PathGradeSubjectDetail = lazy(() => import('../features/path-grade-subjects/components/Detail').then((module) => ({ default: module.PathGradeSubjectDetail })));
const PathGradeSubjectTermList = lazy(() => import('../features/path-grade-subject-terms/components/List').then((module) => ({ default: module.PathGradeSubjectTermList })));
const PathGradeSubjectTermDetail = lazy(() => import('../features/path-grade-subject-terms/components/Detail').then((module) => ({ default: module.PathGradeSubjectTermDetail })));
const EvaluationTypeList = lazy(() => import('../features/evaluation-types/components/List').then((module) => ({ default: module.EvaluationTypeList })));
const EvaluationTypeDetail = lazy(() => import('../features/evaluation-types/components/Detail').then((module) => ({ default: module.EvaluationTypeDetail })));
const ParticipantTypeList = lazy(() => import('../features/participant-types/components/List').then((module) => ({ default: module.ParticipantTypeList })));
const ParticipantTypeDetail = lazy(() => import('../features/participant-types/components/Detail').then((module) => ({ default: module.ParticipantTypeDetail })));
const TrainingRoomList = lazy(() => import('../features/rooms/components/List').then((module) => ({ default: module.RoomList })));
const TrainingRoomDetail = lazy(() => import('../features/rooms/components/Detail').then((module) => ({ default: module.RoomDetail })));
const PersonList = lazy(() => import('../features/persons/components/List').then((module) => ({ default: module.PersonList })));
const PersonDetail = lazy(() => import('../features/persons/components/Detail').then((module) => ({ default: module.PersonDetail })));
const PersonCreate = lazy(() => import('../features/persons/components/Create').then((module) => ({ default: module.PersonCreate })));
const CourseList = lazy(() => import('../features/courses/components/List').then((module) => ({ default: module.CourseList })));
const CourseDetail = lazy(() => import('../features/courses/components/Detail').then((module) => ({ default: module.CourseDetail })));
const CourseCreate = lazy(() => import('../features/courses/components/Create').then((module) => ({ default: module.CourseCreate })));
const CourseSessionList = lazy(() => import('../features/course-sessions/components/List').then((module) => ({ default: module.CourseSessionList })));
const CourseSessionDetail = lazy(() => import('../features/course-sessions/components/Detail').then((module) => ({ default: module.CourseSessionDetail })));
const CourseSessionCreate = lazy(() => import('../features/course-sessions/components/Create').then((module) => ({ default: module.CourseSessionCreate })));
const CourseSessionEdit = lazy(() => import('../features/course-sessions/components/Edit').then((module) => ({ default: module.CourseSessionEdit })));
const CourseParticipantList = lazy(() => import('../features/course-participants/components/List').then((module) => ({ default: module.CourseParticipantList })));
const CourseParticipantDetail = lazy(() => import('../features/course-participants/components/Detail').then((module) => ({ default: module.CourseParticipantDetail })));
const CourseSessionParticipantList = lazy(() => import('../features/course-session-participants/components/List').then((module) => ({ default: module.CourseSessionParticipantList })));
const CourseSessionParticipantDetail = lazy(() => import('../features/course-session-participants/components/Detail').then((module) => ({ default: module.CourseSessionParticipantDetail })));
const CourseSessionParticipantCreate = lazy(() => import('../features/course-session-participants/components/Create').then((module) => ({ default: module.CourseSessionParticipantCreate })));
const CourseSessionParticipantEdit = lazy(() => import('../features/course-session-participants/components/Edit').then((module) => ({ default: module.CourseSessionParticipantEdit })));
const CourseParticipantFinalExamList = lazy(() => import('../features/course-participant-final-exams/components/List').then((module) => ({ default: module.CourseParticipantFinalExamList })));
const CourseParticipantFinalExamDetail = lazy(() => import('../features/course-participant-final-exams/components/Detail').then((module) => ({ default: module.CourseParticipantFinalExamDetail })));
const DocumentationList = lazy(() => import('../features/documentations/components/List').then((module) => ({ default: module.DocumentationList })));
const DocumentationDetail = lazy(() => import('../features/documentations/components/Detail').then((module) => ({ default: module.DocumentationDetail })));
const DocumentationTypeList = lazy(() => import('../features/documentation-types/components/List').then((module) => ({ default: module.DocumentationTypeList })));
const DocumentationTypeDetail = lazy(() => import('../features/documentation-types/components/Detail').then((module) => ({ default: module.DocumentationTypeDetail })));
const PerformanceEvaluationCategoryList = lazy(() => import('../features/performance-evaluation-categories/components/List').then((module) => ({ default: module.PerformanceEvaluationCategoryList })));
const PerformanceEvaluationCategoryDetail = lazy(() => import('../features/performance-evaluation-categories/components/Detail').then((module) => ({ default: module.PerformanceEvaluationCategoryDetail })));
const PerformanceEvaluationItemList = lazy(() => import('../features/performance-evaluation-items/components/List').then((module) => ({ default: module.PerformanceEvaluationItemList })));
const PerformanceEvaluationItemDetail = lazy(() => import('../features/performance-evaluation-items/components/Detail').then((module) => ({ default: module.PerformanceEvaluationItemDetail })));
const PerformanceEvaluationParticipantCategoryList = lazy(() => import('../features/performance-evaluation-participant-categories/components/List').then((module) => ({ default: module.PerformanceEvaluationParticipantCategoryList })));
const PerformanceEvaluationParticipantCategoryDetail = lazy(() => import('../features/performance-evaluation-participant-categories/components/Detail').then((module) => ({ default: module.PerformanceEvaluationParticipantCategoryDetail })));
const PerformanceEvaluationParticipantCategoryItemList = lazy(() => import('../features/performance-evaluation-participant-category-items/components/List').then((module) => ({ default: module.PerformanceEvaluationParticipantCategoryItemList })));
const PerformanceEvaluationParticipantCategoryItemDetail = lazy(() => import('../features/performance-evaluation-participant-category-items/components/Detail').then((module) => ({ default: module.PerformanceEvaluationParticipantCategoryItemDetail })));
const PathGradeCandidateList = lazy(() => import('../features/path-grade-candidates/components/List').then((module) => ({ default: module.PathGradeCandidateList })));
const UserManagement = lazy(() => import('../features/user-management/components/List').then((module) => ({ default: module.UserManagement })));
const PerformanceEvaluationWorkspace = lazy(() => import('../features/performance-evaluations/components/List').then((module) => ({ default: module.PerformanceEvaluationWorkspace })));

import { Layout } from './components/Layout';
import { referenceRoutes } from './referenceRoutes';
import { ReferenceEditor } from '../shared/components/ReferenceEditor';
const EvaluationReport = lazy(() => import('../features/performance-evaluations/components/Report').then(m => ({ default: m.EvaluationReport })));
const TrainerSubjectList = lazy(() => import('../features/trainer-subjects/components/List').then(m => ({ default: m.TrainerSubjectList })));
const TrainerSubjectDetail = lazy(() => import('../features/trainer-subjects/components/Detail').then(m => ({ default: m.TrainerSubjectDetail })));
import { RouteErrorBoundary } from './components/RouteErrorBoundary';

function ReadOnlyCreateRedirect() {
  const { resource } = useParams();
  return <Navigate to={`/${resource || ''}`} replace />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      ...referenceRoutes,
      { path: '/performance-evaluation-course-details', element: <EvaluationReport /> },
      { path: '/performance-evaluation-course-details/:id', element: <EvaluationReport /> },
      { path: '/performance-evaluation-course-participant-details', element: <EvaluationReport participant /> },
      { path: '/performance-evaluation-course-participant-details/:id', element: <EvaluationReport participant /> },
      { path: '/trainer-subjects', element: <TrainerSubjectList /> },
      { path: '/trainer-subjects/:id', element: <TrainerSubjectDetail /> },
      { path: '/', element: <Dashboard /> },
      { path: '/clients', element: <ClientList /> },
      { path: '/clients/:id', element: <ClientDetail /> },
      { path: '/countries', element: <CountryList /> },
      { path: '/countries/:id', element: <CountryDetail /> },
      { path: '/governorates', element: <GovernorateList /> },
      { path: '/governorates/:id', element: <GovernorateDetail /> },
      { path: '/organization-types', element: <OrganizationTypeList /> },
      { path: '/organization-types/:id', element: <OrganizationTypeDetail /> },
      { path: '/organizations', element: <OrganizationList /> },
      { path: '/organizations/:id', element: <OrganizationDetail /> },
      { path: '/work-groups', element: <WorkGroupList /> },
      { path: '/work-groups/:id', element: <WorkGroupDetail /> },
      { path: '/job-type-groups', element: <JobTypeGroupList /> },
      { path: '/job-type-groups/:id', element: <JobTypeGroupDetail /> },
      { path: '/work-centers', element: <WorkCenterList /> },
      { path: '/work-centers/:id', element: <WorkCenterDetail /> },
      { path: '/work-sites', element: <WorkSiteList /> },
      { path: '/work-sites/:id', element: <WorkSiteDetail /> },
      { path: '/departments', element: <DepartmentList /> },
      { path: '/departments/:id', element: <DepartmentDetail /> },
      { path: '/qualification-types', element: <QualificationTypeList /> },
      { path: '/qualification-types/:id', element: <QualificationTypeDetail /> },
      { path: '/qualifications', element: <QualificationList /> },
      { path: '/qualifications/:id', element: <QualificationDetail /> },
      { path: '/jobs', element: <JobList /> },
      { path: '/jobs/:id', element: <JobDetail /> },
      { path: '/grades', element: <GradeList /> },
      { path: '/grades/:id', element: <GradeDetail /> },
      { path: '/learning-paths', element: <LearningPathList /> },
      { path: '/learning-paths/:id', element: <LearningPathDetail /> },
      { path: '/learning-terms', element: <LearningTermList /> },
      { path: '/learning-terms/:id', element: <LearningTermDetail /> },
      { path: '/learning-subjects', element: <LearningSubjectList /> },
      { path: '/learning-subjects/:id', element: <LearningSubjectDetail /> },
      { path: '/path-grades', element: <PathGradeList /> },
      { path: '/path-grades/:id', element: <PathGradeDetail /> },
      { path: '/path-grade-subjects', element: <PathGradeSubjectList /> },
      { path: '/path-grade-subjects/:id', element: <PathGradeSubjectDetail /> },
      { path: '/path-grade-subject-terms', element: <PathGradeSubjectTermList /> },
      { path: '/path-grade-subject-terms/:id', element: <PathGradeSubjectTermDetail /> },
      { path: '/evaluation-types', element: <EvaluationTypeList /> },
      { path: '/evaluation-types/:id', element: <EvaluationTypeDetail /> },
      { path: '/participant-types', element: <ParticipantTypeList /> },
      { path: '/participant-types/:id', element: <ParticipantTypeDetail /> },
      { path: '/rooms', element: <TrainingRoomList /> },
      { path: '/rooms/:id', element: <TrainingRoomDetail /> },
      { path: '/persons', element: <PersonList /> },
      { path: '/persons/new', element: <PersonCreate /> },
      { path: '/persons/:id/edit', element: <PersonCreate /> },
      { path: '/persons/:id', element: <PersonDetail /> },
      { path: '/courses', element: <CourseList /> },
      { path: '/courses/new', element: <ReferenceEditor resource="courses" singular="course"><CourseCreate /></ReferenceEditor> },
      { path: '/courses/:id/edit', element: <ReferenceEditor resource="courses" singular="course"><CourseCreate /></ReferenceEditor> },
      { path: '/courses/:id', element: <CourseDetail /> },
      { path: '/course-sessions', element: <CourseSessionList /> },
      { path: '/course-sessions/new', element: <CourseSessionCreate /> },
      { path: '/course-sessions/:id/edit', element: <CourseSessionEdit /> },
      { path: '/course-sessions/:id', element: <CourseSessionDetail /> },
      { path: '/course-participants', element: <CourseParticipantList /> },
      { path: '/course-participants/:id', element: <CourseParticipantDetail /> },
      { path: '/course-session-participants', element: <CourseSessionParticipantList /> },
      { path: '/course-session-participants/new', element: <CourseSessionParticipantCreate /> },
      { path: '/course-session-participants/:id/edit', element: <CourseSessionParticipantEdit /> },
      { path: '/course-session-participants/:id', element: <CourseSessionParticipantDetail /> },
      { path: '/course-participant-final-exams', element: <CourseParticipantFinalExamList /> },
      { path: '/course-participant-final-exams/:id', element: <CourseParticipantFinalExamDetail /> },
      { path: '/documentations', element: <DocumentationList /> },
      { path: '/documentations/:id', element: <DocumentationDetail /> },
      { path: '/documentation-types', element: <DocumentationTypeList /> },
      { path: '/documentation-types/:id', element: <DocumentationTypeDetail /> },
      { path: '/performance-evaluation-categories', element: <PerformanceEvaluationCategoryList /> },
      { path: '/performance-evaluation-categories/:id', element: <PerformanceEvaluationCategoryDetail /> },
      { path: '/performance-evaluation-items', element: <PerformanceEvaluationItemList /> },
      { path: '/performance-evaluation-items/:id', element: <PerformanceEvaluationItemDetail /> },
      { path: '/performance-evaluation-participant-categories', element: <PerformanceEvaluationParticipantCategoryList /> },
      { path: '/performance-evaluation-participant-categories/:id', element: <PerformanceEvaluationParticipantCategoryDetail /> },
      { path: '/performance-evaluation-participant-category-items', element: <PerformanceEvaluationParticipantCategoryItemList /> },
      { path: '/path-grade-candidates', element: <PathGradeCandidateList /> },
      { path: '/user-management', element: <UserManagement /> },
      { path: '/performance-evaluations', element: <PerformanceEvaluationWorkspace /> },
      { path: '/:resource/new', element: <ReadOnlyCreateRedirect /> },
      { path: '/performance-evaluation-participant-category-items/:id', element: <PerformanceEvaluationParticipantCategoryItemDetail /> },
    ]
  }
]);
