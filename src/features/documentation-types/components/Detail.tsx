import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { RecordActions } from '../../../shared/enterprise/RecordActions';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useDocumentationType } from '../api/useGetQuery';

export function DocumentationTypeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useDocumentationType(id || '');
  return <div className="enterprise-page">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/documentation-types">أنواع الوثائق</Link><span aria-hidden="true">/</span><span aria-current="page">تفاصيل نوع الوثيقة</span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">دليل أنواع الوثائق / رقم السجل <bdi>{id}</bdi></span><h1>{data?.name || 'تفاصيل نوع الوثيقة'}</h1><p>التصنيف المرجعي المستخدم في تنظيم الوثائق والمستندات.</p></div><Link className="enterprise-link-button" to="/documentation-types"><ArrowRight size={18} aria-hidden="true" />العودة للقائمة</Link></header>
    {isLoading ? <><Card title="البيانات الأساسية"><EnterpriseSkeleton variant="fields" columns={2} /></Card></> : isError ? <ErrorState title="تعذر تحميل نوع الوثيقة" message="قد يكون السجل غير متاح أو تعذر الاتصال بالخادم. أعد المحاولة أو ارجع إلى قائمة أنواع الوثائق." onRetry={() => refetch()} /> : !data ? <EmptyState title="نوع الوثيقة غير متاحة" description="ارجع إلى قائمة أنواع الوثائق واختر سجلاً متاحاً." /> : <>
      <Card title="البيانات الأساسية" action={<RecordActions resource="documentation-types" singular="documentation-type" id={id || ''} name={data.name || 'نوع الوثيقة'} />}><dl className="enterprise-data"><div><dt>اسم نوع الوثيقة</dt><dd>{data.name || 'لم يُحدد الاسم'}</dd></div><div><dt>رقم السجل</dt><dd><bdi>{data.id?.toLocaleString('ar-EG') ?? '—'}</bdi></dd></div></dl></Card>

    </>}
  </div>;
}
