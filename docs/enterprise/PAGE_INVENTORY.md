# Sequential enterprise transformation

Source-derived inventory; findings are audit leads, not claims of visual or functional verification. Prior redesign reports are historical evidence only. Each routed page must pass understand → audit → design → implement → optimize → skeleton → functional verification before the next page. Update: the user permits offline implementation and local testing while live API access is unavailable; live verification remains outstanding. Create and edit are separate routes even when sharing a component.

141 page entries (including sign-in), 1 redirect entries, 7 unlinked feature component files, 7 overlay-bearing files.

## Shared system

Existing tokens: src/index.css and src/training-theme.css. Arabic Tajawal typography; blue/teal actions; 4/8px spacing; existing Button, Input, Select, Table, Card, Tabs, Dialog, Badge, PageHeader, LoadingSkeleton, EmptyState, ErrorState, ReferenceEditor. Keep page changes scoped; inspect callers before shared edits. Shell: Sidebar mobile drawer, Header search and Layout route boundary.

## Execution checklist

| # | Route | Component | Audit | Design | Implement | Test | Status |
|---|---|---|---|---|---|---|---|
| 1 | `unauthenticated (all paths)` | SignIn | Done | Done | Done | Partial | Local checks passed; live API pending |
| 2 | `/` | Dashboard | Done | Done | Done | Offline passed | Live/visual verification pending |
| 3 | `/:resource/new` | ReadOnlyCreateRedirect | Pending | Pending | Pending | Pending | Redirect review |
| 4 | `/clients` | ClientList | Done | Done | Done | Offline passed | Live/visual verification pending |
| 5 | `/clients/:id` | ClientDetail | Done | Done | Done | Offline passed | Live/visual verification pending |
| 6 | `/countries` | CountryList | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 7 | `/countries/:id` | CountryDetail | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 8 | `/countries/:id/edit` | CountryCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 9 | `/countries/new` | CountryCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 10 | `/course-participant-final-exams` | CourseParticipantFinalExamList | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 11 | `/course-participant-final-exams/:id` | CourseParticipantFinalExamDetail | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 12 | `/course-participants` | CourseParticipantList | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 13 | `/course-participants/:id` | CourseParticipantDetail | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 14 | `/course-session-participants` | CourseSessionParticipantList | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 15 | `/course-session-participants/:id` | CourseSessionParticipantDetail | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 16 | `/course-session-participants/:id/edit` | CourseSessionParticipantEdit | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 17 | `/course-session-participants/new` | CourseSessionParticipantCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 18 | `/course-sessions` | CourseSessionList | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 19 | `/course-sessions/:id` | CourseSessionDetail | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 20 | `/course-sessions/:id/edit` | CourseSessionEdit | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 21 | `/course-sessions/new` | CourseSessionCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 22 | `/courses` | CourseList | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 23 | `/courses/:id` | CourseDetail | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 24 | `/courses/:id/edit` | CourseCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 25 | `/courses/new` | CourseCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 26 | `/departments` | DepartmentList | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 27 | `/departments/:id` | DepartmentDetail | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 28 | `/departments/:id/edit` | DepartmentCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 29 | `/departments/new` | DepartmentCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 30 | `/documentation-types` | DocumentationTypeList | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 31 | `/documentation-types/:id` | DocumentationTypeDetail | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 32 | `/documentation-types/:id/edit` | DocumentationTypeCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 33 | `/documentation-types/new` | DocumentationTypeCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 34 | `/documentations` | DocumentationList | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 35 | `/documentations/:id` | DocumentationDetail | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 36 | `/documentations/:id/edit` | DocumentationCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 37 | `/documentations/new` | DocumentationCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 38 | `/evaluation-types` | EvaluationTypeList | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 39 | `/evaluation-types/:id` | EvaluationTypeDetail | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 40 | `/evaluation-types/:id/edit` | EvaluationTypeCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 41 | `/evaluation-types/new` | EvaluationTypeCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 42 | `/governorates` | GovernorateList | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 43 | `/governorates/:id` | GovernorateDetail | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 44 | `/governorates/:id/edit` | GovernorateCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 45 | `/governorates/new` | GovernorateCreate | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 46 | `/grades` | GradeList | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 47 | `/grades/:id` | GradeDetail | Done | Done | Done | Synthetic browser passed | Live API pending; see PROGRESS.md |
| 48 | `/grades/:id/edit` | GradeCreate | Pending | Pending | Pending | Pending | Pending |
| 49 | `/grades/new` | GradeCreate | Pending | Pending | Pending | Pending | Pending |
| 50 | `/job-type-groups` | JobTypeGroupList | Pending | Pending | Pending | Pending | Pending |
| 51 | `/job-type-groups/:id` | JobTypeGroupDetail | Pending | Pending | Pending | Pending | Pending |
| 52 | `/jobs` | JobList | Pending | Pending | Pending | Pending | Pending |
| 53 | `/jobs/:id` | JobDetail | Pending | Pending | Pending | Pending | Pending |
| 54 | `/jobs/:id/edit` | JobCreate | Pending | Pending | Pending | Pending | Pending |
| 55 | `/jobs/new` | JobCreate | Pending | Pending | Pending | Pending | Pending |
| 56 | `/learning-paths` | LearningPathList | Pending | Pending | Pending | Pending | Pending |
| 57 | `/learning-paths/:id` | LearningPathDetail | Pending | Pending | Pending | Pending | Pending |
| 58 | `/learning-paths/:id/edit` | LearningPathCreate | Pending | Pending | Pending | Pending | Pending |
| 59 | `/learning-paths/new` | LearningPathCreate | Pending | Pending | Pending | Pending | Pending |
| 60 | `/learning-subjects` | LearningSubjectList | Pending | Pending | Pending | Pending | Pending |
| 61 | `/learning-subjects/:id` | LearningSubjectDetail | Pending | Pending | Pending | Pending | Pending |
| 62 | `/learning-subjects/:id/edit` | LearningSubjectCreate | Pending | Pending | Pending | Pending | Pending |
| 63 | `/learning-subjects/new` | LearningSubjectCreate | Pending | Pending | Pending | Pending | Pending |
| 64 | `/learning-terms` | LearningTermList | Pending | Pending | Pending | Pending | Pending |
| 65 | `/learning-terms/:id` | LearningTermDetail | Pending | Pending | Pending | Pending | Pending |
| 66 | `/learning-terms/:id/edit` | LearningTermCreate | Pending | Pending | Pending | Pending | Pending |
| 67 | `/learning-terms/new` | LearningTermCreate | Pending | Pending | Pending | Pending | Pending |
| 68 | `/organization-types` | OrganizationTypeList | Pending | Pending | Pending | Pending | Pending |
| 69 | `/organization-types/:id` | OrganizationTypeDetail | Pending | Pending | Pending | Pending | Pending |
| 70 | `/organization-types/:id/edit` | OrganizationTypeCreate | Pending | Pending | Pending | Pending | Pending |
| 71 | `/organization-types/new` | OrganizationTypeCreate | Pending | Pending | Pending | Pending | Pending |
| 72 | `/organizations` | OrganizationList | Pending | Pending | Pending | Pending | Pending |
| 73 | `/organizations/:id` | OrganizationDetail | Pending | Pending | Pending | Pending | Pending |
| 74 | `/organizations/:id/edit` | OrganizationCreate | Pending | Pending | Pending | Pending | Pending |
| 75 | `/organizations/new` | OrganizationCreate | Pending | Pending | Pending | Pending | Pending |
| 76 | `/participant-types` | ParticipantTypeList | Pending | Pending | Pending | Pending | Pending |
| 77 | `/participant-types/:id` | ParticipantTypeDetail | Pending | Pending | Pending | Pending | Pending |
| 78 | `/path-grade-candidates` | PathGradeCandidateList | Pending | Pending | Pending | Pending | Pending |
| 79 | `/path-grade-subject-terms` | PathGradeSubjectTermList | Pending | Pending | Pending | Pending | Pending |
| 80 | `/path-grade-subject-terms/:id` | PathGradeSubjectTermDetail | Pending | Pending | Pending | Pending | Pending |
| 81 | `/path-grade-subject-terms/:id/edit` | PathGradeSubjectTermCreate | Pending | Pending | Pending | Pending | Pending |
| 82 | `/path-grade-subject-terms/new` | PathGradeSubjectTermCreate | Pending | Pending | Pending | Pending | Pending |
| 83 | `/path-grade-subjects` | PathGradeSubjectList | Pending | Pending | Pending | Pending | Pending |
| 84 | `/path-grade-subjects/:id` | PathGradeSubjectDetail | Pending | Pending | Pending | Pending | Pending |
| 85 | `/path-grade-subjects/:id/edit` | PathGradeSubjectCreate | Pending | Pending | Pending | Pending | Pending |
| 86 | `/path-grade-subjects/new` | PathGradeSubjectCreate | Pending | Pending | Pending | Pending | Pending |
| 87 | `/path-grades` | PathGradeList | Pending | Pending | Pending | Pending | Pending |
| 88 | `/path-grades/:id` | PathGradeDetail | Pending | Pending | Pending | Pending | Pending |
| 89 | `/path-grades/:id/edit` | PathGradeCreate | Pending | Pending | Pending | Pending | Pending |
| 90 | `/path-grades/new` | PathGradeCreate | Pending | Pending | Pending | Pending | Pending |
| 91 | `/performance-evaluation-categories` | PerformanceEvaluationCategoryList | Pending | Pending | Pending | Pending | Pending |
| 92 | `/performance-evaluation-categories/:id` | PerformanceEvaluationCategoryDetail | Pending | Pending | Pending | Pending | Pending |
| 93 | `/performance-evaluation-categories/:id/edit` | PerformanceEvaluationCategoryCreate | Pending | Pending | Pending | Pending | Pending |
| 94 | `/performance-evaluation-categories/new` | PerformanceEvaluationCategoryCreate | Pending | Pending | Pending | Pending | Pending |
| 95 | `/performance-evaluation-course-details` | EvaluationReport | Pending | Pending | Pending | Pending | Pending |
| 96 | `/performance-evaluation-course-details/:id` | EvaluationReport | Pending | Pending | Pending | Pending | Pending |
| 97 | `/performance-evaluation-course-participant-details` | EvaluationReport | Pending | Pending | Pending | Pending | Pending |
| 98 | `/performance-evaluation-course-participant-details/:id` | EvaluationReport | Pending | Pending | Pending | Pending | Pending |
| 99 | `/performance-evaluation-items` | PerformanceEvaluationItemList | Pending | Pending | Pending | Pending | Pending |
| 100 | `/performance-evaluation-items/:id` | PerformanceEvaluationItemDetail | Pending | Pending | Pending | Pending | Pending |
| 101 | `/performance-evaluation-items/:id/edit` | PerformanceEvaluationItemCreate | Pending | Pending | Pending | Pending | Pending |
| 102 | `/performance-evaluation-items/new` | PerformanceEvaluationItemCreate | Pending | Pending | Pending | Pending | Pending |
| 103 | `/performance-evaluation-participant-categories` | PerformanceEvaluationParticipantCategoryList | Pending | Pending | Pending | Pending | Pending |
| 104 | `/performance-evaluation-participant-categories/:id` | PerformanceEvaluationParticipantCategoryDetail | Pending | Pending | Pending | Pending | Pending |
| 105 | `/performance-evaluation-participant-categories/:id/edit` | PerformanceEvaluationParticipantCategoryCreate | Pending | Pending | Pending | Pending | Pending |
| 106 | `/performance-evaluation-participant-categories/new` | PerformanceEvaluationParticipantCategoryCreate | Pending | Pending | Pending | Pending | Pending |
| 107 | `/performance-evaluation-participant-category-items` | PerformanceEvaluationParticipantCategoryItemList | Pending | Pending | Pending | Pending | Pending |
| 108 | `/performance-evaluation-participant-category-items/:id` | PerformanceEvaluationParticipantCategoryItemDetail | Pending | Pending | Pending | Pending | Pending |
| 109 | `/performance-evaluation-participant-category-items/:id/edit` | PerformanceEvaluationParticipantCategoryItemCreate | Pending | Pending | Pending | Pending | Pending |
| 110 | `/performance-evaluation-participant-category-items/new` | PerformanceEvaluationParticipantCategoryItemCreate | Pending | Pending | Pending | Pending | Pending |
| 111 | `/performance-evaluations` | PerformanceEvaluationWorkspace | Pending | Pending | Pending | Pending | Pending |
| 112 | `/persons` | PersonList | Pending | Pending | Pending | Pending | Pending |
| 113 | `/persons/:id` | PersonDetail | Pending | Pending | Pending | Pending | Pending |
| 114 | `/persons/:id/edit` | PersonCreate | Pending | Pending | Pending | Pending | Pending |
| 115 | `/persons/new` | PersonCreate | Pending | Pending | Pending | Pending | Pending |
| 116 | `/qualification-types` | QualificationTypeList | Pending | Pending | Pending | Pending | Pending |
| 117 | `/qualification-types/:id` | QualificationTypeDetail | Pending | Pending | Pending | Pending | Pending |
| 118 | `/qualification-types/:id/edit` | QualificationTypeCreate | Pending | Pending | Pending | Pending | Pending |
| 119 | `/qualification-types/new` | QualificationTypeCreate | Pending | Pending | Pending | Pending | Pending |
| 120 | `/qualifications` | QualificationList | Pending | Pending | Pending | Pending | Pending |
| 121 | `/qualifications/:id` | QualificationDetail | Pending | Pending | Pending | Pending | Pending |
| 122 | `/qualifications/:id/edit` | QualificationCreate | Pending | Pending | Pending | Pending | Pending |
| 123 | `/qualifications/new` | QualificationCreate | Pending | Pending | Pending | Pending | Pending |
| 124 | `/rooms` | TrainingRoomList | Pending | Pending | Pending | Pending | Pending |
| 125 | `/rooms/:id` | TrainingRoomDetail | Pending | Pending | Pending | Pending | Pending |
| 126 | `/rooms/:id/edit` | TrainingRoomCreate | Pending | Pending | Pending | Pending | Pending |
| 127 | `/rooms/new` | TrainingRoomCreate | Pending | Pending | Pending | Pending | Pending |
| 128 | `/trainer-subjects` | TrainerSubjectList | Pending | Pending | Pending | Pending | Pending |
| 129 | `/trainer-subjects/:id` | TrainerSubjectDetail | Pending | Pending | Pending | Pending | Pending |
| 130 | `/trainer-subjects/:id/edit` | TrainerSubjectCreate | Pending | Pending | Pending | Pending | Pending |
| 131 | `/trainer-subjects/new` | TrainerSubjectCreate | Pending | Pending | Pending | Pending | Pending |
| 132 | `/user-management` | UserManagement | Pending | Pending | Pending | Pending | Pending |
| 133 | `/work-centers` | WorkCenterList | Pending | Pending | Pending | Pending | Pending |
| 134 | `/work-centers/:id` | WorkCenterDetail | Pending | Pending | Pending | Pending | Pending |
| 135 | `/work-centers/:id/edit` | WorkCenterCreate | Pending | Pending | Pending | Pending | Pending |
| 136 | `/work-centers/new` | WorkCenterCreate | Pending | Pending | Pending | Pending | Pending |
| 137 | `/work-groups` | WorkGroupList | Pending | Pending | Pending | Pending | Pending |
| 138 | `/work-groups/:id` | WorkGroupDetail | Pending | Pending | Pending | Pending | Pending |
| 139 | `/work-sites` | WorkSiteList | Pending | Pending | Pending | Pending | Pending |
| 140 | `/work-sites/:id` | WorkSiteDetail | Pending | Pending | Pending | Pending | Pending |
| 141 | `/work-sites/:id/edit` | WorkSiteCreate | Pending | Pending | Pending | Pending | Pending |
| 142 | `/work-sites/new` | WorkSiteCreate | Pending | Pending | Pending | Pending | Pending |

