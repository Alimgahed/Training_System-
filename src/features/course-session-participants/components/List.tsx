import { Calendar, Plus, X } from 'lucide-react';
import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Table } from '../../../shared/components/Table';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useCourseSessionParticipants } from '../api/useListQuery';
import type { CourseSessionParticipant } from '../types';
const empty: CourseSessionParticipant[] = [];
export function CourseSessionParticipantList() {
  const { data, isLoading, isError, isFetching, refetch } = useCourseSessionParticipants();
  const records = data || empty;
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const session = params.get('session') || '';
  const query = useDeferredValue(search.trim().toLocaleLowerCase('ar'));
  const sessions = useMemo(() => [...new Set([...records.flatMap(row => row.course_session_id == null ? [] : [row.course_session_id]), ...(Number(session)>0 ? [Number(session)] : [])])].sort((a,b)=>a-b), [records,session]);
  const visible = useMemo(() => records.filter(row => (!session || String(row.course_session_id) === session) && (!query || `${row.id ?? ''} ${row.course_participant_id ?? ''} ${row.course_participant?.person?.name ?? ''} ${row.course_participant?.person?.code ?? ''}`.toLocaleLowerCase('ar').includes(query))), [records,session,query]);
  const change = (key:string,value:string) => setParams(current=>{const next=new URLSearchParams(current);if(value)next.set(key,value);else next.delete(key);return next;},{replace:true});
  const columns = [
    {header:'المتدرب / سجل الحضور',accessor:(row:CourseSessionParticipant)=>row.id!=null?<Link className="enterprise-record-link" to={`/course-session-participants/${row.id}`}>{row.course_participant?.person?.name || `مشارك #${row.course_participant_id ?? '—'}`} <bdi>· #{row.id}</bdi></Link>:'سجل غير محدد'},
    {header:'الجلسة التدريبية',accessor:(row:CourseSessionParticipant)=>row.course_session_id!=null?<Link className="enterprise-record-link" to={`/course-sessions/${row.course_session_id}`}>جلسة <bdi>#{row.course_session_id}</bdi></Link>:'غير محددة'},
    {header:'تسجيل الدورة',accessor:(row:CourseSessionParticipant)=>row.course_participant_id!=null?<Link className="enterprise-record-link" to={`/course-participants/${row.course_participant_id}`}>مشاركة <bdi>#{row.course_participant_id}</bdi></Link>:'غير محدد'},
  ];
  return <div className="enterprise-page">
    <header className="enterprise-heading"><div><span className="enterprise-kicker">شئون التدريب والعمليات / الحضور</span><h1>حضور جلسات التدريب</h1><p>راجع حضور المتدربين حسب الجلسة، وافتح السجل لتعديله أو سجّل حضوراً جديداً.</p></div><Link className="enterprise-link-button enterprise-link-button--primary" to="/course-session-participants/new"><Plus size={18} aria-hidden="true"/>تسجيل حضور</Link></header>
    <Card><div className="enterprise-toolbar"><label className="enterprise-field enterprise-field--search">البحث عن حضور<input type="search" value={search} onChange={e=>change('q',e.target.value)} placeholder="اسم المتدرب، كوده، أو رقم السجل"/></label><label className="enterprise-field">الجلسة التدريبية<select value={session} onChange={e=>change('session',e.target.value)}><option value="">كل الجلسات</option>{sessions.map(id=><option key={id} value={id}>جلسة #{id}</option>)}</select></label>{(search||session)&&<Button variant="outline" onClick={()=>setParams({}, {replace:true})}><X size={16} aria-hidden="true"/>مسح التصفية</Button>}</div>
    <div className="enterprise-results" role="status"><span>{isLoading?'جارٍ تحميل الحضور':isError&&!data?'سجلات الحضور غير متاحة':`${visible.length.toLocaleString('ar-EG')} سجل من ${records.length.toLocaleString('ar-EG')} تسجيل حضور`}</span>{isFetching&&!isLoading&&<span>جارٍ التحديث…</span>}</div>
    {isError&&<ErrorState title="تعذر تحميل سجلات الحضور" onRetry={()=>refetch()}/>}
    {isLoading?<EnterpriseSkeleton columns={3}/>:(!isError||data)&&<Table key={`${query}:${session}`} data={visible} columns={columns} compact showOverview={false} emptyTitle={search||session?'لا يوجد حضور مطابق':'لا توجد سجلات حضور'} emptyDescription={search||session?'غيّر الجلسة أو امسح التصفية لعرض السجلات.':'ابدأ بتسجيل حضور متدرب مسجل في دورة الجلسة.'} emptyIcon={<Calendar size={28} aria-hidden="true"/>}/>}
    </Card>
  </div>;
}
