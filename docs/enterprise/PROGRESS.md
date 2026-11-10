# Enterprise transformation progress

9–10 November 2026. This is a new sequential pass, not a certification of earlier redesign work.

## Verification policy update

The user confirmed the backend cannot be reached from this network and authorized offline work. The latest instruction requires running-UI inspection, browser interactions, screenshots, RTL/responsive checks and loading/error verification for each remaining page. These are performed with the actual frontend against an isolated synthetic API; live API certification remains outstanding. Build/lint alone never qualify a page as complete. No authentication bypass or production mock-data mode was added.

## Scope and status

- 141 routed page entries, including the sign-in gate. Routes sharing a component (including report aliases) count separately.
- One fallback redirect, seven unlinked feature component files, and seven files containing dialogs, native confirmations, or the mobile drawer.
- Machine-readable dependencies and static findings: `inventory.json`.
- Ordered route checklist and page-level source notes: `PAGE_INVENTORY.md`.
- Redesigned/implemented: 46 page entries through grade detail; 42 of these have the synthetic browser verification recorded below.
- First four entries retain their earlier verification limitations. Fully verified against the live API: zero. No page is labeled fully complete.
- Remaining implementation: 95 page entries and secondary surfaces. Live API verification remains outstanding for all entries.

## 1. Sign-in — implemented, API verification blocked

**Purpose and contract.** Staff authenticate through POST /login; a valid returned token establishes the existing tab-scoped session. Authenticated routes remain lazy-loaded and the requested location is retained. No account permissions or persistence rules were changed.

**Audit.** The original mobile view put a large logo and generous top spacing before the form; the submit action was near/below the viewport edge. The 36px password toggle was undersized. All failures were described as invalid credentials, even when the server was unreachable. A malformed successful response could establish an authenticated state without a valid token. The locale indicator looked interactive despite having no action.

**Design and implementation.** Compact, right-aligned form hierarchy; RTL desktop form on the right; restrained brand panel on the left; shorter mobile brand section; 44px password toggle; clear account-help copy. Keep form values after failure. Disable duplicate submission and keep inputs read-only during a request. Announce pending status separately from the button name. Focus the server-error summary. Distinguish rejection, rate limits, network failure and service failure; reject missing/blank response tokens. No passwords or tokens are written to files.

**Loading.** Subtle shimmer confined to the existing submit button, stable button dimensions, reduced-motion fallback, polite pending announcement. Static sign-in fields have no remote lookup dependency and remain visible. The existing lazy authenticated-shell skeleton is preserved; its successful transition could not be exercised.

**Performance.** No added packages, images, API requests, polling or eager authenticated route imports. Smaller rendered brand elements and compact mobile content. This is a source review, not a measured Core Web Vitals improvement.

**Verification performed.** Browser checks at 360×800, 768×1024 and 1440×1000: no document horizontal overflow. Visually inspected mobile and desktop. Verified required-field messages, focus on username after empty submission, password reveal toggle, 44px toggle size, RTL direction, pending submit disabled/read-only fields, timeout feedback and error-summary focus. Credential rejection/rate limit/service/timeout message branches tested in Node. Successful login was attempted with the supplied test account but did not reach the backend.

**Blocker.** Configured API `the configured private backend` is unreachable. Browser POST /login timed out; direct connection probe returned HTTP 000 after a five-second connection timeout. Need reachable LAN/VPN/backend or corrected URL before successful authentication and authenticated pages can be verified. Do not mark live integration complete. The later user instruction permits continuing with offline verification.

## Validation

- Production build: passed.
- Targeted ESLint on changed TS/TSX and scripts: passed.
- `node scripts/verify-login.mjs`: passed.
- `npm run test:ui`: passed (three behavior tests and catalog server-render checks).
- `node scripts/verify-create-routes.mjs`: passed (25 static creation paths).
- `node scripts/verify-form-contracts.mjs`: passed (21 assertions).
- These checks do not establish live API or CRUD correctness. Repository-wide lint was not claimed clean.

Screenshots (ignored local evidence): `docs/screenshots/enterprise/sign-in-desktop.jpg` and `sign-in-mobile.jpg`.

## 2. Dashboard — implemented, offline checks passed

Purpose: daily training operations overview for staff, consuming six existing read APIs. Audit found a visually hidden page heading, ellipsis-only KPI loading, no retry for enrollment/executed KPI failures, non-linked latest-record names, repeated data sorting on every render, and date formatting that could throw on invalid values. Upcoming courses included executed entries and placed undated entries before scheduled work.

Implemented a visible heading/date, explanatory copy, individually retryable KPIs, six stable value skeletons, four panel skeletons, keyboard-accessible employee/course links, safe date/time formatting and chronological upcoming courses with undated entries last. Memoized transformations and reused locale formatters; query cancellation signals are forwarded to Axios. All six endpoints and cache keys remain unchanged. No performance timing claim is made.

`verify-dashboard.mjs` passes synthetic populated, empty, loading and partial-failure render checks; checks links, unchanged query data, date/time fallback, upcoming order and executed exclusion. Production build and targeted lint pass. Responsive CSS and reduced-motion handling reviewed in source; browser visual, focus, retry interactions and live APIs remain unverified.

## 3. Client list — implemented, offline checks passed

Purpose: browse the existing client directory (GET /clients); this module has no routed create/edit controls. Audit found an unlabeled search input, pointer-only record navigation, no visible page explanation, no distinction between empty and no-match states, and lost search on returning to the list.

Implemented a labeled search, name/newest-ID ordering, URL search/order state, clear action, result count, native record links, dedicated two-column skeleton and distinct empty/no-match/error recovery. Existing shared Table pagination remains, resetting when search/order changes. Filtering is deferred and memoized; it preserves the original all-field search behavior. Failed refreshes retain existing records when available.

