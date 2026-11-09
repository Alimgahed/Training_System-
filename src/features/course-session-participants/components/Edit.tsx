import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { Save,UserRoundCheck } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { Select } from '../../../shared/components/Select';
import { useCourseParticipants } from '../../course-participants/api/useListQuery';
import { useCourseSessions } from '../../course-sessions/api/useListQuery';
import { updateCourseSessionParticipant } from '../api/update';
import { useCourseSessionParticipant } from '../api/useGetQuery';

const schema = z.object({ course_session_id: z.coerce.number().min(1, 'اختر الجلسة'), course_participant_id: z.coerce.number().min(1, 'اختر المتدرب') });
type Values = z.infer<typeof schema>;

export function CourseSessionParticipantEdit() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useCourseSessionParticipant(id);
  const { data: sessions = [], isLoading: loadingSessions } = useCourseSessions();
  const { data: participants = [], isLoading: loadingParticipants } = useCourseParticipants();
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema) });
  const sessionId = Number(watch('course_session_id')) || 0;
  const courseId = sessions.find((session: any) => Number(session.id) === sessionId)?.course_id;
  const eligible = participants.filter((participant: any) => Number(participant.course_id) === Number(courseId));
  useEffect(() => { if (data) reset({ course_session_id: Number(data.course_session_id) || 0, course_participant_id: Number(data.course_participant_id) || 0 }); }, [data, reset]);
  const mutation = useMutation({ mutationFn: (values: Values) => updateCourseSessionParticipant(Number(id), values), onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['course-session-participants'] }); await queryClient.invalidateQueries({ queryKey: ['course-session-participant', id] }); navigate(`/course-session-participants/${id}`); } });
  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  return <section className="legacy-form-workspace" style={{ display: 'grid', gap: 20 }}>
    <header className="form-workspace-header"><div><span className="form-workspace-icon"><UserRoundCheck size={24} /></span><div><h1>تعديل تسجيل الحضور</h1><p>يجب أن يكون المتدرب مسجلاً في دورة الجلسة.</p></div></div><Link to={`/course-session-participants/${id}`}><Button variant="outline">إلغاء</Button></Link></header>
    <form className="form-workspace-form" onSubmit={handleSubmit((values) => mutation.mutate(values))}><div className="form-workspace-grid">
      <Select label="الجلسة التدريبية *" error={errors.course_session_id?.message} isLoading={loadingSessions} options={sessions.map((session: any) => ({ value: session.id ?? "", label: `${session.session_date || 'جلسة'} · دورة #${session.course_id}` }))} {...register('course_session_id')} />
      <Select label="المتدرب المسجل بالدورة *" error={errors.course_participant_id?.message} isLoading={loadingParticipants} disabled={!sessionId} options={eligible.map((participant: any) => ({ value: participant.id ?? "", label: participant.person?.name || `مشارك #${participant.id}` }))} {...register('course_participant_id')} />
    </div><div className="form-workspace-actions"><Button type="submit" isLoading={mutation.isPending}><Save size={17} />حفظ التعديلات</Button></div></form>
  </section>;
}
