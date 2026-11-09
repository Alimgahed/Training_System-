import { ArrowLeft,ArrowRight } from 'lucide-react';
import React from 'react';
import { Link,useParams } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { useLearningPath } from '../api/useGetQuery';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function LearningPathDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useLearningPath(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title={data?.name || 'مسار تدريبي'}
        subtitle={'تفاصيل مسار تدريبي — معرّف #' + id}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'الهيكل الأكاديمي' },
          { label: 'المسارات التدريبية', href: '/learning-paths' },
          { label: data?.name || '#' + id },
        ]}
        badge={<Badge variant="neutral">المستوى الأول: المسار الرئيسي</Badge>}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Link to="/path-grades">
              <Button size="sm">عرض مراحل ودرجات المسار (Path Grades) <ArrowLeft size={16} /></Button>
            </Link>
            <Link to="/learning-paths">
              <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
            </Link>
          </div>
        }
      />

      <Card title="بيانات المسار والمناهج">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
            <InfoField label="كود المسار" value={data?.code} />
            <InfoField label="اسم المسار التدريبي" value={data?.name} />
            <InfoField label="معرف نوع المؤهل" value={data?.qualification_type_id} />
        </div>
      </Card>

    </div>
  );
}