`verify-clients.mjs` passes list populated/empty/loading/error, URL search, clear-control rendering and record-link assertions. No unsupported create actions were introduced. Actual keystrokes, sorting/pagination interaction, URL back-navigation, visual RTL/responsive layouts and live API responses remain unverified.

## 4. Client detail — implemented, offline checks passed

Purpose: inspect client identity via the existing GET /client/:id. Audit found navigation disappearing while loading/failing, a generic oversized skeleton, nested link/button controls and placeholder content for missing records.

Implemented persistent breadcrumbs/back link, semantic definition-list fields, a matching two-field skeleton and explicit missing/error states. Kept the module read-only and preserved endpoint/query keys. No additional requests or dependencies.

`verify-clients.mjs` passes detail populated/loading/missing/error cases, semantic field checks and recovery-link checks. Browser layout, navigation clicks and live API response handling remain unverified.

## Resume sequence

Continue with `/grades/:id/edit`, then its create route in the inventory order. For each page: source/business audit → scoped implementation → local tests → record limitations → next page. Perform live integration and visual verification when connectivity is available. The fallback `/:resource/new` is a redirect review, not a redesign target.

Run `npm run test:enterprise` for the new isolated tests and the existing regression commands above. Fixtures are held only in test code and query caches; production authentication remains required.

The inventory generator is source-derived and lists potential issues to investigate. It does not substitute for the required individual visual, business-flow and performance audit. Regenerating it resets its pending route checklist; this progress record preserves verified work.

## Browser verification pass — 9 November 2026

Current user instruction requires real browser interaction and screenshots for each page. Live backend connectivity was retried: HTTP 000 / connection timeout. `scripts/fixture-preview.mjs` now runs the actual app on port 5175 with an isolated in-memory API on 5180. It never proxies to the live service, labels the preview as synthetic, and rejects unknown endpoints rather than inventing success. Fixtures are resettable and not persisted. This is frontend integration evidence, not actual-backend certification.

### 5. `/countries` — implemented; synthetic browser verification passed

Purpose: maintain country reference data for governorates and locations. API: GET /countries; creation opens /countries/new; native record links open /countries/:id. Existing CRUD and shared pagination retained.

Before: hidden page heading, unlabeled search, duplicated large count card, lost search on navigation. After: visible contextual heading, clear add-country action, labeled URL-persisted search/order, native record links, concise result count, distinct no-match/empty/error states. Deferred/memoized filtering and request cancellation added. New opt-in EnterpriseSkeleton has a two-column table layout and reduced-motion support; it changes no other existing page.

Browser checks performed against synthetic API: search for مصر returns one record; clear restores 27; name/recent ordering; select 10 rows, next and previous pages; no-match guidance; empty dataset; forced 503 and retry recovery; delayed response and visible shimmer; add-country link reaches create route. Screenshots inspected at 1440×1000 and 360×800; RTL direction confirmed, no document overflow. Sorting dropdown width was corrected after visual inspection. Evidence: countries-desktop.jpg, countries-mobile.jpg, countries-loading.jpg under docs/screenshots/enterprise. Actual backend verification remains pending; not labeled fully complete.

### 6. `/countries/:id` — implemented; synthetic browser verification passed

Actual UI inspected before changes. Purpose: inspect country identity and its governorates; GET /country/:id, DELETE /country/:id, edit and related-governorate navigation. Replaced generic field divs with semantic definition lists, kept breadcrumb/back navigation visible during loading/error, added empty related-data guidance and native governorate links. Record actions moved into the identity card; only the country detail opts out of the shell's duplicate actions. Other routes retain their existing shell actions. Cancellation signal forwarded to the existing get request.

A native browser confirmation blocked automation, so this page now opts into a contextual RecordActions dialog built on the existing shared Dialog. The dialog identifies the record and keeps mutation errors in context; no other route was migrated automatically. Tested focus entry, Shift+Tab containment, Escape with focus restoration, Cancel, failed-delete response, successful fixture DELETE /country/1 and return to a 26-record list. Reset restored the disposable fixture. Verified populated governorates and empty governorates, delayed skeletons, forced error and retry, back navigation, edit destination, keyboard record navigation. Desktop and 360px RTL screenshots inspected with no document overflow; card actions adjusted after mobile inspection. Evidence: country-detail-mobile.jpg, country-detail-error-mobile.jpg, country-delete-mobile.jpg. Related link destination is inspectable but its target page/API is not yet covered. Live backend verification pending; not fully complete.

### 7. `/countries/:id/edit` — implemented; synthetic browser verification passed

Before screenshot confirmed the edit page incorrectly displayed “إضافة دولة”, redundant wrapper navigation and a large form with little guidance. The country editor now has correct mode-specific headings/actions, field help, compact constrained form width, a matching one-field skeleton, preserved navigation on failed initial loading and visible unsaved/pending status. This country route uses its own typed query/form/mutation instead of the generic ReferenceEditor wrapper; the other reference editors are unchanged. GET /country/:id and PUT /country/:id with `{name}` remain intact. Invalidations target country and country-list query keys, and mutation failures retain input and focus their error summary.

Browser tested populated initial value; whitespace-only validation and field focus; failure retention and error-summary focus; read-only input and disabled save during a delayed mutation; successful PUT /country/1 with exact name payload recorded in fixture journal and return to the list; Cancel; initial GET failure and retry; loading skeleton screenshot; 1440px and 360px layouts with no mobile overflow. Screenshot evidence: country-edit-error.jpg, country-edit-loading.jpg, country-edit-mobile.jpg. Live API integration pending; not fully complete.

