import { ArrowRight, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { RecordActions } from '../../../shared/enterprise/RecordActions';
import { Table } from '../../../shared/components/Table';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useCountry } from '../api/useGetQuery';

type GovernorateSummary = { id?: number; name?: string | null };
export function CountryDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useCountry(id || '');
  const governorates: GovernorateSummary[] = data?.governorates || [];
  return <div className="enterprise-page">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/countries">الدول</Link><span aria-hidden="true">/</span><span aria-current="page">تفاصيل الدولة</span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">دليل الدول / رقم السجل <bdi>{id}</bdi></span><h1>{data?.name || 'تفاصيل الدولة'}</h1><p>بيانات الدولة والمحافظات المرتبطة بها في الدليل الجغرافي.</p></div><Link className="enterprise-link-button" to="/countries"><ArrowRight size={18} aria-hidden="true" />العودة للقائمة</Link></header>
    {isLoading ? <><Card title="البيانات الأساسية"><EnterpriseSkeleton variant="fields" columns={2} /></Card><Card title="المحافظات المرتبطة"><EnterpriseSkeleton columns={2} rows={3} /></Card></> : isError ? <ErrorState title="تعذر تحميل الدولة" message="قد يكون السجل غير متاح أو تعذر الاتصال بالخادم. أعد المحاولة أو ارجع إلى قائمة الدول." onRetry={() => refetch()} /> : !data ? <EmptyState title="الدولة غير متاحة" description="ارجع إلى قائمة الدول واختر سجلاً متاحاً." /> : <>
      <Card title="البيانات الأساسية" action={<RecordActions resource="countries" singular="country" id={id || ''} name={data.name || 'الدولة'} />}><dl className="enterprise-data"><div><dt>اسم الدولة</dt><dd>{data.name || 'لم يُحدد الاسم'}</dd></div><div><dt>رقم السجل</dt><dd><bdi>{data.id?.toLocaleString('ar-EG') ?? '—'}</bdi></dd></div></dl></Card>
      <Card title="المحافظات المرتبطة" action={<span>{governorates.length.toLocaleString('ar-EG')} محافظة</span>}><Table data={governorates} columns={[{ header:'المحافظة', accessor:row => row.id != null ? <Link className="enterprise-record-link" to={`/governorates/${row.id}`}>{row.name || 'محافظة بدون اسم'}</Link> : row.name || '—' },{header:'رقم السجل',accessor:row=><bdi>{row.id?.toLocaleString('ar-EG') ?? '—'}</bdi>}]} compact showOverview={false} emptyTitle="لا توجد محافظات مرتبطة" emptyDescription="ستظهر هنا المحافظات عند ربطها بهذه الدولة." emptyIcon={<MapPin size={28} aria-hidden="true" />} /></Card>
    </>}
  </div>;
}
