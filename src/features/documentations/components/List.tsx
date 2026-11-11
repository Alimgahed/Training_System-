import { Plus, X } from 'lucide-react';
import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { Table } from '../../../shared/components/Table';
import { ErrorState } from '../../../shared/components/ErrorState';
import { useDocumentationTypes } from '../../documentation-types/api/useListQuery';
import { useDocumentations } from '../api/useListQuery';
import type { Documentation } from '../types';
import './archive.css';
const empty: Documentation[] = [];
export function DocumentationList() {
  const { data, isLoading, isError, isFetching, refetch } = useDocumentations();
  const types = useDocumentationTypes();
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const type = params.get('type') || '';
  const file = params.get('file') || '';
  const query = useDeferredValue(search.trim().toLocaleLowerCase('ar'));
  const documents = data || empty;
  const typeNames = useMemo(() => new Map(types.data?.map(item => [String(item.id), item.name || `نوع #${item.id}`])), [types.data]);
  const typeIds = useMemo(() => [...new Set([...documents.map(item => String(item.documentation_type_id ?? '')).filter(Boolean), ...(type ? [type] : [])])].sort((a,b)=>Number(a)-Number(b)), [documents,type]);
  const visible = useMemo(() => documents.filter(item => (!query || `${item.name || ''} ${item.file_path || ''} ${item.course_id ?? ''}`.toLocaleLowerCase('ar').includes(query)) && (!type || String(item.documentation_type_id) === type) && (!file || (file === 'missing' ? !item.file_path?.trim() : !!item.file_path?.trim()))), [documents,query,type,file]);
  const change = (key:string,value:string) => setParams(current => { const next=new URLSearchParams(current); if(value)next.set(key,value);else next.delete(key);if(key!=='page')next.delete('page');return next; },{replace:true});
  return <div className="enterprise-page archive-directory">
    <header className="enterprise-heading"><div><span className="enterprise-kicker">الوثائق والأرشفة / السجل المركزي</span><h1>الوثائق والمستندات</h1><p>ابحث عن الوثائق المرتبطة بالتدريب وراجع تصنيفها ومسار ملفها.</p></div><Link className="enterprise-link-button enterprise-link-button--primary" to="/documentations/new"><Plus size={18} aria-hidden="true"/>إضافة وثيقة</Link></header>
    <Card><div className="enterprise-toolbar"><label className="enterprise-field enterprise-field--search">البحث في الوثائق<input type="search" value={search} onChange={event=>change('q',event.target.value)} placeholder="اسم الوثيقة أو مسار الملف أو رقم الدورة"/></label><label className="enterprise-field">نوع الوثيقة<select value={type} onChange={event=>change('type',event.target.value)}><option value="">كل الأنواع</option>{typeIds.map(id=><option key={id} value={id}>{typeNames.get(id)||`نوع #${id}`}</option>)}</select></label><label className="enterprise-field">مسار الملف<select value={file} onChange={event=>change('file',event.target.value)}><option value="">كل الوثائق</option><option value="present">مسار مسجّل</option><option value="missing">بدون مسار</option></select></label>{(search||type||file)&&<Button variant="outline" onClick={()=>setParams(current=>{const next=new URLSearchParams(current);['q','type','file','page'].forEach(key=>next.delete(key));return next;},{replace:true})}><X size={16} aria-hidden="true"/>مسح التصفية</Button>}</div><div className="enterprise-results" role="status"><span>{isLoading?'جارٍ تحميل الوثائق':isError&&!data?'الوثائق غير متاحة':`${visible.length.toLocaleString('ar-EG')} نتيجة من ${documents.length.toLocaleString('ar-EG')} وثيقة`}</span>{isFetching&&!isLoading&&<span>جارٍ التحديث…</span>}</div>{types.isError&&<div className="archive-lookup-error" role="status">تعذر تحميل أسماء الأنواع؛ تظهر أرقامها مؤقتاً. <Button variant="ghost" onClick={()=>types.refetch()}>إعادة تحميل الأنواع</Button></div>}</Card>
    {isError&&<ErrorState title="تعذر تحميل الوثائق" message="معايير البحث محفوظة. تحقق من الاتصال وأعد المحاولة." onRetry={()=>refetch()}/>}
    {(!isError || data) && <section className="sheet-panel"><Table page={Number(params.get('page')) || 1} onPageChange={page => change('page', String(page))} key={`${query}:${type}:${file}`} data={visible} isLoading={isLoading} compact showOverview={false} emptyTitle="لا توجد وثائق مطابقة" columns={[
{header:'رقم الوثيقة',accessor:'id'},
{header:'اسم الوثيقة',accessor:row=>row.id!=null?<Link to={`/documentations/${row.id}`}>{row.name||'—'}</Link>:row.name||'—'},
{header:'نوع الوثيقة',accessor:row=>typeNames.get(String(row.documentation_type_id))||'—'},
{header:'مسار الملف',accessor:row=><bdi>{row.file_path||'—'}</bdi>},
{header:'الدورة',accessor:row=>row.course_id!=null?<Link to={`/courses/${row.course_id}`}>#{row.course_id}</Link>:'—'},
]} /></section>}
  </div>;
}
