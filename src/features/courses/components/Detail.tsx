import { ArrowRight, Clock, FileText, Info, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Table } from '../../../shared/components/Table';
import { Tabs } from '../../../shared/components/Tabs';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { RecordActions } from '../../../shared/enterprise/RecordActions';
import { useCourse } from '../api/useGetQuery';
import { sessionDate, sessionTime } from '../../course-sessions/utils/schedule';
import type { CourseSession } from '../../course-sessions/types';
import './course-detail.css';
function Field({label,children}:{label:string;children:ReactNode}) {return <div><dt>{label}</dt><dd>{children??'غير محدد'}</dd></div>;}
function Related({resource,id,label}:{resource:string;id?:number;label:string}) {return id!=null?<Link className="enterprise-record-link" to={`/${resource}/${id}`}>{label} <bdi>#{id}</bdi></Link>:<>غير محدد</>;}
const number=(value?:number|null)=>value==null?'غير محدد':Number.isFinite(Number(value))?Number(value).toLocaleString('ar-EG'):String(value);
type Participant={id?:number;participant_name?:string};
type Document={id?:number;name?:string;path?:string};
export function CourseDetail() {
  const {id=''}=useParams();const {data:course,isLoading,isError,refetch}=useCourse(id);
  const [params,setParams]=useSearchParams();const requested=params.get('tab')||'overview';const activeTab=['overview','sessions','participants','documents'].includes(requested)?requested:'overview';
  const sessions:CourseSession[]=course?.sessions||[];const participants:Participant[]=course?.participants||[];const documents:Document[]=course?.documentations||[];
  const tabs=[{id:'overview',label:'نظرة عامة',icon:<Info size={16} aria-hidden="true"/>},{id:'sessions',label:'الجلسات',count:sessions.length,icon:<Clock size={16} aria-hidden="true"/>},{id:'participants',label:'المشاركون',count:participants.length,icon:<Users size={16} aria-hidden="true"/>},{id:'documents',label:'الوثائق',count:documents.length,icon:<FileText size={16} aria-hidden="true"/>}];
  return <div className="enterprise-page enterprise-course-detail">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/courses">الدورات التدريبية</Link><span aria-hidden="true">/</span><span aria-current="page">دورة <bdi>#{id}</bdi></span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">إدارة التدريب / ملف الدورة</span><h1>{course?.name||'تفاصيل الدورة التدريبية'}</h1><p>معلومات الدورة ومواعيدها وفريقها، مع الجلسات والمشاركين والوثائق المرتبطة.</p></div><Link className="enterprise-link-button" to="/courses"><ArrowRight size={18} aria-hidden="true"/>العودة للدورات</Link></header>
    {isLoading?<><Card><EnterpriseSkeleton variant="fields" columns={2}/></Card><div className="course-overview-grid">{Array.from({length:4},(_,i)=><Card key={i}><EnterpriseSkeleton variant="fields" columns={2}/></Card>)}</div></>:isError?<ErrorState title="تعذر تحميل ملف الدورة" onRetry={()=>refetch()}/>:!course?<EmptyState title="الدورة غير متاحة" description="ارجع إلى دليل الدورات لاختيار سجل متاح."/>:<>
      <section className="course-record-bar" aria-label="حالة الدورة وإجراءاتها"><div>{course.is_planned&&<Badge variant="info">مخططة</Badge>}{course.is_executed&&<Badge variant="success">منفذة</Badge>}{!course.is_planned&&!course.is_executed&&<Badge variant="neutral">حالة غير محددة</Badge>}<span>دورة <bdi>#{course.id??id}</bdi></span></div><RecordActions resource="courses" singular="course" id={id} name={course.name||`الدورة #${id}`}/></section>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={value=>setParams(current=>{const next=new URLSearchParams(current);next.set('tab',value);return next;},{replace:true})}>
      {activeTab==='overview'&&<div className="course-overview-grid">
        <Card title="محتوى الدورة"><dl className="enterprise-data"><Field label="الاسم">{course.name||'غير محدد'}</Field><Field label="مسار التدريب"><Related resource="path-grade-subjects" id={course.path_grade_subject_id} label="مادة المسار"/></Field><Field label="فصل المسار"><Related resource="path-grade-subject-terms" id={course.path_grade_subject_term_id} label="مادة الترم"/></Field><Field label="مادة التعلم"><Related resource="learning-subjects" id={course.learning_subject_id} label="الموضوع التدريبي"/></Field></dl></Card>
        <Card title="المواعيد والمكان"><dl className="enterprise-data"><Field label="المدة بالأيام">{number(course.duration_in_days)}</Field><Field label="تاريخ البداية">{sessionDate(course.starting_date)}</Field><Field label="تاريخ النهاية">{sessionDate(course.end_date)}</Field><Field label="قاعة التدريب"><Related resource="rooms" id={course.room_id} label="القاعة"/></Field></dl></Card>
        <Card title="فريق التدريب"><dl className="enterprise-data"><Field label="المدرب الأساسي"><Related resource="persons" id={course.trainer_id} label="ملف المدرب"/></Field><Field label="المدرب الاحتياطي"><Related resource="persons" id={course.backup_trainer_id} label="ملف المدرب"/></Field><Field label="منسق الدورة"><Related resource="persons" id={course.coordinator_id} label="ملف المنسق"/></Field></dl></Card>
        <Card title="التمويل وأعداد المشاركين"><dl className="enterprise-data"><Field label="التكلفة المسجلة">{number(course.cost)}</Field><Field label="جهة التمويل"><Related resource="organizations" id={course.funding_organization_id} label="الجهة"/></Field><Field label="المشاركون الداخليون">{number(course.number_of_internal_participants)}</Field><Field label="المشاركون الخارجيون">{number(course.number_of_external_participants)}</Field></dl></Card>
      </div>}
      {activeTab==='sessions'&&<Card title="جلسات الدورة"><Table data={sessions} compact showOverview={false} columns={[{header:'تاريخ الجلسة',accessor:s=>s.id!=null?<Link className="enterprise-record-link" to={`/course-sessions/${s.id}`}>{sessionDate(s.session_date)}</Link>:sessionDate(s.session_date)},{header:'وقت البدء',accessor:s=><bdi>{sessionTime(s.start_time)}</bdi>},{header:'وقت الانتهاء',accessor:s=><bdi>{sessionTime(s.end_time)}</bdi>}]} emptyTitle="لا توجد جلسات مرتبطة" emptyDescription="ستظهر الجلسات هنا بعد جدولتها لهذه الدورة."/></Card>}
      {activeTab==='participants'&&<Card title="مشاركو الدورة"><Table data={participants} compact showOverview={false} columns={[{header:'المشارك',accessor:p=>p.id!=null?<Link className="enterprise-record-link" to={`/course-participants/${p.id}`}>{p.participant_name||`مشاركة #${p.id}`}</Link>:p.participant_name||'غير محدد'}]} emptyTitle="لا توجد مشاركات مرتبطة" emptyDescription="ستظهر سجلات المتدربين بعد تسجيلهم في الدورة."/></Card>}
      {activeTab==='documents'&&<Card title="وثائق الدورة"><Table data={documents} compact showOverview={false} columns={[{header:'الوثيقة',accessor:d=>d.id!=null?<Link className="enterprise-record-link" to={`/documentations/${d.id}`}>{d.name||`وثيقة #${d.id}`}</Link>:d.name||'غير محددة'},{header:'المسار المسجل',accessor:d=><bdi className="course-document-path">{d.path||'غير محدد'}</bdi>}]} emptyTitle="لا توجد وثائق مرتبطة" emptyDescription="ستظهر مستندات الدورة هنا بعد إرفاقها."/></Card>}
      </Tabs>
    </>}
  </div>;
}
