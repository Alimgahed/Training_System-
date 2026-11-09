import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDays,UserRoundCheck } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link,useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Select } from '../../../shared/components/Select';
import { useCourseParticipants } from '../../course-participants/api/useListQuery';
import { useCourseSessions } from '../../course-sessions/api/useListQuery';
import { useCreateCourseSessionParticipantMutation } from '../api/useCreateMutation';

const schema = z.object({
  course_session_id: z.coerce.number().min(1, 'اختر الجلسة التدريبية'),
  course_participant_id: z.coerce.number().min(1, 'اختر متدرباً مسجلاً في الدورة'),
});
type FormInputs = z.infer<typeof schema>;

export function CourseSessionParticipantCreate() {
  const navigate = useNavigate();
  const mutation = useCreateCourseSessionParticipantMutation();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>({ resolver: zodResolver(schema) });
  const selectedSessionId = watch('course_session_id');
  const { data: sessions = [], isLoading: loadingSessions } = useCourseSessions();
  const { data: enrollments = [], isLoading: loadingEnrollments } = useCourseParticipants();
  const selectedSession = sessions.find((session: any) => Number(session.id) === Number(selectedSessionId));
  const eligibleEnrollments = useMemo(
    () => enrollments.filter((enrollment: any) => Number(enrollment.course_id) === Number(selectedSession?.course_id)),
    [enrollments, selectedSession?.course_id],
  );

  const onSubmit = (data: FormInputs) => {
    mutation.mutate(data, { onSuccess: () => navigate('/course-session-participants') });
  };

  return (
    <section className="legacy-form-workspace" style={{ display: 'grid', gap: 22 }}>
      <header className="form-workspace-header">
        <div><span className="form-workspace-icon"><UserRoundCheck size={25} /></span><div><h1>تسجيل حضور متدرب</h1><p>اختر جلسة ثم أحد المسجلين في الدورة المرتبطة بها.</p></div></div>
        <Link to="/course-session-participants"><Button variant="outline">العودة للسجلات</Button></Link>
      </header>
      <form className="form-workspace-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-workspace-grid">
          <Select label="الجلسة التدريبية *" error={errors.course_session_id?.message} isLoading={loadingSessions}
            options={sessions.map((session: any) => ({ value: session.id ?? "", label: `${session.session_date || 'جلسة'} · ${session.start_time || ''}–${session.end_time || ''} · دورة #${session.course_id}` }))}
            {...register('course_session_id')} />
          <Select label="المتدرب المسجل في الدورة *" error={errors.course_participant_id?.message} isLoading={loadingEnrollments}
            options={eligibleEnrollments.map((enrollment: any) => ({ value: enrollment.id ?? "", label: enrollment.person?.name || `مشارك #${enrollment.id}` }))}
            disabled={!selectedSessionId || loadingEnrollments}
            {...register('course_participant_id')} />
          {selectedSessionId && <p className="form-helper-text">{eligibleEnrollments.length ? 'تظهر هنا تسجيلات الدورة المرتبطة بالجلسة فقط.' : 'لا يوجد متدربون مسجلون في دورة هذه الجلسة.'}</p>}
        </div>
        <div className="form-workspace-actions"><Link to="/course-session-participants"><Button variant="ghost" type="button">إلغاء</Button></Link><Button type="submit" isLoading={mutation.isPending}><CalendarDays size={18} />تسجيل الحضور</Button></div>
      </form>
    </section>
  );
}
