import { useQuery } from '@tanstack/react-query';
import { ArrowLeft,BookOpen,Calendar,CalendarClock,ChartNoAxesCombined,Layers,Zap,GraduationCap,RefreshCw,UserCheck,UserPlus,Users,UsersRound } from 'lucide-react';
import { useMemo, type ReactNode } from 'react';
import type { Course } from '../features/courses/types';
import type { Person } from '../features/persons/types';
import type { CourseSession } from '../features/course-sessions/types';
import { dashboardSummary, dayKey, dateLabel, timeLabel } from './dashboard/model';
import './dashboard/dashboard.css';
import { Link } from 'react-router-dom';
import { apiClient } from '../core/api/apiClient';
import { useAuthStore } from '../core/store/useAuthStore';
import { Badge } from '../shared/components/Badge';
import { Button } from '../shared/components/Button';
import { Card } from '../shared/components/Card';
import { Table } from '../shared/components/Table';

const emptyPersons: Person[] = [];
const emptyCourses: Course[] = [];
const emptySessions: CourseSession[] = [];

function DashboardRowsSkeleton({ rows = 4 }: { rows?: number }) {
  return <div className="dashboard-row-skeletons" role="status" aria-label="جارٍ تحميل الملخص">
    {Array.from({ length: rows }, (_, index) => <div className="dashboard-row-skeleton" key={index} aria-hidden="true"><span /><span /><span /></div>)}
  </div>;
}

function DashboardLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="dashboard-view-all" to={to}>{children}<ArrowLeft size={15} aria-hidden="true" /></Link>;
}

