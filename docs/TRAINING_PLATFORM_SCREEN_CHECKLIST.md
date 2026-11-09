# Screen checklist

Date: 9 November 2026. Every feature screen source was included in the structural inventory; live coverage below is deliberately distinguished from source-only review. Shared theme/header/control changes propagate through the existing components.

## Routed screens

| Route pattern | Validation |
|---|---|
| `/` | Live list/dashboard, desktop + 360 px |
| `/:resource/new` | Source/route reviewed; live record or workflow not exercised |
| `/clients` | Live list/dashboard, desktop + 360 px |
| `/clients/:id` | Live populated detail at desktop; no mutation |
| `/countries` | Live list/dashboard, desktop + 360 px |
| `/countries/:id` | Live populated detail at desktop; no mutation |
| `/countries/:id/edit` | Live populated edit form at desktop; no save |
| `/countries/new` | Live create form at 360 px; no save |
| `/course-participant-final-exams` | Live list/dashboard, desktop + 360 px |
| `/course-participant-final-exams/:id` | Source/route reviewed; live record or workflow not exercised |
| `/course-participants` | Live list/dashboard, desktop + 360 px |
| `/course-participants/:id` | Source/route reviewed; live record or workflow not exercised |
| `/course-session-participants` | Live list/dashboard, desktop + 360 px |
| `/course-session-participants/:id` | Source/route reviewed; live record or workflow not exercised |
| `/course-session-participants/:id/edit` | Source/route reviewed; live record or workflow not exercised |
| `/course-session-participants/new` | Live create form at 360 px; no save |
| `/course-sessions` | Live list/dashboard, desktop + 360 px |
| `/course-sessions/:id` | Source/route reviewed; live record or workflow not exercised |
| `/course-sessions/:id/edit` | Source/route reviewed; live record or workflow not exercised |
| `/course-sessions/new` | Live create form at 360 px; no save |
| `/courses` | Live list/dashboard, desktop + 360 px |
| `/courses/:id` | Source/route reviewed; live record or workflow not exercised |
| `/courses/:id/edit` | Source/route reviewed; live record or workflow not exercised |
| `/courses/new` | Live create form at 360 px; no save |
| `/departments` | Live list/dashboard, desktop + 360 px |
| `/departments/:id` | Source/route reviewed; live record or workflow not exercised |
| `/departments/:id/edit` | Source/route reviewed; live record or workflow not exercised |
| `/departments/new` | Live create form at 360 px; no save |
| `/documentation-types` | Live list/dashboard, desktop + 360 px |
| `/documentation-types/:id` | Live populated detail at desktop; no mutation |
| `/documentation-types/:id/edit` | Live populated edit form at desktop; no save |
| `/documentation-types/new` | Live create form at 360 px; no save |
| `/documentations` | Live list/dashboard, desktop + 360 px |
| `/documentations/:id` | Source/route reviewed; live record or workflow not exercised |
| `/documentations/:id/edit` | Source/route reviewed; live record or workflow not exercised |
| `/documentations/new` | Live create form at 360 px; no save |
| `/evaluation-types` | Live list/dashboard, desktop + 360 px |
| `/evaluation-types/:id` | Live populated detail at desktop; no mutation |
| `/evaluation-types/:id/edit` | Live populated edit form at desktop; no save |
| `/evaluation-types/new` | Live create form at 360 px; no save |
| `/governorates` | Live list/dashboard, desktop + 360 px |
| `/governorates/:id` | Live populated detail at desktop; no mutation |
| `/governorates/:id/edit` | Live populated edit form at desktop; no save |
| `/governorates/new` | Live create form at 360 px; no save |
| `/grades` | Live list/dashboard, desktop + 360 px |
| `/grades/:id` | Live populated detail at desktop; no mutation |
| `/grades/:id/edit` | Live populated edit form at desktop; no save |
| `/grades/new` | Live create form at 360 px; no save |
| `/job-type-groups` | Live list/dashboard, desktop + 360 px |
| `/job-type-groups/:id` | Source/route reviewed; live record or workflow not exercised |
| `/jobs` | Live list/dashboard, desktop + 360 px |
| `/jobs/:id` | Live populated detail at desktop; no mutation |
| `/jobs/:id/edit` | Live populated edit form at desktop; no save |
| `/jobs/new` | Live create form at 360 px; no save |
| `/learning-paths` | Live list/dashboard, desktop + 360 px |
| `/learning-paths/:id` | Source/route reviewed; live record or workflow not exercised |
| `/learning-paths/:id/edit` | Source/route reviewed; live record or workflow not exercised |
| `/learning-paths/new` | Live create form at 360 px; no save |
| `/learning-subjects` | Live list/dashboard, desktop + 360 px |
| `/learning-subjects/:id` | Source/route reviewed; live record or workflow not exercised |
| `/learning-subjects/:id/edit` | Source/route reviewed; live record or workflow not exercised |
| `/learning-subjects/new` | Live create form at 360 px; no save |
| `/learning-terms` | Live list/dashboard, desktop + 360 px |
| `/learning-terms/:id` | Live populated detail at desktop; no mutation |
| `/learning-terms/:id/edit` | Live populated edit form at desktop; no save |
| `/learning-terms/new` | Live create form at 360 px; no save |
| `/organization-types` | Live list/dashboard, desktop + 360 px |
| `/organization-types/:id` | Live populated detail at desktop; no mutation |
| `/organization-types/:id/edit` | Live populated edit form at desktop; no save |
| `/organization-types/new` | Live create form at 360 px; no save |
| `/organizations` | Live list/dashboard, desktop + 360 px |
| `/organizations/:id` | Live populated detail at desktop; no mutation |
| `/organizations/:id/edit` | Live populated edit form at desktop; no save |
| `/organizations/new` | Live create form at 360 px; no save |
| `/participant-types` | Live list/dashboard, desktop + 360 px |
| `/participant-types/:id` | Live populated detail at desktop; no mutation |
| `/path-grade-candidates` | Live list/dashboard, desktop + 360 px |
| `/path-grade-subject-terms` | Live list/dashboard, desktop + 360 px |
| `/path-grade-subject-terms/:id` | Source/route reviewed; live record or workflow not exercised |
| `/path-grade-subject-terms/:id/edit` | Source/route reviewed; live record or workflow not exercised |
| `/path-grade-subject-terms/new` | Live create form at 360 px; no save |
| `/path-grade-subjects` | Live list/dashboard, desktop + 360 px |
| `/path-grade-subjects/:id` | Source/route reviewed; live record or workflow not exercised |
| `/path-grade-subjects/:id/edit` | Source/route reviewed; live record or workflow not exercised |
| `/path-grade-subjects/new` | Live create form at 360 px; no save |
| `/path-grades` | Live list/dashboard, desktop + 360 px |
| `/path-grades/:id` | Source/route reviewed; live record or workflow not exercised |
| `/path-grades/:id/edit` | Source/route reviewed; live record or workflow not exercised |
| `/path-grades/new` | Live create form at 360 px; no save |
| `/performance-evaluation-categories` | Live list/dashboard, desktop + 360 px |
| `/performance-evaluation-categories/:id` | Live populated detail at desktop; no mutation |
| `/performance-evaluation-categories/:id/edit` | Live populated edit form at desktop; no save |
| `/performance-evaluation-categories/new` | Live create form at 360 px; no save |
| `/performance-evaluation-course-details` | Live list/dashboard, desktop + 360 px |
| `/performance-evaluation-course-details/:id` | Source/route reviewed; live record or workflow not exercised |
| `/performance-evaluation-course-participant-details` | Live list/dashboard, desktop + 360 px |
| `/performance-evaluation-course-participant-details/:id` | Source/route reviewed; live record or workflow not exercised |
| `/performance-evaluation-items` | Live list/dashboard, desktop + 360 px |
| `/performance-evaluation-items/:id` | Live populated detail at desktop; no mutation |
| `/performance-evaluation-items/:id/edit` | Live populated edit form at desktop; no save |
| `/performance-evaluation-items/new` | Live create form at 360 px; no save |
| `/performance-evaluation-participant-categories` | Live list/dashboard, desktop + 360 px |
| `/performance-evaluation-participant-categories/:id` | Live populated detail at desktop; no mutation |
| `/performance-evaluation-participant-categories/:id/edit` | Live populated edit form at desktop; no save |
| `/performance-evaluation-participant-categories/new` | Live create form at 360 px; no save |
| `/performance-evaluation-participant-category-items` | Live list/dashboard, desktop + 360 px |
| `/performance-evaluation-participant-category-items/:id` | Live populated detail at desktop; no mutation |
| `/performance-evaluation-participant-category-items/:id/edit` | Live populated edit form at desktop; no save |
| `/performance-evaluation-participant-category-items/new` | Live create form at 360 px; no save |
| `/performance-evaluations` | Live list/dashboard, desktop + 360 px |
| `/persons` | Live list/dashboard, desktop + 360 px |
| `/persons/:id` | Live populated employee detail at 360 px |
| `/persons/:id/edit` | Source/route reviewed; live record or workflow not exercised |
| `/persons/new` | Live create form at 360 px; no save |
| `/qualification-types` | Live list/dashboard, desktop + 360 px |
| `/qualification-types/:id` | Live populated detail at desktop; no mutation |
| `/qualification-types/:id/edit` | Live populated edit form at desktop; no save |
| `/qualification-types/new` | Live create form at 360 px; no save |
| `/qualifications` | Live list/dashboard, desktop + 360 px |
| `/qualifications/:id` | Live populated detail at desktop; no mutation |
| `/qualifications/:id/edit` | Live populated edit form at desktop; no save |
| `/qualifications/new` | Live create form at 360 px; no save |
| `/rooms` | Live list/dashboard, desktop + 360 px |
| `/rooms/:id` | Source/route reviewed; live record or workflow not exercised |
| `/rooms/:id/edit` | Source/route reviewed; live record or workflow not exercised |
| `/rooms/new` | Live create form at 360 px; no save |
| `/trainer-subjects` | Live list/dashboard, desktop + 360 px |
| `/trainer-subjects/:id` | Source/route reviewed; live record or workflow not exercised |
| `/trainer-subjects/:id/edit` | Source/route reviewed; live record or workflow not exercised |
| `/trainer-subjects/new` | Live create form at 360 px; no save |
| `/user-management` | Live list/dashboard, desktop + 360 px |
| `/work-centers` | Live list/dashboard, desktop + 360 px |
| `/work-centers/:id` | Live populated detail at desktop; no mutation |
| `/work-centers/:id/edit` | Live populated edit form at desktop; no save |
| `/work-centers/new` | Live create form at 360 px; no save |
| `/work-groups` | Live list/dashboard, desktop + 360 px |
| `/work-groups/:id` | Source/route reviewed; live record or workflow not exercised |
| `/work-sites` | Live list/dashboard, desktop + 360 px |
| `/work-sites/:id` | Live populated detail at desktop; no mutation |
| `/work-sites/:id/edit` | Live populated edit form at desktop; no save |
| `/work-sites/new` | Live create form at 360 px; no save |

