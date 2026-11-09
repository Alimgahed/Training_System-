import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link,useParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { usePerformanceEvaluationParticipantCategoryItem } from '../api/useGetQuery';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function PerformanceEvaluationParticipantCategoryItemDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = usePerformanceEvaluationParticipantCategoryItem(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title={data?.name || 'بند فئة التقييم #' + id}
        subtitle="سجل تفاصيل ومتابعة بند فئة التقييم"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'بنود التقييم' },
          { label: 'بنود فئات تقييم المشاركين', href: '/performance-evaluation-participant-category-items' },
          { label: data?.name || '#' + id },
        ]}
        actions={
          <Link to="/performance-evaluation-participant-category-items">
            <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
          </Link>
        }
      />

      <Card title="بيانات السجل">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
            <InfoField label="معرف فئة مشارك التقييم" value={data?.performance_evaluation_participant_category_id} />
            <InfoField label="معرف عنصر تقييم الأداء" value={data?.performance_evaluation_item_id} />
        </div>
      </Card>

    </div>
  );
}
