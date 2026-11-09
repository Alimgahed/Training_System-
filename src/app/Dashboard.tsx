import { useQuery } from '@tanstack/react-query';
import { ArrowLeft,BookOpen,Calendar,CalendarClock,CheckCircle2,GraduationCap,RefreshCw,UserCheck,UserPlus,Users,UsersRound } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../core/api/apiClient';
import { Badge } from '../shared/components/Badge';
import { Button } from '../shared/components/Button';
import { Card } from '../shared/components/Card';
import { LoadingSkeleton } from '../shared/components/LoadingSkeleton';
import { Table } from '../shared/components/Table';

const dayKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const dateLabel = (value?: string) => value ? new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' }).format(new Date(`${value.slice(0, 10)}T12:00:00`)) : 'موعد غير محدد';
const timeLabel = (value?: string) => value ? new Intl.DateTimeFormat('ar-EG', { hour: '2-digit', minute: '2-digit' }).format(new Date(`2000-01-01T${value}`)) : '';

function DashboardLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="dashboard-view-all" to={to}>{children}<ArrowLeft size={15} aria-hidden="true" /></Link>;
}

export function Dashboard() {
  const { data: persons, isLoading: loadingPersons, isError: errorPersons, refetch: refetchPersons } = useQuery({ queryKey: ['persons'], queryFn: () => apiClient.get<any[]>('/persons').then((response) => response.data) });
  const { data: courses, isLoading: loadingCourses, isError: errorCourses, refetch: refetchCourses } = useQuery({ queryKey: ['courses'], queryFn: () => apiClient.get<any[]>('/courses').then((response) => response.data) });
  const { data: plannedCourses, isLoading: loadingPlanned, isError: errorPlanned, refetch: refetchPlanned } = useQuery({ queryKey: ['dashboard-planned-courses'], queryFn: () => apiClient.get<any[]>('/get-planned-courses').then((response) => response.data) });
  const { data: executedCourses, isLoading: loadingExecuted, isError: errorExecuted } = useQuery({ queryKey: ['dashboard-executed-courses'], queryFn: () => apiClient.get<any[]>('/get-executed-courses').then((response) => response.data) });
  const { data: participants, isLoading: loadingParticipants, isError: errorParticipants } = useQuery({ queryKey: ['course-participants'], queryFn: () => apiClient.get<any[]>('/course-participants').then((response) => response.data) });
  const { data: sessions, isLoading: loadingSessions, isError: errorSessions, refetch: refetchSessions } = useQuery({ queryKey: ['course-sessions'], queryFn: () => apiClient.get<any[]>('/course-sessions').then((response) => response.data) });

  const today = dayKey(new Date());
  const allPersons = persons || [];
  const allCourses = courses || [];
  const allPlanned = plannedCourses || [];
  const allExecuted = executedCourses || [];
  const allParticipants = participants || [];
  const allSessions = sessions || [];
  const coursesById = new Map(allCourses.map((course: any) => [Number(course.id), course]));
  const todaysSessions = allSessions.filter((session: any) => String(session.session_date || '').slice(0, 10) === today).sort((first: any, second: any) => String(first.start_time || '').localeCompare(String(second.start_time || '')));
  const upcomingCourses = allPlanned.filter((course: any) => !course.starting_date || String(course.starting_date).slice(0, 10) >= today).sort((first: any, second: any) => String(first.starting_date || '').localeCompare(String(second.starting_date || ''))).slice(0, 5);
  const latestCourses = [...allCourses].sort((first: any, second: any) => Number(second.id || 0) - Number(first.id || 0)).slice(0, 6);
  const latestPersons = [...allPersons].sort((first: any, second: any) => Number(second.id || 0) - Number(first.id || 0)).slice(0, 6);
  const stats = [
    { title: 'إجمالي الموظفين', value: allPersons.length, note: 'ضمن نطاق الشركة', icon: UsersRound, tone: 'blue', loading: loadingPersons, failed: errorPersons },
    { title: 'الموظفون النشطون', value: allPersons.filter((person: any) => person.is_active).length, note: 'حالة العمل الحالية', icon: UserCheck, tone: 'sky', loading: loadingPersons, failed: errorPersons },
    { title: 'المدربون', value: allPersons.filter((person: any) => person.is_trainer).length, note: 'مسجلون كمدربين', icon: GraduationCap, tone: 'gold', loading: loadingPersons, failed: errorPersons },
    { title: 'تسجيلات المتدربين', value: allParticipants.length, note: 'على الدورات التدريبية', icon: Users, tone: 'green', loading: loadingParticipants, failed: errorParticipants },
    { title: 'الدورات المخططة', value: allPlanned.length, note: 'برامج قيد التخطيط', icon: CalendarClock, tone: 'purple', loading: loadingPlanned, failed: errorPlanned },
    { title: 'الدورات المنفذة', value: allExecuted.length, note: 'برامج بدأ تنفيذها', icon: CheckCircle2, tone: 'blue', loading: loadingExecuted, failed: errorExecuted },
  ];

  return <div className="dashboard">
    <h1 className="visually-hidden">لوحة التحكم</h1>
    <section className="dashboard-stats" aria-label="مؤشرات الموارد والتدريب">
      {stats.map(({ title, value, note, icon: Icon, tone, loading, failed }) => <article className={`dashboard-stat dashboard-stat--${tone}`} key={title} aria-label={`${title}: ${failed ? 'تعذر التحميل' : value}`}><div className="dashboard-stat-icon"><Icon size={25} aria-hidden="true" /></div><div className="dashboard-stat-content"><h3>{title}</h3><strong>{loading ? '…' : failed ? '—' : value.toLocaleString('ar-EG')}</strong><p>{failed ? 'تعذر تحميل البيانات' : note}</p></div></article>)}
    </section>

    <section className="dashboard-actions-wrap" aria-labelledby="dashboard-actions-title"><h2 id="dashboard-actions-title">إجراءات سريعة</h2><div className="dashboard-actions">
      <Link to="/persons/new" className="dashboard-action dashboard-action--gold"><UserPlus size={22} aria-hidden="true" /><span>إضافة موظف</span></Link>
      <Link to="/courses/new" className="dashboard-action dashboard-action--blue"><BookOpen size={22} aria-hidden="true" /><span>تأسيس دورة تدريبية</span></Link>
      <Link to="/course-sessions/new" className="dashboard-action dashboard-action--purple"><Calendar size={22} aria-hidden="true" /><span>جدولة جلسة</span></Link>
      <Link to="/courses" className="dashboard-action"><BookOpen size={22} aria-hidden="true" /><span>استكشف الدورات</span></Link>
      <Link to="/learning-paths" className="dashboard-action"><GraduationCap size={22} aria-hidden="true" /><span>المسارات التدريبية</span></Link>
    </div></section>

    <section className="dashboard-panels" id="dashboard-content" aria-label="ملخص النظام">
      <Card title="الدورات التدريبية" action={<DashboardLink to="/courses">عرض الكل</DashboardLink>}>
        {loadingCourses ? <LoadingSkeleton variant="table" rows={4} /> : errorCourses ? <div className="dashboard-empty-panel" role="alert"><strong>تعذر تحميل الدورات</strong><Button variant="outline" size="sm" onClick={() => refetchCourses()}><RefreshCw size={15} />إعادة المحاولة</Button></div> : <Table data={latestCourses} compact showOverview={false} columns={[{ header: 'اسم الدورة', accessor: (row: any) => <strong>{row.name || `دورة #${row.id}`}</strong> }, { header: 'تاريخ البداية', accessor: (row: any) => dateLabel(row.starting_date) }, { header: 'الحالة', accessor: (row: any) => row.is_executed ? <Badge variant="success">منفذة</Badge> : row.is_planned ? <Badge variant="warning">مخططة</Badge> : <Badge variant="neutral">غير محددة</Badge> }]} emptyTitle="لا توجد دورات مسجلة" emptyDescription="ستظهر هنا الدورات بعد إضافتها إلى النظام." emptyIcon={<GraduationCap size={30} />} />}
      </Card>

      <Card title="الجلسات المجدولة اليوم" action={<DashboardLink to="/course-sessions">كل الجلسات</DashboardLink>}>
        {loadingSessions ? <LoadingSkeleton variant="table" rows={3} /> : errorSessions ? <div className="dashboard-empty-panel" role="alert"><strong>تعذر تحميل الجلسات</strong><Button variant="outline" size="sm" onClick={() => refetchSessions()}><RefreshCw size={15} />إعادة المحاولة</Button></div> : todaysSessions.length ? <div className="dashboard-session-list">{todaysSessions.slice(0, 5).map((session: any) => <Link className="dashboard-session" to={`/course-sessions/${session.id}`} key={session.id}><div><strong>{coursesById.get(Number(session.course_id))?.name || `دورة #${session.course_id}`}</strong><span>{dateLabel(session.session_date)}</span></div><time>{timeLabel(session.start_time)}{session.end_time ? ` – ${timeLabel(session.end_time)}` : ''}</time></Link>)}</div> : <div className="dashboard-empty-panel"><Calendar size={34} aria-hidden="true" /><strong>لا توجد جلسات مجدولة اليوم</strong><span>يمكنك متابعة الجدول الكامل أو إضافة جلسة جديدة.</span><Link to="/course-sessions/new" className="dashboard-view-all">جدولة جلسة</Link></div>}
      </Card>

      <Card title="أحدث الموظفين" action={<DashboardLink to="/persons">عرض الموظفين</DashboardLink>}>
        {loadingPersons ? <LoadingSkeleton variant="table" rows={4} /> : errorPersons ? <div className="dashboard-empty-panel" role="alert"><strong>تعذر تحميل الموظفين</strong><Button variant="outline" size="sm" onClick={() => refetchPersons()}><RefreshCw size={15} />إعادة المحاولة</Button></div> : <Table data={latestPersons} compact showOverview={false} columns={[{ header: 'الكود', accessor: (row: any) => <span className="people-code">{row.code || '—'}</span> }, { header: 'اسم الموظف', accessor: (row: any) => <strong>{row.name || 'بدون اسم'}</strong> }, { header: 'الحالة', accessor: (row: any) => row.is_active ? <Badge variant="success">نشط</Badge> : <Badge variant="danger">غير نشط</Badge> }]} emptyTitle="لا توجد بيانات موظفين" emptyDescription="أضف الموظفين لبدء إدارة البرامج التدريبية." emptyIcon={<Users size={30} />} />}
      </Card>

      <Card title="الدورات القادمة" action={<DashboardLink to="/courses">خطة التدريب</DashboardLink>}>
        {loadingPlanned ? <LoadingSkeleton variant="table" rows={3} /> : errorPlanned ? <div className="dashboard-empty-panel" role="alert"><strong>تعذر تحميل خطة التدريب</strong><Button variant="outline" size="sm" onClick={() => refetchPlanned()}><RefreshCw size={15} />إعادة المحاولة</Button></div> : upcomingCourses.length ? <div className="dashboard-session-list">{upcomingCourses.map((course: any) => <Link className="dashboard-session" to={`/courses/${course.id}`} key={course.id}><div><strong>{course.name || `دورة #${course.id}`}</strong><span>{course.is_executed ? 'منفذة' : 'مخططة'}</span></div><time>{dateLabel(course.starting_date)}</time></Link>)}</div> : <div className="dashboard-empty-panel"><CalendarClock size={34} aria-hidden="true" /><strong>لا توجد دورات قادمة</strong><span>ستظهر البرامج المخططة هنا حسب تاريخ البداية.</span><Link to="/courses/new" className="dashboard-view-all">تأسيس دورة تدريبية</Link></div>}
      </Card>
    </section>
  </div>;
}
