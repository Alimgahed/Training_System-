import { BookOpen,CalendarDays,CheckCircle2,Clock3,Eye,Filter,MoreHorizontal,Plus,Search,Users } from 'lucide-react';
import { useMemo,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { useCourses } from '../api/useListQuery';
import type { Course } from '../types';

const statusFor = (course: Course) => course.is_executed ? { label: 'منفذة', variant: 'success' as const } : course.is_planned ? { label: 'مخططة', variant: 'info' as const } : { label: 'غير محددة', variant: 'neutral' as const };

export function CourseList() {
  const { data, isLoading, isError, refetch } = useCourses();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const courses = data || [];
  const visible = useMemo(() => courses.filter((course: Course) => {
    const matchesQuery = !query || `${course.name || ''} ${course.id || ''} ${course.trainer_id || ''}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === 'all' || (status === 'planned' ? course.is_planned && !course.is_executed : status === 'executed' ? course.is_executed : !course.is_planned && !course.is_executed);
    return matchesQuery && matchesStatus;
  }), [courses, query, status]);
  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const stats = [
    { label: 'إجمالي الدورات', value: courses.length, icon: BookOpen, tone: 'blue' },
    { label: 'الدورات المخططة', value: courses.filter((c: Course) => c.is_planned && !c.is_executed).length, icon: CalendarDays, tone: 'purple' },
    { label: 'الدورات المنفذة', value: courses.filter((c: Course) => c.is_executed).length, icon: CheckCircle2, tone: 'green' },
    { label: 'إجمالي المشاركين', value: courses.reduce((sum: number, c: Course) => sum + (c.number_of_internal_participants || 0) + (c.number_of_external_participants || 0), 0), icon: Users, tone: 'gold' },
  ];
  return <div className="course-page">
    <nav className="people-breadcrumb"><Link to="/">الرئيسية</Link><span>‹</span><span>إدارة التدريب</span><span>‹</span><strong>الدورات التدريبية</strong></nav>
    <header className="people-header"><div><h1>إدارة الدورات التدريبية</h1><p>تخطيط وتنفيذ ومتابعة الدورات والبرامج التدريبية</p></div><Link to="/courses/new"><Button size="lg"><Plus size={20} />تأسيس دورة تدريبية</Button></Link></header>
    <section className="course-stats">{stats.map(({ label, value, icon: Icon, tone }) => <article className={`course-stat course-stat--${tone}`} key={label}><span><Icon size={24} /></span><div><h2>{label}</h2><strong>{value}</strong></div></article>)}</section>
    <section className="course-toolbar"><label className="people-search"><Search size={20} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="البحث باسم الدورة أو رقمها..." /></label><label className="course-status"><span>حالة الدورة</span><select value={status} onChange={event => setStatus(event.target.value)}><option value="all">كل الحالات</option><option value="planned">مخططة</option><option value="executed">منفذة</option><option value="other">غير محددة</option></select></label><button type="button"><Filter size={19} />الفلاتر</button></section>
    <section className="course-grid">{visible.map((course: Course) => { const courseStatus = statusFor(course); const participantCount = (course.number_of_internal_participants || 0) + (course.number_of_external_participants || 0); return <article className="course-card" key={course.id} onClick={() => course.id && navigate(`/courses/${course.id}`)}><div className="course-card-top"><span className="course-book"><BookOpen size={24} /></span><Badge variant={courseStatus.variant}>{courseStatus.label}</Badge></div><h2>{course.name || 'دورة بدون اسم'}</h2><p>رقم الدورة: <strong>#{course.id ?? '—'}</strong></p><div className="course-meta"><span><Clock3 size={16} />{course.duration_in_days || '—'} أيام</span><span><Users size={16} />{participantCount} مشارك</span></div><div className="course-card-footer"><span>{course.starting_date ? `تبدأ ${course.starting_date.slice(0, 10)}` : 'لم يحدد الموعد'}</span><div onClick={event => event.stopPropagation()}><button aria-label="عرض الدورة" onClick={() => course.id && navigate(`/courses/${course.id}`)}><Eye size={17} /></button><button aria-label="خيارات الدورة"><MoreHorizontal size={18} /></button></div></div></article>; })}</section>
    {!visible.length && <section className="course-empty"><BookOpen size={42} /><strong>لا توجد دورات مطابقة</strong><span>جرّب تغيير البحث أو حالة الدورة.</span></section>}
  </div>;
}
