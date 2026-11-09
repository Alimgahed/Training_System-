import { useMutation,useQueryClient } from '@tanstack/react-query';
import { ArrowRight,Pencil,Trash2 } from 'lucide-react';
import React from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { deleteCourseSessionParticipant } from '../api/delete';
import { useCourseSessionParticipant } from '../api/useGetQuery';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function CourseSessionParticipantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useCourseSessionParticipant(id || '');
  const deleteMutation = useMutation({ mutationFn: () => deleteCourseSessionParticipant(Number(id)), onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['course-session-participants'] }); navigate('/course-session-participants'); } });

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title={'تفاصيل حضور جلسة #' + id}
        subtitle="سجل تفاصيل ومتابعة حضور جلسة"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'شئون التدريب والعمليات' },
          { label: 'حضور جلسات التدريب', href: '/course-session-participants' },
          { label: '#' + id },
        ]}
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to={`/course-session-participants/${id}/edit`}><Button variant="outline" size="sm"><Pencil size={16} /> تعديل</Button></Link>
            <Button variant="danger" size="sm" isLoading={deleteMutation.isPending} onClick={() => { if (window.confirm('هل تريد حذف تسجيل الحضور؟')) deleteMutation.mutate(); }}><Trash2 size={16} /> حذف</Button>
            <Link to="/course-session-participants"><Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button></Link>
          </div>
        }
      />

      <Card title="بيانات السجل">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
            <InfoField label="معرف الجلسة التدريبية" value={data?.course_session_id} />
            <InfoField label="معرف تسجيل المتدرب في الدورة" value={data?.course_participant_id} />
        </div>
      </Card>

    </div>
  );
}
