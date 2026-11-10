import { Award, ChevronLeft, ChevronRight, ClipboardCheck, Users, X } from 'lucide-react';
import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useCourseParticipants } from '../api/useListQuery';
import type { CourseParticipant } from '../types';
import './participants.css';
const empty: CourseParticipant[] = [];
export function CourseParticipantList() {
  const { data, isLoading, isError, refetch } = useCourseParticipants();
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const course = params.get('course') || '';
  const followup = params.get('followup') || '';
  const query = useDeferredValue(search.trim());
  const participants = data || empty;
  const summary = useMemo(() => ({exams:participants.filter(row=>row.final_exams?.length).length,evaluations:participants.filter(row=>row.performance_evaluation_details?.length).length,courses:[...new Set(participants.map(row=>row.course_id).filter((id):id is number=>id!=null))].sort((a,b)=>a-b)}),[participants]);
  const visible = useMemo(() => participants.filter(row=>(!query||`${row.person_id ?? ''} ${row.course_id ?? ''}`.includes(query))&&(!course||String(row.course_id)===course)&&(!followup||(followup==='exam'?!row.final_exams?.length:!row.performance_evaluation_details?.length))),[participants,query,course,followup]);
  const pages=Math.max(1,Math.ceil(visible.length/12));
  const requestedPage=Number(params.get('page'))||1;
  const page=Math.max(1,Math.min(pages,Number.isFinite(requestedPage)?Math.floor(requestedPage):1));
  const change=(key:string,value:string)=>setParams(current=>{const next=new URLSearchParams(current);if(value)next.set(key,value);else next.delete(key);if(key!=='page')next.delete('page');return next;},{replace:true});
  const metrics=[{label:'سجلات المشاركة',value:participants.length,icon:Users},{label:'لديهم اختبارات مسجلة',value:summary.exams,icon:Award},{label:'لديهم تقييمات مسجلة',value:summary.evaluations,icon:ClipboardCheck}];
  return <div className="enterprise-page participation-directory">
    <header className="enterprise-heading"><div><span className="enterprise-kicker">شئون المتدربين / متابعة المشاركة</span><h1>مشاركو الدورات التدريبية</h1><p>تابع ارتباط الموظفين بالدورات وما سُجل لهم من اختبارات وتقييمات.</p></div></header>
    <section className="participation-metrics" aria-label="ملخص جميع المشاركات">{metrics.map(({label,value,icon:Icon})=><article key={label}><Icon size={24} aria-hidden="true"/><div><h2>{label}</h2>{isLoading?<span className="participation-value-skeleton" role="status" aria-label="جارٍ التحميل"/>:<strong>{isError&&!data?'—':value.toLocaleString('ar-EG')}</strong>}</div></article>)}</section>
    <Card><div className="enterprise-toolbar"><label className="enterprise-field enterprise-field--search">البحث في المشاركات<input type="search" value={search} onChange={event=>change('q',event.target.value)} placeholder="رقم الموظف أو الدورة"/></label><label className="enterprise-field">الدورة<select value={course} onChange={event=>change('course',event.target.value)}><option value="">كل الدورات</option>{summary.courses.map(id=><option key={id} value={id}>الدورة #{id}</option>)}</select></label><label className="enterprise-field">المتابعة المطلوبة<select value={followup} onChange={event=>change('followup',event.target.value)}><option value="">كل المشاركات</option><option value="exam">بدون اختبارات</option><option value="evaluation">بدون تقييمات</option></select></label>{(search||course||followup)&&<Button variant="outline" onClick={()=>setParams(current=>{const next=new URLSearchParams(current);for(const key of ['q','course','followup','page'])next.delete(key);return next;},{replace:true})}><X size={16} aria-hidden="true"/>مسح التصفية</Button>}</div><div className="enterprise-results" role="status">{isLoading?'جارٍ تحميل المشاركات':isError&&!data?'المشاركات غير متاحة':`${visible.length.toLocaleString('ar-EG')} سجل مشاركة من ${participants.length.toLocaleString('ar-EG')}`}</div></Card>
    {isError&&<ErrorState title="تعذر تحميل المشاركات" onRetry={()=>refetch()}/>}
    {isLoading?<div className="participation-cards" role="status" aria-label="جارٍ تحميل بطاقات المشاركين">{Array.from({length:12},(_,index)=><div className="participation-skeleton-card" key={index} aria-hidden="true"><EnterpriseSkeleton variant="fields" columns={1}/></div>)}</div>:(!isError||data)&&(visible.length?<><div className="participation-cards">{visible.slice((page-1)*12,page*12).map((row,index)=>{const content=<><span className="participation-record-id">سجل مشاركة <bdi>#{row.id ?? '—'}</bdi></span><h2>الموظف <bdi>#{row.person_id ?? '—'}</bdi></h2><p>الدورة التدريبية <bdi>#{row.course_id ?? '—'}</bdi></p><div className="participation-evidence"><span><Award size={16} aria-hidden="true"/>{(row.final_exams?.length||0).toLocaleString('ar-EG')} اختبار</span><span><ClipboardCheck size={16} aria-hidden="true"/>{(row.performance_evaluation_details?.length||0).toLocaleString('ar-EG')} تقييم</span></div><span className="participation-open">عرض التفاصيل <ChevronLeft size={16} aria-hidden="true"/></span></>;return row.id!=null?<Link className="participation-card" key={row.id} to={`/course-participants/${row.id}`}>{content}</Link>:<article className="participation-card" key={`missing-${index}`}>{content}</article>;})}</div><nav className="participation-pagination" aria-label="صفحات المشاركات"><Button variant="outline" disabled={page===1} onClick={()=>change('page',String(page-1))}><ChevronRight size={16} aria-hidden="true"/>السابق</Button><span>صفحة {page.toLocaleString('ar-EG')} من {pages.toLocaleString('ar-EG')}</span><Button variant="outline" disabled={page===pages} onClick={()=>change('page',String(page+1))}>التالي<ChevronLeft size={16} aria-hidden="true"/></Button></nav></>:<EmptyState title={search||course||followup?'لا توجد مشاركات مطابقة':'لا توجد سجلات مشاركة'} description={search||course||followup?'عدّل معايير البحث أو امسح التصفية.':'ستظهر هنا سجلات الموظفين الملتحقين بالدورات.'} icon={<Users size={28} aria-hidden="true"/>}/>)}
  </div>;
}
