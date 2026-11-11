import { Eye, GraduationCap, ListFilter, Plus, Search } from 'lucide-react';
import { useDeferredValue } from 'react';
import type { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ErrorState } from './ErrorState';
import { Table, type Column } from './Table';
import './training-workspace.css';

// Search scalar API fields, including nested relationship names.
function searchable(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'object') return Object.values(value).map(searchable).join(' ');
  return String(value);
}
export function TrainingDirectory<T extends { id?: number }>({ title, description, resource, data = [], isLoading, isError, retry, columns, links }: {
  title: string; description: string; resource: string; data?: T[]; isLoading: boolean; isError: boolean;
  retry: () => unknown; columns: Column<T>[]; links?: ReactNode;
}) {
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const query = useDeferredValue(search.trim().toLocaleLowerCase('ar'));
  const order = params.get('order') === 'asc' ? 'asc' : 'desc';
  const change = (key: string, value: string) => setParams(current => { const next = new URLSearchParams(current); if(value) next.set(key,value); else next.delete(key); if(key !== 'page') next.delete('page'); return next; }, {replace:true});
  const visible = data.filter(row => !query || searchable(row).toLocaleLowerCase('ar').includes(query)).sort((a,b) => ((a.id ?? 0)-(b.id ?? 0))*(order==='asc'?1:-1));
  const tableColumns: Column<T>[] = [{header:'#',accessor:row=>row.id??'—',width:'80px'}, ...columns, {header:'إجراءات',accessor:row=>row.id==null?'—':<Link className="training-row-action" to={`/${resource}/${row.id}`} aria-label={`عرض السجل ${row.id}`}><Eye size={18} aria-hidden="true"/>عرض</Link>}];
  return <div className="enterprise-page training-workspace">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">الرئيسية</Link><span>‹</span><span>إدارة التدريب</span><span>‹</span><strong aria-current="page">{title}</strong></nav>
    <header className="enterprise-heading"><div className="training-page-title"><span className="training-page-icon"><GraduationCap size={28} aria-hidden="true"/></span><div><h1>{title}</h1><p>{description}</p></div></div><Link className="enterprise-link-button enterprise-link-button--primary" to={`/${resource}/new`}><Plus size={18} aria-hidden="true"/>إضافة سجل</Link></header>
    {links && <nav className="training-related-links" aria-label="التنقل بين المسارات والمواد">{links}</nav>}
    <section className="training-directory-toolbar" aria-label="بحث وتصفية السجلات">
      <label className="training-search"><span>البحث في {title}</span><div><Search size={18} aria-hidden="true"/><input type="search" value={search} placeholder="ابحث بالاسم أو الكود أو البيانات المرتبطة" onChange={e=>change('q',e.target.value)}/></div></label>
      <label className="training-sort">ترتيب السجلات<select value={order} onChange={e=>change('order',e.target.value)}><option value="desc">الأحدث أولاً</option><option value="asc">الأقدم أولاً</option></select></label>
      <span className="training-result-count" role="status"><ListFilter size={18} aria-hidden="true"/>{isLoading?'جارٍ التحميل…':isError?'البيانات غير متاحة':`${visible.length} من ${data.length} سجل`}</span>
      {search && <button type="button" className="text-action" onClick={()=>change('q','')}>مسح البحث</button>}
    </section>
    {isError?<ErrorState onRetry={()=>retry()}/>:<section className="sheet-panel"><Table key={`${query}:${order}`} page={Number(params.get('page'))||1} onPageChange={page=>change('page',String(page))} columns={tableColumns} data={visible} isLoading={isLoading} compact showOverview={false} emptyTitle={search?'لا توجد نتائج مطابقة':'لا توجد سجلات بعد'} emptyDescription={search?'غيّر كلمات البحث أو امسح البحث لعرض السجلات.':'أضف أول سجل باستخدام زر الإضافة أعلى الشاشة.'}/></section>}
  </div>;
}
