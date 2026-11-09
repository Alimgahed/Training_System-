import type { LucideIcon } from 'lucide-react';
import { LoadingSkeleton } from './LoadingSkeleton';

export interface RecordKpiItem {
  label: string;
  value: number;
  note: string;
  icon: LucideIcon;
  tone?: 'blue' | 'green' | 'gold' | 'purple';
}

export function RecordKpis({ items, isLoading = false }: { items: RecordKpiItem[]; isLoading?: boolean }) {
  if (isLoading) return <LoadingSkeleton variant="stat" rows={items.length} />;
  return (
    <section className="record-kpis" aria-label="ملخص بيانات الشاشة">
      {items.map(({ label, value, note, icon: Icon, tone = 'blue' }) => (
        <article className={`record-kpi record-kpi--${tone}`} key={label}>
          <div className="record-kpi__copy">
            <h2>{label}</h2>
            <strong>{value}</strong>
            <p>{note}</p>
          </div>
          <span className="record-kpi__icon"><Icon size={23} aria-hidden="true" /></span>
        </article>
      ))}
    </section>
  );
}
