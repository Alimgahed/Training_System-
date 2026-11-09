import { zodResolver } from '@hookform/resolvers/zod';
import { useReferenceForm as useForm, useReferenceMutation } from '../../../shared/components/ReferenceEditor';
import { Link,useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { usePlannedCourses } from '../api/plannedCourses';
import type { CreateCourseRequest } from '../types';

// القوائم المنسدلة
import { useLearningSubjects } from '../../learning-subjects/api/useListQuery';
import { useOrganizations } from '../../organizations/api/useListQuery';
import { usePathGradeSubjectTerms } from '../../path-grade-subject-terms/api/useListQuery';
import { usePathGradeSubjects } from '../../path-grade-subjects/api/useListQuery';
import { usePersons } from '../../persons/api/useListQuery';
import { useRooms } from '../../rooms/api/useListQuery';

const schema = z.object({
  name: z.string().trim().min(1, 'اسم الدورة/الكورس مطلوب'),
  duration_in_days: z.coerce.number().int('المدة يجب أن تكون عدداً صحيحاً').min(1, 'المدة بالأيام مطلوبة'),
  starting_date: z.string().min(1, 'تاريخ البداية مطلوب'),
  end_date: z.string().optional(),
  number_of_internal_participants: z.union([z.literal(''), z.coerce.number().int('العدد يجب أن يكون صحيحاً')]).optional().transform(value => value === '' || value === undefined ? null : value),
  number_of_external_participants: z.union([z.literal(''), z.coerce.number().int('العدد يجب أن يكون صحيحاً')]).optional().transform(value => value === '' || value === undefined ? null : value),
  cost: z.union([z.string(), z.number()]).optional().transform(value => String(value ?? '').trim() || '0').refine(value => /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value), 'أدخل تكلفة رقمية صحيحة'),
  
  is_planned: z.boolean().default(false),
  is_executed: z.boolean().default(false),
  planned_id: z.coerce.number().int().nonnegative().optional(),

  subject_type: z.enum(['subject', 'subject_term', 'learning_subject']),
  path_grade_subject_id: z.coerce.number().int().nonnegative().optional(),
  path_grade_subject_term_id: z.coerce.number().int().nonnegative().optional(),
  learning_subject_id: z.coerce.number().int().nonnegative().optional(),

  room_id: z.coerce.number().int().positive('اختر قاعة التدريب'),
  trainer_id: z.coerce.number().int().positive('اختر المدرب الأساسي'),
  backup_trainer_id: z.coerce.number().int().nonnegative().optional(),
  coordinator_id: z.coerce.number().int().nonnegative().optional(),
  funding_organization_id: z.coerce.number().int().nonnegative().optional(),
}).superRefine((data, ctx) => {
  for (const key of ['starting_date', 'end_date'] as const) {
    const value = data[key];
    if (value && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'أدخل تاريخاً صحيحاً', path: [key] });
    }
  }
  if (!data.is_planned && !data.is_executed) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'يجب أن يكون الكورس إما مخططاً أو منفذاً أو كلاهما', path: ['is_planned'] });
  }
  if (data.is_planned && data.is_executed && !data.planned_id) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'يجب اختيار الكورس المخطط الأساسي إذا كان هذا التنفيذ بناءً على خطة', path: ['planned_id'] });
  }
  if (data.subject_type === 'subject' && !data.path_grade_subject_id) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'يرجى اختيار مادة المسار', path: ['path_grade_subject_id'] });
  }
  if (data.subject_type === 'subject_term' && !data.path_grade_subject_term_id) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'يرجى اختيار مادة الترم', path: ['path_grade_subject_term_id'] });
  }
  if (data.subject_type === 'learning_subject' && !data.learning_subject_id) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'يرجى اختيار الموضوع التدريبي الحر', path: ['learning_subject_id'] });
  }
});

type FormInputs = z.infer<typeof schema>;

