import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight,Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link,useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { Input } from '../../../shared/components/Input';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Select } from '../../../shared/components/Select';
import { useExecutedCourses } from '../../courses/api/executedCourses';
import { useCreateCourseSessionMutation } from '../api/useCreateMutation';

const schema = z.object({
  session_date: z.string().min(1, 'تاريخ انعقاد الجلسة مطلوب'),
  start_time: z.string().min(1, 'وقت البدء مطلوب'),
  end_time: z.string().min(1, 'وقت الانتهاء مطلوب'),
  course_id: z.coerce.number().min(1, 'يرجى اختيار الدورة التدريبية'),
});

type FormInputs = z.infer<typeof schema>;

export function CourseSessionCreate() {
  const navigate = useNavigate();
  const mutation = useCreateCourseSessionMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  // Business Rule: Sessions can only be scheduled for executed courses
  const { data: executedCourses, isLoading: loadingCourses } = useExecutedCourses();

  const onSubmit = (data: FormInputs) => {
    mutation.mutate(data, { onSuccess: () => navigate('/course-sessions') });
  };

  return (
    <div className="legacy-form-workspace" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '900px', margin: '0 auto' }}>
      <PageHeader
        title="جدولة جلسة تدريبية جديدة"
        subtitle="إضافة جلسة أو محاضرة جديدة ضمن الدورات التدريبية المنفذة"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'الجلسات التدريبية', href: '/course-sessions' },
          { label: 'جدولة جلسة جديدة' },
        ]}
        actions={
          <Link to="/course-sessions">
            <Button variant="outline" size="sm">
              <ArrowRight size={16} /> العودة للجدول
            </Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card title="بيانات وموعد الجلسة التدريبية">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <Select
                label="الدورة التدريبية المنفذة *"
                error={errors.course_id?.message}
                isLoading={loadingCourses}
                options={executedCourses?.map((item: any) => ({
                  value: item.id ?? "",
                  label: `${item.name || 'دورة'} (#${item.id})`
                })) || []}
                {...register('course_id')}
              />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-1)', display: 'block' }}>
                * طبقاً لقواعد النظام، تتاح الجدولة فقط للدورات المعتمدة والمنفذة
              </span>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <Input
                label="تاريخ الجلسة *"
                type="date"
                error={errors.session_date?.message}
                {...register('session_date')}
              />
            </div>

            <Input
              label="وقت البدء *"
              type="time"
              error={errors.start_time?.message}
              {...register('start_time')}
            />

            <Input
              label="وقت الانتهاء *"
              type="time"
              error={errors.end_time?.message}
              {...register('end_time')}
            />

            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
              <Link to="/course-sessions">
                <Button type="button" variant="ghost">إلغاء</Button>
              </Link>
              <Button type="submit" isLoading={mutation.isPending}>
                <Check size={16} /> حفظ وجدولة الجلسة
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}
