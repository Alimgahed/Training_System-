import { Building2, Search, X } from 'lucide-react';
import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Table } from '../../../shared/components/Table';
import { useClients } from '../api/useListQuery';
import type { Client } from '../types';
import './clients.css';

export function ClientList() {
  const { data, isLoading, isError, isFetching, refetch } = useClients();
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const deferredSearch = useDeferredValue(search.trim().toLocaleLowerCase('ar'));
  const sort = params.get('sort') || 'name';
  const updateFilter = (key: string, value: string) => setParams(current => {
    const next = new URLSearchParams(current);
    if (value) next.set(key, value); else next.delete(key);
    return next;
  }, { replace: true });
  const filtered = useMemo(() => (data || [])
    .filter(item => !deferredSearch || Object.values(item).some(value => String(value ?? '').toLocaleLowerCase('ar').includes(deferredSearch)))
    .sort((a, b) => sort === 'id' ? Number(b.id || 0) - Number(a.id || 0) : String(a.name || '').localeCompare(String(b.name || ''), 'ar', { numeric: true })), [data, deferredSearch, sort]);
  const columns = [
    { header: 'اسم العميل', accessor: (row: Client) => row.id != null ? <Link className="client-record-link" to={`/clients/${row.id}`}>{row.name || 'عميل بدون اسم'}</Link> : <span>{row.name || 'عميل بدون اسم'}</span> },
    { header: 'رقم السجل', accessor: (row: Client) => <bdi>{row.id?.toLocaleString('ar-EG') ?? '—'}</bdi> },
  ];
  return <div className="clients-page">
    <header className="clients-heading"><div><h1>العملاء</h1><p>دليل الجهات المسجلة. افتح اسم العميل للاطلاع على بياناته الأساسية.</p></div><Building2 size={28} aria-hidden="true" /></header>
    <Card>
      <div className="clients-toolbar">
        <label className="clients-search">البحث في العملاء<div><Search size={18} aria-hidden="true" /><input type="search" value={search} onChange={event => updateFilter('q', event.target.value)} placeholder="اسم العميل أو رقم السجل" /></div></label>
        <label className="clients-order">ترتيب النتائج<select value={sort} onChange={event => updateFilter('sort', event.target.value)}><option value="name">الاسم: أ–ي</option><option value="id">رقم السجل: الأحدث أولاً</option></select></label>
        {search && <Button variant="outline" onClick={() => updateFilter('q', '')}><X size={16} aria-hidden="true" />مسح البحث</Button>}
      </div>
      <p className="clients-result-count" role="status">{isLoading ? 'جارٍ تحميل دليل العملاء' : isError && !data ? 'تعذر تحميل دليل العملاء' : `${filtered.length.toLocaleString('ar-EG')} نتيجة من ${(data?.length || 0).toLocaleString('ar-EG')} عميل`}{isFetching && !isLoading ? ' · جارٍ التحديث' : ''}</p>
      {isError && <ErrorState title="تعذر تحديث بيانات العملاء" message="تحقق من الاتصال ثم أعد المحاولة. احتفظنا بمعايير البحث الحالية." onRetry={() => refetch()} />}
      {isLoading ? <div className="clients-list-skeleton" aria-label="جارٍ تحميل العملاء" role="status">{Array.from({length:6},(_,i)=><div key={i} aria-hidden="true"><span /><span /></div>)}</div> : (!isError || data) && <Table key={`${deferredSearch}:${sort}`} data={filtered} columns={columns} compact showOverview={false} emptyTitle={search ? 'لا توجد نتائج مطابقة' : 'لا يوجد عملاء مسجلون'} emptyDescription={search ? 'جرّب اسمًا آخر أو امسح البحث لعرض جميع العملاء.' : 'ستظهر الجهات هنا عند توفر بيانات العملاء في النظام.'} emptyIcon={<Building2 size={28} aria-hidden="true" />} />}
    </Card>
  </div>;
}
