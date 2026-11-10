import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { RecordActions } from '../../../shared/enterprise/RecordActions';
import { useDepartment } from '../api/useGetQuery';
export function DepartmentDetail() {
  const {id=''}=useParams();const {data,isLoading,isError,refetch}=useDepartment(id);
  return <div className="enterprise-page"><nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/departments">الإدارات</Link><span aria-hidden="true">/</span><span aria-current="page">إدارة <bdi>#{id}</bdi></span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">الهيكل التنظيمي / بيانات الإدارة</span><h1>{data?.name||'تفاصيل الإدارة'}</h1><p>راجع كود الإدارة والجهة التابعة لها قبل تعديل بياناتها.</p></div><Link className="enterprise-link-button" to="/departments"><ArrowRight size={18} aria-hidden="true"/>العودة للإدارات</Link></header>
    {isLoading?<Card title="البيانات التنظيمية"><EnterpriseSkeleton variant="fields" columns={4}/></Card>:isError?<ErrorState title="تعذر تحميل الإدارة" onRetry={()=>refetch()}/>:!data?<EmptyState title="الإدارة غير متاحة" description="ارجع إلى دليل الإدارات لاختيار سجل متاح."/>:<Card title="البيانات التنظيمية" action={<RecordActions resource="departments" singular="department" id={id} name={data.name||`الإدارة #${id}`}/>}><dl className="enterprise-data"><div><dt>اسم الإدارة</dt><dd>{data.name||'غير محدد'}</dd></div><div><dt>كود الإدارة</dt><dd><bdi>{data.code||'غير محدد'}</bdi></dd></div><div><dt>الجهة التابعة لها</dt><dd>{data.organization_id!=null?<Link className="enterprise-record-link" to={`/organizations/${data.organization_id}`}>تفاصيل الجهة <bdi>#{data.organization_id}</bdi></Link>:'غير محددة'}</dd></div><div><dt>رقم السجل</dt><dd><bdi>#{data.id??id}</bdi></dd></div></dl></Card>}
  </div>;
}