export function CourseCreate() {
  const navigate = useNavigate();
  const mutation = useReferenceMutation<CreateCourseRequest>();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<z.input<typeof schema>, FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: { is_planned: false, is_executed: true, subject_type: 'learning_subject' }
  });

  const isPlanned = watch('is_planned');
  const isExecuted = watch('is_executed');
  const subjectType = watch('subject_type');

  const { data: pathGradeSubjects, isLoading: loadingPGS } = usePathGradeSubjects();
  const { data: pathGradeSubjectTerms, isLoading: loadingPGST } = usePathGradeSubjectTerms();
  const { data: learningSubjects, isLoading: loadingLS } = useLearningSubjects();
  const { data: rooms, isLoading: loadingRooms } = useRooms();
  const { data: persons, isLoading: loadingPersons } = usePersons();
  const { data: organizations, isLoading: loadingOrgs } = useOrganizations();
  const { data: plannedCourses, isLoading: loadingPlanned } = usePlannedCourses();

  const trainers = persons?.filter(p => p.is_trainer) || [];

  const onSubmit = (data: FormInputs) => {
    const { subject_type, ...finalData } = data;
    if (subject_type !== 'subject') delete finalData.path_grade_subject_id;
    if (subject_type !== 'subject_term') delete finalData.path_grade_subject_term_id;
    if (subject_type !== 'learning_subject') delete finalData.learning_subject_id;
    if (!(data.is_planned && data.is_executed)) delete finalData.planned_id;
    if (!data.end_date) delete finalData.end_date;
    
    const payload: CreateCourseRequest = {
      ...finalData,
      starting_date: `${data.starting_date}T00:00:00Z`,
      ...(data.end_date ? { end_date: `${data.end_date}T00:00:00Z` } : {}),
      funding_organization_id: data.funding_organization_id || null,
      backup_trainer_id: data.backup_trainer_id || null,
      coordinator_id: data.coordinator_id || null,
    };
    mutation.mutate(payload, { onSuccess: () => navigate('/courses') });
  };

  return (
    <div className="legacy-form-workspace" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', color: 'var(--color-text-primary)' }}>تأسيس دورة تدريبية</h1>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '14px' }}>قم بإدخال بيانات الدورة وتحديد حالتها وموضوعها.</p>
        </div>
        <Link to="/courses">
          <Button variant="outline">العودة للقائمة</Button>
        </Link>
      </div>

      {mutation.isError && <p role="alert" className="user-feedback is-error">تعذر حفظ الدورة. راجع البيانات ثم حاول مجدداً.</p>}
      {!loadingRooms && rooms?.length === 0 && <p role="status" className="user-feedback">لا توجد قاعات تدريب مسجلة. <Link to="/rooms/new">أضف قاعة تدريب</Link> قبل حفظ الدورة.</p>}
      {!loadingPersons && persons && trainers.length === 0 && <p role="status" className="user-feedback">لا يوجد موظف مسجل كمدرب. <Link to="/persons">راجع بيانات الموظفين</Link> قبل حفظ الدورة.</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          
          <Card title="معلومات الحالة (Lifecycle)">
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                <input type="checkbox" style={{ transform: 'scale(1.2)' }} {...register('is_planned')} />
                مدرجة في الخطة (Planned)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                <input type="checkbox" style={{ transform: 'scale(1.2)' }} {...register('is_executed')} />
                قيد التنفيذ (Executed)
              </label>
            </div>
            {errors.is_planned && <span style={{ color: 'var(--color-danger)', fontSize: '12px' }}>{errors.is_planned.message as string}</span>}
            
            {isPlanned && isExecuted && (
              <div style={{ marginTop: '16px' }}>
                <Select 
                  label="الكورس المخطط له مسبقاً *" 
                  error={errors.planned_id?.message} 
                  isLoading={loadingPlanned}
                  options={plannedCourses?.map(c => ({ value: c.id ?? "", label: c.name || String(c.id ?? "") })) || []} 
                  {...register('planned_id')} 
                />
              </div>
            )}
          </Card>

          <Card title="محتوى الدورة (اختر نوعاً واحداً)">
            <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input type="radio" value="learning_subject" {...register('subject_type')} /> موضوع تدريبي حر
              </label>
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input type="radio" value="subject" {...register('subject_type')} /> مادة مسار
              </label>
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input type="radio" value="subject_term" {...register('subject_type')} /> مادة ترم
              </label>
            </div>

            <div style={{ width: '50%' }}>
              {subjectType === 'learning_subject' && (
                <Select label="الموضوع التدريبي *" error={errors.learning_subject_id?.message} isLoading={loadingLS} options={learningSubjects?.map(s => ({ value: s.id ?? "", label: s.name || String(s.id ?? "") })) || []} {...register('learning_subject_id')} />
              )}
              {subjectType === 'subject' && (
                <Select label="مادة المسار *" error={errors.path_grade_subject_id?.message} isLoading={loadingPGS} options={pathGradeSubjects?.map(s => ({ value: s.id ?? "", label: s.name || String(s.id ?? "") })) || []} {...register('path_grade_subject_id')} />
              )}
              {subjectType === 'subject_term' && (
                <Select label="مادة الترم *" error={errors.path_grade_subject_term_id?.message} isLoading={loadingPGST} options={pathGradeSubjectTerms?.map(s => ({ value: s.id ?? "", label: s.code || String(s.id ?? "") })) || []} {...register('path_grade_subject_term_id')} />
              )}
            </div>
          </Card>

          <Card title="البيانات الأساسية">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Input label="اسم الدورة *" error={errors.name?.message} {...register('name')} />
              <Input type="number" label="المدة (بالأيام) *" error={errors.duration_in_days?.message} {...register('duration_in_days')} />
              <Input type="number" label="عدد المشاركين الداخليين" error={errors.number_of_internal_participants?.message} {...register('number_of_internal_participants')} />
              <Input type="number" label="عدد المشاركين الخارجيين" error={errors.number_of_external_participants?.message} {...register('number_of_external_participants')} />
              <Input type="number" label="التكلفة" step="any" error={errors.cost?.message} {...register('cost')} />
              <Select label="الجهة الممولة" isLoading={loadingOrgs} options={organizations?.map(o => ({ value: o.id ?? "", label: o.name || String(o.id ?? "") })) || []} error={errors.funding_organization_id?.message} {...register('funding_organization_id')} />
            </div>
          </Card>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <Card title="المواعيد والمكان">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Input type="date" label="تاريخ البداية *" error={errors.starting_date?.message} {...register('starting_date')} />
                <Input type="date" label="تاريخ النهاية" error={errors.end_date?.message} {...register('end_date')} />
                <Select label="قاعة التدريب *" isLoading={loadingRooms} options={rooms?.map(r => ({ value: r.id ?? "", label: r.name || String(r.id ?? "") })) || []} error={errors.room_id?.message} {...register('room_id')} />
              </div>
            </Card>

            <Card title="طاقم التدريب">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Select label="المدرب الأساسي *" isLoading={loadingPersons} options={trainers.map(t => ({ value: t.id ?? "", label: t.name || String(t.id ?? "") }))} error={errors.trainer_id?.message} {...register('trainer_id')} />
                <Select label="المدرب الاحتياطي" isLoading={loadingPersons} options={trainers.map(t => ({ value: t.id ?? "", label: t.name || String(t.id ?? "") }))} error={errors.backup_trainer_id?.message} {...register('backup_trainer_id')} />
                <Select label="منسق الدورة" isLoading={loadingPersons} options={persons?.map(p => ({ value: p.id ?? "", label: p.name || String(p.id ?? "") })) || []} error={errors.coordinator_id?.message} {...register('coordinator_id')} />
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <Link to="/courses">
              <Button type="button" variant="ghost">إلغاء</Button>
            </Link>
            <Button type="submit" isLoading={mutation.isPending}>حفظ الدورة التدريبية</Button>
          </div>

        </div>
      </form>
    </div>
  );
}
