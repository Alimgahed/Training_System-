import { Files, Plus, X } from 'lucide-react';
import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Table } from '../../../shared/components/Table';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useEvaluationTypes } from '../api/useListQuery';
import type { EvaluationType } from '../types';
import './directory.css';

export function EvaluationTypeList() {
  const { data, isLoading, isError, isFetching, refetch } = useEvaluationTypes();
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const order = params.get('order') || 'name';
  const query = useDeferredValue(search.trim().toLocaleLowerCase('ar'));
  const change = (key: string, value: string) => setParams(current => {
    const next = new URLSearchParams(current);
    if (value) next.set(key, value); else next.delete(key);
    return next;
  }, { replace: true });
  const filtered = useMemo(() => (data || []).filter(item => !query || Object.values(item).some(value => String(value ?? '').toLocaleLowerCase('ar').includes(query)))
    .sort((a, b) => order === 'recent' ? Number(b.id || 0) - Number(a.id || 0) : String(a.name || '').localeCompare(String(b.name || ''), 'ar', { numeric: true })), [data, query, order]);
  const columns = [
    { header: 'نوع التقييم', accessor: (row: EvaluationType) => row.id != null ? <Link className="enterprise-record-link" to={`/evaluation-types/${row.id}`}>{row.name || 'نوع تقييم بدون اسم'}</Link> : row.name || '—' },
    { header: 'إعادة الدورة', accessor: (row: EvaluationType) => row.should_repeat == null ? 'غير محدد' : row.should_repeat ? 'مطلوبة' : 'غير مطلوبة' },
  ];
  return <div className="enterprise-page evaluation-types-directory">
    <header className="enterprise-heading"><div><span className="enterprise-kicker">شئون المتدربين / إعدادات التقييم</span><h1>أنواع التقييم</h1><p>نظّم أنواع التقييم وراجع سياسة إعادة الدورة عند عدم الاجتياز.</p></div><Link className="enterprise-link-button enterprise-link-button--primary" to="/evaluation-types/new"><Plus size={18} aria-hidden="true" />إضافة نوع تقييم</Link></header>
    <Card>
      <div className="enterprise-toolbar">
        <label className="enterprise-field enterprise-field--search">البحث في أنواع التقييم<input type="search" placeholder="اسم نوع التقييم أو رقم السجل" value={search} onChange={event => change('q', event.target.value)} /></label>
        <label className="enterprise-field">ترتيب أنواع التقييم<select value={order} onChange={event => change('order', event.target.value)}><option value="name">الاسم: أ–ي</option><option value="recent">الأحدث أولاً</option></select></label>
        {search && <Button variant="outline" onClick={() => change('q', '')}><X size={16} aria-hidden="true" />مسح البحث</Button>}
      </div>
      <div className="enterprise-results" role="status"><span>{isLoading ? 'جارٍ تحميل أنواع التقييم' : isError && !data ? 'بيانات أنواع التقييم غير متاحة' : `${filtered.length.toLocaleString('ar-EG')} نتيجة من ${(data?.length || 0).toLocaleString('ar-EG')} نوع تقييم`}</span>{isFetching && !isLoading && <span>جارٍ التحديث…</span>}</div>
      {isError && <ErrorState title="تعذر تحميل أنواع التقييم" message="تحقق من الاتصال ثم أعد المحاولة. معايير البحث محفوظة." onRetry={() => refetch()} />}
      {isLoading ? <EnterpriseSkeleton columns={2} /> : (!isError || data) && <Table key={`${query}:${order}`} data={filtered} columns={columns} compact showOverview={false} emptyTitle={search ? 'لا توجد أنواع تقييم مطابقة' : 'لم تُضف أنواع تقييم بعد'} emptyDescription={search ? 'جرّب اسماً آخر أو امسح البحث لعرض جميع أنواع التقييم.' : 'استخدم «إضافة نوع تقييم» لإعداد دليل أنواع التقييم.'} emptyIcon={<Files size={28} aria-hidden="true" />} />}
    </Card>
  </div>;
}
