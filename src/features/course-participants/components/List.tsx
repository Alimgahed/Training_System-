import { Award,ClipboardCheck,Search,UserRoundCheck,Users } from 'lucide-react';
import { useDeferredValue,useMemo,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { useCourseParticipants } from '../api/useListQuery';

export function CourseParticipantList() {
  const { data, isLoading, isError, refetch } = useCourseParticipants();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const participants = data || [];
  const visible = useMemo(() => participants.filter((item: any) => !deferredQuery || `${item.person_id || ''} ${item.course_id || ''}`.includes(deferredQuery)), [participants, deferredQuery]);
  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  const examCount = participants.filter((item: any) => item.final_exams?.length).length;
  const evaluatedCount = participants.filter((item: any) => item.performance_evaluation_details?.length).length;
  return <div className="participants-page">
    <nav className="people-breadcrumb"><Link to="/">الرئيسية</Link><span>‹</span><span>شئون المتدربين والتقييم</span><span>‹</span><strong>مشاركو الدورات</strong></nav>
    <header className="people-header"><div><h1>مشاركو الدورات التدريبية</h1><p>متابعة تسجيل المتدربين، الاختبارات، والتقييمات لكل دورة</p></div></header>
    <section className="participants-summary"><article><Users /><div><strong>{participants.length}</strong><span>إجمالي المشاركين</span></div></article><article><Award /><div><strong>{examCount}</strong><span>لديهم اختبارات</span></div></article><article><ClipboardCheck /><div><strong>{evaluatedCount}</strong><span>لديهم تقييمات</span></div></article></section>
    <section className="participants-toolbar"><label className="people-search"><Search size={20} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="البحث برقم الموظف أو الدورة..." /></label><span aria-live="polite">{visible.length} متدرب</span></section>
    <section className="participants-grid">{visible.map((participant: any) => <article className="participant-card" key={participant.id} onClick={() => participant.id && navigate(`/course-participants/${participant.id}`)}><div className="participant-avatar"><UserRoundCheck size={23} /></div><div className="participant-copy"><h2>الموظف #{participant.person_id || '—'}</h2><p>الدورة التدريبية #{participant.course_id || '—'}</p><div><span className={participant.final_exams?.length ? 'is-done' : ''}><Award size={14} />{participant.final_exams?.length ? `${participant.final_exams.length} اختبار` : 'لا اختبارات'}</span><span className={participant.performance_evaluation_details?.length ? 'is-done' : ''}><ClipboardCheck size={14} />{participant.performance_evaluation_details?.length ? `${participant.performance_evaluation_details.length} تقييم` : 'لا تقييمات'}</span></div></div></article>)}</section>
    {!visible.length && <section className="participants-empty"><Users size={43} /><strong>لا توجد سجلات مشاركة</strong><span>ستظهر هنا بيانات الموظفين الملتحقين بالدورات.</span></section>}
  </div>;
}
