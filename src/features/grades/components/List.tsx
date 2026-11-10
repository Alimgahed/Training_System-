import { BadgeCheck, Files, Layers3, Plus, Timer, X } from 'lucide-react';
import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { RecordKpis } from '../../../shared/components/RecordKpis';
import { Table } from '../../../shared/components/Table';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useGrades } from '../api/useListQuery';
import type { Grade } from '../types';
import './directory.css';

export function GradeList() {
  const { data, isLoading, isError, isFetching, refetch } = useGrades();
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
  const summary = useMemo(() => ({ codes:(data||[]).filter(item=>String(item.code??'').trim().length>0).length, intervals:(data||[]).filter(item=>String(item.grade_interval??'').trim().length>0).length }), [data]);
  const columns = [
    { header: 'الدرجة والكود', accessor: (row: Grade) => <div className="grade-identity">{row.id != null ? <Link className="enterprise-record-link" to={`/grades/${row.id}`}>{row.name || 'درجة بدون اسم'}</Link> : row.name || '—'}<small>الكود: <bdi>{row.code ?? 'غير محدد'}</bdi></small></div> },
    { header: 'المدة البينية', accessor: (row: Grade) => <bdi>{row.grade_interval ?? 'غير محددة'}</bdi> },
  ];
  return <div className="enterprise-page grade-directory">
    <header className="enterprise-heading"><div><span className="enterprise-kicker">الموارد البشرية / الدرجات الوظيفية</span><h1>الدرجات الوظيفية</h1><p>راجع أكواد الدرجات الوظيفية ومددها البينية المستخدمة في بيانات الموظفين.</p></div><Link className="enterprise-link-button enterprise-link-button--primary" to="/grades/new"><Plus size={18} aria-hidden="true" />إضافة درجة</Link></header>
    {(!isError || data) && <RecordKpis isLoading={isLoading} items={[
      {label:'إجمالي الدرجات',value:data?.length||0,note:'درجة وظيفية مسجلة',icon:Layers3},
      {label:'لها كود وظيفي',value:summary.codes,note:'درجة لها كود معرّف',icon:BadgeCheck,tone:'green'},
      {label:'مدة بينية محددة',value:summary.intervals,note:'درجة لها مدة بينية',icon:Timer,tone:'purple'},
    ]}/>}
    <Card>
      <div className="enterprise-toolbar">
        <label className="enterprise-field enterprise-field--search">البحث في الدرجات الوظيفية<input type="search" placeholder="اسم الدرجة أو الكود أو رقم السجل" value={search} onChange={event => change('q', event.target.value)} /></label>
        <label className="enterprise-field">ترتيب الدرجات الوظيفية<select value={order} onChange={event => change('order', event.target.value)}><option value="name">الاسم: أ–ي</option><option value="recent">الأحدث أولاً</option></select></label>
        {search && <Button variant="outline" onClick={() => change('q', '')}><X size={16} aria-hidden="true" />مسح البحث</Button>}
      </div>
      <div className="enterprise-results" role="status"><span>{isLoading ? 'جارٍ تحميل الدرجات الوظيفية' : isError && !data ? 'بيانات الدرجات الوظيفية غير متاحة' : `${filtered.length.toLocaleString('ar-EG')} نتيجة من ${(data?.length || 0).toLocaleString('ar-EG')} درجة`}</span>{isFetching && !isLoading && <span>جارٍ التحديث…</span>}</div>
      {isError && <ErrorState title="تعذر تحميل الدرجات الوظيفية" message="تحقق من الاتصال ثم أعد المحاولة. معايير البحث محفوظة." onRetry={() => refetch()} />}
      {isLoading ? <EnterpriseSkeleton columns={2} /> : (!isError || data) && <Table key={`${query}:${order}`} data={filtered} columns={columns} compact showOverview={false} emptyTitle={search ? 'لا توجد درجات مطابقة' : 'لم تُضف درجات بعد'} emptyDescription={search ? 'جرّب اسماً آخر أو امسح البحث لعرض جميع الدرجات الوظيفية.' : 'استخدم «إضافة درجة» لإعداد دليل الدرجات الوظيفية.'} emptyIcon={<Files size={28} aria-hidden="true" />} />}
    </Card>
  </div>;
}