### 8. `/countries/new` — implemented; synthetic browser verification passed

Inspected the original create screen when testing the list action, then verified the redesigned create route separately after edit verification. Uses the same typed one-field editor but has distinct create copy and POST /new-country; no unnecessary country GET runs without an id. Static form is immediately usable; pending submit announces status and disables repeat saves instead of replacing the form with a skeleton.

Browser checked blank submission, input error, synthetic save failure with retained name, delayed submit/read-only field, successful POST containing only `{name:"دولة جديدة للاختبار"}`, return to list and the new record at id 28, cancellation, desktop/mobile screenshots. Fixture journal confirms create was POST and edit was PUT. Screenshots: country-create-mobile.jpg and country-create-desktop.jpg. Actual backend integration pending; not fully complete.

### 9. `/course-participant-final-exams` — implemented; synthetic browser verification passed

Inspected original live-rendered frontend with 27 synthetic results: title hidden by legacy page styles, all results rendered in an unbounded list, unlabeled search, no link to the existing detail route. Purpose: review final-exam grades and identify unrecorded outcomes. API remains GET /course-participant-final-exams. Existing pass threshold of 50 is preserved (backend grading-policy confirmation pending).

Implemented visible purpose-specific heading, four compact aggregate metrics (total, passed, unrecorded, mean of recorded grades), paginated results with native detail links, labeled combined search/status filters, URL state, reset action, clear unrecorded versus zero scores, robust date/number handling. Filter/summary work memoized and query cancellation added. Opt-in reusable five-column skeleton and independent stable-height metric shimmers support reduced motion.

Browser verified pending/passed/failed counts (7/13/7 of 27), participant search with status, no-match and reset, 10-row page size plus next/previous navigation, empty data with an unknown mean instead of false zero, synthetic load failure with unavailable metrics, retry restoring 27 results, loading screenshot and 360px RTL layout without document overflow. Desktop screenshot reviewed for table density. Evidence: exams-desktop.jpg, exams-mobile.jpg, exams-loading-mobile.jpg. Live API pending; not fully complete.

### 10. `/course-participant-final-exams/:id` — implemented; synthetic browser verification passed

Original rendered page placed every value in one flat row and exposed participant/document identifiers without navigation. Redesigned around the grade and outcome first, then date/organizer/identity in a two-column definition list, followed by linked participant/document records. Preserves all original fields and the read-only workflow; no grading writes or new permissions were added. GET /course-participant-final-exam/:id now accepts query cancellation. Persistent breadcrumbs/back link remain during pending and error states; skeletons use the same result/details grouping.

Browser checked entry from keyboard activation of list result, unrecorded and failing grade display, back-to-results, participant and documentation destinations, forced detail error and retry, delayed loading, desktop and 360px RTL screenshots and no document overflow. Related target content is not certified by testing the links. Screenshots: exam-detail-desktop.jpg, exam-detail-mobile.jpg, exam-detail-loading.jpg. Live backend and actual grading policy remain pending; not fully complete.

### 11. `/course-participants` — implemented; synthetic browser verification passed

Actual UI audit found 27 pointer-only cards rendered at once, hidden heading and no course/follow-up filtering. Preserved the participation-card model and original employee/course identifiers and exam/evaluation counts. Added visible module context, native full-card detail links, URL-based search/course/follow-up state, 12-card pagination, reset, accurate no-match versus empty states. Filtering, course options and summary counts are memoized from the existing GET /course-participants response; no lookup requests added. Cancellation forwarded. Reusable field skeletons match cards and separate metric placeholders retain their space.

Browser checked 12-card bound; course filter (9 records for course 1), course plus no-exam (4), course plus no-evaluation (0); no-match search/reset; next page starts at record 113, previous returns; empty data; failed initial load/retry back to 27; 12 skeleton cards during delayed request. Desktop and 360px screenshots inspected; mobile metric stack was condensed after visual review. No document overflow. Evidence: participants-desktop.jpg, participants-mobile.jpg, participants-loading.jpg. Backend verification pending; not fully complete.

### 12. `/course-participants/:id` — implemented; synthetic browser verification passed

Audited the original rendered participation record: generic table summary, raw null scores, unformatted timestamps and unlinked relationship IDs. Retained every field and both related collections, using identity definitions, native employee/course/exam links, explicit unrecorded grades, localized timestamps and separate empty guidance. GET /course-participant/:id now accepts cancellation. No writes or additional lookup requests introduced.

Browser checked populated record 101, empty exam/evaluation histories on 102, employee/course/exam destinations, back navigation, forced error and successful retry, delayed three-card skeletons, desktop/mobile RTL screenshots and no document overflow at 360px. Related destinations do not certify target APIs. Evidence: participant-detail-desktop.jpg, participant-detail-mobile.jpg, participant-detail-loading.jpg. Build passes; broader lint reports pre-existing explicit-any in untouched exam/participation Create components. Live verification pending; not fully complete.

### 13. `/course-session-participants` — implemented; synthetic browser verification passed

Audited the rendered attendance list and request contract (GET /course-session-participants). Replaced hidden heading, unlabeled search and generic summary with explicit attendance context, registration action, trainee-name/code/id search, session filtering, native detail/relationship links, pagination and distinct empty/no-match/error states. Deferred memoized filtering and query cancellation; options derive from loaded records without lookups. Reusable three-column shimmer.

Browser verified session filter 9/27, composed name search 1/27, no-match/reset, page size 10 and next/previous, empty data, failure/retry, delayed loading, create destination and keyboard detail/participation links. Desktop and 360px RTL screenshots inspected. Narrow table scrolls within its container; no document overflow. Evidence: attendance-desktop.jpg, attendance-mobile.jpg, attendance-loading.jpg. Live API pending; not fully complete.

