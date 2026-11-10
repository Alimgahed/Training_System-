import './enterprise.css';
/** Opt-in layout-matched skeletons. Existing pages are unchanged until individually migrated. */
export function EnterpriseSkeleton({ variant = 'table', rows = 6, columns = 3 }: { variant?: 'table' | 'fields' | 'card'; rows?: number; columns?: number }) {
  if (variant === 'card') return <div className="enterprise-skeleton enterprise-skeleton--card" role="status" aria-label="جارٍ تحميل البطاقة" aria-busy="true">{Array.from({length:5},(_,i)=><span key={i} aria-hidden="true"/>)}</div>;
  return <div className={`enterprise-skeleton enterprise-skeleton--${variant}`} role="status" aria-label="جارٍ تحميل البيانات" aria-busy="true">
    {Array.from({ length: variant === 'fields' ? columns : rows + 1 }, (_, row) => <div className="enterprise-skeleton-row" key={row} aria-hidden="true" style={variant === 'table' ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined}>
      {Array.from({ length: variant === 'fields' ? 2 : columns }, (_, column) => <span key={column} />)}
    </div>)}
  </div>;
}
