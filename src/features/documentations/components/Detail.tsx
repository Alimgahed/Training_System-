import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link,useParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { useDocumentation } from '../api/useGetQuery';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function DocumentationDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useDocumentation(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title={data?.name || 'وثيقة #' + id}
        subtitle="سجل تفاصيل ومتابعة وثيقة"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'الأرشيف والملفات' },
          { label: 'الوثائق والمستندات', href: '/documentations' },
          { label: data?.name || '#' + id },
        ]}
        actions={
          <Link to="/documentations">
            <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
          </Link>
        }
      />

      <Card title="بيانات السجل">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
            <InfoField label="اسم الوثيقة" value={data?.name} />
            <InfoField label="مسار الملف" value={data?.file_path} />
            <InfoField label="معرف نوع الوثيقة" value={data?.documentation_type_id} />
            <InfoField label="معرف الدورة التدريبية" value={data?.course_id} />
            <InfoField label="معرف الجلسة التدريبية" value={data?.course_session_id} />
            <InfoField label="معرف المادة التدريبية" value={data?.learning_subject_id} />
        </div>
      </Card>

    </div>
  );
}