### 14. `/course-session-participants/:id` — implemented; synthetic browser verification passed

Source and original browser UI inspected. Preserved GET/DELETE /course-session-participant/:id and edit workflow. Replaced ID-only fields with semantic definitions, trainee identity and linked session/participation records. Persistent navigation, missing/error state and matching field skeleton. Opted into reusable contextual delete dialog, retaining list invalidation and return navigation. Cancellable GET.

Browser verified Cancel, failed deletion with in-dialog feedback, successful synthetic deletion and return to list, edit/session destinations, failure/retry and shimmer. Desktop and mobile screenshots reviewed without document overflow. Evidence: attendance-detail-desktop.jpg, attendance-detail-mobile.jpg, attendance-detail-loading.jpg. Live permissions/relationships/backend deletion constraints remain unverified; not fully complete.

### 15. `/course-session-participants/:id/edit` — implemented; synthetic browser verification passed

Audited populated original form and its three reads (attendance record, sessions, enrollments) plus PUT /course-session-participant/:id. New compact two-step editor retains eligibility rules and strengthens them: session change clears the trainee, submit rechecks course membership, failed lookup blocks saving with retry, failed mutation preserves selections and focuses the error. Initial form values mount once instead of resetting dirty edits on query refresh. Memoized eligibility/options and cancellable session lookup; no extra endpoints.

Browser verified initial 1/101 values, session 2 resetting trainee, required validation, only course-2 options, course 4 with no eligible trainees, retained selections on failed PUT, pending disabled controls, successful PUT of exactly {course_session_id:2,course_participant_id:102}, return to updated detail, Cancel, failed dependencies/retry, two-field shimmer, desktop and 360px RTL screenshots/no overflow. Evidence: attendance-edit-error.jpg, attendance-edit-mobile.jpg, attendance-edit-loading.jpg. Live backend pending; not fully complete.

### 16. `/course-session-participants/new` — implemented; synthetic browser verification passed

Audited original create page independently before adopting the verified attendance editor. GET sessions/enrollments and POST /new-course-session-participant preserved; create performs no detail GET. Contextual instructions, required field errors, dependency skeleton, no-session/no-eligible guidance and retained mutation errors now match edit behavior.

Browser tested blank submit, session-3 eligibility, failed save retention, disabled pending controls, successful POST {course_session_id:3,course_participant_id:103} and list navigation, Cancel, failed lookup/retry, empty lookup disabling save, delayed shimmer, desktop/mobile RTL screenshots. Evidence: attendance-create-desktop.jpg, attendance-create-mobile.jpg, attendance-create-loading.jpg. Actual API/duplicate attendance constraints pending; not fully complete.

### 17. `/course-sessions` — implemented; synthetic browser verification passed

Original UI inspected with valid records and a malformed date. Confirmed a single invalid date crashed the entire route with Invalid time value. Added validated calendar-day parsing, timezone-stable display, local-today metrics and explicit “after today” count. Preserved the schedule/timeline design; made header visible, added URL search/date/order state and 12-session pages, native course/detail links, clear empty/error states and reusable shimmer. Removed hard-coded room copy not backed by the API. GET /course-sessions remains the only request, with cancellation.

Browser verified 12-record bound, date filter to one session, combined no-match/reset, descending order, next/previous through three pages, invalid date fallback at end without crash, empty/error/retry, loading, keyboard detail/course links and create destination. Date input required input-event handling for immediate filtering in this browser; verified URL and result update. Desktop/mobile RTL screenshots including below-fold timeline reviewed; no document overflow. Evidence: sessions-desktop.jpg, sessions-mobile.jpg, sessions-mobile-timeline.jpg, sessions-loading.jpg. Live API pending; not fully complete.

### 18. `/course-sessions/:id` — implemented; synthetic browser verification passed

Original rendered detail/source audited. Retained all five fields and GET/DELETE /course-session/:id, with date/time grouping, localized safe date display, linked course, and a new native link to the existing attendance list filtered by session. Contextual RecordActions replaces the page's native confirmation and exposes mutation failures. Persistent navigation, matching skeleton and cancellable GET.

Browser checked course and filtered attendance destinations, Escape cancellation, failed delete feedback, successful DELETE /course-session/26 in fixture journal/list navigation, reset, load error/retry, delayed skeleton, edit destination, desktop and 360px RTL screenshots/no overflow. Empty-session attendance navigation revealed a missing select option; fixed the list to retain the requested session option. Evidence: session-detail-desktop.jpg, session-detail-mobile.jpg, session-detail-loading.jpg. Live deletion constraints/permissions pending; not fully complete.

### 19. `/course-sessions/:id/edit` — implemented; synthetic browser verification passed

Audited original populated form and executed-course dependency. Rebuilt scoped editor with course/date full-width and paired time fields (stacked on mobile), explicit required validation, missing-lookup recovery, four-field skeleton, retained save error and focus, pending/read-only controls. Preserved GET /course-session/:id, GET /get-executed-courses and PUT fields. Form initializes after both dependencies load, avoiding the original blank selected course race; dirty inputs are not reset by refetch. Executed-course lookup now supports cancellation. No new time-order business rule was imposed.

Browser verified initial course/date/time values, empty-date validation, changing all four inputs, failed PUT retention, delayed pending controls, exact PUT payload {course_id:2,session_date:"2026-11-12",start_time:"10:30",end_time:"12:30"}, updated detail, Cancel, dependency error/retry, shimmer, desktop and 360px RTL screenshots/no overflow. Evidence: session-edit-desktop.jpg, session-edit-mobile.jpg, session-edit-loading.jpg. Live API pending; not fully complete.

