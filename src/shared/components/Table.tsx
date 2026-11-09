import { BadgeCheck,CheckCircle2,CircleAlert,Database,Link2,Users,XCircle } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EmptyState } from './EmptyState';
import { LoadingSkeleton } from './LoadingSkeleton';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: string;
  align?: 'right' | 'center' | 'left';
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: React.ReactNode;
  compact?: boolean;
  showOverview?: boolean;
}

export function Table<T extends Record<string, any>>({ columns, data, isLoading, onRowClick, emptyTitle, emptyDescription, emptyIcon, compact = false, showOverview = compact }: TableProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState<{ index: number; descending: boolean } | null>(null);
  const sorted = useMemo(() => {
    if (!sort) return data || [];
    const accessor = columns[sort.index]?.accessor;
    if (!accessor || typeof accessor === 'function') return data || [];
    return [...(data || [])].sort((a, b) => {
      const left = a[accessor]; const right = b[accessor];
      const value = typeof left === 'number' && typeof right === 'number'
        ? left - right : String(left ?? '').localeCompare(String(right ?? ''), 'ar', { numeric: true });
      return sort.descending ? -value : value;
    });
  }, [data, columns, sort]);
  const pages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visibleRows = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  if (isLoading) {
    return <LoadingSkeleton variant="table" rows={6} />;
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle || 'لا توجد بيانات'}
        description={emptyDescription || 'لم يتم العثور على أي سجلات لعرضها.'}
      />
    );
  }

  const sample = data[0];
  const overview = showOverview ? (() => {
    const hasActiveState = typeof sample.is_active === 'boolean';
    const hasCourseState = typeof sample.is_executed === 'boolean' || typeof sample.is_planned === 'boolean';
    const codeField = Object.prototype.hasOwnProperty.call(sample, 'code');
    const relationField = Object.keys(sample).find(key => key.endsWith('_id') && key !== 'client_id' && key !== 'id');
    const metrics = [{ label: 'إجمالي السجلات', value: data.length, note: 'ضمن النتائج الحالية', icon: Database, tone: 'blue' }];

    if (hasActiveState) {
      metrics.push({ label: 'نشط', value: data.filter(row => row.is_active === true).length, note: 'حالة السجل', icon: CheckCircle2, tone: 'green' });
      metrics.push({ label: 'غير نشط', value: data.filter(row => row.is_active === false).length, note: 'حالة السجل', icon: XCircle, tone: 'gold' });
    } else if (hasCourseState) {
      metrics.push({ label: 'دورات منفذة', value: data.filter(row => row.is_executed === true).length, note: 'بحسب حالة التنفيذ', icon: CheckCircle2, tone: 'green' });
      metrics.push({ label: 'دورات مخططة', value: data.filter(row => row.is_planned === true && row.is_executed !== true).length, note: 'بحسب حالة التخطيط', icon: Users, tone: 'purple' });
    } else {
      if (codeField) {
        metrics.push({ label: 'لها كود', value: data.filter(row => Boolean(String(row.code ?? '').trim())).length, note: 'كود معرّف مسجل', icon: BadgeCheck, tone: 'green' });
        metrics.push({ label: 'بدون كود', value: data.filter(row => !String(row.code ?? '').trim()).length, note: 'تحتاج استكمال بيانات', icon: CircleAlert, tone: 'gold' });
      }
      if (relationField) {
        metrics.push({ label: 'مرتبطة بسجل', value: data.filter(row => row[relationField] !== null && row[relationField] !== undefined && row[relationField] !== '').length, note: 'ارتباط مسجل في النظام', icon: Link2, tone: 'green' });
        metrics.push({ label: 'بدون ارتباط', value: data.filter(row => row[relationField] === null || row[relationField] === undefined || row[relationField] === '').length, note: 'بحسب بيانات الموديل', icon: CircleAlert, tone: 'gold' });
      }
    }
    return metrics;
  })() : [];

  return (
    <>
    {overview.length > 0 && <section className="ui-table-overview" aria-label="ملخص النتائج">
      {overview.map(({ label, value, note, icon: Icon, tone }) => <article className={`ui-table-overview__item ui-table-overview__item--${tone}`} key={label}>
        <span className="ui-table-overview__icon"><Icon size={19} aria-hidden="true" /></span>
        <div><span className="ui-table-overview__label">{label}</span><strong>{value}</strong><small>{note}</small></div>
      </article>)}
    </section>}
    <div className={`ui-table-wrap ${compact ? 'is-compact' : ''}`}>
      <table className={`ui-table ${columns.length <= 4 ? 'ui-table--narrow' : ''}`}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col" aria-sort={sort?.index === index ? (sort.descending ? 'descending' : 'ascending') : undefined} style={{ textAlign: col.align || 'right', width: col.width }}>
                {typeof col.accessor !== 'function' && col.sortable !== false ? <button type="button" className="table-sort" onClick={() => { setSort({ index, descending: sort?.index === index ? !sort.descending : false }); setPage(1); }}>{col.header}{sort?.index === index ? (sort.descending ? ' ↓' : ' ↑') : ''}</button> : col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row, rowIndex) => (
            <tr
              key={row.id ?? rowIndex}
              onClick={() => onRowClick?.(row)}
              tabIndex={onRowClick ? 0 : undefined}
              aria-label={onRowClick ? 'فتح تفاصيل السجل' : undefined}
              onKeyDown={onRowClick ? (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onRowClick(row); } } : undefined}
              className={onRowClick ? 'is-clickable' : undefined}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} style={{ whiteSpace: col.width ? 'nowrap' : 'normal', textAlign: col.align || 'right' }}>
                  {typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <nav className="table-pagination" aria-label="صفحات الجدول">
      <span aria-live="polite">{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, sorted.length)} من {sorted.length}</span>
      <label>صفوف الصفحة <select value={pageSize} onChange={event => { setPageSize(Number(event.target.value)); setPage(1); }}>{[10, 20, 50, 100].map(size => <option key={size} value={size}>{size}</option>)}</select></label>
      <button type="button" aria-label="الصفحة السابقة" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><ChevronRight size={18} /></button>
      <span>{currentPage} / {pages}</span>
      <button type="button" aria-label="الصفحة التالية" disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}><ChevronLeft size={18} /></button>
    </nav>
    </>
  );
}
