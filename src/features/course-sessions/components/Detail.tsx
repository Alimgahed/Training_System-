import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { RecordActions } from '../../../shared/enterprise/RecordActions';
import { useCourseSession } from '../api/useGetQuery';
import { sessionDate, sessionTime } from '../utils/schedule';
export function CourseSessionDetail() {
  const {id=''}=useParams();
  const {data,isLoading,isError,refetch}=useCourseSession(id);
  return <div className="enterprise-page">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/course-sessions">الجلسات التدريبية</Link><span aria-hidden="true">/</span><span aria-current="page">جلسة <bdi>#{id}</bdi></span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">إدارة التدريب / تفاصيل الموعد</span><h1>تفاصيل الجلسة التدريبية</h1><p>راجع موعد الجلسة ودورتها، أو انتقل إلى الحضور المسجل لهذه الجلسة.</p></div><Link className="enterprise-link-button" to="/course-sessions"><ArrowRight size={18} aria-hidden="true"/>العودة للجدول</Link></header>
    {isLoading?<><Card title="موعد الجلسة"><EnterpriseSkeleton variant="fields" columns={4}/></Card><Card title="الدورة والحضور"><EnterpriseSkeleton variant="fields" columns={2}/></Card></>:isError?<ErrorState title="تعذر تحميل الجلسة" onRetry={()=>refetch()}/>:!data?<EmptyState title="الجلسة غير متاحة" description="ارجع إلى الجدول لاختيار جلسة متاحة."/>:<>
      <Card title="موعد الجلسة" action={<RecordActions resource="course-sessions" singular="course-session" id={id} name={`الجلسة #${id} بتاريخ ${sessionDate(data.session_date)}`}/>}><dl className="enterprise-data"><div><dt>تاريخ الانعقاد</dt><dd>{sessionDate(data.session_date)}</dd></div><div><dt>وقت البدء</dt><dd><bdi>{sessionTime(data.start_time)}</bdi></dd></div><div><dt>وقت الانتهاء</dt><dd><bdi>{sessionTime(data.end_time)}</bdi></dd></div><div><dt>رقم الجلسة</dt><dd><bdi>#{data.id??id}</bdi></dd></div></dl></Card>
      <Card title="الدورة والحضور"><dl className="enterprise-data"><div><dt>الدورة التدريبية</dt><dd>{data.course_id!=null?<Link className="enterprise-record-link" to={`/courses/${data.course_id}`}>تفاصيل الدورة <bdi>#{data.course_id}</bdi></Link>:'غير محددة'}</dd></div><div><dt>متابعة الحضور</dt><dd><Link className="enterprise-record-link" to={`/course-session-participants?session=${id}`}>عرض حضور هذه الجلسة</Link></dd></div></dl></Card>
    </>}
  </div>;
}