## 1. SignIn — unauthenticated (all paths)

- Source: `src/app/App.tsx`
- Purpose: Authenticate staff and resume requested location.
- Existing UI: HTMLDivElement, LoginFormInputs, QueryClientProvider, Suspense, LoadingSkeleton, AuthenticatedRoutes, Globe2, UserRound, LockKeyhole, EyeOff, Eye, ArrowLeft, ShieldCheck, Icon.
- Labels / sections: جارٍ تحميل المنصة; لغة الواجهة: العربية; تسجيل الدخول إلى النظام; منصة إدارة التدريب; منصة إدارة التدريب.
- API dependencies: POST /login.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No automatic finding; individual audit still required.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 2. Dashboard — /

- Source: `src/app/Dashboard.tsx`
- Purpose: Daily training operations overview.
- Existing UI: Link, ArrowLeft, Icon, UserPlus, BookOpen, Calendar, GraduationCap, Card, DashboardLink, LoadingSkeleton, Button, RefreshCw, Table, Badge, Users, CalendarClock.
- Labels / sections: لوحة التحكم; مؤشرات الموارد والتدريب; إجراءات سريعة; ملخص النظام; الدورات التدريبية; الجلسات المجدولة اليوم; أحدث الموظفين; الدورات القادمة.
- API dependencies: GET /persons; GET /courses; GET /get-planned-courses; GET /get-executed-courses; GET /course-participants; GET /course-sessions.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 3. ReadOnlyCreateRedirect — /:resource/new

- Source: `src/app/router.tsx`
- Purpose: Create :resource.
- Existing UI: Navigate, Layout, RouteErrorBoundary, EvaluationReport, TrainerSubjectList, TrainerSubjectDetail, Dashboard, ClientList, ClientDetail, CountryList, CountryDetail, GovernorateList, GovernorateDetail, OrganizationTypeList, OrganizationTypeDetail, OrganizationList, OrganizationDetail, WorkGroupList, WorkGroupDetail, JobTypeGroupList, JobTypeGroupDetail, WorkCenterList, WorkCenterDetail, WorkSiteList, WorkSiteDetail, DepartmentList, DepartmentDetail, QualificationTypeList, QualificationTypeDetail, QualificationList, QualificationDetail, JobList, JobDetail, GradeList, GradeDetail, LearningPathList, LearningPathDetail, LearningTermList, LearningTermDetail, LearningSubjectList, LearningSubjectDetail, PathGradeList, PathGradeDetail, PathGradeSubjectList, PathGradeSubjectDetail, PathGradeSubjectTermList, PathGradeSubjectTermDetail, EvaluationTypeList, EvaluationTypeDetail, ParticipantTypeList, ParticipantTypeDetail, TrainingRoomList, TrainingRoomDetail, PersonList, PersonCreate, PersonDetail, CourseList, ReferenceEditor, CourseCreate, CourseDetail, CourseSessionList, CourseSessionCreate, CourseSessionEdit, CourseSessionDetail, CourseParticipantList, CourseParticipantDetail, CourseSessionParticipantList, CourseSessionParticipantCreate, CourseSessionParticipantEdit, CourseSessionParticipantDetail, CourseParticipantFinalExamList, CourseParticipantFinalExamDetail, DocumentationList, DocumentationDetail, DocumentationTypeList, DocumentationTypeDetail, PerformanceEvaluationCategoryList, PerformanceEvaluationCategoryDetail, PerformanceEvaluationItemList, PerformanceEvaluationItemDetail, PerformanceEvaluationParticipantCategoryList, PerformanceEvaluationParticipantCategoryDetail, PerformanceEvaluationParticipantCategoryItemList, PathGradeCandidateList, UserManagement, PerformanceEvaluationWorkspace, ReadOnlyCreateRedirect, PerformanceEvaluationParticipantCategoryItemDetail.
- Labels / sections: Inspect rendered page.
- API dependencies: See dependency graph; wrapper or redirect may own the request.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 4. ClientList — /clients

