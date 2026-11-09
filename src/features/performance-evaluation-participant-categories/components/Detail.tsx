import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link,useParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Table } from '../../../shared/components/Table';
import { usePerformanceEvaluationParticipantCategory } from '../api/useGetQuery';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function PerformanceEvaluationParticipantCategoryDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = usePerformanceEvaluationParticipantCategory(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title={data?.name || 'فئة مشارك التقييم #' + id}
        subtitle="سجل تفاصيل ومتابعة فئة مشارك التقييم"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'ربط الفئات' },
          { label: 'ربط فئات المشاركين بتقييم الأداء', href: '/performance-evaluation-participant-categories' },
          { label: data?.name || '#' + id },
        ]}
        actions={
          <Link to="/performance-evaluation-participant-categories">
            <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
          </Link>
        }
      />

      <Card title="بيانات السجل">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
            <InfoField label="معرف نوع المشارك" value={data?.participant_type_id} />
            <InfoField label="معرف فئة تقييم الأداء" value={data?.performance_evaluation_category_id} />
        </div>
      </Card>

      {data?.items && data.items.length > 0 && (
        <Card title="عناصر التقييم المرتبطة بهذه الفئة">
          <Table
            data={data.items}
            columns={[
              { header: 'معرف عنصر التقييم', accessor: (r: any) => r.performance_evaluation_item_id !== undefined ? String(r.performance_evaluation_item_id) : '—' }
            ]}
            compact
          />
        </Card>
      )}
    </div>
  );
}