### 20. `/course-sessions/new` — implemented; synthetic browser verification passed

Audited original create layout and adopted the verified session editor with distinct create title/action and POST /new-course-session. Preserved the executed-course-only scheduling rule and four-field payload. No detail request in create mode. Empty executed-course lookup disables saving; lookup failure has retry; pending save keeps the form visible.

Browser checked all four blank-field errors, selected course/date/start/end, failed save retention, delayed disabled save, successful exact POST {course_id:3,session_date:"2026-11-30",start_time:"09:30",end_time:"11:30"}, return to schedule, Cancel, error/retry, empty courses and skeleton, desktop/mobile screenshots with RTL and no document overflow. Evidence: session-create-desktop.jpg, session-create-mobile.jpg, session-create-loading.jpg. Live backend pending; not fully complete.

### 21. `/courses` — implemented; synthetic browser verification passed

Inspected the real catalog with 27 fixtures. Preserved existing artwork/card design, planned-versus-executed semantics and 12-card pagination. Restored a visible heading, placed creation in the header, added URL-backed filters/order/page and deferred search, memoized subject-name lookup, localized dates, stable metric placeholders and reusable card skeleton. Both existing reads (courses and learning subjects) now accept cancellation. Topic failure remains independent and recoverable without hiding courses.

Browser checked planned/executed/other counts 9 each, subject/status combination, single-name search, reset, name ordering, next/previous, empty creation link, full failure/retry, isolated topic failure with 12 usable cards and topic retry, six matching card skeletons, keyboard detail entry, desktop/mobile screenshots/no overflow. Evidence: courses-desktop.jpg, courses-mobile.jpg, courses-card-mobile.jpg, courses-loading.jpg. Live API pending; not fully complete.

### 22. `/courses/:id` — implemented; synthetic browser verification passed

Inspected original overview and four-tab implementation. Preserved every displayed business field and related collection, added room visibility and native relationship links, localized dates/numbers, contextual actions and explicit missing/empty/error states. Existing GET /course/:id remains the sole read and accepts cancellation. Tabs retain RTL keyboard behavior and now persist selection in the URL; related tables omit irrelevant generic summaries. Course shell actions are suppressed only on course detail to avoid duplication with contextual RecordActions.

Browser checked all four tabs, ArrowLeft/Home/End navigation, populated and empty related collections, session/participation/document destinations and available topic/room/trainer links, Cancel, failed delete, successful DELETE /course/1 journal and return, error/retry, delayed skeleton, desktop/mobile screenshots. Visual review exposed intrinsic tab width clipping despite no document overflow; scoped grid constraints fix it. A wrapped inline date link had a dead midpoint between lines; a 44px inline-flex target now passes pointer and keyboard activation. Evidence: course-detail-desktop.jpg, course-detail-mobile.jpg, course-documents-mobile.jpg, course-detail-loading.jpg. Related target content and live API remain uncertified; not fully complete.

### 23. `/courses/:id/edit` — implemented; synthetic browser verification passed

Original editor inspected: edit mislabeled as creation, duplicate wrapper navigation, long inconsistent sections and silent failed lookup dropdowns. Rebuilt into five sections with responsive grids, clear required markers, contextual lookup retry/shimmer, error-summary focus and pending fieldset. Replaced only the course routes' generic editor wrapper with a typed GET/form/mutation flow. Existing schema and payload transformations preserved: lifecycle combinations, required planned parent, mutually exclusive subject fields, integer counts, nullable blank counts, decimal cost string and UTC-midnight date payloads. Conditional subject/planned queries avoid unnecessary initial reads; one people query feeds all three staff selects. Targeted course/planned/executed invalidation replaces blanket cache invalidation.

Browser exercised all populated input/select/checkbox/radio controls, both lifecycle validations, subject-type switching, whitespace name and fractional duration validation, lookup failure/save blocking/retry, save failure and focus, pending disabled fieldset, successful exact PUT journal with null versus zero counts, 123.4567 cost string, only active subject and planned parent, optional end-date omission, return to catalog, Cancel, detail-load failure/retry, loading, desktop/mobile screenshots. Evidence: course-edit-desktop.jpg, course-edit-mobile.jpg, course-edit-fields-mobile.jpg, course-edit-loading.jpg. Actual PUT semantics for clearing omitted optional fields require live API confirmation; preserved existing payload behavior. Not fully complete.

### 24. `/courses/new` — implemented; synthetic browser verification passed

Create route uses the same individually audited editor, with new-record defaults and no course detail GET. Static fields are immediately available; lookup skeletons replace only dependent selects. Required empty lookup lists now provide guidance and block saving; optional staff/funding/counts remain nullable. Fresh create correctly reports no unsaved changes.

Browser tested blank required fields, planned-only lifecycle after selecting and then hiding a planned parent, path subject selection, date and required room/trainer inputs, failure retention, pending disabled fieldset, successful POST and catalog return. Journal verified UTC date strings, null blank counts/optional IDs, default cost "0", no inactive subject keys and no planned_id for planned-only records. Verified empty room/trainer guidance and destinations, independent lookup failure/retry, lookup shimmer, Cancel, desktop/mobile screenshots and no clipping. Evidence: course-create-desktop.jpg, course-create-mobile.jpg, course-create-loading.jpg. Actual API constraints and optional-field clearing semantics remain pending; not fully complete.

### 25. `/departments` — implemented; synthetic browser verification passed

