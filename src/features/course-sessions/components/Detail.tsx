import { useMutation,useQueryClient } from '@tanstack/react-query';
import { ArrowRight,Pencil,Trash2 } from 'lucide-react';
import React from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { deleteCourseSession } from '../api/delete';
import { useCourseSession } from '../api/useGetQuery';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function CourseSessionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useCourseSession(id || '');
  const deleteMutation = useMutation({ mutationFn: () => deleteCourseSession(Number(id)), onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['course-sessions'] }); navigate('/course-sessions'); } });

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title={'تفاصيل جلسة تدريبية #' + id}
        subtitle="سجل تفاصيل ومتابعة جلسة تدريبية"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'شئون التدريب والعمليات' },
          { label: 'الجلسات التدريبية', href: '/course-sessions' },
          { label: '#' + id },
        ]}
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to={`/course-sessions/${id}/edit`}><Button variant="outline" size="sm"><Pencil size={16} /> تعديل</Button></Link>
            <Button variant="danger" size="sm" isLoading={deleteMutation.isPending} onClick={() => { if (window.confirm('هل تريد حذف الجلسة التدريبية؟')) deleteMutation.mutate(); }}><Trash2 size={16} /> حذف</Button>
            <Link to="/course-sessions"><Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button></Link>
          </div>
        }
      />

      <Card title="بيانات السجل">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
            <InfoField label="تاريخ انعقاد الجلسة" value={data?.session_date} />
            <InfoField label="وقت البدء" value={data?.start_time} />
            <InfoField label="وقت الانتهاء" value={data?.end_time} />
            <InfoField label="معرف الدورة التدريبية" value={data?.course_id} />
        </div>
      </Card>

    </div>
  );
}