## Complete feature component inventory

115 existing feature screen components. Some legacy Create components have no registered writable route; they remain preserved. A file in this inventory does not mean its data-backed workflow was exercised.

| Feature module | Existing screen components |
|---|---|
| `clients` | Create, Detail, List |
| `countries` | Create, Detail, List |
| `course-participant-final-exams` | Create, Detail, List |
| `course-participants` | Create, Detail, List |
| `course-session-participants` | Create, Detail, Edit, List |
| `course-sessions` | Create, Detail, Edit, List |
| `courses` | Create, Detail, List |
| `departments` | Create, Detail, List |
| `documentation-types` | Create, Detail, List |
| `documentations` | Create, Detail, List |
| `evaluation-types` | Create, Detail, List |
| `governorates` | Create, Detail, List |
| `grades` | Create, Detail, List |
| `job-type-groups` | Create, Detail, List |
| `jobs` | Create, Detail, List |
| `learning-paths` | Create, Detail, List |
| `learning-subjects` | Create, Detail, List |
| `learning-terms` | Create, Detail, List |
| `organization-types` | Create, Detail, List, OrganizationTypesList |
| `organizations` | Create, Detail, List |
| `participant-types` | Create, Detail, List |
| `path-grade-candidates` | List |
| `path-grade-subject-terms` | Create, Detail, List |
| `path-grade-subjects` | Create, Detail, List |
| `path-grades` | Create, Detail, List |
| `performance-evaluation-categories` | Create, Detail, List |
| `performance-evaluation-items` | Create, Detail, List |
| `performance-evaluation-participant-categories` | Create, Detail, List |
| `performance-evaluation-participant-category-items` | Create, Detail, List |
| `performance-evaluations` | List, Report |
| `persons` | Create, Detail, List |
| `qualification-types` | Create, Detail, List |
| `qualifications` | Create, Detail, List |
| `rooms` | Create, Detail, List |
| `trainer-subjects` | Create, Detail, List |
| `user-management` | List |
| `work-centers` | Create, Detail, List |
| `work-groups` | Create, Detail, List |
| `work-sites` | Create, Detail, List |

## Additional checks

- Login: required-field validation and five responsive sizes.
- Catalog: search, status filtering and reset; isolated populated rendering and filter/sort regression tests.
- Course creation: invalid blank submission shows all six required-field errors.
- Mobile navigation: open, close, Escape, Shift+Tab focus wrapping and focus restoration.
- Mobile screen search: opens, finds course navigation, follows selection, closes when empty.
- API-backed table/detail links: nineteen reference details and employee detail.
- Tests do not create users, change passwords, enroll participants, delete records or submit evaluation scores.
- Learner video/progress, announcements and certificate issuance are not implemented product screens and were not added.
