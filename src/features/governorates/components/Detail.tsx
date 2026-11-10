import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { RecordActions } from '../../../shared/enterprise/RecordActions';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useGovernorate } from '../api/useGetQuery';
import './governorates.css';

export function GovernorateDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useGovernorate(id || '');
  return <div className="enterprise-page governorate-detail">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/governorates">المحافظات</Link><span aria-hidden="true">/</span><span aria-current="page">تفاصيل المحافظة</span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">دليل المحافظات / رقم السجل <bdi>{id}</bdi></span><h1>{data?.name || 'تفاصيل المحافظة'}</h1><p>بيانات المحافظة وارتباطها بالدولة في الدليل الجغرافي.</p></div><Link className="enterprise-link-button" to="/governorates"><ArrowRight size={18} aria-hidden="true" />العودة للقائمة</Link></header>
    {isLoading ? <><Card title="البيانات الأساسية"><EnterpriseSkeleton variant="fields" columns={3} /></Card></> : isError ? <ErrorState title="تعذر تحميل المحافظة" message="قد يكون السجل غير متاح أو تعذر الاتصال بالخادم. أعد المحاولة أو ارجع إلى قائمة المحافظات." onRetry={() => refetch()} /> : !data ? <EmptyState title="المحافظة غير متاحة" description="ارجع إلى قائمة المحافظات واختر سجلاً متاحاً." /> : <>
      <Card title="البيانات الأساسية" action={<RecordActions resource="governorates" singular="governorate" id={id || ''} name={data.name || 'المحافظة'} />}><dl className="enterprise-data"><div><dt>اسم المحافظة</dt><dd>{data.name || 'لم يُحدد الاسم'}</dd></div><div><dt>رقم السجل</dt><dd><bdi>{data.id?.toLocaleString('ar-EG') ?? '—'}</bdi></dd></div><div><dt>الدولة</dt><dd>{data.country_id != null ? <Link className="enterprise-record-link" to={`/countries/${data.country_id}`}>الدولة <bdi>#{data.country_id}</bdi></Link> : 'غير محددة'}</dd></div></dl></Card>

    </>}
  </div>;
}
