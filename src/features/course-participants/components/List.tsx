import { Award, ClipboardCheck, Users, X } from 'lucide-react';
import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { Table } from '../../../shared/components/Table';
import { ErrorState } from '../../../shared/components/ErrorState';
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
  const change=(key:string,value:string)=>setParams(current=>{const next=new URLSearchParams(current);if(value)next.set(key,value);else next.delete(key);if(key!=='page')next.delete('page');return next;},{replace:true});
  const metrics=[{label:'سجلات المشاركة',value:participants.length,icon:Users},{label:'لديهم اختبارات مسجلة',value:summary.exams,icon:Award},{label:'لديهم تقييمات مسجلة',value:summary.evaluations,icon:ClipboardCheck}];
  return <div className="enterprise-page participation-directory">
    <header className="enterprise-heading"><div><span className="enterprise-kicker">شئون المتدربين / متابعة المشاركة</span><h1>مشاركو الدورات التدريبية</h1><p>تابع ارتباط الموظفين بالدورات وما سُجل لهم من اختبارات وتقييمات.</p></div></header>
    <section className="participation-metrics" aria-label="ملخص جميع المشاركات">{metrics.map(({label,value,icon:Icon})=><article key={label}><Icon size={24} aria-hidden="true"/><div><h2>{label}</h2>{isLoading?<span className="participation-value-skeleton" role="status" aria-label="جارٍ التحميل"/>:<strong>{isError&&!data?'—':value.toLocaleString('ar-EG')}</strong>}</div></article>)}</section>
    <Card><div className="enterprise-toolbar"><label className="enterprise-field enterprise-field--search">البحث في المشاركات<input type="search" value={search} onChange={event=>change('q',event.target.value)} placeholder="رقم الموظف أو الدورة"/></label><label className="enterprise-field">الدورة<select value={course} onChange={event=>change('course',event.target.value)}><option value="">كل الدورات</option>{summary.courses.map(id=><option key={id} value={id}>الدورة #{id}</option>)}</select></label><label className="enterprise-field">المتابعة المطلوبة<select value={followup} onChange={event=>change('followup',event.target.value)}><option value="">كل المشاركات</option><option value="exam">بدون اختبارات</option><option value="evaluation">بدون تقييمات</option></select></label>{(search||course||followup)&&<Button variant="outline" onClick={()=>setParams(current=>{const next=new URLSearchParams(current);for(const key of ['q','course','followup','page'])next.delete(key);return next;},{replace:true})}><X size={16} aria-hidden="true"/>مسح التصفية</Button>}</div><div className="enterprise-results" role="status">{isLoading?'جارٍ تحميل المشاركات':isError&&!data?'المشاركات غير متاحة':`${visible.length.toLocaleString('ar-EG')} سجل مشاركة من ${participants.length.toLocaleString('ar-EG')}`}</div></Card>
    {isError&&<ErrorState title="تعذر تحميل المشاركات" onRetry={()=>refetch()}/>}
    {(!isError || data) && <section className="sheet-panel"><Table page={Number(params.get('page')) || 1} onPageChange={page => change('page', String(page))} key={`${query}:${course}:${followup}`} data={visible} isLoading={isLoading} compact showOverview={false} emptyTitle="لا توجد مشاركات مطابقة" columns={[
{header:'رقم المشاركة',accessor:'id'},
{header:'الموظف',accessor:row=>row.person_id!=null?<Link to={`/persons/${row.person_id}`}>#{row.person_id}</Link>:'—'},
{header:'الدورة',accessor:row=>row.course_id!=null?<Link to={`/courses/${row.course_id}`}>#{row.course_id}</Link>:'—'},
{header:'الاختبارات المسجلة',accessor:row=>row.final_exams?.length??'—'},
{header:'التقييمات المسجلة',accessor:row=>row.performance_evaluation_details?.length??'—'},
{header:'إجراءات',accessor:row=>row.id!=null?<Link to={`/course-participants/${row.id}`}>عرض التفاصيل</Link>:'—'},
]} /></section>}
  </div>;
}
