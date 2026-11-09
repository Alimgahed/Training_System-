import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { CalendarDays,Save } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Input } from '../../../shared/components/Input';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { Select } from '../../../shared/components/Select';
import { useExecutedCourses } from '../../courses/api/executedCourses';
import { updateCourseSession } from '../api/update';
import { useCourseSession } from '../api/useGetQuery';

const schema = z.object({ session_date: z.string().min(1, 'تاريخ الجلسة مطلوب'), start_time: z.string().min(1, 'وقت البدء مطلوب'), end_time: z.string().min(1, 'وقت الانتهاء مطلوب'), course_id: z.coerce.number().min(1, 'اختر الدورة') });
type Values = z.infer<typeof schema>;

export function CourseSessionEdit() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useCourseSession(id);
  const { data: courses = [], isLoading: loadingCourses } = useExecutedCourses();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema) });
  useEffect(() => { if (data) reset({ session_date: data.session_date?.slice(0, 10) || '', start_time: data.start_time || '', end_time: data.end_time || '', course_id: Number(data.course_id) || 0 }); }, [data, reset]);
  const mutation = useMutation({ mutationFn: (values: Values) => updateCourseSession(Number(id), values), onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['course-sessions'] }); await queryClient.invalidateQueries({ queryKey: ['course-session', id] }); navigate(`/course-sessions/${id}`); } });
  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  return <section className="legacy-form-workspace" style={{ display: 'grid', gap: 20 }}>
    <header className="form-workspace-header"><div><span className="form-workspace-icon"><CalendarDays size={24} /></span><div><h1>تعديل الجلسة التدريبية</h1><p>حدّث موعد الجلسة أو الدورة المرتبطة بها.</p></div></div><Link to={`/course-sessions/${id}`}><Button variant="outline">إلغاء</Button></Link></header>
    <form className="form-workspace-form" onSubmit={handleSubmit((values) => mutation.mutate(values))}><div className="form-workspace-grid">
      <Select label="الدورة المنفذة *" error={errors.course_id?.message} isLoading={loadingCourses} options={courses.map((course: any) => ({ value: course.id ?? "", label: course.name || `دورة #${course.id}` }))} {...register('course_id')} />
      <Input label="تاريخ الجلسة *" type="date" error={errors.session_date?.message} {...register('session_date')} />
      <Input label="وقت البدء *" type="time" error={errors.start_time?.message} {...register('start_time')} />
      <Input label="وقت الانتهاء *" type="time" error={errors.end_time?.message} {...register('end_time')} />
    </div><div className="form-workspace-actions"><Button type="submit" isLoading={mutation.isPending}><Save size={17} />حفظ التعديلات</Button></div></form>
  </section>;
}