Audited original directory with hidden heading, pointer-only rows and five generic summary cards. New explicit organizational context, add action, native record/organization links, URL search and organization filter, pagination, empty/no-match/error states. One shared cached organization lookup supplies human-readable names (no per-row requests), with ID fallback and independent retry. Both reads accept cancellation; filtering and name mapping are memoized and search deferred. Mobile review led to combining department name/code into one identity column so codes remain unbroken and names readable; full touch targets and matching two-column shimmer.

Browser verified organization 2 yields 13/27, code search yields one, no-match/reset, 10-row next/previous, organization failure fallback/retry, empty/full-error/retry, delayed skeleton, create/organization destinations and pointer/keyboard detail links. Final desktop and mobile screenshots reviewed for clipping and readability. Evidence: departments-desktop.jpg, departments-mobile.jpg, departments-loading.jpg. Live API pending; not fully complete.

### 26. `/departments/:id` — implemented; synthetic browser verification passed

Audited original ID-based detail. Preserved the four organizational fields, GET/DELETE /department/:id and edit route. Added semantic definitions, native organization link, contextual RecordActions, persistent navigation, missing/error recovery and four-field skeleton; no extra detail lookup required. Query cancellation added and duplicate shell actions suppressed only for this migrated resource.

Browser checked organization/edit destinations, Escape cancellation, failed delete feedback, successful DELETE /department/1 in journal/list navigation, reset, load error/retry, delayed skeleton, desktop/mobile RTL screenshots and contained layout. Evidence: department-detail-desktop.jpg, department-detail-mobile.jpg, department-detail-loading.jpg. Live backend pending; not fully complete.

### 27. `/departments/:id/edit` — implemented; synthetic browser verification passed

Inspected original editor: duplicate back links, generic title, oversized green save and missing organization selection after asynchronous options. New typed three-field editor mounts after record and organization data, uses distinct edit heading, stable form-sized shimmer, explicit errors/retry, retained mutation input/focus and read-only pending controls. Existing schema and PUT /department/:id {code,name,organization_id} preserved. Only department routes opt out of the generic editor wrapper; shared organization cache reused.

Browser verified populated organization 1, blank code/whitespace name errors, changing all fields, save failure retention, pending read-only controls, exact successful PUT with organization 2, return to list, Cancel, organization failure/retry, skeleton, desktop/mobile screenshots without clipping. Evidence: department-edit-desktop.jpg, department-edit-mobile.jpg, department-edit-loading.jpg. Live API pending; not fully complete.

### 28. `/departments/new` — implemented; synthetic browser verification passed

Create route individually verified using the same three-field editor. No detail GET; organizations are required before form initialization. Explicit create heading/action, empty-organization guidance and disabled save, matching skeleton, retained mutation errors and safe pending state. POST /new-department contract unchanged.

Browser checked all required-field messages, name/code/organization input, failed and delayed save, exact successful POST {code:"DEP-NEW",name:"إدارة جديدة للاختبار",organization_id:1}, return to directory, Cancel, empty/failed lookup and retry, desktop/mobile RTL screenshots and no clipping. Evidence: department-create-desktop.jpg, department-create-mobile.jpg, department-create-loading.jpg. Live API pending; not fully complete.

### 29. `/documentation-types` — implemented; synthetic browser verification passed

Audited the running original directory and GET /documentation-types contract. Replaced hidden heading, unlabeled search and pointer-only rows with visible business context, labeled URL-backed search/sort, native 44px record links, a compact two-column table, explicit creation action, result announcements and reusable shimmer. Deferred memoized filtering and cancellable GET preserve the shared cache. No extra requests.

Browser verified no-match/clear, descending order, page-size and next/previous pagination, keyboard record navigation, creation link, empty data, delayed loading, failure/retry, desktop/tablet/mobile RTL screenshots with contained layout. Evidence: documentation-types-desktop.png, documentation-types-tablet.png, documentation-types-mobile.png, documentation-types-loading.png. Live backend pending; not fully complete.

### 30. `/documentation-types/:id` — implemented; synthetic browser verification passed

Preserved GET/DELETE /documentation-type/:id, name/ID and edit/list navigation. Added semantic record data, consistent heading/breadcrumbs, contextual shared actions, two-field skeleton and persistent error recovery. Cancellable query; no added lookup. Browser verified native edit/list navigation, delete dialog cancellation with Escape, failure retention/retry, exact successful synthetic DELETE /documentation-type/27, delayed loading, load error/retry and desktop/mobile RTL screenshots. Evidence: documentation-type-detail-desktop.png, documentation-type-detail-mobile.png, documentation-type-detail-loading.png. Live API pending; not fully complete.

### 31. `/documentation-types/:id/edit` — implemented; synthetic browser verification passed

Replaced generic wrapper/editor after inspecting populated original UI. Preserved trimmed required name and PUT /documentation-type/:id {name}. Typed editor mounts after record data, exposes explicit edit heading, one-field skeleton, retained focused save errors and read-only/disabled pending controls. Shared form primitives reused without changing other reference resources.

Browser verified populated value, whitespace rejection, changed name, failed save retention/focus, delayed disabled save, exact trimmed PUT /documentation-type/27 {name:"شهادة معدلة للاختبار"}, list navigation, cancel, initial record failure/retry, skeleton and desktop/mobile RTL screenshots. Evidence: documentation-type-edit-desktop.png, documentation-type-edit-mobile.png, documentation-type-edit-loading.png. Live API pending; not fully complete.

### 32. `/documentation-types/new` — implemented; synthetic browser verification passed

Individually audited and tested the create route. Name-only schema and POST /new-documentation-type preserved; no detail GET or remote dependencies on this form. Reused typed editor, explicit create labels, stable pending button and read-only field instead of a misleading data-loading skeleton for local inputs.

