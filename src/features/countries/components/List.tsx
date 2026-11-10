import { Globe2, Plus, X } from 'lucide-react';
import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Table } from '../../../shared/components/Table';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useCountrys } from '../api/useListQuery';
import type { Country } from '../types';

export function CountryList() {
  const { data, isLoading, isError, isFetching, refetch } = useCountrys();
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
    { header: 'الدولة', accessor: (row: Country) => row.id != null ? <Link className="enterprise-record-link" to={`/countries/${row.id}`}>{row.name || 'دولة بدون اسم'}</Link> : row.name || '—' },
    { header: 'رقم السجل', accessor: (row: Country) => <bdi>{row.id?.toLocaleString('ar-EG') ?? '—'}</bdi> },
  ];
  return <div className="enterprise-page">
    <header className="enterprise-heading"><div><span className="enterprise-kicker">الإعدادات العامة / البيانات الجغرافية</span><h1>الدول</h1><p>أدر الدول المرجعية المستخدمة في المحافظات وبيانات المواقع.</p></div><Link className="enterprise-link-button enterprise-link-button--primary" to="/countries/new"><Plus size={18} aria-hidden="true" />إضافة دولة</Link></header>
    <Card>
      <div className="enterprise-toolbar">
        <label className="enterprise-field enterprise-field--search">البحث في الدول<input type="search" placeholder="اسم الدولة أو رقم السجل" value={search} onChange={event => change('q', event.target.value)} /></label>
        <label className="enterprise-field">ترتيب الدول<select value={order} onChange={event => change('order', event.target.value)}><option value="name">الاسم: أ–ي</option><option value="recent">الأحدث أولاً</option></select></label>
        {search && <Button variant="outline" onClick={() => change('q', '')}><X size={16} aria-hidden="true" />مسح البحث</Button>}
      </div>
      <div className="enterprise-results" role="status"><span>{isLoading ? 'جارٍ تحميل الدول' : isError && !data ? 'بيانات الدول غير متاحة' : `${filtered.length.toLocaleString('ar-EG')} نتيجة من ${(data?.length || 0).toLocaleString('ar-EG')} دولة`}</span>{isFetching && !isLoading && <span>جارٍ التحديث…</span>}</div>
      {isError && <ErrorState title="تعذر تحميل الدول" message="تحقق من الاتصال ثم أعد المحاولة. معايير البحث محفوظة." onRetry={() => refetch()} />}
      {isLoading ? <EnterpriseSkeleton columns={2} /> : (!isError || data) && <Table key={`${query}:${order}`} data={filtered} columns={columns} compact showOverview={false} emptyTitle={search ? 'لا توجد دول مطابقة' : 'لم تُضف دول بعد'} emptyDescription={search ? 'جرّب اسماً آخر أو امسح البحث لعرض جميع الدول.' : 'استخدم «إضافة دولة» لإعداد الدليل الجغرافي.'} emptyIcon={<Globe2 size={28} aria-hidden="true" />} />}
    </Card>
  </div>;
}
