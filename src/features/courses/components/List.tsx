import { BookOpen,CalendarDays,CheckCircle2,Eye,Pencil,Plus,Search,Users } from 'lucide-react';
import { useDeferredValue,useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { ErrorState } from '../../../shared/components/ErrorState';
import { sessionDate } from '../../course-sessions/utils/schedule';
import './catalog-enterprise.css';
import { Table, type Column } from '../../../shared/components/Table';
import { useLearningSubjects } from '../../learning-subjects/api/useListQuery';
import { useCourses } from '../api/useListQuery';
import { filterCourses } from '../catalog';
import type { Course } from '../types';

const EMPTY_COURSES: Course[] = [];

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
  const change=(key:string,value:string)=>setParams(current=>{const next=new URLSearchParams(current);if(value&&value!=='all')next.set(key,value);else next.delete(key);if(key!=='page')next.delete('page');return next;},{replace:true});
  const subjectNames=useMemo(()=>new Map(subjects.data?.map(s=>[s.id,s.name])),[subjects.data]);
  const courses = data ?? EMPTY_COURSES;
  const visible = useMemo(() => filterCourses(courses, { query:deferredQuery, status, subject, sort }), [courses, deferredQuery, status, subject, sort]);
  const reset = () => setParams({}, {replace:true});
  const stats = [
    { label: 'إجمالي الدورات', value: courses.length, icon: BookOpen, tone: 'blue' },
    { label: 'الدورات المخططة', value: courses.filter(c => c.is_planned && !c.is_executed).length, icon: CalendarDays, tone: 'purple' },
    { label: 'الدورات المنفذة', value: courses.filter(c => c.is_executed).length, icon: CheckCircle2, tone: 'green' },
    { label: 'إجمالي المشاركين', value: courses.every(c => c.number_of_internal_participants != null && c.number_of_external_participants != null) ? courses.reduce((sum, c) => sum + Number(c.number_of_internal_participants) + Number(c.number_of_external_participants), 0) : null, icon: Users, tone: 'gold' },
  ];
  const columns: Column<Course>[] = [
    { header: 'رقم الدورة', accessor: row => <bdi>{row.id ?? '—'}</bdi>, width: '90px' },
    { header: 'كود الدورة', accessor: row => <bdi>{row.code ?? '—'}</bdi> },
    { header: 'اسم الدورة', accessor: row => row.id != null ? <Link className="enterprise-record-link" to={`/courses/${row.id}`}>{row.name || '—'}</Link> : row.name || '—' },
    { header: 'الموضوع التدريبي', accessor: row => subjectNames.get(row.learning_subject_id) || '—' },
    { header: 'الحالة', accessor: row => { const state = statusFor(row); return <Badge variant={state.variant}>{state.label}</Badge>; } },
    { header: 'تاريخ البداية', accessor: row => sessionDate(row.starting_date) },
    { header: 'تاريخ النهاية', accessor: row => sessionDate(row.end_date) },
    { header: 'عدد المشاركين', accessor: row => row.number_of_internal_participants == null || row.number_of_external_participants == null ? '—' : Number(row.number_of_internal_participants) + Number(row.number_of_external_participants), align: 'center' },
    { header: 'إجراءات', accessor: row => row.id == null ? '—' : <div className="sheet-row-actions"><Link to={`/courses/${row.id}`} aria-label={`عرض ${row.name || 'الدورة'}`}><Eye size={18} /></Link><Link to={`/courses/${row.id}/edit`} aria-label={`تعديل ${row.name || 'الدورة'}`}><Pencil size={18} /></Link></div> },
  ];
  return <div className="course-page enterprise-page enterprise-catalog">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">الرئيسية</Link><span>‹</span><span>إدارة التدريب</span><span>‹</span><strong aria-current="page">الدورات التدريبية</strong></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">إدارة التدريب / دليل الدورات</span><h1>الدورات التدريبية</h1><p>راجع البرامج المخططة والمنفذة، وقارن مواعيدها ومشاركيها، وافتح دورة لإدارة تفاصيلها.</p></div><Link className="enterprise-link-button enterprise-link-button--primary" to="/courses/new"><Plus size={18} aria-hidden="true"/>تأسيس دورة تدريبية</Link></header>
    <section className="course-stats" aria-label="إحصاءات الدورات">{stats.map(({ label, value, icon: Icon, tone }) => <article className={`course-stat course-stat--${tone}`} key={label}><span><Icon size={24} aria-hidden="true" /></span><div><h2>{label}</h2><strong>{isLoading?<span className="catalog-metric-shimmer" aria-label="جارٍ التحميل" role="status"/>:isError&&!data?'—':value == null ? '—' : value.toLocaleString('en-US')}</strong></div></article>)}</section>
    <section className="catalog-controls" aria-label="البحث والتصفية">
      <label className="people-search"><Search size={20} /><input type="search" aria-label="البحث في الدورات" value={query} onChange={event => change('q',event.target.value)} placeholder="اسم الدورة أو رقمها..." /></label>
      <label>حالة الدورة<select value={status} onChange={event => change('status',event.target.value)}><option value="all">كل الحالات</option><option value="planned">مخططة</option><option value="executed">منفذة</option><option value="other">غير محددة</option></select></label>
      <label>الموضوع التدريبي<select disabled={subjects.isLoading || subjects.isError} value={subject} onChange={event => change('subject',event.target.value)}><option value="all">{subjects.isLoading ? 'جارٍ التحميل…' : subjects.isError ? 'تعذر تحميل المواضيع' : 'كل المواضيع'}</option>{subjects.data?.filter(item => item.id != null).map(item => <option key={item.id} value={item.id}>{item.name || `موضوع #${item.id}`}</option>)}</select></label>
      <label>ترتيب الدورات<select value={sort} onChange={event => change('sort',event.target.value)}><option value="newest">الأحدث إضافة</option><option value="name">الاسم</option><option value="date">تاريخ البداية</option></select></label>
    </section>
    {subjects.isError && <p role="status">يمكنك البحث في الدورات. <button className="text-action" onClick={() => subjects.refetch()}>إعادة تحميل المواضيع</button></p>}
    <div className="catalog-results"><h2>الدورات التدريبية</h2><span role="status">{isLoading?'جارٍ تحميل الدورات':isError&&!data?'الدورات غير متاحة':`${visible.length.toLocaleString('ar-EG')} نتيجة`}</span>{(query || status !== 'all' || subject !== 'all') && <button className="text-action" onClick={reset}>مسح التصفية</button>}</div>
    {isError&&<ErrorState title="تعذر تحميل الدورات" onRetry={()=>refetch()}/>}
    {(!isError || data) && <section className="sheet-panel"><Table page={Number(params.get('page')) || 1} onPageChange={page => change('page', String(page))} key={`${deferredQuery}:${status}:${subject}:${sort}`} columns={columns} data={visible} isLoading={isLoading} compact showOverview={false} emptyTitle={courses.length ? 'لا توجد دورات مطابقة' : 'لم تُضف دورات بعد'} emptyDescription="ستظهر هنا بيانات الدورات المرسلة من النظام." /></section>}
  </div>;
}