Browser verified empty validation, input, failed-save retention, delayed pending controls, exact trimmed POST {name:"محضر اختبار جديد"}, return to list, cancel, desktop/mobile RTL screenshot checks and no horizontal overflow. Evidence: documentation-type-create-desktop.png, documentation-type-create-mobile.png, documentation-type-create-saving.png. Targeted lint, production build, enterprise regression suite, 21 form-contract assertions and 25 creation-route checks passed; these supplement browser checks, not replace them. Live API pending; not fully complete.

### 33. `/documentations` — implemented; synthetic browser verification passed

Audited original unbounded cards, hidden heading and raw type IDs. Preserved GET /documentations, file-path/name/course search, detail and creation navigation. Added visible archive heading, URL-backed filters for type and missing/present file path, deferred memoized search, 12-card pagination, shared cached type names with independent failure fallback/retry, six reusable card-sized skeletons and cancellable GET. File paths remain displayed text; no unverified download endpoint was invented.

Browser verified 12-record bound, next/previous, missing-path filter, combined no-match and clear, file-path search/reload persistence, keyboard detail link, creation link, optional-type lookup failure/retry, full-load failure/retry, empty data, page-specific loading skeletons and desktop/mobile RTL screenshots without overflow. Evidence: documentations-desktop.png, documentations-mobile.png, documentations-loading.png. Live API pending; not fully complete.

### 34. `/documentations/:id` — implemented; synthetic browser verification passed

Preserved document name, ID, path, type, course, session and subject fields; exposed the existing path-grade subject/term relationships too. Added semantic grouped data, readable wrapping file path, six native relationship links, contextual RecordActions, two reusable skeleton sections, cancellable GET and error recovery. No invented file-download behavior.

Browser verified all six relationship destinations, edit/list navigation, missing path and absent relationships, delete cancellation/failure/retry, exact synthetic DELETE /documentation/201, load failure/retry, page-specific skeletons, desktop/mobile screenshots. Evidence: documentation-detail-desktop.png, documentation-detail-mobile.png, documentation-detail-loading.png. Destination pages retain their own verification scope. Live API pending; not fully complete.

### 35. `/documentations/:id/edit` — implemented; synthetic browser verification passed

Original populated editor lost asynchronous selections and showed five competing relationship selects despite an exactly-one schema. Replaced with explicit relationship kind and one conditional lookup; preserved schema verbatim and zero-to-null payload conversion. Record-first mounting fixes default selections. Existing conflicting multi-link records show guidance and must satisfy the original exactly-one rule before saving. Optional type lookup can fail independently; selected required lookup blocks saving on loading/failure. Shared hook enabled flags default true for existing callers.

Browser verified initial type 2/path-grade subject 1, required name/path/relationship errors, all five relation selectors, clearing optional type, retained save error, disabled pending fields/save, exact PUT /documentation/202 with session 1 and all other relationship IDs null, cancel, record failure/retry, optional and required lookup failure/retry, legacy multi-link guidance, page-specific loading skeleton and desktop/mobile RTL screenshots. Evidence: documentation-edit-desktop.png, documentation-edit-mobile.png, documentation-edit-loading.png. Live API pending; not fully complete.

### 36. `/documentations/new` — implemented; synthetic browser verification passed

Create route individually verified. Reuses typed document form and preserves POST /new-documentation, required name/path, exactly-one relationship and optional type. Only the selected relationship list loads; optional type and selected lookup use reusable field shimmers. No record GET.

Browser verified required fields, type/course selection, failed save retention, delayed disabled form, exact POST {name:"وثيقة جديدة للاختبار",file_path:"/uploads/new-test.pdf",documentation_type_id:3,course_id:2,other relationship IDs:null}, list navigation, cancel, empty selected lookup/save guard, failed optional/required lookups/retry, two lookup skeletons, desktop/mobile RTL screenshots. Evidence: documentation-create-desktop.png, documentation-create-mobile.png, documentation-create-loading.png. Production build, targeted lint, enterprise regression tests and contract checks passed. Live API pending; not fully complete.

### 37. `/evaluation-types` — implemented; synthetic browser verification passed

Audited actual original directory and name/should_repeat business contract. Added visible purpose, URL-backed labeled search/order, keyboard record links, repeat-course policy column, reusable shimmer, empty/error guidance and cancellable GET. Existing query cache/pagination retained; no added requests.

Browser verified no-match/clear, sorting, page size, next/previous, keyboard detail and create links, delayed page skeleton, load failure/retry, empty data, desktop/mobile RTL screenshots. Shortened long policy header after mobile inspection to preserve readable names. Evidence: evaluation-types-desktop.png, evaluation-types-mobile.png, evaluation-types-loading.png. Live API pending; not fully complete.

### 38. `/evaluation-types/:id` — implemented; synthetic browser verification passed

Preserved name/ID and GET/DELETE endpoints; exposed existing should_repeat policy, previously absent from detail. Semantic three-field layout, shared RecordActions, persistent back/edit navigation, three-field skeleton, cancellable GET and error recovery. Browser verified edit/list navigation, Escape cancellation, failed deletion/retry, exact synthetic DELETE /evaluation-type/1, loading/error recovery and desktop/mobile RTL screenshots. Evidence: evaluation-type-detail-desktop.png, evaluation-type-detail-mobile.png, evaluation-type-detail-loading.png. Live API pending; not fully complete.

### 39. `/evaluation-types/:id/edit` — implemented; synthetic browser verification passed

Preserved trimmed required name and boolean should_repeat payload. Typed record-initialized editor, explicit edit title, readable checkbox policy, stable field skeleton, retained focused error, read-only name and disabled checkbox/save while pending. Original repeat flag remains unchanged until the user edits it.

