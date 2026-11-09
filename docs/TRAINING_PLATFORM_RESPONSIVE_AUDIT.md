# Responsive validation

Date: 9 November 2026. Chrome desktop browser with viewport overrides; real Arabic API content. These are browser viewport tests, not physical iOS/Android device certification.

## Coverage

- All 42 main navigation destinations: desktop inspection and 360 px content-overflow check.
- All 30 reachable create forms: 360 px layout inspection.
- Dashboard, courses, course creation, people, person creation, accounts, evaluation and learning paths: five-size matrix, 40 captures.
- Login: desktop, landscape tablet, tablet and both phone sizes.
- Course creation in landscape at an observed 844 × 390 px: no content or page overflow.
- Nineteen populated reference details and seventeen edit forms: desktop; employee detail: 360 px.

Target widths: 1440, 1024, 768, 390, 360. The browser's 80% scale requires calibrated viewport input; actual `innerWidth` was recorded. Tablet checks straddle 768 at 767/769 px due to integer viewport limits; a login landscape sample is 1025 px. The captured dimensions and JSON measurements are the evidence, rather than assuming CSS media queries worked.

## Failures found and repaired

1. Account table's absolute visually hidden label escaped its scroll container after records loaded. Giving table cells a positioning context repaired document overflow at 360 and 390 px. Final matrix has no reported document/content overflow.
2. Login's 620 px decorative pseudo-element caused document overflow on tablets and phones. Removed it; retested all login widths successfully.
3. Legacy detail grids used fixed minimum widths larger than narrow containers. Converted these to intrinsic minimums in 36 screens.

Wide data tables intentionally scroll inside their own labeled table regions. The page itself must not scroll horizontally. Long real department options and Arabic headings were exercised. Mobile search and sidebar were tested with keyboard and touch-sized controls. Large-text and physical-device testing remain separate follow-up validation; they are not claimed here.

## Evidence

`docs/screenshots/transformation/` contains the screenshot matrix, `responsive.json`, `mobile-routes.json`, `mobile-forms.json`, `login.json`, `details.json` and `edit-forms.json`. The pre-fix matrix is retained separately. Screenshots and raw API-derived inspection evidence remain git-ignored to avoid committing organization data.

Final capture integrity: viewport dimensions were checked against the requested size before saving; incorrectly targeted intermediate captures were replaced. Final application matrix observed widths are 1440, 1024, 767, 390 and 360 px.
