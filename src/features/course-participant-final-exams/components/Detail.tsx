import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link,useParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { useCourseParticipantFinalExam } from '../api/useGetQuery';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function CourseParticipantFinalExamDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useCourseParticipantFinalExam(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title={'تفاصيل اختبار نهائي #' + id}
        subtitle="سجل تفاصيل ومتابعة اختبار نهائي"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'شئون التدريب والعمليات' },
          { label: 'نتائج الاختبارات النهائية', href: '/course-participant-final-exams' },
          { label: '#' + id },
        ]}
        actions={
          <Link to="/course-participant-final-exams">
            <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
          </Link>
        }
      />

      <Card title="بيانات السجل">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
            <InfoField label="تاريخ الاختبار" value={data?.exam_date} />
            <InfoField label="الجهة المنظمة" value={data?.organized_by} />
            <InfoField label="الدرجة المحققة" value={data?.exam_score} />
            <InfoField label="معرف ملف الوثيقة المرفقة" value={data?.documentation_id} />
            <InfoField label="معرف مشارك الدورة" value={data?.course_participant_id} />
        </div>
      </Card>

    </div>
  );
}
