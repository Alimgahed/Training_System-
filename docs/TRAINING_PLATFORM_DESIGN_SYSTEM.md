# Training platform design system

## Direction

Professional development for the Minia water utility: practical training imagery, a restrained deep-blue/teal palette and an Arabic-first interface. Preserve the organization logo. Use photography as the memorable element and keep operational controls quiet and compact.

| Token | Value | Role |
|---|---|---|
| Deep blue | `#103746` | Navigation and hero foundation |
| Teal | `#076e78` | Primary actions and active controls |
| Gold | `#c6a35a` / `#e8cc8b` | Organizational accent and hero CTA |
| Canvas | `#f2f6f7` | Page background |
| Ink | `#173747` | Main text |
| Secondary ink | `#4f6875` | Supporting text |
| Border | `#d6e2e6` | Structural separation |

Tajawal remains the Arabic family, with system sans-serif fallbacks. Google Fonts uses `display=swap`; preconnects are included. Body text is 16 px; compact supporting text is 12–14 px; page headings are 25–34 px and the hero uses 28–42 px. Text remains in HTML, never baked into generated images.

## Layout and components

The RTL shell uses a 250 px desktop sidebar, a bounded 1440 px content area and a mobile drawer below 820 px. Spacing follows 4/8/12/16/20/24/32 px intervals. Field controls and primary actions target at least 44 px height. Forms retain their existing fields, dependencies, validation and submit handlers; multi-column grids become single columns on phones.

Course catalog: three/two/one columns, 16:9 cover boxes, subject labels only where returned by the API, real status/duration/participant/date values, native route links and 12-record pages. Native selects provide accessible filtering and ordering. No ratings, prices, instructor names or progress were fabricated.

Reference lists and detail headers inherit module-specific banner images from the shell. Course detail headers select artwork from their title. Learning paths and subject rows use matching category thumbnails. Generated photography is editorial illustration, not a representation of actual instructors, venues or participants.

## Assets

Eight images were generated with the built-in imagegen tool: professional development hero, technical practice, digital skills, leadership, teamwork, classroom/workshops, online learning and certification. Each has a banner and 640 px derivative in `public/training/`; the existing logo also has a 256 px optimized derivative. JPEG was chosen for local photo delivery with the available encoder; transparent logo remains PNG. Desktop images are 1200 px wide (hero 1440 px); mobile banners use the smaller versions. Course images reserve aspect ratio and use lazy loading and asynchronous decoding.

Exact prompts, generation method, filenames and usage are in `public/training/manifest.json`. There is no announcement feature to attach an announcement banner to; the dashboard hero is the existing featured-program entry point.

## Accessibility

Preserve semantic headings, labels, table scrolling, accessible tab behavior and API error messages. Native links replace pointer-only course/path/document/session cards. Closed mobile navigation is not keyboard reachable. Drawer focus loops, Escape closes it, and focus returns to the opener. All animation and transition rules honor reduced motion. Login remains usable without decorative artwork. New theme rules live in `src/training-theme.css`, after the legacy stylesheet, to preserve existing component contracts.
