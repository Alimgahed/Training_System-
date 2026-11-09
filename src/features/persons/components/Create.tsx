import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link,useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../core/api/apiClient';
import { usePerson } from '../api/useGetQuery';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { useCreatePersonMutation } from '../api/useCreateMutation';
import type { CreatePersonRequest } from '../types';

import { useDepartments } from '../../departments/api/useListQuery';
import { useGovernorates } from '../../governorates/api/useListQuery';
import { useGrades } from '../../grades/api/useListQuery';
import { useJobTypeGroups } from '../../job-type-groups/api/useListQuery';
import { useJobs } from '../../jobs/api/useListQuery';
import { useLearningPaths } from '../../learning-paths/api/useListQuery';
import { useOrganizations } from '../../organizations/api/useListQuery';
import { useQualifications } from '../../qualifications/api/useListQuery';
import { useWorkSites } from '../../work-sites/api/useListQuery';

const emptyToNull = (value: unknown) => {
  if (value === '' || value === undefined || value === null) return null;
  return value;
};

const optionalText = (max: number, message: string) =>
  z.string().trim().max(max, message).optional().transform((value) => value || null);

const optionalId = z.preprocess(
  emptyToNull,
  z.coerce.number().int('القيمة يجب أن تكون رقم صحيح').positive('يرجى اختيار قيمة صحيحة').nullable(),
);

const requiredId = (message: string) =>
  z.coerce.number().int('القيمة يجب أن تكون رقم صحيح').positive(message);

const optionalDate = z.string().optional().refine((value) => {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}, 'يرجى إدخال تاريخ صحيح').transform((value) => value ? `${value}T00:00:00Z` : null);

const schema = z.object({
  code: optionalText(10, 'كود الموظف لا يزيد عن 10 أحرف'),
  name: z.string().trim().min(1, 'الاسم مطلوب').max(100, 'اسم الموظف لا يزيد عن 100 حرف'),
  governorate_id: requiredId('يرجى اختيار المحافظة'),
  qualification_id: requiredId('يرجى اختيار المؤهل'),
  organization_id: requiredId('يرجى اختيار جهة العمل'),
  department_id: optionalId,
  job_id: optionalId,
  job_type_group_id: optionalId,
  telephone_whatsapp: optionalText(20, 'رقم الهاتف / واتساب لا يزيد عن 20 رقم'),
  address: optionalText(1500, 'العنوان لا يزيد عن 1500 حرف'),
  work_site_id: optionalId,
  current_learning_path_id: optionalId,
  current_grade_id: optionalId,
  date_of_current_grade: optionalDate,
  contract_date: optionalDate,
  is_trainer: z.boolean().default(false),
  is_active: z.boolean().default(true),
  trainer_certifying_organization_id: optionalId,
});

type FormInputs = z.infer<typeof schema>;

