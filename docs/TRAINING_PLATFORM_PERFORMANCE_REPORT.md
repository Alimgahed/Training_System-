# Performance report

## Reproducible build comparison

The initial clean HEAD was rebuilt in `/tmp/training-ui-baseline` using the same installed dependencies. Both builds succeeded. `scripts/measure-training-assets.mjs` follows static imports from the HTML entry, excludes dynamic route imports, and reports raw and gzip sizes. No Lighthouse score is invented.

| Metric | Before | After |
|---|---:|---:|
| Initial static JS graph (bytes) | 526,458 | 371,498 |
| Initial JS graph, gzip (bytes) | 160,097 | 115,418 |
| Entry JS file (bytes) | 440,263 | 293,935 |
| All JS chunks (bytes) | 864,981 | 890,568 |
| CSS (bytes) | 83,177 | 94,903 |

Initial JavaScript decreased by 29.4% raw and 27.9% gzip. This is the unauthenticated bootstrap dependency graph. Authenticated users then download their route chunks. Total JS and CSS increased because the implementation adds filtering, accessibility, image selection and responsive rules; the table makes that cost explicit.

## Images and requests

| Asset | Before bytes | After bytes |
|---|---:|---:|
| Dashboard hero | 2,047,215 | 231,667 |
| Login banner | 1,755,950 | 191,003 |
| Organization logo | 1,046,667 | 75,508 |

Mobile hero: 58,395 bytes. Card thumbnails range from 47,890 to 71,790 bytes. Images are local with explicit aspect ratios; card images are lazy. Old assets remain on disk for compatibility but redesigned surfaces reference optimized files.

Four dashboard resources now use the same query keys as their list screens. Within the existing 30-second stale window, switching to those lists reuses the cached response. No API contract or retry behavior changed. Catalog DOM is bounded to twelve cards per page; render regression verifies 25 isolated fixture records produce 12 cards, without putting fixtures in the application or API.

## Browser measurement

A single authenticated desktop development sample with a warm browser cache recorded LCP **680 ms**, CLS **0.0004**, and DOMContentLoaded **185 ms**. There was no recorded qualifying interaction in that five-second sample, so interaction duration is `null`, not zero. This is not an INP score, field telemetry, or a cold production benchmark. A comparable pre-change LCP/CLS sample was not captured; no before/after claim is made for those metrics.

Opt-in diagnostics are in `src/core/measurePerformance.ts`, enabled only in development by `?measure=1`. They log a five-second sample and disconnect observers. Production builds exclude this path. Browser evidence is in `performance-browser.json`; build measurements are in `build-comparison.json`.

Route navigation, search, filter reset, keyboard drawer behavior and form validation were exercised interactively. Millisecond route-transition/interaction comparisons and large-list browser profiling remain unmeasured. Backend latency, cold-network performance and physical mobile device performance require a deployment-representative follow-up.
