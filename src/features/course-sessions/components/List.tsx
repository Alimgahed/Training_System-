import { CalendarDays,Clock3,Filter,MapPin,Plus,Search,TimerReset } from 'lucide-react';
import { useDeferredValue,useMemo,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { useCourseSessions } from '../api/useListQuery';

const dateLabel = (value?: string) => value ? new Intl.DateTimeFormat('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(value)) : 'تاريخ غير محدد';

export function CourseSessionList() {
  const { data, isLoading, isError, refetch } = useCourseSessions();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const sessions = data || [];
  const visible = useMemo(() => sessions.filter((item: any) => !deferredQuery || `${item.course_id || ''} ${item.session_date || ''} ${item.start_time || ''}`.toLowerCase().includes(deferredQuery.toLowerCase())), [sessions, deferredQuery]);
  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayCount = sessions.filter((item: any) => item.session_date?.slice(0, 10) === todayKey).length;
  const upcomingCount = sessions.filter((item: any) => item.session_date && new Date(item.session_date) > new Date()).length;
  return <div className="sessions-page">
    <nav className="people-breadcrumb"><Link to="/">الرئيسية</Link><span>‹</span><span>إدارة التدريب</span><span>‹</span><strong>الجلسات التدريبية</strong></nav>
    <header className="people-header"><div><h1>الجلسات التدريبية</h1><p>تنظيم مواعيد الجلسات التدريبية ومتابعة جدول التنفيذ</p></div><Link to="/course-sessions/new"><Button size="lg"><Plus size={20} />جدولة جلسة جديدة</Button></Link></header>
    <section className="sessions-summary"><article><CalendarDays /><div><strong>{sessions.length}</strong><span>إجمالي الجلسات</span></div></article><article><Clock3 /><div><strong>{todayCount}</strong><span>جلسات اليوم</span></div></article><article><TimerReset /><div><strong>{upcomingCount}</strong><span>جلسات قادمة</span></div></article></section>
    <section className="sessions-toolbar"><label className="people-search"><Search size={20} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="البحث برقم الدورة أو تاريخ الجلسة..." /></label><button type="button"><Filter size={18} />تصفية الجدول</button><span aria-live="polite">{visible.length} جلسة</span></section>
    <section className="sessions-timeline" aria-label="جدول الجلسات التدريبية">
      {visible.map((session: any) => <article className="session-item" key={session.id} onClick={() => session.id && navigate(`/course-sessions/${session.id}`)}><time dateTime={session.session_date}><strong>{session.session_date ? new Date(session.session_date).getDate() : '—'}</strong><span>{session.session_date ? new Intl.DateTimeFormat('ar-EG', { month: 'short' }).format(new Date(session.session_date)) : '—'}</span></time><span className="session-rail" aria-hidden="true" /><div className="session-content"><div><h2>{dateLabel(session.session_date)}</h2><p>الدورة التدريبية رقم #{session.course_id || '—'}</p></div><div className="session-info"><span><Clock3 size={16} />{session.start_time || '—'} — {session.end_time || '—'}</span><span><MapPin size={16} />قاعة التدريب</span></div></div></article>)}
      {!visible.length && <div className="sessions-empty"><CalendarDays size={42} /><strong>لا توجد جلسات مطابقة</strong><span>ابدأ بجدولة جلسة تدريبية جديدة.</span><Link to="/course-sessions/new"><Button><Plus size={17} />جدولة جلسة</Button></Link></div>}
    </section>
  </div>;
}