- Source: `src/features/clients/components/List.tsx`
- Purpose: Browse and manage clients.
- Existing UI: NonNullable, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Database.
- Labels / sections: العملاء; بيانات العملاء المسجلة في النظام..
- API dependencies: GET /clients.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 5. ClientDetail — /clients/:id

- Source: `src/features/clients/components/Detail.tsx`
- Purpose: Inspect record and related data clients.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات الأساسية; المعرّف (ID); الاسم.
- API dependencies: GET /client/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 6. CountryList — /countries

- Source: `src/features/countries/components/List.tsx`
- Purpose: Browse and manage countries.
- Existing UI: NonNullable, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Database.
- Labels / sections: الدول; إدارة بيانات الدول المرجعية في النظام..
- API dependencies: GET /countries.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 7. CountryDetail — /countries/:id

- Source: `src/features/countries/components/Detail.tsx`
- Purpose: Inspect record and related data countries.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField, Table.
- Labels / sections: البيانات الأساسية; المعرّف (ID); الاسم; المحافظات.
- API dependencies: GET /country/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 8. CountryCreate — /countries/:id/edit

- Source: `src/features/countries/components/Create.tsx`
- Purpose: Edit countries.
- Existing UI: FormInputs, Link, Globe2, Button, ArrowRight, Card, Input, Save.
- Labels / sections: إضافة دولة; بيانات الدولة; اسم الدولة *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 9. CountryCreate — /countries/new

- Source: `src/features/countries/components/Create.tsx`
- Purpose: Create countries.
- Existing UI: FormInputs, Link, Globe2, Button, ArrowRight, Card, Input, Save.
- Labels / sections: إضافة دولة; بيانات الدولة; اسم الدولة *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 10. CourseParticipantFinalExamList — /course-participant-final-exams

- Source: `src/features/course-participant-final-exams/components/List.tsx`
- Purpose: Browse and manage course-participant-final-exams.
- Existing UI: LoadingSkeleton, ErrorState, Link, Award, CheckCircle2, Trophy, Search, XCircle, CalendarDays.
- Labels / sections: نتائج الاختبارات النهائية; المشارك #{exam.course_participant_id || '—'}.
- API dependencies: GET /course-participant-final-exams.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 11. CourseParticipantFinalExamDetail — /course-participant-final-exams/:id

- Source: `src/features/course-participant-final-exams/components/Detail.tsx`
- Purpose: Inspect record and related data course-participant-final-exams.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: سجل تفاصيل ومتابعة اختبار نهائي; بيانات السجل; المعرّف (ID); تاريخ الاختبار; الجهة المنظمة; الدرجة المحققة; معرف ملف الوثيقة المرفقة; معرف مشارك الدورة.
- API dependencies: GET /course-participant-final-exam/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 12. CourseParticipantList — /course-participants

- Source: `src/features/course-participants/components/List.tsx`
- Purpose: Browse and manage course-participants.
- Existing UI: LoadingSkeleton, ErrorState, Link, Users, Award, ClipboardCheck, Search, UserRoundCheck.
- Labels / sections: مشاركو الدورات التدريبية; الموظف #{participant.person_id || '—'}.
- API dependencies: GET /course-participants.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 13. CourseParticipantDetail — /course-participants/:id

- Source: `src/features/course-participants/components/Detail.tsx`
- Purpose: Inspect record and related data course-participants.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField, Table.
- Labels / sections: سجل تفاصيل ومتابعة مشارك دورة; بيانات السجل; المعرّف (ID); معرف المتدرب / الشخص; معرف الدورة التدريبية; الاختبارات النهائية للمتدرب; تفاصيل تقييم أداء المتدرب.
- API dependencies: GET /course-participant/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 14. CourseSessionParticipantList — /course-session-participants

- Source: `src/features/course-session-participants/components/List.tsx`
- Purpose: Browse and manage course-session-participants.
- Existing UI: NonNullable, Badge, ErrorState, PageHeader, Link, Button, Plus, Card, Search, ReferenceActions, Table, Calendar.
- Labels / sections: حضور جلسات التدريب; سجلات الحضور والتواجد الفعلي للمتدربين في الجلسات التدريبية..
- API dependencies: GET /course-session-participants.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 15. CourseSessionParticipantDetail — /course-session-participants/:id

- Source: `src/features/course-session-participants/components/Detail.tsx`
- Purpose: Inspect record and related data course-session-participants.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, Pencil, Trash2, ArrowRight, Card, InfoField.
- Labels / sections: سجل تفاصيل ومتابعة حضور جلسة; بيانات السجل; المعرّف (ID); معرف الجلسة التدريبية; معرف تسجيل المتدرب في الدورة.
- API dependencies: DELETE /course-session-participant/${id}; GET /course-session-participant/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 16. CourseSessionParticipantEdit — /course-session-participants/:id/edit

- Source: `src/features/course-session-participants/components/Edit.tsx`
- Purpose: Edit course-session-participants.
- Existing UI: Values, LoadingSkeleton, ErrorState, UserRoundCheck, Link, Button, Select, Save.
- Labels / sections: تعديل تسجيل الحضور; الجلسة التدريبية *; المتدرب المسجل بالدورة *.
- API dependencies: GET /course-participants; GET /course-sessions; PUT /course-session-participant/${id}; GET /course-session-participant/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 17. CourseSessionParticipantCreate — /course-session-participants/new

- Source: `src/features/course-session-participants/components/Create.tsx`
- Purpose: Create course-session-participants.
- Existing UI: FormInputs, UserRoundCheck, Link, Button, Select, CalendarDays.
- Labels / sections: تسجيل حضور متدرب; الجلسة التدريبية *; المتدرب المسجل في الدورة *.
- API dependencies: GET /course-participants; GET /course-sessions; POST /new-course-session-participant.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 18. CourseSessionList — /course-sessions

- Source: `src/features/course-sessions/components/List.tsx`
- Purpose: Browse and manage course-sessions.
- Existing UI: LoadingSkeleton, ErrorState, Link, CalendarDays, Clock3, TimerReset, Search, Button, Plus, MapPin.
- Labels / sections: الجلسات التدريبية; البحث في الجلسات; جدول الجلسات التدريبية.
- API dependencies: GET /course-sessions.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 19. CourseSessionDetail — /course-sessions/:id

- Source: `src/features/course-sessions/components/Detail.tsx`
- Purpose: Inspect record and related data course-sessions.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, Pencil, Trash2, ArrowRight, Card, InfoField.
- Labels / sections: سجل تفاصيل ومتابعة جلسة تدريبية; بيانات السجل; المعرّف (ID); تاريخ انعقاد الجلسة; وقت البدء; وقت الانتهاء; معرف الدورة التدريبية.
- API dependencies: DELETE /course-session/${id}; GET /course-session/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 20. CourseSessionEdit — /course-sessions/:id/edit

- Source: `src/features/course-sessions/components/Edit.tsx`
- Purpose: Edit course-sessions.
- Existing UI: Values, LoadingSkeleton, ErrorState, CalendarDays, Link, Button, Select, Input, Save.
- Labels / sections: تعديل الجلسة التدريبية; الدورة المنفذة *; تاريخ الجلسة *; وقت البدء *; وقت الانتهاء *.
- API dependencies: GET /get-executed-courses; GET /get-planned-courses; PUT /course-session/${id}; GET /course-session/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 21. CourseSessionCreate — /course-sessions/new

- Source: `src/features/course-sessions/components/Create.tsx`
- Purpose: Create course-sessions.
- Existing UI: FormInputs, PageHeader, Link, Button, ArrowRight, Card, Select, Input, Check.
- Labels / sections: جدولة جلسة تدريبية جديدة; إضافة جلسة أو محاضرة جديدة ضمن الدورات التدريبية المنفذة; بيانات وموعد الجلسة التدريبية; الدورة التدريبية المنفذة *; تاريخ الجلسة *; وقت البدء *; وقت الانتهاء *.
- API dependencies: GET /get-executed-courses; GET /get-planned-courses; POST /new-course-session.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 22. CourseList — /courses