Browser verified populated true checkbox, blank/whitespace name rejection, toggling false, failed-save retention, pending protection, exact PUT /evaluation-type/1 {name:"تقييم معدل للاختبار",should_repeat:false}, reload retaining false, cancel, record error/retry, page skeleton and desktop/mobile RTL screenshots. Evidence: evaluation-type-edit-desktop.png, evaluation-type-edit-mobile.png, evaluation-type-edit-loading.png. Live API pending; not fully complete.

### 40. `/evaluation-types/new` — implemented; synthetic browser verification passed

Individually verified name/boolean creation route. No initial remote dependency; local fields stay visible and submission uses the shared pending button. Default repeat policy remains false, matching the original unchecked checkbox. Browser verified required name, enabling repeat, failed save retention, disabled pending checkbox/save, exact POST /new-evaluation-type {name:"نوع تقييم جديد للاختبار",should_repeat:true}, list navigation and cancel, desktop/mobile RTL screenshots. Evidence: evaluation-type-create-desktop.png, evaluation-type-create-mobile.png, evaluation-type-create-saving.png. Production build and targeted lint passed. Live API pending; not fully complete.

### 41. `/governorates` — implemented; synthetic browser verification passed

Audited original ID-based list and country relationship. Visible geographic purpose, native governorate/country links, URL search and country filter, memoized country-name map, shared cached lookup with independent fallback/retry, compact two-column pagination and reusable shimmer. GET cancellation added; no per-row API calls.

Browser verified combined search/country filtering, no-match/clear, page size and next/previous, country and keyboard detail links, create link, independent country failure/retry, governorate failure/retry, empty guidance, page-specific skeleton and desktop/mobile RTL screenshots without overflow. Evidence: governorates-desktop.png, governorates-mobile.png, governorates-loading.png. Live API pending; not fully complete.

### 42. `/governorates/:id` — implemented; synthetic browser verification passed

Preserved GET/DELETE /governorate/:id, name/ID/country data and edit route. Added semantic three-field layout, 44px country link, shared contextual actions, persistent navigation, cancellable query and three-field shimmer. Browser verified country/edit/list destinations, delete cancellation/failure/retry, exact synthetic DELETE /governorate/1, load failure/retry, page skeleton and desktop/mobile RTL screenshots. Evidence: governorate-detail-desktop.png, governorate-detail-mobile.png, governorate-detail-loading.png. Live API pending; not fully complete.

### 43. `/governorates/:id/edit` — implemented; synthetic browser verification passed

Typed two-field form preserves trimmed required name, positive country ID and PUT /governorate/:id. Record/country lookups run in parallel; form mounts after both to retain default selection. Shared two-field shimmer, retained focused save error, pending read-only name/disabled country, explicit empty-country guard, targeted invalidation and cancel navigation.

Browser verified initial country 1, required name/country errors, change to country 2, failed-save retention, pending controls, exact PUT {name:"محافظة معدلة للاختبار",country_id:2}, reopening with country 2, cancel, country lookup failure/retry, loading and desktop/mobile RTL screenshots. Evidence: governorate-edit-desktop.png, governorate-edit-mobile.png, governorate-edit-loading.png. Live API pending; not fully complete.

### 44. `/governorates/new` — implemented; synthetic browser verification passed

Create route individually verified against the isolated API. Preserved POST /new-governorate {name,country_id}, required positive country, trimmed name, no detail GET. Country loading uses the shared two-field shimmer; empty/failing dependency prevents invalid submission and offers recovery.

Browser verified both required fields, chosen country 1, failed and delayed save, exact POST {name:"محافظة جديدة للاختبار",country_id:1}, list navigation, cancel, empty-country disabled save, lookup failure/retry, loading and desktop/mobile RTL screenshots. Evidence: governorate-create-desktop.png, governorate-create-mobile.png, governorate-create-loading.png. Targeted lint and production build passed. Live API pending; not fully complete.

### 45. `/grades` — implemented; synthetic browser verification passed

Audited original list and retained its three summary counts. Fixed numeric zero codes/intervals displaying as missing. Added visible purpose/create action, URL search/order, native record links, compact name/code grouping, cancellable GET and memoized summary/filtering. Shared table shimmer plus existing summary shimmer retained.

Browser verified zero display, search/no-match/clear, sort, page size and next/previous, keyboard detail and creation navigation, failure/retry, empty results, loading, desktop/mobile RTL screenshots. Compacted mobile summaries after visual review. Evidence: grades-desktop.png, grades-mobile.png, grades-loading.png. Live API pending; not fully complete.

### 46. `/grades/:id` — implemented; synthetic browser verification passed

Preserved name/code/interval/ID and GET/DELETE /grade/:id. Four semantic fields retain numeric zero, shared contextual record actions, persistent navigation, cancellable query and four-field skeleton. No unsupported interval unit was invented. Browser verified zero code/interval, edit/list navigation, deletion cancellation/failure/retry, exact synthetic DELETE /grade/1, loading/error recovery, desktop/mobile RTL screenshots. Evidence: grade-detail-desktop.png, grade-detail-mobile.png, grade-detail-loading.png. Live API pending; not fully complete.

## GitHub checkpoint — 10 November 2026

Published at the user's request during the sequential pass. Entries 1–46 have the status recorded above; 42 have synthetic browser verification, and the first four retain their earlier limitations. Grade edit/create implementation is present but not counted as verified: edit validation was checked (required name, integer code, nonnegative interval), and save-failure testing was in progress when publishing was requested. Successful grade PUT/POST, remaining form states and final responsive checks still require verification. Entries 47–141 remain pending completion. Live backend verification remains unavailable for every entry. Local screenshots are intentionally ignored by Git; synthetic fixtures contain no production records or real credentials.
