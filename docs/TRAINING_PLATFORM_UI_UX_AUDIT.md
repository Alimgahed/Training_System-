# Training platform UI/UX audit

Date: 9 November 2026. Original application inspected at `http://172.16.0.35:5173/`; implementation and authenticated validation at `http://127.0.0.1:5174/`.

## Architecture and scope

React 19, TypeScript, Vite, React Router, TanStack Query, Axios, React Hook Form, Zod and Zustand. Arabic is the existing interface language; layouts and tab navigation are RTL. There are 39 feature modules, 115 feature screen components and 141 explicit route patterns, including legacy redirects. Authentication uses the existing `/login` API and session storage. API requests continue through the configured `/api` proxy. Tenant/audit-field stripping, server permissions, payload schemas and endpoints were preserved.

The actual product is a training administration ERP: people, user accounts, organizational hierarchy, course planning, sessions, attendance, learning paths/subjects/terms, evaluation, reports and documents. It is not currently a learner-facing video LMS. No standalone learner profile, self-service enrollment, video player, announcement feed, notification service, certificate issuance or learning-progress service was found. These were not invented.

## Findings and implemented remedies

| Finding | Remedy |
|---|---|
| Large PNG images, one classroom banner repeated across unrelated modules | Eight original editorial training images; local optimized banners and thumbnails, grouped by subject |
| Dashboard lacked an immediate discovery action | Clear course and learning-path actions in a new training hero |
| Nonfunctional course filters/options and mouse-only cards | Real subject/status filters, sorting, reset, pagination and native detail links |
| Course catalog rendered every record | Maximum 12 cards per page; cached data remains intact |
| Empty catalog told users to change filters even when no courses existed | Separate first-course and no-match states |
| Fixed 250–400 px minimum detail columns | Intrinsic minimum `min(100%, …)` in 36 screen layouts |
| Generic record titles | Specific Arabic headings on reference creation/edit forms |
| Mobile search icon was not an actionable opener | Explicit accessible open/close buttons and focus management |
| Mobile drawer lacked keyboard containment | Focus loop, Escape close, opener restoration, hidden closed navigation |
| Off-screen label escaped the user table after data loaded | Positioned table cells contain the accessibility label |
| Decorative login pseudo-element caused horizontal overflow | Removed the oversized decorative rings |
| Duplicate dashboard/list cache entries | Shared cache keys for identical persons/courses/participants/sessions requests |
| All authenticated route infrastructure loaded at login | Lazy authenticated route boundary |

## Inspection evidence and limits

All 42 main navigation destinations were visited. Thirty reachable creation forms were inspected on mobile. Nineteen populated reference details, the employee detail, and seventeen reference edit forms were reviewed without saving. See the screen checklist for route-by-route coverage.

The connected account is an administrator. Successful enrollment, course execution, attendance, evaluation mutation and course-detail data states cannot be certified from this dataset: there are no courses, no training rooms and no trainers. No organization records were created or deleted for this visual task. Non-admin permission behavior was preserved in code but requires accounts for each role to verify end to end.
