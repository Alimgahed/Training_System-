import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link,useParams } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { usePathGradeSubjectTerm } from '../api/useGetQuery';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function PathGradeSubjectTermDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = usePathGradeSubjectTerm(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title={data?.path_grade_subject?.learning_subject?.name || data?.path_grade_subject?.name || 'مادة فصل'}
        subtitle={'تفاصيل مادة فصل — معرّف #' + id}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'الهيكل الأكاديمي' },
          { label: 'مواد الفصول التدريبية', href: '/path-grade-subject-terms' },
          { label: data?.name || '#' + id },
        ]}
        badge={<Badge variant="neutral">المستوى الرابع: ترم المادة</Badge>}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            
            <Link to="/path-grade-subject-terms">
              <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
            </Link>
          </div>
        }
      />

      <Card title="بيانات المسار والمناهج">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 'var(--space-5)' }}>
            <InfoField label="المعرّف (ID)" value={data?.id} />
            <InfoField label="الكود" value={data?.code} />
            <InfoField label="المسار التدريبي" value={data?.path_grade_subject?.path_grade?.learning_path?.name} />
            <InfoField label="الدرجة الوظيفية" value={data?.path_grade_subject?.path_grade?.grade?.name} />
            <InfoField label="المادة التدريبية" value={data?.path_grade_subject?.learning_subject?.name || data?.path_grade_subject?.name} />
            <InfoField label="معرف مادة مرحلة المسار" value={data?.path_grade_subjects_id} />
            <InfoField label="الفصل التدريبي (الترم)" value={data?.term?.name || data?.term_id} />
            <InfoField label="ملاحظات" value={data?.notes} />
        </div>
      </Card>

    </div>
  );
}