export function PersonCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const createMutation = useCreatePersonMutation();
  const queryClient = useQueryClient();
  const existing = usePerson(id || '');
  const updateMutation = useMutation({
    mutationFn: (payload: CreatePersonRequest & { is_active?: boolean }) => apiClient.put(`/person/${id}`, payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['persons'] }); queryClient.invalidateQueries({ queryKey: ['person'] }); },
  });
  const mutation = id ? updateMutation : createMutation;

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<z.input<typeof schema>, unknown, FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: { is_trainer: false }
  });
  useEffect(() => {
    if (!id || !existing.data) return;
    const person = existing.data;
    reset({ ...person, name: person.name || '', code: person.code || '', address: person.address || '', telephone_whatsapp: person.telephone_whatsapp || '',
      job_type_group_id: person.job_type_group ?? person.job_type_group_id,
      current_grade_id: person.current_grade ?? person.current_grade_id,
      contract_date: person.contract_date?.slice(0, 10) || '', date_of_current_grade: person.date_of_current_grade?.slice(0, 10) || '',
    });
  }, [id, existing.data, reset]);

  const isTrainer = watch('is_trainer');

  const { data: governorates, isLoading: loadingGovs } = useGovernorates();
  const { data: qualifications, isLoading: loadingQuals } = useQualifications();
  const { data: jobs, isLoading: loadingJobs } = useJobs();
  const { data: organizations, isLoading: loadingOrgs } = useOrganizations();
  const { data: departments, isLoading: loadingDepts } = useDepartments();
  const { data: workSites, isLoading: loadingSites } = useWorkSites();
  const { data: jobTypeGroups, isLoading: loadingJTG } = useJobTypeGroups();
  const { data: learningPaths, isLoading: loadingPaths } = useLearningPaths();
  const { data: grades, isLoading: loadingGrades } = useGrades();

  const onSubmit = (data: FormInputs) => {
    const payload: CreatePersonRequest = {
      code: data.code,
      name: data.name,
      governorate_id: data.governorate_id,
      address: data.address,
      telephone_whatsapp: data.telephone_whatsapp,
      qualification_id: data.qualification_id,
      job_id: data.job_id,
      organization_id: data.organization_id,
      department_id: data.department_id,
      work_site_id: data.work_site_id,
      job_type_group_id: data.job_type_group_id,
      current_learning_path_id: data.current_learning_path_id,
      current_grade_id: data.current_grade_id,
      date_of_current_grade: data.date_of_current_grade,
      contract_date: data.contract_date,
      is_trainer: data.is_trainer,
      trainer_certifying_organization_id: data.is_trainer ? data.trainer_certifying_organization_id : null,
    };

    if (id) updateMutation.mutate({ ...payload, is_active: data.is_active }, { onSuccess: () => navigate(`/persons/${id}`) });
    else createMutation.mutate(payload, { onSuccess: () => navigate('/persons') });
  };

  if (id && existing.isLoading) return <LoadingSkeleton variant="detail" />;
  if (id && existing.isError) return <ErrorState onRetry={() => existing.refetch()} />;

  return (
    <div className="legacy-form-workspace" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', color: 'var(--color-text-primary)' }}>{id ? 'تعديل بيانات الموظف' : 'إضافة موظف / متدرب جديد'}</h1>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '14px' }}>قم بإدخال البيانات الأساسية للموظف وحالته الوظيفية والتدريبية.</p>
        </div>
        <Link to="/persons">
          <Button variant="outline">العودة للقائمة</Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {mutation.isError && <ErrorState message="تعذر حفظ الموظف. راجع البيانات والصلاحيات وحاول مجدداً." />}
        {id && <label><input type="checkbox" {...register('is_active')} /> موظف نشط</label>}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          
          <Card title="البيانات الأساسية ومعلومات الدخول">
            <div className="person-create-grid">
              <Input label="كود الموظف" error={errors.code?.message} maxLength={10} {...register('code')} />
              <Input label="الاسم الرباعي *" error={errors.name?.message} {...register('name')} />
              <Input label="رقم الهاتف / واتساب" error={errors.telephone_whatsapp?.message} {...register('telephone_whatsapp')} />
              <Input label="العنوان السكني" error={errors.address?.message} {...register('address')} />
              <Select label="المحافظة *" error={errors.governorate_id?.message} isLoading={loadingGovs} options={governorates?.map(g => ({ value: g.id ?? "", label: g.name || String(g.id ?? "") })) || []} {...register('governorate_id')} />
              <Select label="المؤهل العلمي *" error={errors.qualification_id?.message} isLoading={loadingQuals} options={qualifications?.map(q => ({ value: q.id ?? "", label: q.name || String(q.id ?? "") })) || []} {...register('qualification_id')} />
            </div>
          </Card>

          <Card title="بيانات العمل والإدارة">
            <div className="person-create-grid">
              <Select label="جهة العمل (Organization) *" error={errors.organization_id?.message} isLoading={loadingOrgs} options={organizations?.map(o => ({ value: o.id ?? "", label: o.name || String(o.id ?? "") })) || []} {...register('organization_id')} />
              <Select label="الإدارة (Department)" error={errors.department_id?.message} isLoading={loadingDepts} options={departments?.map(d => ({ value: d.id ?? "", label: d.name || String(d.id ?? "") })) || []} {...register('department_id')} />
              <Select label="الوظيفة (Job)" error={errors.job_id?.message} isLoading={loadingJobs} options={jobs?.map(j => ({ value: j.id ?? "", label: j.name || String(j.id ?? "") })) || []} {...register('job_id')} />
              <Select label="المجموعة الوظيفية" error={errors.job_type_group_id?.message} isLoading={loadingJTG} options={jobTypeGroups?.map(j => ({ value: j.id ?? "", label: j.name || String(j.id ?? "") })) || []} {...register('job_type_group_id')} />
              <Select label="موقع العمل (اختياري)" isLoading={loadingSites} options={workSites?.map(w => ({ value: w.id ?? "", label: w.name || String(w.id ?? "") })) || []} error={errors.work_site_id?.message} {...register('work_site_id')} />
              <Input type="date" label="تاريخ التعاقد" error={errors.contract_date?.message} {...register('contract_date')} />
            </div>
          </Card>

          <Card title="المسار التدريبي والدرجة">
            <div className="person-create-grid">
              <Select label="المسار التدريبي الحالي" isLoading={loadingPaths} options={learningPaths?.map(p => ({ value: p.id ?? "", label: p.name || String(p.id ?? "") })) || []} error={errors.current_learning_path_id?.message} {...register('current_learning_path_id')} />
              <Select label="الدرجة الحالية" isLoading={loadingGrades} options={grades?.map(g => ({ value: g.id ?? "", label: g.name || String(g.id ?? "") })) || []} error={errors.current_grade_id?.message} {...register('current_grade_id')} />
              <Input type="date" label="تاريخ الدرجة الحالية" error={errors.date_of_current_grade?.message} {...register('date_of_current_grade')} />
            </div>
          </Card>

          <Card title="الصلاحيات والخيارات">
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                <input type="checkbox" style={{ transform: 'scale(1.2)' }} {...register('is_trainer')} />
                هل هذا الموظف مدرب؟
              </label>
            </div>
            
            {isTrainer && (
              <div className="person-create-grid person-create-grid--single">
                <Select label="جهة الاعتماد للمدرب" isLoading={loadingOrgs} options={organizations?.map(o => ({ value: o.id ?? "", label: o.name || String(o.id ?? "") })) || []} error={errors.trainer_certifying_organization_id?.message} {...register('trainer_certifying_organization_id')} />
              </div>
            )}
          </Card>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <Link to="/persons">
              <Button type="button" variant="ghost">إلغاء</Button>
            </Link>
            <Button type="submit" isLoading={mutation.isPending}>حفظ بيانات الموظف</Button>
          </div>

        </div>
      </form>
    </div>
  );
}
