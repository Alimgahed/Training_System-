import { ArrowRight, FileText, UserRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useCourseParticipantFinalExam } from '../api/useGetQuery';
import { examDate, examScore, examStatus } from '../utils/results';
import './results.css';

export function CourseParticipantFinalExamDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useCourseParticipantFinalExam(id || '');
  const status = examStatus(data?.exam_score);
  return <div className="enterprise-page">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/course-participant-final-exams">نتائج الاختبارات النهائية</Link><span aria-hidden="true">/</span><span aria-current="page">اختبار <bdi>#{id}</bdi></span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">شئون المتدربين / سجل اختبار</span><h1>تفاصيل الاختبار النهائي</h1><p>راجع النتيجة وتفاصيل الجهة المنظمة والسجلات المرتبطة.</p></div><Link className="enterprise-link-button" to="/course-participant-final-exams"><ArrowRight size={18} aria-hidden="true" />العودة للنتائج</Link></header>
    {isLoading ? <div className="exam-detail-grid"><Card title="النتيجة"><EnterpriseSkeleton variant="fields" columns={1}/></Card><Card title="بيانات الاختبار"><EnterpriseSkeleton variant="fields" columns={4}/></Card></div> : isError ? <ErrorState title="تعذر تحميل تفاصيل الاختبار" onRetry={()=>refetch()}/> : !data ? <EmptyState title="الاختبار غير متاح" description="ارجع إلى النتائج لاختيار سجل متاح."/> : <>
      <div className="exam-detail-grid"><Card title="النتيجة"><div className="exam-result-focus"><strong>{examScore(data.exam_score)?.toLocaleString('ar-EG') ?? '—'}</strong><span>الدرجة المحققة</span><Badge variant={status==='pending'?'neutral':'info'}>{status==='pending'?'لم تُرصد الدرجة':'درجة مرصودة'}</Badge></div></Card>
      <Card title="بيانات الاختبار"><dl className="enterprise-data"><div><dt>رقم الاختبار</dt><dd><bdi>{data.id?.toLocaleString('ar-EG') ?? id}</bdi></dd></div><div><dt>تاريخ الاختبار</dt><dd>{examDate(data.exam_date)}</dd></div><div><dt>الجهة المنظمة</dt><dd>{data.organized_by || 'غير محددة'}</dd></div><div><dt>رقم مشارك الدورة</dt><dd><bdi>{data.course_participant_id?.toLocaleString('ar-EG') ?? '—'}</bdi></dd></div></dl></Card></div>
      <Card title="السجلات المرتبطة"><div className="exam-related-records">{data.course_participant_id != null ? <Link className="enterprise-link-button" to={`/course-participants/${data.course_participant_id}`}><UserRound size={18} aria-hidden="true"/>عرض سجل المشارك <bdi>#{data.course_participant_id}</bdi></Link> : <p>لم يُربط الاختبار بسجل مشارك.</p>}{data.documentation_id != null ? <Link className="enterprise-link-button" to={`/documentations/${data.documentation_id}`}><FileText size={18} aria-hidden="true"/>عرض الوثيقة <bdi>#{data.documentation_id}</bdi></Link> : <p>لا توجد وثيقة مرتبطة بهذا الاختبار.</p>}</div></Card>
    </>}
  </div>;
}
