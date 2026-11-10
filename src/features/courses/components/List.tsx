import { BookOpen,CalendarDays,CheckCircle2,Clock3,Plus,Search,Users } from 'lucide-react';
import { useDeferredValue,useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { ErrorState } from '../../../shared/components/ErrorState';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { sessionDate } from '../../course-sessions/utils/schedule';
import './catalog-enterprise.css';
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
  const [params,setParams]=useSearchParams();
  const query=params.get('q')||'';
  const deferredQuery=useDeferredValue(query);
  const status=params.get('status')||'all';
  const subject=params.get('subject')||'all';
  const sort=params.get('sort')||'newest';
  const requestedPage=Number(params.get('page'))||1;
  const page=Number.isFinite(requestedPage)?Math.max(1,Math.floor(requestedPage)):1;
  const change=(key:string,value:string)=>setParams(current=>{const next=new URLSearchParams(current);if(value&&value!=='all')next.set(key,value);else next.delete(key);if(key!=='page')next.delete('page');return next;},{replace:true});
  const setPage=(value:number)=>change('page',String(value));
  const subjectNames=useMemo(()=>new Map(subjects.data?.map(s=>[s.id,s.name])),[subjects.data]);
  const courses = data ?? EMPTY_COURSES;
  const visible = useMemo(() => filterCourses(courses, { query:deferredQuery, status, subject, sort }), [courses, deferredQuery, status, subject, sort]);
  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const reset = () => setParams({}, {replace:true});
  const stats = [
    { label: 'إجمالي الدورات', value: courses.length, icon: BookOpen, tone: 'blue' },
    { label: 'الدورات المخططة', value: courses.filter(c => c.is_planned && !c.is_executed).length, icon: CalendarDays, tone: 'purple' },
    { label: 'الدورات المنفذة', value: courses.filter(c => c.is_executed).length, icon: CheckCircle2, tone: 'green' },
    { label: 'إجمالي المشاركين', value: courses.reduce((sum, c) => sum + (c.number_of_internal_participants ?? 0) + (c.number_of_external_participants ?? 0), 0), icon: Users, tone: 'gold' },
  ];
  return <div className="course-page enterprise-page enterprise-catalog">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">الرئيسية</Link><span>‹</span><span>إدارة التدريب</span><span>‹</span><strong aria-current="page">الدورات التدريبية</strong></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">إدارة التدريب / دليل الدورات</span><h1>الدورات التدريبية</h1><p>راجع البرامج المخططة والمنفذة، وقارن مواعيدها ومشاركيها، وافتح دورة لإدارة تفاصيلها.</p></div><Link className="enterprise-link-button enterprise-link-button--primary" to="/courses/new"><Plus size={18} aria-hidden="true"/>تأسيس دورة تدريبية</Link></header>
    <section className="course-stats" aria-label="إحصاءات الدورات">{stats.map(({ label, value, icon: Icon, tone }) => <article className={`course-stat course-stat--${tone}`} key={label}><span><Icon size={24} aria-hidden="true" /></span><div><h2>{label}</h2><strong>{isLoading?<span className="catalog-metric-shimmer" aria-label="جارٍ التحميل" role="status"/>:isError&&!data?'—':value.toLocaleString('ar-EG')}</strong></div></article>)}</section>
    <section className="catalog-controls" aria-label="البحث والتصفية">
      <label className="people-search"><Search size={20} /><input type="search" aria-label="البحث في الدورات" value={query} onChange={event => change('q',event.target.value)} placeholder="اسم الدورة أو رقمها..." /></label>
      <label>حالة الدورة<select value={status} onChange={event => change('status',event.target.value)}><option value="all">كل الحالات</option><option value="planned">مخططة</option><option value="executed">منفذة</option><option value="other">غير محددة</option></select></label>
      <label>الموضوع التدريبي<select disabled={subjects.isLoading || subjects.isError} value={subject} onChange={event => change('subject',event.target.value)}><option value="all">{subjects.isLoading ? 'جارٍ التحميل…' : subjects.isError ? 'تعذر تحميل المواضيع' : 'كل المواضيع'}</option>{subjects.data?.filter(item => item.id != null).map(item => <option key={item.id} value={item.id}>{item.name || `موضوع #${item.id}`}</option>)}</select></label>
      <label>ترتيب الدورات<select value={sort} onChange={event => change('sort',event.target.value)}><option value="newest">الأحدث إضافة</option><option value="name">الاسم</option><option value="date">تاريخ البداية</option></select></label>
    </section>
    {subjects.isError && <p role="status">يمكنك البحث في الدورات. <button className="text-action" onClick={() => subjects.refetch()}>إعادة تحميل المواضيع</button></p>}
    <div className="catalog-results"><h2>الدورات التدريبية</h2><span role="status">{isLoading?'جارٍ تحميل الدورات':isError&&!data?'الدورات غير متاحة':`${visible.length.toLocaleString('ar-EG')} نتيجة`}</span>{(query || status !== 'all' || subject !== 'all') && <button className="text-action" onClick={reset}>مسح التصفية</button>}</div>
    {isError&&<ErrorState title="تعذر تحميل الدورات" onRetry={()=>refetch()}/>}
    {isLoading?<section className="course-grid" aria-label="جارٍ تحميل بطاقات الدورات">{Array.from({length:6},(_,i)=><EnterpriseSkeleton variant="card" key={i}/>)}</section>:(!isError||data)&&<><section className="course-grid">{visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((course, index) => {
      const courseStatus = statusFor(course);
      const subjectName = subjectNames.get(course.learning_subject_id);
      const image = trainingVisual(`${subjectName ?? ''} ${course.name ?? ''}`);
      const count = (course.number_of_internal_participants ?? 0) + (course.number_of_external_participants ?? 0);
      return <article className="course-card" key={course.id ?? index}>
        <img className="course-cover" src={`/training/${image}-card.jpg`} alt="" width="640" height="360" loading="lazy" decoding="async" />
        <div className="course-card-top"><span className="course-subject">{subjectName || 'برنامج تدريبي'}</span><Badge variant={courseStatus.variant}>{courseStatus.label}</Badge></div>
        <h2>{course.id != null ? <Link to={`/courses/${course.id}`}>{course.name || 'دورة بدون اسم'}</Link> : course.name || 'دورة بدون اسم'}</h2>
        <p>رقم الدورة: <strong>#{course.id ?? '—'}</strong></p>
        <div className="course-meta"><span><Clock3 size={16} />{course.duration_in_days ?? '—'} أيام</span><span><Users size={16} />{count} مشارك</span></div>
        <div className="course-card-footer"><span>{course.starting_date ? `تبدأ ${sessionDate(course.starting_date)}` : 'لم يحدد الموعد'}</span>{course.id != null && <Link to={`/courses/${course.id}`} aria-label={`عرض تفاصيل ${course.name || 'الدورة'}`}>عرض التفاصيل</Link>}</div>
      </article>;
    })}</section>
    {!visible.length && <section className="course-empty"><BookOpen size={38} /><h2>{courses.length ? 'لا توجد دورات مطابقة' : 'مساحة لفرص تعلّم جديدة'}</h2><p>{courses.length ? 'جرّب اسماً آخر أو أزل خيارات التصفية.' : 'لم تُضف دورات بعد. ابدأ بتأسيس أول برنامج تدريبي لفريقك.'}</p>{courses.length ? <button className="hero-primary" onClick={reset}>عرض جميع الدورات</button> : <Link className="hero-primary" to="/courses/new"><Plus size={18} />تأسيس أول دورة</Link>}</section>}
    {pageCount > 1 && <nav className="catalog-pagination" aria-label="صفحات الدورات"><button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>السابق</button><span aria-live="polite">صفحة {currentPage} من {pageCount}</span><button disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>التالي</button></nav>}
    </>}
  </div>;
}
