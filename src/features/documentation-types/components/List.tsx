import { Files, Plus, X } from 'lucide-react';
import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Table } from '../../../shared/components/Table';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useDocumentationTypes } from '../api/useListQuery';
import type { DocumentationType } from '../types';
import './directory.css';

export function DocumentationTypeList() {
  const { data, isLoading, isError, isFetching, refetch } = useDocumentationTypes();
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
    { header: 'نوع الوثيقة', accessor: (row: DocumentationType) => row.id != null ? <Link className="enterprise-record-link" to={`/documentation-types/${row.id}`}>{row.name || 'نوع وثيقة بدون اسم'}</Link> : row.name || '—' },
    { header: 'رقم السجل', accessor: (row: DocumentationType) => <bdi>{row.id?.toLocaleString('ar-EG') ?? '—'}</bdi> },
  ];
  return <div className="enterprise-page document-types-directory">
    <header className="enterprise-heading"><div><span className="enterprise-kicker">الوثائق والأرشفة / البيانات المرجعية</span><h1>أنواع الوثائق</h1><p>نظّم تصنيفات الوثائق المستخدمة في أرشفة المستندات وإصدار الشهادات.</p></div><Link className="enterprise-link-button enterprise-link-button--primary" to="/documentation-types/new"><Plus size={18} aria-hidden="true" />إضافة نوع وثيقة</Link></header>
    <Card>
      <div className="enterprise-toolbar">
        <label className="enterprise-field enterprise-field--search">البحث في أنواع الوثائق<input type="search" placeholder="اسم نوع الوثيقة أو رقم السجل" value={search} onChange={event => change('q', event.target.value)} /></label>
        <label className="enterprise-field">ترتيب أنواع الوثائق<select value={order} onChange={event => change('order', event.target.value)}><option value="name">الاسم: أ–ي</option><option value="recent">الأحدث أولاً</option></select></label>
        {search && <Button variant="outline" onClick={() => change('q', '')}><X size={16} aria-hidden="true" />مسح البحث</Button>}
      </div>
      <div className="enterprise-results" role="status"><span>{isLoading ? 'جارٍ تحميل أنواع الوثائق' : isError && !data ? 'بيانات أنواع الوثائق غير متاحة' : `${filtered.length.toLocaleString('ar-EG')} نتيجة من ${(data?.length || 0).toLocaleString('ar-EG')} نوع وثيقة`}</span>{isFetching && !isLoading && <span>جارٍ التحديث…</span>}</div>
      {isError && <ErrorState title="تعذر تحميل أنواع الوثائق" message="تحقق من الاتصال ثم أعد المحاولة. معايير البحث محفوظة." onRetry={() => refetch()} />}
      {isLoading ? <EnterpriseSkeleton columns={2} /> : (!isError || data) && <Table key={`${query}:${order}`} data={filtered} columns={columns} compact showOverview={false} emptyTitle={search ? 'لا توجد أنواع وثائق مطابقة' : 'لم تُضف أنواع وثائق بعد'} emptyDescription={search ? 'جرّب اسماً آخر أو امسح البحث لعرض جميع أنواع الوثائق.' : 'استخدم «إضافة نوع وثيقة» لإعداد دليل أنواع الوثائق.'} emptyIcon={<Files size={28} aria-hidden="true" />} />}
    </Card>
  </div>;
}
