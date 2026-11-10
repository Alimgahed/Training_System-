import { ArrowRight, Building2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { EmptyState } from '../../../shared/components/EmptyState';
import { useClient } from '../api/useGetQuery';
import './clients.css';

export function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useClient(id || '');
  return <div className="clients-page">
    <nav className="client-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/clients">العملاء</Link><span aria-hidden="true">/</span><span aria-current="page">تفاصيل العميل</span></nav>
    <header className="clients-heading"><div><h1>{data?.name || 'تفاصيل العميل'}</h1><p>بيانات الجهة المسجلة في دليل العملاء.</p></div><Link className="client-back-link" to="/clients"><ArrowRight size={18} aria-hidden="true" />العودة للقائمة</Link></header>
    {isLoading ? <section className="client-detail-skeleton" role="status" aria-label="جارٍ تحميل بيانات العميل"><div aria-hidden="true" /><div aria-hidden="true" /></section> : isError ? <ErrorState title="تعذر تحميل بيانات العميل" message="قد يكون السجل غير متاح أو تعذر الاتصال. أعد المحاولة أو ارجع إلى دليل العملاء." onRetry={() => refetch()} /> : !data ? <EmptyState title="العميل غير متاح" description="ارجع إلى دليل العملاء لاختيار سجل متاح." icon={<Building2 size={28} aria-hidden="true" />} /> : <Card title="البيانات الأساسية"><dl className="client-details"><div><dt>اسم العميل</dt><dd>{data.name || 'لم يُسجل اسم'}</dd></div><div><dt>رقم السجل</dt><dd><bdi>{data.id?.toLocaleString('ar-EG') ?? '—'}</bdi></dd></div></dl></Card>}
  </div>;
}
