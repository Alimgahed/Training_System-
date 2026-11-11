import '../../../shared/components/training-workspace.css';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link,useParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { useLearningSubject } from '../api/useGetQuery';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function LearningSubjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useLearningSubject(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="enterprise-page training-workspace training-record-detail">
      <PageHeader
        title={data?.name || 'موضوع تدريبي'}
        subtitle={'تفاصيل موضوع تدريبي — معرّف #' + id}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'المواضيع التدريبية', href: '/learning-subjects' },
          { label: data?.name || '#' + id },
        ]}
        actions={
          <Link to="/learning-subjects">
            <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
          </Link>
        }
      />

      <Card title="البيانات الأساسية">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
            <InfoField label="الاسم" value={data?.name} />
        </div>
      </Card>

    </div>
  );
}
