import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { RecordActions } from '../../../shared/enterprise/RecordActions';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useEvaluationType } from '../api/useGetQuery';

export function EvaluationTypeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useEvaluationType(id || '');
  return <div className="enterprise-page">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/evaluation-types">أنواع التقييم</Link><span aria-hidden="true">/</span><span aria-current="page">تفاصيل نوع التقييم</span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">دليل أنواع التقييم / رقم السجل <bdi>{id}</bdi></span><h1>{data?.name || 'تفاصيل نوع التقييم'}</h1><p>التصنيف المرجعي وسياسة إعادة الدورة عند عدم الاجتياز.</p></div><Link className="enterprise-link-button" to="/evaluation-types"><ArrowRight size={18} aria-hidden="true" />العودة للقائمة</Link></header>
    {isLoading ? <><Card title="البيانات الأساسية"><EnterpriseSkeleton variant="fields" columns={3} /></Card></> : isError ? <ErrorState title="تعذر تحميل نوع التقييم" message="قد يكون السجل غير متاح أو تعذر الاتصال بالخادم. أعد المحاولة أو ارجع إلى قائمة أنواع التقييم." onRetry={() => refetch()} /> : !data ? <EmptyState title="نوع التقييم غير متاحة" description="ارجع إلى قائمة أنواع التقييم واختر سجلاً متاحاً." /> : <>
      <Card title="البيانات الأساسية" action={<RecordActions resource="evaluation-types" singular="evaluation-type" id={id || ''} name={data.name || 'نوع التقييم'} />}><dl className="enterprise-data"><div><dt>اسم نوع التقييم</dt><dd>{data.name || 'لم يُحدد الاسم'}</dd></div><div><dt>رقم السجل</dt><dd><bdi>{data.id?.toLocaleString('ar-EG') ?? '—'}</bdi></dd></div><div><dt>إعادة الدورة عند عدم الاجتياز</dt><dd>{data.should_repeat == null ? 'غير محدد' : data.should_repeat ? 'مطلوبة' : 'غير مطلوبة'}</dd></div></dl></Card>

    </>}
  </div>;
}
