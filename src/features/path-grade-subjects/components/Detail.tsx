import '../../../shared/components/training-workspace.css';
import { ArrowLeft,ArrowRight } from 'lucide-react';
import React from 'react';
import { Link,useParams } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { usePathGradeSubject } from '../api/useGetQuery';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function PathGradeSubjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = usePathGradeSubject(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="enterprise-page training-workspace training-record-detail">
      <PageHeader
        title={data?.name || 'مادة مسار'}
        subtitle={'تفاصيل مادة مسار — معرّف #' + id}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'الهيكل الأكاديمي' },
          { label: 'مواد مراحل المسارات', href: '/path-grade-subjects' },
          { label: data?.name || '#' + id },
        ]}
        badge={<Badge variant="neutral">المستوى الثالث: المادة التدريبية</Badge>}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Link to="/path-grade-subject-terms">
              <Button size="sm">عرض مواد الترم <ArrowLeft size={16} /></Button>
            </Link>
            <Link to="/path-grade-subjects">
              <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
            </Link>
          </div>
        }
      />

      <Card title="بيانات المسار والمناهج">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
            <InfoField label="كود المادة" value={data?.code} />
            <InfoField label="اسم المادة التدريبية" value={data?.name} />
            <InfoField label="معرف مرحلة المسار" value={data?.path_grade_id} />
            <InfoField label="معرف المادة التدريبية العامة" value={data?.learning_subject_id} />
        </div>
      </Card>

    </div>
  );
}
