import { BookOpen,CalendarDays,CheckCircle2,Clock3,Plus,Search,Users } from 'lucide-react';
import { useMemo,useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { trainingVisual } from '../../../shared/trainingVisuals';
import { useLearningSubjects } from '../../learning-subjects/api/useListQuery';
import { useCourses } from '../api/useListQuery';
import { filterCourses } from '../catalog';
import type { Course } from '../types';

const EMPTY_COURSES: Course[] = [];
const PAGE_SIZE = 12;
const statusFor = (course: Course) => course.is_executed ? { label: 'منفذة', variant: 'success' as const } : course.is_planned ? { label: 'مخططة', variant: 'info' as const } : { label: 'غير محددة', variant: 'neutral' as const };

export function CourseList() {
  const { data, isLoading, isError, refetch } = useCourses();
  const subjects = useLearningSubjects();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [subject, setSubject] = useState('all');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const courses = data ?? EMPTY_COURSES;
  const visible = useMemo(() => filterCourses(courses, { query, status, subject, sort }), [courses, query, status, subject, sort]);
  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const reset = () => { setQuery(''); setStatus('all'); setSubject('all'); setPage(1); };
  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  const stats = [
    { label: 'إجمالي الدورات', value: courses.length, icon: BookOpen, tone: 'blue' },
    { label: 'الدورات المخططة', value: courses.filter(c => c.is_planned && !c.is_executed).length, icon: CalendarDays, tone: 'purple' },
    { label: 'الدورات المنفذة', value: courses.filter(c => c.is_executed).length, icon: CheckCircle2, tone: 'green' },
    { label: 'إجمالي المشاركين', value: courses.reduce((sum, c) => sum + (c.number_of_internal_participants ?? 0) + (c.number_of_external_participants ?? 0), 0), icon: Users, tone: 'gold' },
  ];
  return <div className="course-page">
    <nav className="people-breadcrumb" aria-label="مسار التنقل"><Link to="/">الرئيسية</Link><span>‹</span><span>إدارة التدريب</span><span>‹</span><strong aria-current="page">الدورات التدريبية</strong></nav>
    <header className="people-header"><div><h1>التعلّم يبدأ بخطوة.</h1><p>استكشف الدورات التدريبية، وخطّط لتنمية مهارات فريقك.</p></div></header>
    <section className="course-stats" aria-label="إحصاءات الدورات">{stats.map(({ label, value, icon: Icon, tone }) => <article className={`course-stat course-stat--${tone}`} key={label}><span><Icon size={24} /></span><div><h2>{label}</h2><strong>{value.toLocaleString('ar-EG')}</strong></div></article>)}</section>
    <section className="catalog-controls" aria-label="البحث والتصفية">
      <label className="people-search"><Search size={20} /><input aria-label="البحث في الدورات" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} placeholder="اسم الدورة أو رقمها..." /></label>
      <label>حالة الدورة<select value={status} onChange={event => { setStatus(event.target.value); setPage(1); }}><option value="all">كل الحالات</option><option value="planned">مخططة</option><option value="executed">منفذة</option><option value="other">غير محددة</option></select></label>
      <label>الموضوع التدريبي<select disabled={subjects.isLoading || subjects.isError} value={subject} onChange={event => { setSubject(event.target.value); setPage(1); }}><option value="all">{subjects.isLoading ? 'جارٍ التحميل…' : subjects.isError ? 'تعذر تحميل المواضيع' : 'كل المواضيع'}</option>{subjects.data?.filter(item => item.id != null).map(item => <option key={item.id} value={item.id}>{item.name || `موضوع #${item.id}`}</option>)}</select></label>
      <label>ترتيب الدورات<select value={sort} onChange={event => { setSort(event.target.value); setPage(1); }}><option value="newest">الأحدث إضافة</option><option value="name">الاسم</option><option value="date">تاريخ البداية</option></select></label>
    <div className="toolbar-create"><Link className="hero-primary" to="/courses/new"><Plus size={20} />تأسيس دورة تدريبية</Link></div></section>
    {subjects.isError && <p role="status">يمكنك البحث في الدورات. <button className="text-action" onClick={() => subjects.refetch()}>إعادة تحميل المواضيع</button></p>}
    <div className="catalog-results"><h2>الدورات التدريبية</h2><span role="status">{visible.length.toLocaleString('ar-EG')} نتيجة</span>{(query || status !== 'all' || subject !== 'all') && <button className="text-action" onClick={reset}>مسح التصفية</button>}</div>
    <section className="course-grid">{visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((course, index) => {
      const courseStatus = statusFor(course);
      const subjectName = subjects.data?.find(item => item.id === course.learning_subject_id)?.name;
      const image = trainingVisual(`${subjectName ?? ''} ${course.name ?? ''}`);
      const count = (course.number_of_internal_participants ?? 0) + (course.number_of_external_participants ?? 0);
      return <article className="course-card" key={course.id ?? index}>
        <img className="course-cover" src={`/training/${image}-card.jpg`} alt="" width="640" height="360" loading="lazy" decoding="async" />
        <div className="course-card-top"><span className="course-subject">{subjectName || 'برنامج تدريبي'}</span><Badge variant={courseStatus.variant}>{courseStatus.label}</Badge></div>
        <h2>{course.id != null ? <Link to={`/courses/${course.id}`}>{course.name || 'دورة بدون اسم'}</Link> : course.name || 'دورة بدون اسم'}</h2>
        <p>رقم الدورة: <strong>#{course.id ?? '—'}</strong></p>
        <div className="course-meta"><span><Clock3 size={16} />{course.duration_in_days ?? '—'} أيام</span><span><Users size={16} />{count} مشارك</span></div>
        <div className="course-card-footer"><span>{course.starting_date ? `تبدأ ${course.starting_date.slice(0, 10)}` : 'لم يحدد الموعد'}</span>{course.id != null && <Link to={`/courses/${course.id}`} aria-label={`عرض تفاصيل ${course.name || 'الدورة'}`}>عرض التفاصيل</Link>}</div>
      </article>;
    })}</section>
    {!visible.length && <section className="course-empty"><BookOpen size={38} /><h2>{courses.length ? 'لا توجد دورات مطابقة' : 'مساحة لفرص تعلّم جديدة'}</h2><p>{courses.length ? 'جرّب اسماً آخر أو أزل خيارات التصفية.' : 'لم تُضف دورات بعد. ابدأ بتأسيس أول برنامج تدريبي لفريقك.'}</p>{courses.length ? <button className="hero-primary" onClick={reset}>عرض جميع الدورات</button> : <Link className="hero-primary" to="/courses/new"><Plus size={18} />تأسيس أول دورة</Link>}</section>}
    {pageCount > 1 && <nav className="catalog-pagination" aria-label="صفحات الدورات"><button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>السابق</button><span aria-live="polite">صفحة {currentPage} من {pageCount}</span><button disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>التالي</button></nav>}
  </div>;
}
