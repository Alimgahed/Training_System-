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
import { Table } from '../../../shared/components/Table';
import { usePathGrade } from '../api/useGetQuery';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function PathGradeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = usePathGrade(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="enterprise-page training-workspace training-record-detail">
      <PageHeader
        title={data?.name || 'مرحلة مسار'}
        subtitle={'تفاصيل مرحلة مسار — معرّف #' + id}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'الهيكل الأكاديمي' },
          { label: 'درجات ومراحل المسارات', href: '/path-grades' },
          { label: data?.name || '#' + id },
        ]}
        badge={<Badge variant="neutral">المستوى الثاني: مرحلة المسار بالدرجة</Badge>}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Link to="/path-grade-subjects">
              <Button size="sm">عرض مواد درجة المسار <ArrowLeft size={16} /></Button>
            </Link>
            <Link to="/path-grades">
              <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
            </Link>
          </div>
        }
      />

      <Card title="بيانات المسار والمناهج">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
            <InfoField label="معرف المسار التدريبي" value={data?.learning_path_id} />
            <InfoField label="معرف الدرجة الوظيفية" value={data?.grade_id} />
        </div>
      </Card>

      {data?.path_grade_subjects && data.path_grade_subjects.length > 0 && (
        <Card title="المواد التدريبية المقررة لهذه الدرجة">
          <Table
            data={data.path_grade_subjects}
            columns={[
              { header: 'الكود', accessor: (r: any) => r.code || '—' },
              { header: 'اسم المادة', accessor: (r: any) => r.name || '—' },
              { header: 'معرف المادة العامة', accessor: (r: any) => r.learning_subject_id || '—' }
            ]}
            compact
          />
        </Card>
      )}
    </div>
  );
}