export function Dashboard() {
  const { data: persons, isLoading: loadingPersons, isError: errorPersons, refetch: refetchPersons } = useQuery({ queryKey: ['persons'], queryFn: ({ signal }) => apiClient.get<Person[]>('/persons', { signal }).then((response) => response.data) });
  const { data: courses, isLoading: loadingCourses, isError: errorCourses, refetch: refetchCourses } = useQuery({ queryKey: ['courses'], queryFn: ({ signal }) => apiClient.get<Course[]>('/courses', { signal }).then((response) => response.data) });
  const { data: plannedCourses, isLoading: loadingPlanned, isError: errorPlanned, refetch: refetchPlanned } = useQuery({ queryKey: ['dashboard-planned-courses'], queryFn: ({ signal }) => apiClient.get<Course[]>('/get-planned-courses', { signal }).then((response) => response.data) });
  const { data: executedCourses, isLoading: loadingExecuted, isError: errorExecuted, refetch: refetchExecuted } = useQuery({ queryKey: ['dashboard-executed-courses'], queryFn: ({ signal }) => apiClient.get<Course[]>('/get-executed-courses', { signal }).then((response) => response.data) });

  const { data: sessions, isLoading: loadingSessions, isError: errorSessions, refetch: refetchSessions } = useQuery({ queryKey: ['course-sessions'], queryFn: ({ signal }) => apiClient.get<CourseSession[]>('/course-sessions', { signal }).then((response) => response.data) });

  const username = useAuthStore((state) => state.username);
  const today = dayKey(new Date());
  const allPersons = persons || emptyPersons;
  const allCourses = courses || emptyCourses;
  const allPlanned = plannedCourses || emptyCourses;
  const allSessions = sessions || emptySessions;
  const { coursesById, todaysSessions, upcomingCourses, latestCourses, latestPersons, activePersons } = useMemo(
    () => dashboardSummary(allPersons, allCourses, allPlanned, allSessions, today),
    [allPersons, allCourses, allPlanned, allSessions, today],
  );
  const stats = [
    { title: 'إجمالي الموظفين', value: allPersons.length, note: 'ضمن نطاق الشركة', icon: UsersRound, tone: 'blue', loading: loadingPersons, failed: errorPersons, retry: refetchPersons },
    { title: 'الموظفون النشطون', value: activePersons, note: 'حالة العمل الحالية', icon: UserCheck, tone: 'sky', loading: loadingPersons, failed: errorPersons, retry: refetchPersons },
    { title: 'الدورات المخططة', value: allPlanned.length, note: 'برامج قيد التخطيط', icon: CalendarClock, tone: 'purple', loading: loadingPlanned, failed: errorPlanned, retry: refetchPlanned },
    { title: 'الدورات المنفذة', value: executedCourses?.length ?? 0, note: 'برامج بدأ تنفيذها', icon: GraduationCap, tone: 'green', loading: loadingExecuted, failed: errorExecuted, retry: refetchExecuted },
  ];

  return <div className="dashboard">
    <header className="dashboard-welcome">
      <div className="dashboard-welcome-copy"><h1>مرحبًا بك، <bdi>{username || 'المستخدم'}</bdi></h1><h2>في منصة إدارة التدريب والتطوير</h2><p>إدارة فعّالة للتدريب، متابعة الموظفين، وتطوير الكفاءات.</p></div>
    </header>
    <section className="dashboard-stats" aria-label="مؤشرات الموارد والتدريب">
      {stats.map(({ title, value, note, icon: Icon, tone, loading, failed, retry }) => <article className={`dashboard-stat dashboard-stat--${tone}`} key={title} aria-busy={loading}>
        <div className="dashboard-stat-icon"><Icon size={25} aria-hidden="true" /></div>
        <div className="dashboard-stat-content"><h2>{title}</h2>
          {loading ? <span className="dashboard-value-skeleton" role="status" aria-label={`جارٍ تحميل ${title}`} /> : <strong>{failed ? '—' : value.toLocaleString('en-US')}</strong>}
          {failed ? <button className="dashboard-retry" onClick={() => retry()} aria-label={`إعادة تحميل ${title}`}>تعذر التحميل · أعد المحاولة</button> : <p>{note}</p>}
        </div></article>)}
    </section>

    <section className="dashboard-actions-wrap" aria-labelledby="dashboard-actions-title"><h2 id="dashboard-actions-title"><Zap size={24} aria-hidden="true" />إجراءات سريعة</h2><div className="dashboard-actions">
      <Link to="/persons/new" className="dashboard-action dashboard-action--gold"><UserPlus size={22} aria-hidden="true" /><span>إضافة موظف</span></Link>
      <Link to="/courses/new" className="dashboard-action dashboard-action--blue"><BookOpen size={22} aria-hidden="true" /><span>تأسيس دورة تدريبية</span></Link>
      <Link to="/course-sessions/new" className="dashboard-action dashboard-action--purple"><Calendar size={22} aria-hidden="true" /><span>جدولة جلسة</span></Link>
      <Link to="/learning-paths" className="dashboard-action"><Layers size={22} aria-hidden="true" /><span>المسارات التدريبية</span></Link>
    </div></section>

    <section className="dashboard-panels" id="dashboard-content" aria-label="ملخص النظام">
      <Card className="dashboard-courses" title="الدورات التدريبية" action={<DashboardLink to="/courses">عرض الكل</DashboardLink>}>
        {loadingCourses ? <DashboardRowsSkeleton /> : errorCourses ? <div className="dashboard-empty-panel" role="alert"><strong>تعذر تحميل الدورات</strong><Button variant="outline" size="sm" onClick={() => refetchCourses()}><RefreshCw size={15} />إعادة المحاولة</Button></div> : <Table data={latestCourses} compact showOverview={false} columns={[{ header: 'اسم الدورة', accessor: (row) => row.id ? <Link to={`/courses/${row.id}`}>{row.name || `دورة #${row.id}`}</Link> : <strong>{row.name || 'دورة بدون رقم'}</strong> }, { header: 'تاريخ البداية', accessor: (row) => dateLabel(row.starting_date) }, { header: 'الحالة', accessor: (row) => row.is_executed ? <Badge variant="success">منفذة</Badge> : row.is_planned ? <Badge variant="warning">مخططة</Badge> : <Badge variant="neutral">غير محددة</Badge> }]} emptyTitle="لا توجد دورات مسجلة" emptyDescription="ستظهر هنا الدورات بعد إضافتها إلى النظام." emptyIcon={<GraduationCap size={30} />} />}
      </Card>

      <Card className="dashboard-today" title="الجلسات المجدولة اليوم" action={<DashboardLink to="/course-sessions">كل الجلسات</DashboardLink>}>
        {loadingSessions ? <DashboardRowsSkeleton rows={3} /> : errorSessions ? <div className="dashboard-empty-panel" role="alert"><strong>تعذر تحميل الجلسات</strong><Button variant="outline" size="sm" onClick={() => refetchSessions()}><RefreshCw size={15} />إعادة المحاولة</Button></div> : todaysSessions.length ? <div className="dashboard-session-list">{todaysSessions.slice(0, 5).map((session: CourseSession) => <Link className="dashboard-session" to={`/course-sessions/${session.id}`} key={session.id}><div><strong>{coursesById.get(Number(session.course_id))?.name || `دورة #${session.course_id}`}</strong><span>{dateLabel(session.session_date)}</span></div><time>{timeLabel(session.start_time)}{session.end_time ? ` – ${timeLabel(session.end_time)}` : ''}</time></Link>)}</div> : <div className="dashboard-empty-panel"><Calendar size={34} aria-hidden="true" /><strong>لا توجد جلسات مجدولة اليوم</strong><span>يمكنك متابعة الجدول الكامل أو إضافة جلسة جديدة.</span><Link to="/course-sessions/new" className="dashboard-view-all">جدولة جلسة</Link></div>}
      </Card>

      <Card className="dashboard-indicators" title="مؤشرات التدريب" action={<ChartNoAxesCombined size={22} aria-hidden="true" />}>
        {loadingPlanned || loadingExecuted ? <DashboardRowsSkeleton rows={2} /> : errorPlanned || errorExecuted ? <div className="dashboard-empty-panel" role="alert"><strong>تعذر تحميل مؤشرات التدريب</strong><Button variant="outline" size="sm" onClick={() => { void refetchPlanned(); void refetchExecuted(); }}>إعادة المحاولة</Button></div> : <div className="dashboard-chart">
          <div className="dashboard-donut" role="img" aria-label={`الدورات المخططة ${allPlanned.length}، الدورات المنفذة ${executedCourses?.length ?? 0}`} style={{ background: allPlanned.length + (executedCourses?.length ?? 0) ? `conic-gradient(#39a9ff 0 ${(allPlanned.length / (allPlanned.length + (executedCourses?.length ?? 0))) * 100}%, #16c784 0 100%)` : '#e3edf7' }}><div><strong>{allPlanned.length + (executedCourses?.length ?? 0)}</strong><span>إجمالي الدورات</span></div></div>
          <div className="dashboard-chart-legend"><span><i className="is-executed" />منفذة <b>{executedCourses?.length ?? 0}</b></span><span><i />مخططة <b>{allPlanned.length}</b></span></div>
        </div>}
      </Card>

      <Card className="dashboard-people" title="أحدث الموظفين" action={<DashboardLink to="/persons">عرض الموظفين</DashboardLink>}>
        {loadingPersons ? <DashboardRowsSkeleton /> : errorPersons ? <div className="dashboard-empty-panel" role="alert"><strong>تعذر تحميل الموظفين</strong><Button variant="outline" size="sm" onClick={() => refetchPersons()}><RefreshCw size={15} />إعادة المحاولة</Button></div> : <Table data={latestPersons} compact showOverview={false} columns={[{ header: 'الكود', accessor: (row) => <span className="people-code">{row.code || '—'}</span> }, { header: 'اسم الموظف', accessor: (row) => row.id ? <Link to={`/persons/${row.id}`}>{row.name || 'بدون اسم'}</Link> : <strong>{row.name || 'بدون اسم'}</strong> }, { header: 'الحالة', accessor: (row) => row.is_active ? <Badge variant="success">نشط</Badge> : <Badge variant="danger">غير نشط</Badge> }]} emptyTitle="لا توجد بيانات موظفين" emptyDescription="أضف الموظفين لبدء إدارة البرامج التدريبية." emptyIcon={<Users size={30} />} />}
      </Card>

      <Card className="dashboard-upcoming" title="الدورات القادمة" action={<DashboardLink to="/courses">خطة التدريب</DashboardLink>}>
        {loadingPlanned ? <DashboardRowsSkeleton rows={3} /> : errorPlanned ? <div className="dashboard-empty-panel" role="alert"><strong>تعذر تحميل خطة التدريب</strong><Button variant="outline" size="sm" onClick={() => refetchPlanned()}><RefreshCw size={15} />إعادة المحاولة</Button></div> : upcomingCourses.length ? <div className="dashboard-session-list">{upcomingCourses.map((course: Course) => <Link className="dashboard-session" to={`/courses/${course.id}`} key={course.id}><div><strong>{course.name || `دورة #${course.id}`}</strong><span>{course.is_executed ? 'منفذة' : 'مخططة'}</span></div><time>{dateLabel(course.starting_date)}</time></Link>)}</div> : <div className="dashboard-empty-panel"><CalendarClock size={34} aria-hidden="true" /><strong>لا توجد دورات قادمة</strong><span>ستظهر البرامج المخططة هنا حسب تاريخ البداية.</span><Link to="/courses/new" className="dashboard-view-all">تأسيس دورة تدريبية</Link></div>}
      </Card>
    </section>
  </div>;
}
