import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link,useParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { useQualification } from '../api/useGetQuery';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function QualificationDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useQualification(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title={data?.name || 'مؤهل علمي'}
        subtitle={'تفاصيل مؤهل علمي — معرّف #' + id}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'المؤهلات العلمية', href: '/qualifications' },
          { label: data?.name || '#' + id },
        ]}
        actions={
          <Link to="/qualifications">
            <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
          </Link>
        }
      />

      <Card title="البيانات التنظيمية">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
            <InfoField label="الكود" value={data?.code} />
            <InfoField label="اسم المؤهل" value={data?.name} />
            <InfoField label="معرف نوع المؤهل" value={data?.qualification_type_id} />
        </div>
      </Card>

    </div>
  );
}
