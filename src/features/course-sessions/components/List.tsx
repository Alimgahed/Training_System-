import { CalendarDays, ChevronLeft, ChevronRight, Clock3, Plus, X } from 'lucide-react';
import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useCourseSessions } from '../api/useListQuery';
import type { CourseSession } from '../types';
import { localToday, sessionDate, sessionDay, sessionSummary, sessionTime } from '../utils/schedule';
import './schedule.css';
const empty:CourseSession[]=[];
export function CourseSessionList() {
  const {data,isLoading,isError,refetch}=useCourseSessions();
  const sessions=data||empty;
  const [params,setParams]=useSearchParams();
  const search=params.get('q')||'';const date=params.get('date')||'';const order=params.get('order')==='desc'?'desc':'asc';
  const query=useDeferredValue(search.trim());
  const today=localToday();
  const summary=useMemo(()=>sessionSummary(sessions,today),[sessions,today]);
  const visible=useMemo(()=>sessions.filter(s=>(!date||sessionDay(s.session_date)===date)&&(!query||`${s.id??''} ${s.course_id??''} ${s.session_date??''} ${s.start_time??''}`.includes(query))).sort((a,b)=>{const dayA=sessionDay(a.session_date),dayB=sessionDay(b.session_date);if(!dayA)return dayB?1:0;if(!dayB)return -1;return (`${dayA} ${a.start_time||''}`.localeCompare(`${dayB} ${b.start_time||''}`))*(order==='asc'?1:-1);}),[sessions,date,query,order]);
  const pages=Math.max(1,Math.ceil(visible.length/12));const requested=Number(params.get('page'))||1;const page=Math.max(1,Math.min(pages,Number.isFinite(requested)?Math.floor(requested):1));
  const change=(key:string,value:string)=>setParams(current=>{const next=new URLSearchParams(current);if(value)next.set(key,value);else next.delete(key);if(key!=='page')next.delete('page');return next;},{replace:true});
  return <div className="enterprise-page schedule-directory">
    <header className="enterprise-heading"><div><span className="enterprise-kicker">إدارة التدريب / جدول التنفيذ</span><h1>الجلسات التدريبية</h1><p>نظّم مواعيد التدريب، وراجع توقيت كل جلسة ودورتها المرتبطة.</p></div><Link className="enterprise-link-button enterprise-link-button--primary" to="/course-sessions/new"><Plus size={18} aria-hidden="true"/>جدولة جلسة جديدة</Link></header>
    <section className="schedule-metrics" aria-label="ملخص جميع الجلسات">{[{label:'إجمالي الجلسات',value:summary.total},{label:'جلسات اليوم',value:summary.today},{label:'جلسات بعد اليوم',value:summary.upcoming}].map(m=><article key={m.label}><h2>{m.label}</h2>{isLoading?<span className="schedule-metric-shimmer" role="status" aria-label="جارٍ التحميل"/>:<strong>{isError&&!data?'—':m.value.toLocaleString('ar-EG')}</strong>}</article>)}</section>
    <Card><div className="enterprise-toolbar"><label className="enterprise-field enterprise-field--search">البحث في الجلسات<input type="search" value={search} onChange={e=>change('q',e.target.value)} placeholder="رقم الجلسة، الدورة، التاريخ أو وقت البدء"/></label><label className="enterprise-field">تاريخ الجلسة<input type="date" value={date} onInput={e=>change('date',e.currentTarget.value)} onChange={e=>change('date',e.target.value)}/></label><label className="enterprise-field">ترتيب المواعيد<select value={order} onChange={e=>change('order',e.target.value)}><option value="asc">الأقدم أولاً</option><option value="desc">الأحدث أولاً</option></select></label>{(search||date)&&<Button variant="outline" onClick={()=>setParams(current=>{const next=new URLSearchParams(current);for(const key of ['q','date','page'])next.delete(key);return next;},{replace:true})}><X size={16} aria-hidden="true"/>مسح التصفية</Button>}</div><div className="enterprise-results" role="status">{isLoading?'جارٍ تحميل الجدول':isError&&!data?'جدول الجلسات غير متاح':`${visible.length.toLocaleString('ar-EG')} جلسة من ${sessions.length.toLocaleString('ar-EG')}`}</div></Card>
    {isError&&<ErrorState title="تعذر تحميل جدول الجلسات" onRetry={()=>refetch()}/>}
    {isLoading?<Card><EnterpriseSkeleton columns={3} rows={6}/></Card>:(!isError||data)&&(visible.length?<><ol className="schedule-agenda" aria-label="جدول الجلسات">{visible.slice((page-1)*12,page*12).map((s,index)=><li key={s.id??index}><div className="schedule-date-mark" aria-hidden="true"><CalendarDays size={23}/><bdi>#{s.id??'—'}</bdi></div><div className="schedule-session"><h2>{s.id!=null?<Link className="enterprise-record-link" to={`/course-sessions/${s.id}`}>{sessionDate(s.session_date)}</Link>:sessionDate(s.session_date)}</h2><p>{s.course_id!=null?<Link to={`/courses/${s.course_id}`}>الدورة التدريبية <bdi>#{s.course_id}</bdi></Link>:'الدورة غير محددة'}</p></div><span className="schedule-time"><Clock3 size={17} aria-hidden="true"/><bdi>{sessionTime(s.start_time)} – {sessionTime(s.end_time)}</bdi></span></li>)}</ol><nav className="schedule-pagination" aria-label="صفحات الجلسات"><Button variant="outline" disabled={page===1} onClick={()=>change('page',String(page-1))}><ChevronRight size={16} aria-hidden="true"/>السابق</Button><span>صفحة {page.toLocaleString('ar-EG')} من {pages.toLocaleString('ar-EG')}</span><Button variant="outline" disabled={page===pages} onClick={()=>change('page',String(page+1))}>التالي<ChevronLeft size={16} aria-hidden="true"/></Button></nav></>:<EmptyState title={search||date?'لا توجد جلسات مطابقة':'لم تُجدول جلسات بعد'} description={search||date?'عدّل التاريخ أو امسح التصفية لعرض الجلسات.':'استخدم جدولة جلسة جديدة لتحديد موعد تدريب.'} icon={<CalendarDays size={30} aria-hidden="true"/>}/>)}
  </div>;
}
