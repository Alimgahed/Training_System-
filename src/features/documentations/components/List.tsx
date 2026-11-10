import { ChevronLeft, ChevronRight, FileText, Plus, X } from 'lucide-react';
import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useDocumentationTypes } from '../../documentation-types/api/useListQuery';
import { useDocumentations } from '../api/useListQuery';
import type { Documentation } from '../types';
import './archive.css';
const empty: Documentation[] = [];
function extension(path?: string | null) {
  const match = path?.split(/[?#]/)[0].match(/\.([a-z0-9]{1,8})$/i);
  return match ? match[1].toUpperCase() : 'ملف';
}
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
  const pages = Math.max(1, Math.ceil(visible.length / 12));
  const requested = Number(params.get('page')) || 1;
  const page = Math.max(1, Math.min(pages, Number.isFinite(requested) ? Math.floor(requested) : 1));
  const change = (key:string,value:string) => setParams(current => { const next=new URLSearchParams(current); if(value)next.set(key,value);else next.delete(key);if(key!=='page')next.delete('page');return next; },{replace:true});
  return <div className="enterprise-page archive-directory">
    <header className="enterprise-heading"><div><span className="enterprise-kicker">الوثائق والأرشفة / السجل المركزي</span><h1>الوثائق والمستندات</h1><p>ابحث عن الوثائق المرتبطة بالتدريب وراجع تصنيفها ومسار ملفها.</p></div><Link className="enterprise-link-button enterprise-link-button--primary" to="/documentations/new"><Plus size={18} aria-hidden="true"/>إضافة وثيقة</Link></header>
    <Card><div className="enterprise-toolbar"><label className="enterprise-field enterprise-field--search">البحث في الوثائق<input type="search" value={search} onChange={event=>change('q',event.target.value)} placeholder="اسم الوثيقة أو مسار الملف أو رقم الدورة"/></label><label className="enterprise-field">نوع الوثيقة<select value={type} onChange={event=>change('type',event.target.value)}><option value="">كل الأنواع</option>{typeIds.map(id=><option key={id} value={id}>{typeNames.get(id)||`نوع #${id}`}</option>)}</select></label><label className="enterprise-field">مسار الملف<select value={file} onChange={event=>change('file',event.target.value)}><option value="">كل الوثائق</option><option value="present">مسار مسجّل</option><option value="missing">بدون مسار</option></select></label>{(search||type||file)&&<Button variant="outline" onClick={()=>setParams(current=>{const next=new URLSearchParams(current);['q','type','file','page'].forEach(key=>next.delete(key));return next;},{replace:true})}><X size={16} aria-hidden="true"/>مسح التصفية</Button>}</div><div className="enterprise-results" role="status"><span>{isLoading?'جارٍ تحميل الوثائق':isError&&!data?'الوثائق غير متاحة':`${visible.length.toLocaleString('ar-EG')} نتيجة من ${documents.length.toLocaleString('ar-EG')} وثيقة`}</span>{isFetching&&!isLoading&&<span>جارٍ التحديث…</span>}</div>{types.isError&&<div className="archive-lookup-error" role="status">تعذر تحميل أسماء الأنواع؛ تظهر أرقامها مؤقتاً. <Button variant="ghost" onClick={()=>types.refetch()}>إعادة تحميل الأنواع</Button></div>}</Card>
    {isError&&<ErrorState title="تعذر تحميل الوثائق" message="معايير البحث محفوظة. تحقق من الاتصال وأعد المحاولة." onRetry={()=>refetch()}/>}
    {isLoading?<div className="archive-grid" aria-label="جارٍ تحميل الوثائق">{Array.from({length:6},(_,i)=><Card key={i}><EnterpriseSkeleton rows={2} columns={1}/></Card>)}</div>:(!isError||data)&&(visible.length?<><div className="archive-grid">{visible.slice((page-1)*12,page*12).map((item,index)=><article className="archive-card" key={item.id??`missing-${index}`}><div className="archive-card-heading"><span className="archive-file-icon"><FileText size={24} aria-hidden="true"/><bdi>{extension(item.file_path)}</bdi></span><div><span className="enterprise-kicker">وثيقة <bdi>#{item.id??'—'}</bdi></span><h2>{item.id!=null?<Link to={`/documentations/${item.id}`}>{item.name||'وثيقة بدون اسم'}</Link>:item.name||'وثيقة بدون اسم'}</h2></div></div><p className="archive-file-path" dir="auto">{item.file_path?.trim()||'لم يُسجّل مسار الملف'}</p><div className="archive-meta"><span>{typeNames.get(String(item.documentation_type_id))||`نوع #${item.documentation_type_id??'—'}`}</span>{item.course_id!=null&&<span>الدورة <bdi>#{item.course_id}</bdi></span>}</div></article>)}</div><nav className="archive-pagination" aria-label="صفحات الوثائق"><Button variant="outline" disabled={page===1} onClick={()=>change('page',String(page-1))}><ChevronRight size={18} aria-hidden="true"/>السابق</Button><span>صفحة {page.toLocaleString('ar-EG')} من {pages.toLocaleString('ar-EG')}</span><Button variant="outline" disabled={page===pages} onClick={()=>change('page',String(page+1))}>التالي<ChevronLeft size={18} aria-hidden="true"/></Button></nav></>:<EmptyState title={search||type||file?'لا توجد وثائق مطابقة':'لم تُضف وثائق بعد'} description={search||type||file?'عدّل معايير البحث أو امسح التصفية.':'استخدم «إضافة وثيقة» لبدء تنظيم الأرشيف.'} icon={<FileText size={28} aria-hidden="true"/>}/>)}
  </div>;
}
