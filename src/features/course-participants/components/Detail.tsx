import { ArrowRight, Award, ClipboardCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Table } from '../../../shared/components/Table';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useCourseParticipant } from '../api/useGetQuery';
import type { CourseParticipantFinalExam } from '../../course-participant-final-exams/types';
import { examDate, examScore } from '../../course-participant-final-exams/utils/results';

type Evaluation = { score?: number | null; notes?: string | null; entered_at?: string | null };
const timestamp = new Intl.DateTimeFormat('ar-EG', { dateStyle:'medium', timeStyle:'short' });
function enteredAt(value?: string | null) { const date=value?new Date(value):null;return date&&!Number.isNaN(date.getTime())?timestamp.format(date):'غير محدد'; }
export function CourseParticipantDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useCourseParticipant(id || '');
  const exams: CourseParticipantFinalExam[] = data?.final_exams || [];
  const evaluations: Evaluation[] = data?.performance_evaluation_details || [];
  return <div className="enterprise-page">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/course-participants">مشاركو الدورات</Link><span aria-hidden="true">/</span><span aria-current="page">سجل <bdi>#{id}</bdi></span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">شئون المتدربين / متابعة المتدرب</span><h1>تفاصيل المشاركة التدريبية</h1><p>تابع اختبارات المتدرب وتقييماته في الدورة، وانتقل إلى ملف الموظف أو الدورة عند الحاجة.</p></div><Link className="enterprise-link-button" to="/course-participants"><ArrowRight size={18} aria-hidden="true"/>العودة للمشاركات</Link></header>
    {isLoading?<><Card title="بيانات المشاركة"><EnterpriseSkeleton variant="fields" columns={3}/></Card><Card title="الاختبارات النهائية"><EnterpriseSkeleton columns={3} rows={3}/></Card><Card title="تقييمات الأداء"><EnterpriseSkeleton columns={3} rows={3}/></Card></>:isError?<ErrorState title="تعذر تحميل سجل المشاركة" onRetry={()=>refetch()}/>:!data?<EmptyState title="سجل المشاركة غير متاح" description="ارجع إلى المشاركات لاختيار سجل متاح."/>:<>
      <Card title="بيانات المشاركة"><dl className="enterprise-data"><div><dt>رقم المشاركة</dt><dd><bdi>{data.id?.toLocaleString('ar-EG') ?? id}</bdi></dd></div><div><dt>الموظف</dt><dd>{data.person_id!=null?<Link className="enterprise-record-link" to={`/persons/${data.person_id}`}>ملف الموظف <bdi>#{data.person_id}</bdi></Link>:'غير محدد'}</dd></div><div><dt>الدورة التدريبية</dt><dd>{data.course_id!=null?<Link className="enterprise-record-link" to={`/courses/${data.course_id}`}>تفاصيل الدورة <bdi>#{data.course_id}</bdi></Link>:'غير محددة'}</dd></div></dl></Card>
      <Card title="الاختبارات النهائية" action={<span>{exams.length.toLocaleString('ar-EG')} اختبار</span>}><Table data={exams} compact showOverview={false} columns={[{header:'تاريخ الاختبار',accessor:row=>row.id!=null?<Link className="enterprise-record-link" to={`/course-participant-final-exams/${row.id}`}>{examDate(row.exam_date)}</Link>:examDate(row.exam_date)},{header:'الجهة المنظمة',accessor:row=>row.organized_by||'غير محددة'},{header:'الدرجة',accessor:row=><span>{examScore(row.exam_score)?.toLocaleString('ar-EG') ?? 'لم تُرصد'}</span>}]} emptyTitle="لا توجد اختبارات مسجلة" emptyDescription="ستظهر نتائج الاختبارات هنا بعد تسجيلها لهذه المشاركة." emptyIcon={<Award size={28} aria-hidden="true"/>}/></Card>
      <Card title="تقييمات الأداء" action={<span>{evaluations.length.toLocaleString('ar-EG')} تقييم</span>}><Table data={evaluations} compact showOverview={false} columns={[{header:'الدرجة المستحقة',accessor:row=>examScore(row.score)?.toLocaleString('ar-EG')??'لم تُرصد'},{header:'ملاحظات التقييم',accessor:row=>row.notes||'لا توجد ملاحظات'},{header:'تاريخ الإدخال',accessor:row=>enteredAt(row.entered_at)}]} emptyTitle="لا توجد تقييمات مسجلة" emptyDescription="ستظهر تقييمات أداء المتدرب هنا عند توفرها." emptyIcon={<ClipboardCheck size={28} aria-hidden="true"/>}/></Card>
    </>}
  </div>;
}
