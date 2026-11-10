import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { RecordActions } from '../../../shared/enterprise/RecordActions';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useGrade } from '../api/useGetQuery';

export function GradeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useGrade(id || '');
  return <div className="enterprise-page">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/grades">الدرجات الوظيفية</Link><span aria-hidden="true">/</span><span aria-current="page">تفاصيل الدرجة الوظيفية</span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">دليل الدرجات الوظيفية / رقم السجل <bdi>{id}</bdi></span><h1>{data?.name || 'تفاصيل الدرجة الوظيفية'}</h1><p>الكود والمدة البينية المعتمدان لهذه الدرجة الوظيفية.</p></div><Link className="enterprise-link-button" to="/grades"><ArrowRight size={18} aria-hidden="true" />العودة للقائمة</Link></header>
    {isLoading ? <><Card title="البيانات الأساسية"><EnterpriseSkeleton variant="fields" columns={4} /></Card></> : isError ? <ErrorState title="تعذر تحميل الدرجة الوظيفية" message="قد يكون السجل غير متاح أو تعذر الاتصال بالخادم. أعد المحاولة أو ارجع إلى قائمة الدرجات الوظيفية." onRetry={() => refetch()} /> : !data ? <EmptyState title="الدرجة الوظيفية غير متاحة" description="ارجع إلى قائمة الدرجات الوظيفية واختر سجلاً متاحاً." /> : <>
      <Card title="البيانات الأساسية" action={<RecordActions resource="grades" singular="grade" id={id || ''} name={data.name || 'الدرجة الوظيفية'} />}><dl className="enterprise-data"><div><dt>اسم الدرجة الوظيفية</dt><dd>{data.name || 'لم يُحدد الاسم'}</dd></div><div><dt>رقم السجل</dt><dd><bdi>{data.id?.toLocaleString('ar-EG') ?? '—'}</bdi></dd></div><div><dt>الكود</dt><dd><bdi>{data.code ?? 'غير محدد'}</bdi></dd></div><div><dt>المدة البينية</dt><dd><bdi>{data.grade_interval ?? 'غير محددة'}</bdi></dd></div></dl></Card>

    </>}
  </div>;
}