- Source: `src/features/courses/components/List.tsx`
- Purpose: Browse and manage courses.
- Existing UI: LoadingSkeleton, ErrorState, Link, Icon, Search, Plus, Badge, Clock3, Users, BookOpen.
- Labels / sections: مسار التنقل; التعلّم يبدأ بخطوة.; إحصاءات الدورات; {label}; البحث والتصفية; البحث في الدورات; الدورات التدريبية; {course.id != null ? ; {courses.length ? 'لا توجد دورات مطابقة' : 'مساحة لفرص تعلّم جديدة'}; صفحات الدورات.
- API dependencies: GET /learning-subjects; GET /courses.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No automatic finding; individual audit still required.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 23. CourseDetail — /courses/:id

- Source: `src/features/courses/components/Detail.tsx`
- Purpose: Inspect record and related data courses.
- Existing UI: LoadingSkeleton, ErrorState, Info, Clock, Users, FileText, Badge, Card, InfoField, Table, PageHeader, Tabs.
- Labels / sections: معلومات الدورة; الاسم; مسار التدريب; فصل المسار; مادة التعلم; التواريخ والمدة; المدة (أيام); تاريخ البدء; تاريخ الانتهاء; الطاقم التدريبي; المدرب; المدرب الاحتياطي; المنسق; التكلفة والتمويل; التكلفة; جهة التمويل; عدد المشاركين الداخليين; عدد المشاركين الخارجيين.
- API dependencies: GET /course/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 24. CourseCreate — /courses/:id/edit

- Source: `src/features/courses/components/Create.tsx`
- Purpose: Edit courses.
- Existing UI: CreateCourseRequest, Link, Button, Card, Select, Input.
- Labels / sections: تأسيس دورة تدريبية; معلومات الحالة (Lifecycle); الكورس المخطط له مسبقاً *; محتوى الدورة (اختر نوعاً واحداً); الموضوع التدريبي *; مادة المسار *; مادة الترم *; البيانات الأساسية; اسم الدورة *; المدة (بالأيام) *; عدد المشاركين الداخليين; عدد المشاركين الخارجيين; التكلفة; الجهة الممولة; المواعيد والمكان; تاريخ البداية *; تاريخ النهاية; قاعة التدريب *; طاقم التدريب; المدرب الأساسي *; المدرب الاحتياطي; منسق الدورة.
- API dependencies: GET /get-planned-courses; GET /learning-subjects; GET /organizations; GET /path-grade-subject-terms; GET /path-grade-subjects; GET /persons; GET /rooms. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 25. CourseCreate — /courses/new

- Source: `src/features/courses/components/Create.tsx`
- Purpose: Create courses.
- Existing UI: CreateCourseRequest, Link, Button, Card, Select, Input.
- Labels / sections: تأسيس دورة تدريبية; معلومات الحالة (Lifecycle); الكورس المخطط له مسبقاً *; محتوى الدورة (اختر نوعاً واحداً); الموضوع التدريبي *; مادة المسار *; مادة الترم *; البيانات الأساسية; اسم الدورة *; المدة (بالأيام) *; عدد المشاركين الداخليين; عدد المشاركين الخارجيين; التكلفة; الجهة الممولة; المواعيد والمكان; تاريخ البداية *; تاريخ النهاية; قاعة التدريب *; طاقم التدريب; المدرب الأساسي *; المدرب الاحتياطي; منسق الدورة.
- API dependencies: GET /get-planned-courses; GET /learning-subjects; GET /organizations; GET /path-grade-subject-terms; GET /path-grade-subjects; GET /persons; GET /rooms. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 26. DepartmentList — /departments

- Source: `src/features/departments/components/List.tsx`
- Purpose: Browse and manage departments.
- Existing UI: NonNullable, Badge, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Building.
- Labels / sections: الإدارات; الإدارات والأقسام التابعة للجهات..
- API dependencies: GET /departments.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 27. DepartmentDetail — /departments/:id

- Source: `src/features/departments/components/Detail.tsx`
- Purpose: Inspect record and related data departments.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات التنظيمية; المعرّف (ID); الكود; اسم الإدارة; معرف الجهة التابعة لها.
- API dependencies: GET /department/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 28. DepartmentCreate — /departments/:id/edit

- Source: `src/features/departments/components/Create.tsx`
- Purpose: Edit departments.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات الإدارة; الكود (Code) *; الاسم / الوصف *; الجهة *.
- API dependencies: GET /organizations. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 29. DepartmentCreate — /departments/new

- Source: `src/features/departments/components/Create.tsx`
- Purpose: Create departments.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات الإدارة; الكود (Code) *; الاسم / الوصف *; الجهة *.
- API dependencies: GET /organizations. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 30. DocumentationTypeList — /documentation-types

- Source: `src/features/documentation-types/components/List.tsx`
- Purpose: Browse and manage documentation-types.
- Existing UI: NonNullable, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Database.
- Labels / sections: أنواع الوثائق; التصنيفات المرجعية لأنواع الوثائق والمستندات..
- API dependencies: GET /documentation-types.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 31. DocumentationTypeDetail — /documentation-types/:id

- Source: `src/features/documentation-types/components/Detail.tsx`
- Purpose: Inspect record and related data documentation-types.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات الأساسية; المعرّف (ID); الاسم.
- API dependencies: GET /documentation-type/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 32. DocumentationTypeCreate — /documentation-types/:id/edit

- Source: `src/features/documentation-types/components/Create.tsx`
- Purpose: Edit documentation-types.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات نوع الوثيقة; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 33. DocumentationTypeCreate — /documentation-types/new

- Source: `src/features/documentation-types/components/Create.tsx`
- Purpose: Create documentation-types.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات نوع الوثيقة; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 34. DocumentationList — /documentations

- Source: `src/features/documentations/components/List.tsx`
- Purpose: Browse and manage documentations.
- Existing UI: LoadingSkeleton, ErrorState, Link, Search, FolderOpen, ReferenceActions, FileText, ArrowLeft, File.
- Labels / sections: الوثائق والمستندات.
- API dependencies: GET /documentations.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 35. DocumentationDetail — /documentations/:id

- Source: `src/features/documentations/components/Detail.tsx`
- Purpose: Inspect record and related data documentations.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: سجل تفاصيل ومتابعة وثيقة; بيانات السجل; المعرّف (ID); اسم الوثيقة; مسار الملف; معرف نوع الوثيقة; معرف الدورة التدريبية; معرف الجلسة التدريبية; معرف المادة التدريبية.
- API dependencies: GET /documentation/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 36. DocumentationCreate — /documentations/:id/edit

- Source: `src/features/documentations/components/Create.tsx`
- Purpose: Edit documentations.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات الوثيقة; الاسم / الوصف *; مسار الملف *; نوع الوثيقة (اختياري); ارتباط بموضوع تدريبي; ارتباط بمادة درجة المسار; ارتباط بمادة فصل تدريبي; ارتباط بدورة تدريبية; ارتباط بجلسة تدريبية.
- API dependencies: GET /course-sessions; GET /courses; GET /documentation-types; GET /learning-subjects; GET /path-grade-subject-terms; GET /path-grade-subjects. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 37. DocumentationCreate — /documentations/new

- Source: `src/features/documentations/components/Create.tsx`
- Purpose: Create documentations.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات الوثيقة; الاسم / الوصف *; مسار الملف *; نوع الوثيقة (اختياري); ارتباط بموضوع تدريبي; ارتباط بمادة درجة المسار; ارتباط بمادة فصل تدريبي; ارتباط بدورة تدريبية; ارتباط بجلسة تدريبية.
- API dependencies: GET /course-sessions; GET /courses; GET /documentation-types; GET /learning-subjects; GET /path-grade-subject-terms; GET /path-grade-subjects. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 38. EvaluationTypeList — /evaluation-types

- Source: `src/features/evaluation-types/components/List.tsx`
- Purpose: Browse and manage evaluation-types.
- Existing UI: NonNullable, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Database.
- Labels / sections: أنواع التقييم; التصنيفات المرجعية لأنواع التقييم..
- API dependencies: GET /evaluation-types.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 39. EvaluationTypeDetail — /evaluation-types/:id

- Source: `src/features/evaluation-types/components/Detail.tsx`
- Purpose: Inspect record and related data evaluation-types.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات الأساسية; المعرّف (ID); الاسم.
- API dependencies: GET /evaluation-type/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 40. EvaluationTypeCreate — /evaluation-types/:id/edit

- Source: `src/features/evaluation-types/components/Create.tsx`
- Purpose: Edit evaluation-types.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات نوع التقييم; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 41. EvaluationTypeCreate — /evaluation-types/new

- Source: `src/features/evaluation-types/components/Create.tsx`
- Purpose: Create evaluation-types.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات نوع التقييم; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 42. GovernorateList — /governorates

- Source: `src/features/governorates/components/List.tsx`
- Purpose: Browse and manage governorates.
- Existing UI: NonNullable, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Database.
- Labels / sections: المحافظات; المحافظات المسجلة في النظام..
- API dependencies: GET /governorates.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 43. GovernorateDetail — /governorates/:id

- Source: `src/features/governorates/components/Detail.tsx`
- Purpose: Inspect record and related data governorates.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات الأساسية; المعرّف (ID); الاسم; رقم الدولة.
- API dependencies: GET /governorate/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 44. GovernorateCreate — /governorates/:id/edit

- Source: `src/features/governorates/components/Create.tsx`
- Purpose: Edit governorates.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات المحافظة; الاسم / الوصف *; الدولة *.
- API dependencies: GET /countries. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 45. GovernorateCreate — /governorates/new

- Source: `src/features/governorates/components/Create.tsx`
- Purpose: Create governorates.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات المحافظة; الاسم / الوصف *; الدولة *.
- API dependencies: GET /countries. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 46. GradeList — /grades

- Source: `src/features/grades/components/List.tsx`
- Purpose: Browse and manage grades.
- Existing UI: NonNullable, ErrorState, PageHeader, RecordKpis, Card, Search, Table, Database.
- Labels / sections: الدرجات الوظيفية; الدرجات الوظيفية والمدد البينية..
- API dependencies: GET /grades.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 47. GradeDetail — /grades/:id

- Source: `src/features/grades/components/Detail.tsx`
- Purpose: Inspect record and related data grades.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات الأساسية; المعرّف (ID); الكود; الاسم; المدة البينية.
- API dependencies: GET /grade/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 48. GradeCreate — /grades/:id/edit

- Source: `src/features/grades/components/Create.tsx`
- Purpose: Edit grades.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات الدرجة الوظيفية; الكود (Code) *; الاسم / الوصف *; المدة البينية *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 49. GradeCreate — /grades/new

- Source: `src/features/grades/components/Create.tsx`
- Purpose: Create grades.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات الدرجة الوظيفية; الكود (Code) *; الاسم / الوصف *; المدة البينية *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 50. JobTypeGroupList — /job-type-groups

- Source: `src/features/job-type-groups/components/List.tsx`
- Purpose: Browse and manage job-type-groups.
- Existing UI: NonNullable, Badge, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Building.
- Labels / sections: المجموعات الوظيفية النوعية; تصنيف المجموعات التخصصية والوظيفية للمهن..
- API dependencies: GET /job-type-groups.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 51. JobTypeGroupDetail — /job-type-groups/:id

- Source: `src/features/job-type-groups/components/Detail.tsx`
- Purpose: Inspect record and related data job-type-groups.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات التنظيمية; المعرّف (ID); الكود; اسم المجموعة الوظيفية; معرف مجموعة العمل.
- API dependencies: GET /job-type-group/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 52. JobList — /jobs

- Source: `src/features/jobs/components/List.tsx`
- Purpose: Browse and manage jobs.
- Existing UI: NonNullable, ErrorState, PageHeader, RecordKpis, Card, Search, Table, Database.
- Labels / sections: الوظائف; قائمة المسميات الوظيفية المعتمدة..
- API dependencies: GET /jobs.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 53. JobDetail — /jobs/:id

- Source: `src/features/jobs/components/Detail.tsx`
- Purpose: Inspect record and related data jobs.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات الأساسية; المعرّف (ID); الكود; الاسم.
- API dependencies: GET /job/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 54. JobCreate — /jobs/:id/edit

- Source: `src/features/jobs/components/Create.tsx`
- Purpose: Edit jobs.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات الوظيفة; الكود (Code) *; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 55. JobCreate — /jobs/new

- Source: `src/features/jobs/components/Create.tsx`
- Purpose: Create jobs.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات الوظيفة; الكود (Code) *; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 56. LearningPathList — /learning-paths

- Source: `src/features/learning-paths/components/List.tsx`
- Purpose: Browse and manage learning-paths.
- Existing UI: LoadingSkeleton, ErrorState, Link, GraduationCap, ChevronLeft, Layers3, BookOpenCheck, Search, ReferenceActions, ArrowLeft.
- Labels / sections: المسارات التدريبية; تسلسل المحتوى التدريبي; البحث في المسارات.
- API dependencies: GET /learning-paths.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 57. LearningPathDetail — /learning-paths/:id

- Source: `src/features/learning-paths/components/Detail.tsx`
- Purpose: Inspect record and related data learning-paths.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Badge, Link, Button, ArrowLeft, ArrowRight, Card, InfoField.
- Labels / sections: بيانات المسار والمناهج; المعرّف (ID); كود المسار; اسم المسار التدريبي; معرف نوع المؤهل.
- API dependencies: GET /learning-path/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 58. LearningPathCreate — /learning-paths/:id/edit

- Source: `src/features/learning-paths/components/Create.tsx`
- Purpose: Edit learning-paths.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات المسار التدريبي; الكود (Code) *; الاسم / الوصف *; نوع المؤهل *.
- API dependencies: GET /qualification-types. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 59. LearningPathCreate — /learning-paths/new

- Source: `src/features/learning-paths/components/Create.tsx`
- Purpose: Create learning-paths.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات المسار التدريبي; الكود (Code) *; الاسم / الوصف *; نوع المؤهل *.
- API dependencies: GET /qualification-types. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 60. LearningSubjectList — /learning-subjects

- Source: `src/features/learning-subjects/components/List.tsx`
- Purpose: Browse and manage learning-subjects.
- Existing UI: NonNullable, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Database.
- Labels / sections: المواضيع التدريبية; المواضيع والمواد المتاحة للتدريب.; البحث في المواضيع التدريبية.
- API dependencies: GET /learning-subjects.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 61. LearningSubjectDetail — /learning-subjects/:id

- Source: `src/features/learning-subjects/components/Detail.tsx`
- Purpose: Inspect record and related data learning-subjects.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات الأساسية; المعرّف (ID); الاسم.
- API dependencies: GET /learning-subject/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 62. LearningSubjectCreate — /learning-subjects/:id/edit

- Source: `src/features/learning-subjects/components/Create.tsx`
- Purpose: Edit learning-subjects.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات الموضوع التدريبي; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 63. LearningSubjectCreate — /learning-subjects/new

- Source: `src/features/learning-subjects/components/Create.tsx`
- Purpose: Create learning-subjects.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات الموضوع التدريبي; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 64. LearningTermList — /learning-terms

- Source: `src/features/learning-terms/components/List.tsx`
- Purpose: Browse and manage learning-terms.
- Existing UI: NonNullable, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Database.
- Labels / sections: الفصول التدريبية; الفصول والتراكيب الزمنية للبرامج التدريبية..
- API dependencies: GET /learning-terms.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 65. LearningTermDetail — /learning-terms/:id

- Source: `src/features/learning-terms/components/Detail.tsx`
- Purpose: Inspect record and related data learning-terms.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات الأساسية; المعرّف (ID); الاسم.
- API dependencies: GET /learning-term/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 66. LearningTermCreate — /learning-terms/:id/edit

- Source: `src/features/learning-terms/components/Create.tsx`
- Purpose: Edit learning-terms.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات الفصل التدريبي; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 67. LearningTermCreate — /learning-terms/new

- Source: `src/features/learning-terms/components/Create.tsx`
- Purpose: Create learning-terms.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات الفصل التدريبي; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 68. OrganizationTypeList — /organization-types

- Source: `src/features/organization-types/components/List.tsx`
- Purpose: Browse and manage organization-types.
- Existing UI: NonNullable, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Building.
- Labels / sections: أنواع الجهات; التصنيفات المعتمدة للجهات والمؤسسات..
- API dependencies: GET /organization-types.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 69. OrganizationTypeDetail — /organization-types/:id

- Source: `src/features/organization-types/components/Detail.tsx`
- Purpose: Inspect record and related data organization-types.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات التنظيمية; المعرّف (ID); الاسم.
- API dependencies: GET /organization-type/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 70. OrganizationTypeCreate — /organization-types/:id/edit

- Source: `src/features/organization-types/components/Create.tsx`
- Purpose: Edit organization-types.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات نوع الجهة; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 71. OrganizationTypeCreate — /organization-types/new

- Source: `src/features/organization-types/components/Create.tsx`
- Purpose: Create organization-types.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات نوع الجهة; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 72. OrganizationList — /organizations

- Source: `src/features/organizations/components/List.tsx`
- Purpose: Browse and manage organizations.
- Existing UI: NonNullable, Badge, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Building.
- Labels / sections: الجهات والمؤسسات; الهيكل الرئيسي للجهات والشركات التابعة والشريكة..
- API dependencies: GET /organizations.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 73. OrganizationDetail — /organizations/:id

- Source: `src/features/organizations/components/Detail.tsx`
- Purpose: Inspect record and related data organizations.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField, Table.
- Labels / sections: البيانات التنظيمية; المعرّف (ID); الكود; الاسم; العنوان; معرف نوع الجهة; معرف المحافظة; الإدارات التابعة; مراكز العمل التابعة.
- API dependencies: GET /organization/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 74. OrganizationCreate — /organizations/:id/edit

- Source: `src/features/organizations/components/Create.tsx`
- Purpose: Edit organizations.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات الجهة; الاسم / الوصف *; الكود (Code) *; العنوان *; نوع الجهة *; المحافظة *.
- API dependencies: GET /governorates; GET /organization-types. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 75. OrganizationCreate — /organizations/new

- Source: `src/features/organizations/components/Create.tsx`
- Purpose: Create organizations.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات الجهة; الاسم / الوصف *; الكود (Code) *; العنوان *; نوع الجهة *; المحافظة *.
- API dependencies: GET /governorates; GET /organization-types. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 76. ParticipantTypeList — /participant-types

- Source: `src/features/participant-types/components/List.tsx`
- Purpose: Browse and manage participant-types.
- Existing UI: NonNullable, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Database.
- Labels / sections: أنواع المشاركين; التصنيفات المرجعية لأنواع المشاركين في التدريب.; البحث في أنواع المشاركين.
- API dependencies: GET /participant-types.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 77. ParticipantTypeDetail — /participant-types/:id

- Source: `src/features/participant-types/components/Detail.tsx`
- Purpose: Inspect record and related data participant-types.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات الأساسية; المعرّف (ID); الاسم.
- API dependencies: GET /participant-type/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 78. PathGradeCandidateList — /path-grade-candidates

- Source: `src/features/path-grade-candidates/components/List.tsx`
- Purpose: Browse and manage path-grade-candidates.
- Existing UI: Values, Plus, Select, Button, Save, ArrowDownUp, UserRound, Pencil, Trash2, Award.
- Labels / sections: المرشحون للمسارات التدريبية; {editingId ? 'تعديل ترشيح' : 'إضافة مرشح جديد'}; الموظف *; المسار والدرجة *; الفصل التدريبي *; التقييم النهائي *; سجلات الترشيح; تعديل الترشيح; حذف الترشيح.
- API dependencies: GET /evaluation-types; GET /learning-terms; GET /path-grades; GET /persons; POST /new-path-grade-candidate; PUT /path-grade-candidate/${id}; DELETE /path-grade-candidate/${id}; GET /path-grade-candidates.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 79. PathGradeSubjectTermList — /path-grade-subject-terms

- Source: `src/features/path-grade-subject-terms/components/List.tsx`
- Purpose: Browse and manage path-grade-subject-terms.
- Existing UI: NonNullable, Badge, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, GraduationCap.
- Labels / sections: مواد الفصول التدريبية; توزيع المواد التدريبية على الفصول (الترمات) المحددة..
- API dependencies: GET /path-grade-subject-terms.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 80. PathGradeSubjectTermDetail — /path-grade-subject-terms/:id

- Source: `src/features/path-grade-subject-terms/components/Detail.tsx`
- Purpose: Inspect record and related data path-grade-subject-terms.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Badge, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: بيانات المسار والمناهج; المعرّف (ID); الكود; المسار التدريبي; الدرجة الوظيفية; المادة التدريبية; معرف مادة مرحلة المسار; الفصل التدريبي (الترم); ملاحظات.
- API dependencies: GET /path-grade-subject-term/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 81. PathGradeSubjectTermCreate — /path-grade-subject-terms/:id/edit

- Source: `src/features/path-grade-subject-terms/components/Create.tsx`
- Purpose: Edit path-grade-subject-terms.
- Existing UI: FormInputs, Link, Button, Select, Input.
- Labels / sections: بيانات مادة الفصل التدريبي; مادة درجة المسار *; الترم *; الكود (Code) *; ملاحظات *.
- API dependencies: GET /learning-terms; GET /path-grade-subjects. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 82. PathGradeSubjectTermCreate — /path-grade-subject-terms/new

- Source: `src/features/path-grade-subject-terms/components/Create.tsx`
- Purpose: Create path-grade-subject-terms.
- Existing UI: FormInputs, Link, Button, Select, Input.
- Labels / sections: بيانات مادة الفصل التدريبي; مادة درجة المسار *; الترم *; الكود (Code) *; ملاحظات *.
- API dependencies: GET /learning-terms; GET /path-grade-subjects. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 83. PathGradeSubjectList — /path-grade-subjects

- Source: `src/features/path-grade-subjects/components/List.tsx`
- Purpose: Browse and manage path-grade-subjects.
- Existing UI: NonNullable, Badge, ErrorState, PageHeader, Link, Button, ArrowLeft, Card, Search, ReferenceActions, Table, GraduationCap.
- Labels / sections: مواد مراحل المسارات; المناهج والمواد المخصصة لكل مرحلة بالمسار التدريبي..
- API dependencies: GET /path-grade-subjects.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 84. PathGradeSubjectDetail — /path-grade-subjects/:id

- Source: `src/features/path-grade-subjects/components/Detail.tsx`
- Purpose: Inspect record and related data path-grade-subjects.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Badge, Link, Button, ArrowLeft, ArrowRight, Card, InfoField.
- Labels / sections: بيانات المسار والمناهج; المعرّف (ID); كود المادة; اسم المادة التدريبية; معرف مرحلة المسار; معرف المادة التدريبية العامة.
- API dependencies: GET /path-grade-subject/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 85. PathGradeSubjectCreate — /path-grade-subjects/:id/edit

- Source: `src/features/path-grade-subjects/components/Create.tsx`
- Purpose: Edit path-grade-subjects.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات مادة المسار; الاسم / الوصف *; الكود (Code) *; مرحلة المسار (Path Grade) *; الموضوع التدريبي *.
- API dependencies: GET /learning-subjects; GET /path-grades. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 86. PathGradeSubjectCreate — /path-grade-subjects/new

- Source: `src/features/path-grade-subjects/components/Create.tsx`
- Purpose: Create path-grade-subjects.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات مادة المسار; الاسم / الوصف *; الكود (Code) *; مرحلة المسار (Path Grade) *; الموضوع التدريبي *.
- API dependencies: GET /learning-subjects; GET /path-grades. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 87. PathGradeList — /path-grades

- Source: `src/features/path-grades/components/List.tsx`
- Purpose: Browse and manage path-grades.
- Existing UI: NonNullable, Badge, ErrorState, PageHeader, Link, Button, ArrowLeft, Card, Search, ReferenceActions, Table, GraduationCap.
- Labels / sections: درجات ومراحل المسارات; ربط المسار التدريبي بالدرجات الوظيفية المحددة..
- API dependencies: GET /path-grades.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 88. PathGradeDetail — /path-grades/:id

- Source: `src/features/path-grades/components/Detail.tsx`
- Purpose: Inspect record and related data path-grades.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Badge, Link, Button, ArrowLeft, ArrowRight, Card, InfoField, Table.
- Labels / sections: بيانات المسار والمناهج; المعرّف (ID); معرف المسار التدريبي; معرف الدرجة الوظيفية; المواد التدريبية المقررة لهذه الدرجة.
- API dependencies: GET /path-grade/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 89. PathGradeCreate — /path-grades/:id/edit

- Source: `src/features/path-grades/components/Create.tsx`
- Purpose: Edit path-grades.
- Existing UI: FormInputs, Link, Button, Select.
- Labels / sections: بيانات درجة المسار; المسار التدريبي *; الدرجة *.
- API dependencies: GET /grades; GET /learning-paths. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 90. PathGradeCreate — /path-grades/new

- Source: `src/features/path-grades/components/Create.tsx`
- Purpose: Create path-grades.
- Existing UI: FormInputs, Link, Button, Select.
- Labels / sections: بيانات درجة المسار; المسار التدريبي *; الدرجة *.
- API dependencies: GET /grades; GET /learning-paths. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 91. PerformanceEvaluationCategoryList — /performance-evaluation-categories

- Source: `src/features/performance-evaluation-categories/components/List.tsx`
- Purpose: Browse and manage performance-evaluation-categories.
- Existing UI: NonNullable, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, ClipboardList.
- Labels / sections: فئات تقييم الأداء; المحاور والفئات الرئيسية لتقييم أداء المشاركين والبرامج التدريبية..
- API dependencies: GET /performance-evaluation-categories.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 92. PerformanceEvaluationCategoryDetail — /performance-evaluation-categories/:id

- Source: `src/features/performance-evaluation-categories/components/Detail.tsx`
- Purpose: Inspect record and related data performance-evaluation-categories.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: سجل تفاصيل ومتابعة فئة تقييم أداء; بيانات السجل; المعرّف (ID); اسم فئة التقييم.
- API dependencies: GET /performance-evaluation-category/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 93. PerformanceEvaluationCategoryCreate — /performance-evaluation-categories/:id/edit

- Source: `src/features/performance-evaluation-categories/components/Create.tsx`
- Purpose: Edit performance-evaluation-categories.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات فئة التقييم; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 94. PerformanceEvaluationCategoryCreate — /performance-evaluation-categories/new

- Source: `src/features/performance-evaluation-categories/components/Create.tsx`
- Purpose: Create performance-evaluation-categories.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات فئة التقييم; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 95. EvaluationReport — /performance-evaluation-course-details

- Source: `src/features/performance-evaluations/components/Report.tsx`
- Purpose: Browse and manage performance-evaluation-course-details.
- Existing UI: PerformanceEvaluationRecord, ErrorState, PageHeader, Card, Table.
- Labels / sections: Inspect rendered page.
- API dependencies: GET /available-performance-evaluation-items; GET /performance-evaluation-course-details; GET /performance-evaluation-course-detail/${id}; GET /performance-evaluation-course-participant-details; GET /performance-evaluation-course-participant-detail/${id}; POST /new-performance-evaluation; PUT /performance-evaluation/${id}; DELETE /performance-evaluation/${id}.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 96. EvaluationReport — /performance-evaluation-course-details/:id

- Source: `src/features/performance-evaluations/components/Report.tsx`
- Purpose: Inspect record and related data performance-evaluation-course-details.
- Existing UI: PerformanceEvaluationRecord, ErrorState, PageHeader, Card, Table.
- Labels / sections: Inspect rendered page.
- API dependencies: GET /available-performance-evaluation-items; GET /performance-evaluation-course-details; GET /performance-evaluation-course-detail/${id}; GET /performance-evaluation-course-participant-details; GET /performance-evaluation-course-participant-detail/${id}; POST /new-performance-evaluation; PUT /performance-evaluation/${id}; DELETE /performance-evaluation/${id}.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 97. EvaluationReport — /performance-evaluation-course-participant-details

- Source: `src/features/performance-evaluations/components/Report.tsx`
- Purpose: Browse and manage performance-evaluation-course-participant-details.
- Existing UI: PerformanceEvaluationRecord, ErrorState, PageHeader, Card, Table.
- Labels / sections: Inspect rendered page.
- API dependencies: GET /available-performance-evaluation-items; GET /performance-evaluation-course-details; GET /performance-evaluation-course-detail/${id}; GET /performance-evaluation-course-participant-details; GET /performance-evaluation-course-participant-detail/${id}; POST /new-performance-evaluation; PUT /performance-evaluation/${id}; DELETE /performance-evaluation/${id}.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 98. EvaluationReport — /performance-evaluation-course-participant-details/:id

- Source: `src/features/performance-evaluations/components/Report.tsx`
- Purpose: Inspect record and related data performance-evaluation-course-participant-details.
- Existing UI: PerformanceEvaluationRecord, ErrorState, PageHeader, Card, Table.
- Labels / sections: Inspect rendered page.
- API dependencies: GET /available-performance-evaluation-items; GET /performance-evaluation-course-details; GET /performance-evaluation-course-detail/${id}; GET /performance-evaluation-course-participant-details; GET /performance-evaluation-course-participant-detail/${id}; POST /new-performance-evaluation; PUT /performance-evaluation/${id}; DELETE /performance-evaluation/${id}.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 99. PerformanceEvaluationItemList — /performance-evaluation-items

- Source: `src/features/performance-evaluation-items/components/List.tsx`
- Purpose: Browse and manage performance-evaluation-items.
- Existing UI: NonNullable, Badge, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, ClipboardList.
- Labels / sections: عناصر ومعايير تقييم الأداء; بنود التقييم المحددة مع الحدود الدنيا والقصوى للدرجات..
- API dependencies: GET /performance-evaluation-items.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 100. PerformanceEvaluationItemDetail — /performance-evaluation-items/:id

- Source: `src/features/performance-evaluation-items/components/Detail.tsx`
- Purpose: Inspect record and related data performance-evaluation-items.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: سجل تفاصيل ومتابعة عنصر تقييم; بيانات السجل; المعرّف (ID); اسم معيار التقييم; الحد الأدنى للدرجة; الحد الأقصى للدرجة.
- API dependencies: GET /performance-evaluation-item/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 101. PerformanceEvaluationItemCreate — /performance-evaluation-items/:id/edit

- Source: `src/features/performance-evaluation-items/components/Create.tsx`
- Purpose: Edit performance-evaluation-items.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات معيار التقييم; الاسم / الوصف *; الحد الأدنى *; الحد الأقصى *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 102. PerformanceEvaluationItemCreate — /performance-evaluation-items/new

- Source: `src/features/performance-evaluation-items/components/Create.tsx`
- Purpose: Create performance-evaluation-items.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات معيار التقييم; الاسم / الوصف *; الحد الأدنى *; الحد الأقصى *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 103. PerformanceEvaluationParticipantCategoryList — /performance-evaluation-participant-categories

- Source: `src/features/performance-evaluation-participant-categories/components/List.tsx`
- Purpose: Browse and manage performance-evaluation-participant-categories.
- Existing UI: NonNullable, Badge, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, ClipboardList.
- Labels / sections: ربط فئات المشاركين بتقييم الأداء; تخصيص نماذج وفئات التقييم لأنواع معينة من المشاركين..
- API dependencies: GET /performance-evaluation-participant-categories.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 104. PerformanceEvaluationParticipantCategoryDetail — /performance-evaluation-participant-categories/:id

- Source: `src/features/performance-evaluation-participant-categories/components/Detail.tsx`
- Purpose: Inspect record and related data performance-evaluation-participant-categories.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField, Table.
- Labels / sections: سجل تفاصيل ومتابعة فئة مشارك التقييم; بيانات السجل; المعرّف (ID); معرف نوع المشارك; معرف فئة تقييم الأداء; عناصر التقييم المرتبطة بهذه الفئة.
- API dependencies: GET /performance-evaluation-participant-category/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 105. PerformanceEvaluationParticipantCategoryCreate — /performance-evaluation-participant-categories/:id/edit

- Source: `src/features/performance-evaluation-participant-categories/components/Create.tsx`
- Purpose: Edit performance-evaluation-participant-categories.
- Existing UI: FormInputs, Link, Button, Select.
- Labels / sections: بيانات فئة تقييم المشاركين; نوع المشارك *; فئة تقييم الأداء *.
- API dependencies: GET /participant-types; GET /performance-evaluation-categories. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 106. PerformanceEvaluationParticipantCategoryCreate — /performance-evaluation-participant-categories/new

- Source: `src/features/performance-evaluation-participant-categories/components/Create.tsx`
- Purpose: Create performance-evaluation-participant-categories.
- Existing UI: FormInputs, Link, Button, Select.
- Labels / sections: بيانات فئة تقييم المشاركين; نوع المشارك *; فئة تقييم الأداء *.
- API dependencies: GET /participant-types; GET /performance-evaluation-categories. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 107. PerformanceEvaluationParticipantCategoryItemList — /performance-evaluation-participant-category-items

- Source: `src/features/performance-evaluation-participant-category-items/components/List.tsx`
- Purpose: Browse and manage performance-evaluation-participant-category-items.
- Existing UI: NonNullable, ErrorState, PageHeader, Card, Select, Search, ReferenceActions, Table, ClipboardList.
- Labels / sections: بنود فئات تقييم المشاركين; عناصر التقييم التفصيلية التابعة لكل فئة مشاركين.; نوع المشارك; فئة التقييم.
- API dependencies: GET /participant-types; GET /performance-evaluation-categories; GET /performance-evaluation-participant-category-items.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 108. PerformanceEvaluationParticipantCategoryItemDetail — /performance-evaluation-participant-category-items/:id

- Source: `src/features/performance-evaluation-participant-category-items/components/Detail.tsx`
- Purpose: Inspect record and related data performance-evaluation-participant-category-items.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: سجل تفاصيل ومتابعة بند فئة التقييم; بيانات السجل; المعرّف (ID); معرف فئة مشارك التقييم; معرف عنصر تقييم الأداء.
- API dependencies: GET /performance-evaluation-participant-category-item/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 109. PerformanceEvaluationParticipantCategoryItemCreate — /performance-evaluation-participant-category-items/:id/edit

- Source: `src/features/performance-evaluation-participant-category-items/components/Create.tsx`
- Purpose: Edit performance-evaluation-participant-category-items.
- Existing UI: FormInputs, Link, Button, Select.
- Labels / sections: بيانات بند تقييم المشاركين; فئة مشارك التقييم *; عنصر تقييم الأداء *.
- API dependencies: GET /performance-evaluation-items; GET /performance-evaluation-participant-categories. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 110. PerformanceEvaluationParticipantCategoryItemCreate — /performance-evaluation-participant-category-items/new

- Source: `src/features/performance-evaluation-participant-category-items/components/Create.tsx`
- Purpose: Create performance-evaluation-participant-category-items.
- Existing UI: FormInputs, Link, Button, Select.
- Labels / sections: بيانات بند تقييم المشاركين; فئة مشارك التقييم *; عنصر تقييم الأداء *.
- API dependencies: GET /performance-evaluation-items; GET /performance-evaluation-participant-categories. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 111. PerformanceEvaluationWorkspace — /performance-evaluations

- Source: `src/features/performance-evaluations/components/List.tsx`
- Purpose: Browse and manage performance-evaluations.
- Existing UI: EditingRecord, FormValues, ClipboardCheck, Award, Select, Input, Button, Save, Pencil, Trash2, CheckCircle2.
- Labels / sections: تقييم الأداء التدريبي; {editing ? 'تعديل تقييم' : 'إضافة تقييم جديد'}; الدورة التدريبية المنفذة *; فئة التقييم *; المتدرب محل التقييم *; بند التقييم المتاح *; الدرجة *; ملاحظات; التقييمات المسجلة; تعديل التقييم; حذف التقييم.
- API dependencies: GET /course-participants; GET /get-executed-courses; GET /get-planned-courses; GET /performance-evaluation-categories; GET /performance-evaluation-participant-categories; GET /participant-types; GET /available-performance-evaluation-items; GET /performance-evaluation-course-details; GET /performance-evaluation-course-detail/${id}; GET /performance-evaluation-course-participant-details; GET /performance-evaluation-course-participant-detail/${id}; POST /new-performance-evaluation; PUT /performance-evaluation/${id}; DELETE /performance-evaluation/${id}.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 112. PersonList — /persons

- Source: `src/features/persons/components/List.tsx`
- Purpose: Browse and manage persons.
- Existing UI: LoadingSkeleton, Button, Link, Icon, Search, ChevronDown, Plus, Badge, Eye, Users.
- Labels / sections: إدارة الموظفين; {label}; بحث وفلاتر الموظفين; البحث عن موظف.
- API dependencies: GET /departments; GET /persons.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 113. PersonDetail — /persons/:id

- Source: `src/features/persons/components/Detail.tsx`
- Purpose: Inspect record and related data persons.
- Existing UI: LoadingSkeleton, ErrorState, Link, Badge, PageHeader, Card, InfoField.
- Labels / sections: البيانات الشخصية; الكود; الاسم; الهاتف; العنوان; المحافظة; بيانات العمل; جهة العمل; الإدارة; الوظيفة; المجموعة الوظيفية; موقع العمل; تاريخ التعاقد; المسار التدريبي; المسار التدريبي الحالي; الدرجة الحالية; تاريخ الدرجة الحالية; المؤهل; بيانات المدرب; الجهة المانحة لشهادة المدرب; حساب النظام; اسم المستخدم; مجموعة الصلاحيات.
- API dependencies: GET /person/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 114. PersonCreate — /persons/:id/edit

- Source: `src/features/persons/components/Create.tsx`
- Purpose: Edit persons.
- Existing UI: LoadingSkeleton, ErrorState, Link, Button, Card, Input, Select.
- Labels / sections: {id ? 'تعديل بيانات الموظف' : 'إضافة موظف / متدرب جديد'}; البيانات الأساسية ومعلومات الدخول; كود الموظف; الاسم الرباعي *; رقم الهاتف / واتساب; العنوان السكني; المحافظة *; المؤهل العلمي *; بيانات العمل والإدارة; جهة العمل (Organization) *; الإدارة (Department); الوظيفة (Job); المجموعة الوظيفية; موقع العمل (اختياري); تاريخ التعاقد; المسار التدريبي والدرجة; المسار التدريبي الحالي; الدرجة الحالية; تاريخ الدرجة الحالية; الصلاحيات والخيارات; جهة الاعتماد للمدرب.
- API dependencies: PUT /person/${id}; GET /person/; POST /new-person; GET /departments; GET /governorates; GET /grades; GET /job-type-groups; GET /jobs; GET /learning-paths; GET /organizations; GET /qualifications; GET /work-sites.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 115. PersonCreate — /persons/new

- Source: `src/features/persons/components/Create.tsx`
- Purpose: Create persons.
- Existing UI: LoadingSkeleton, ErrorState, Link, Button, Card, Input, Select.
- Labels / sections: {id ? 'تعديل بيانات الموظف' : 'إضافة موظف / متدرب جديد'}; البيانات الأساسية ومعلومات الدخول; كود الموظف; الاسم الرباعي *; رقم الهاتف / واتساب; العنوان السكني; المحافظة *; المؤهل العلمي *; بيانات العمل والإدارة; جهة العمل (Organization) *; الإدارة (Department); الوظيفة (Job); المجموعة الوظيفية; موقع العمل (اختياري); تاريخ التعاقد; المسار التدريبي والدرجة; المسار التدريبي الحالي; الدرجة الحالية; تاريخ الدرجة الحالية; الصلاحيات والخيارات; جهة الاعتماد للمدرب.
- API dependencies: PUT /person/${id}; GET /person/; POST /new-person; GET /departments; GET /governorates; GET /grades; GET /job-type-groups; GET /jobs; GET /learning-paths; GET /organizations; GET /qualifications; GET /work-sites.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 116. QualificationTypeList — /qualification-types

- Source: `src/features/qualification-types/components/List.tsx`
- Purpose: Browse and manage qualification-types.
- Existing UI: NonNullable, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Database.
- Labels / sections: أنواع المؤهلات; التصنيفات المرجعية لأنواع المؤهلات العلمية..
- API dependencies: GET /qualification-types.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 117. QualificationTypeDetail — /qualification-types/:id

- Source: `src/features/qualification-types/components/Detail.tsx`
- Purpose: Inspect record and related data qualification-types.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات الأساسية; المعرّف (ID); الاسم.
- API dependencies: GET /qualification-type/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 118. QualificationTypeCreate — /qualification-types/:id/edit

- Source: `src/features/qualification-types/components/Create.tsx`
- Purpose: Edit qualification-types.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات نوع المؤهل; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 119. QualificationTypeCreate — /qualification-types/new

- Source: `src/features/qualification-types/components/Create.tsx`
- Purpose: Create qualification-types.
- Existing UI: FormInputs, Link, Button, Input.
- Labels / sections: بيانات نوع المؤهل; الاسم / الوصف *.
- API dependencies: See dependency graph; wrapper or redirect may own the request. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 120. QualificationList — /qualifications

- Source: `src/features/qualifications/components/List.tsx`
- Purpose: Browse and manage qualifications.
- Existing UI: NonNullable, Badge, ErrorState, PageHeader, RecordKpis, Card, Search, Table, Building.
- Labels / sections: المؤهلات العلمية; المؤهلات الدراسية والشهادات المعتمدة..
- API dependencies: GET /qualifications.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 121. QualificationDetail — /qualifications/:id

- Source: `src/features/qualifications/components/Detail.tsx`
- Purpose: Inspect record and related data qualifications.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات التنظيمية; المعرّف (ID); الكود; اسم المؤهل; معرف نوع المؤهل.
- API dependencies: GET /qualification/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 122. QualificationCreate — /qualifications/:id/edit

- Source: `src/features/qualifications/components/Create.tsx`
- Purpose: Edit qualifications.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات المؤهل; الكود (Code) *; الاسم / الوصف *; نوع المؤهل *.
- API dependencies: GET /qualification-types. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 123. QualificationCreate — /qualifications/new

- Source: `src/features/qualifications/components/Create.tsx`
- Purpose: Create qualifications.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات المؤهل; الكود (Code) *; الاسم / الوصف *; نوع المؤهل *.
- API dependencies: GET /qualification-types. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 124. TrainingRoomList — /rooms

- Source: `src/features/rooms/components/List.tsx`
- Purpose: Browse and manage rooms.
- Existing UI: NonNullable, Badge, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Building.
- Labels / sections: قاعات التدريب; القاعات ومراكز التدريب والمختبرات المتاحة..
- API dependencies: GET /rooms.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 125. TrainingRoomDetail — /rooms/:id

- Source: `src/features/rooms/components/Detail.tsx`
- Purpose: Inspect record and related data rooms.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات التنظيمية; المعرّف (ID); اسم قاعة التدريب; معرف موقع العمل.
- API dependencies: GET /room/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 126. TrainingRoomCreate — /rooms/:id/edit

- Source: `src/features/rooms/components/Create.tsx`
- Purpose: Edit rooms.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات قاعة التدريب; الاسم / الوصف *; موقع العمل *.
- API dependencies: GET /work-sites. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 127. TrainingRoomCreate — /rooms/new

- Source: `src/features/rooms/components/Create.tsx`
- Purpose: Create rooms.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات قاعة التدريب; الاسم / الوصف *; موقع العمل *.
- API dependencies: GET /work-sites. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 128. TrainerSubjectList — /trainer-subjects

- Source: `src/features/trainer-subjects/components/List.tsx`
- Purpose: Browse and manage trainer-subjects.
- Existing UI: NonNullable, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Building.
- Labels / sections: المواد التدريبية للمدربين; تخصصات ومواد المدربين المعتمدين..
- API dependencies: GET /trainer-subjects.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 129. TrainerSubjectDetail — /trainer-subjects/:id

- Source: `src/features/trainer-subjects/components/Detail.tsx`
- Purpose: Inspect record and related data trainer-subjects.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات التنظيمية; المعرّف (ID); المدرب; الموضوع التدريبي.
- API dependencies: GET /trainer-subject/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 130. TrainerSubjectCreate — /trainer-subjects/:id/edit

- Source: `src/features/trainer-subjects/components/Create.tsx`
- Purpose: Edit trainer-subjects.
- Existing UI: Values, Select, Button.
- Labels / sections: تخصص المدرب; المدرب *; الموضوع التدريبي *.
- API dependencies: GET /persons; GET /learning-subjects. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Render-time transforms: measure before memoizing; No local layout-matched skeleton found.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 131. TrainerSubjectCreate — /trainer-subjects/new

- Source: `src/features/trainer-subjects/components/Create.tsx`
- Purpose: Create trainer-subjects.
- Existing UI: Values, Select, Button.
- Labels / sections: تخصص المدرب; المدرب *; الموضوع التدريبي *.
- API dependencies: GET /persons; GET /learning-subjects. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Render-time transforms: measure before memoizing; No local layout-matched skeleton found.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 132. UserManagement — /user-management

- Source: `src/features/user-management/components/List.tsx`
- Purpose: Browse and manage user-management.
- Existing UI: RegisterValues, PasswordValues, CalendarDays, Button, LogOut, UserPlus, Select, Input, LockKeyhole, KeyRound, UsersRound, Search, ShieldCheck, RotateCcw.
- Labels / sections: إدارة حسابات المستخدمين; تسجيل مستخدم جديد; الموظف *; اسم المستخدم *; كلمة المرور المؤقتة *; مجموعة الصلاحيات *; تغيير كلمة مروري; كلمة المرور الحالية *; كلمة المرور الجديدة *; المستخدمون المسجلون.
- API dependencies: GET /persons; GET /users; GET /allowed-groups; POST /register-user; POST /change-password; POST /person/${personId}/reset-password; POST /logout.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 133. WorkCenterList — /work-centers

- Source: `src/features/work-centers/components/List.tsx`
- Purpose: Browse and manage work-centers.
- Existing UI: NonNullable, Badge, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Building.
- Labels / sections: مراكز العمل; المراكز الرئيسية لتوزيع ومواقع العمل..
- API dependencies: GET /work-centers.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 134. WorkCenterDetail — /work-centers/:id

- Source: `src/features/work-centers/components/Detail.tsx`
- Purpose: Inspect record and related data work-centers.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات التنظيمية; المعرّف (ID); اسم مركز العمل; معرف المحافظة; معرف الجهة.
- API dependencies: GET /work-center/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 135. WorkCenterCreate — /work-centers/:id/edit

- Source: `src/features/work-centers/components/Create.tsx`
- Purpose: Edit work-centers.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات مركز العمل; الاسم / الوصف *; المحافظة *; الجهة *.
- API dependencies: GET /governorates; GET /organizations. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 136. WorkCenterCreate — /work-centers/new

- Source: `src/features/work-centers/components/Create.tsx`
- Purpose: Create work-centers.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات مركز العمل; الاسم / الوصف *; المحافظة *; الجهة *.
- API dependencies: GET /governorates; GET /organizations. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 137. WorkGroupList — /work-groups

- Source: `src/features/work-groups/components/List.tsx`
- Purpose: Browse and manage work-groups.
- Existing UI: NonNullable, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Database.
- Labels / sections: مجموعات العمل; مجموعات العمل التنظيمية..
- API dependencies: GET /work-groups.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 138. WorkGroupDetail — /work-groups/:id

- Source: `src/features/work-groups/components/Detail.tsx`
- Purpose: Inspect record and related data work-groups.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات الأساسية; المعرّف (ID); الكود; الاسم.
- API dependencies: GET /work-group/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 139. WorkSiteList — /work-sites

- Source: `src/features/work-sites/components/List.tsx`
- Purpose: Browse and manage work-sites.
- Existing UI: NonNullable, Badge, ErrorState, PageHeader, Card, Search, ReferenceActions, Table, Building.
- Labels / sections: مواقع العمل; المحطات والمواقع التشغيلية والمكاتب الفرعية..
- API dependencies: GET /work-sites.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Render-time transforms: measure before memoizing; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 140. WorkSiteDetail — /work-sites/:id

- Source: `src/features/work-sites/components/Detail.tsx`
- Purpose: Inspect record and related data work-sites.
- Existing UI: LoadingSkeleton, ErrorState, PageHeader, Link, Button, ArrowRight, Card, InfoField.
- Labels / sections: البيانات التنظيمية; المعرّف (ID); الكود; اسم موقع العمل; معرف مركز العمل.
- API dependencies: GET /work-site/.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 141. WorkSiteCreate — /work-sites/:id/edit

- Source: `src/features/work-sites/components/Create.tsx`
- Purpose: Edit work-sites.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات موقع العمل; الكود (Code) *; الاسم / الوصف *; مركز العمل *.
- API dependencies: GET /work-centers. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## 142. WorkSiteCreate — /work-sites/new

- Source: `src/features/work-sites/components/Create.tsx`
- Purpose: Create work-sites.
- Existing UI: FormInputs, Link, Button, Input, Select.
- Labels / sections: بيانات موقع العمل; الكود (Code) *; الاسم / الوصف *; مركز العمل *.
- API dependencies: GET /work-centers. ReferenceEditor also owns detail loading and edit submission.
- Existing functionality: inspect handlers in source and dependencies listed in inventory.json; preserve all supported actions.
- Static audit leads: Untyped data: inspect malformed/null API values; No local layout-matched skeleton found; Inline layouts: check narrow viewport and RTL.
- Visual/UX/performance problems: not yet measured; inspect loading, error, populated and empty states, focus, keyboard, narrow width and RTL.
- Required redesign: establish page-specific hierarchy and workflow after live audit; preserve API contracts; match skeleton to resulting layout.
- Completion: pending.

## Unlinked feature components

These are not counted as routed pages; inspect reachability before removing or exposing them.

- `src/features/clients/components/Create.tsx`
- `src/features/course-participant-final-exams/components/Create.tsx`
- `src/features/course-participants/components/Create.tsx`
- `src/features/job-type-groups/components/Create.tsx`
- `src/features/organization-types/components/OrganizationTypesList.tsx`
- `src/features/participant-types/components/Create.tsx`
- `src/features/work-groups/components/Create.tsx`

## Modals and drawers

- `src/app/components/Sidebar.tsx`: إغلاق القائمة; التنقل الرئيسي; إغلاق القائمة
- `src/features/course-session-participants/components/Detail.tsx`: سجل تفاصيل ومتابعة حضور جلسة; بيانات السجل; المعرّف (ID); معرف الجلسة التدريبية; معرف تسجيل المتدرب في الدورة
- `src/features/course-sessions/components/Detail.tsx`: سجل تفاصيل ومتابعة جلسة تدريبية; بيانات السجل; المعرّف (ID); تاريخ انعقاد الجلسة; وقت البدء; وقت الانتهاء; معرف الدورة التدريبية
- `src/features/path-grade-candidates/components/List.tsx`: الموظف *; المسار والدرجة *; الفصل التدريبي *; التقييم النهائي *; تعديل الترشيح; حذف الترشيح
- `src/features/performance-evaluations/components/List.tsx`: الدورة التدريبية المنفذة *; فئة التقييم *; المتدرب محل التقييم *; بند التقييم المتاح *; الدرجة *; ملاحظات; تعديل التقييم; حذف التقييم
- `src/shared/components/Dialog.tsx`: إغلاق النافذة
- `src/shared/components/ReferenceActions.tsx`: Inspect trigger and body
