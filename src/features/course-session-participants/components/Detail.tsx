import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { RecordActions } from '../../../shared/enterprise/RecordActions';
import { useCourseSessionParticipant } from '../api/useGetQuery';
export function CourseSessionParticipantDetail() {
  const { id = '' } = useParams();
  const { data, isLoading, isError, refetch } = useCourseSessionParticipant(id);
  return <div className="enterprise-page">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/course-session-participants">حضور جلسات التدريب</Link><span aria-hidden="true">/</span><span aria-current="page">سجل <bdi>#{id}</bdi></span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">شئون التدريب والعمليات / سجل الحضور</span><h1>تفاصيل حضور المتدرب</h1><p>راجع ارتباط المتدرب بالجلسة قبل تعديل الحضور أو حذفه.</p></div><Link className="enterprise-link-button" to="/course-session-participants"><ArrowRight size={18} aria-hidden="true"/>العودة للسجلات</Link></header>
    {isLoading?<Card title="بيانات الحضور"><EnterpriseSkeleton variant="fields" columns={3}/></Card>:isError?<ErrorState title="تعذر تحميل سجل الحضور" onRetry={()=>refetch()}/>:!data?<EmptyState title="سجل الحضور غير متاح" description="ارجع إلى السجلات لاختيار تسجيل متاح."/>:<Card title="بيانات الحضور" action={<RecordActions resource="course-session-participants" singular="course-session-participant" id={id} name={`حضور ${data.course_participant?.person?.name || `المشارك #${data.course_participant_id}`} في الجلسة #${data.course_session_id}`}/>}>
      <dl className="enterprise-data"><div><dt>رقم سجل الحضور</dt><dd><bdi>#{data.id ?? id}</bdi></dd></div><div><dt>المتدرب المسجل بالدورة</dt><dd>{data.course_participant_id!=null?<Link className="enterprise-record-link" to={`/course-participants/${data.course_participant_id}`}>{data.course_participant?.person?.name || 'ملف المشاركة'} <bdi>#{data.course_participant_id}</bdi></Link>:'غير محدد'}</dd></div><div><dt>الجلسة التدريبية</dt><dd>{data.course_session_id!=null?<Link className="enterprise-record-link" to={`/course-sessions/${data.course_session_id}`}>تفاصيل الجلسة <bdi>#{data.course_session_id}</bdi></Link>:'غير محددة'}</dd></div></dl>
    </Card>}
  </div>;
}
