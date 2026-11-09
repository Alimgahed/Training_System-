/** Opt-in local diagnostics: ?measure=1. Never enabled in production builds. */
export function measurePerformance() {
  let lcp = 0;
  let cls = 0;
  let windowScore = 0;
  let windowStart = 0;
  let lastShift = 0;
  let longestInteraction = 0;
  const observers: PerformanceObserver[] = [];
  function observe(type: string, callback: (entries: PerformanceEntry[]) => void) {
    if (!PerformanceObserver.supportedEntryTypes.includes(type)) return;
    const observer = new PerformanceObserver(list => callback(list.getEntries()));
    observer.observe({ type, buffered: true });
    observers.push(observer);
  }
  observe('largest-contentful-paint', entries => { lcp = entries.at(-1)?.startTime ?? lcp; });
  observe('layout-shift', entries => {
    for (const raw of entries) {
      const entry = raw as PerformanceEntry & { hadRecentInput: boolean; value: number };
      if (entry.hadRecentInput) continue;
      if (entry.startTime - lastShift > 1000 || entry.startTime - windowStart > 5000) {
        windowScore = 0;
        windowStart = entry.startTime;
      }
      windowScore += entry.value;
      lastShift = entry.startTime;
      cls = Math.max(cls, windowScore);
    }
  });
  observe('event', entries => { for (const entry of entries) longestInteraction = Math.max(longestInteraction, entry.duration); });
  const timer = window.setTimeout(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    console.info('[training-performance]', JSON.stringify({
      sample: 'development, first five seconds; not a field CWV score',
      lcpMs: Math.round(lcp), cls: Number(cls.toFixed(4)),
      longestObservedEventMs: longestInteraction || null,
      domContentLoadedMs: Math.round(navigation?.domContentLoadedEventEnd ?? 0),
      resources: performance.getEntriesByType('resource').length,
    }));
    observers.forEach(observer => observer.disconnect());
  }, 5000);
  return () => { window.clearTimeout(timer); observers.forEach(observer => observer.disconnect()); };
}
