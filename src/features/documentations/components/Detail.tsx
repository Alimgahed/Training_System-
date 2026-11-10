import { ArrowRight, FileText } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { RecordActions } from '../../../shared/enterprise/RecordActions';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useDocumentation } from '../api/useGetQuery';
import './archive.css';
export function DocumentationDetail() {
  const { id } = useParams<{id:string}>();
  const { data, isLoading, isError, refetch } = useDocumentation(id || '');
  const relationships = [
    { label:'نوع الوثيقة', value:data?.documentation_type_id, resource:'documentation-types' },
    { label:'الدورة التدريبية', value:data?.course_id, resource:'courses' },
    { label:'الجلسة التدريبية', value:data?.course_session_id, resource:'course-sessions' },
    { label:'الموضوع التدريبي', value:data?.learning_subject_id, resource:'learning-subjects' },
    { label:'مادة درجة المسار', value:data?.path_grade_subject_id, resource:'path-grade-subjects' },
    { label:'مادة الفصل التدريبي', value:data?.path_grade_subject_term_id, resource:'path-grade-subject-terms' },
  ];
  return <div className="enterprise-page archive-detail">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/documentations">الوثائق والمستندات</Link><span aria-hidden="true">/</span><span aria-current="page">تفاصيل الوثيقة</span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">الوثائق والأرشفة / سجل <bdi>#{id}</bdi></span><h1>{data?.name || 'تفاصيل الوثيقة'}</h1><p>بيانات الوثيقة ومسار ملفها وارتباطاتها التدريبية.</p></div><Link className="enterprise-link-button" to="/documentations"><ArrowRight size={18} aria-hidden="true"/>العودة للقائمة</Link></header>
    {isLoading?<><Card title="بيانات الوثيقة"><EnterpriseSkeleton variant="fields" columns={3}/></Card><Card title="الارتباطات"><EnterpriseSkeleton variant="fields" columns={6}/></Card></>:isError?<ErrorState title="تعذر تحميل الوثيقة" message="تحقق من الاتصال وتوفر السجل ثم أعد المحاولة أو ارجع إلى الأرشيف." onRetry={()=>refetch()}/>:!data?<EmptyState title="الوثيقة غير متاحة" description="ارجع إلى الأرشيف واختر سجلاً متاحاً."/>:<><Card title="بيانات الوثيقة" action={<RecordActions resource="documentations" singular="documentation" id={id||''} name={data.name||'الوثيقة'}/>}><dl className="enterprise-data archive-basic"><div><dt>اسم الوثيقة</dt><dd>{data.name||'لم يُحدد الاسم'}</dd></div><div><dt>رقم السجل</dt><dd><bdi>{data.id?.toLocaleString('ar-EG')??'—'}</bdi></dd></div></dl><div className="archive-path-panel"><FileText size={24} aria-hidden="true"/><div><h2>مسار الملف</h2><p dir="auto">{data.file_path?.trim()||'لم يُسجّل مسار لهذه الوثيقة'}</p></div></div></Card><Card title="الارتباطات"><dl className="enterprise-data">{relationships.map(item=><div key={item.resource}><dt>{item.label}</dt><dd>{item.value?<Link className="enterprise-record-link" to={`/${item.resource}/${item.value}`}>{item.label} <bdi>#{item.value}</bdi></Link>:'غير مرتبط'}</dd></div>)}</dl></Card></>}
  </div>;
}
