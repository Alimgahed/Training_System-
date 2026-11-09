import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link,useParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Table } from '../../../shared/components/Table';
import { useCourseParticipant } from '../api/useGetQuery';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function CourseParticipantDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useCourseParticipant(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title={'تفاصيل مشارك دورة #' + id}
        subtitle="سجل تفاصيل ومتابعة مشارك دورة"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'شئون التدريب والعمليات' },
          { label: 'مشاركو الدورات التدريبية', href: '/course-participants' },
          { label: '#' + id },
        ]}
        actions={
          <Link to="/course-participants">
            <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
          </Link>
        }
      />

      <Card title="بيانات السجل">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
            <InfoField label="معرف المتدرب / الشخص" value={data?.person_id} />
            <InfoField label="معرف الدورة التدريبية" value={data?.course_id} />
        </div>
      </Card>

      {data?.final_exams && data.final_exams.length > 0 && (
        <Card title="الاختبارات النهائية للمتدرب">
          <Table
            data={data.final_exams}
            columns={[
              { header: 'تاريخ الاختبار', accessor: (r: any) => r.exam_date !== undefined ? String(r.exam_date) : '—' },
              { header: 'الجهة المنظمة', accessor: (r: any) => r.organized_by !== undefined ? String(r.organized_by) : '—' },
              { header: 'الدرجة', accessor: (r: any) => r.exam_score !== undefined ? String(r.exam_score) : '—' }
            ]}
            compact
          />
        </Card>
      )}

      {data?.performance_evaluation_details && data.performance_evaluation_details.length > 0 && (
        <Card title="تفاصيل تقييم أداء المتدرب">
          <Table
            data={data.performance_evaluation_details}
            columns={[
              { header: 'الدرجة المستحقة', accessor: (r: any) => r.score !== undefined ? String(r.score) : '—' },
              { header: 'ملاحظات التقييم', accessor: (r: any) => r.notes !== undefined ? String(r.notes) : '—' },
              { header: 'تاريخ الإدخال', accessor: (r: any) => r.entered_at !== undefined ? String(r.entered_at) : '—' }
            ]}
            compact
          />
        </Card>
      )}
    </div>
  );
}
