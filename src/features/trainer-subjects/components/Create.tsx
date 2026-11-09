import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useReferenceForm, useReferenceMutation } from '../../../shared/components/ReferenceEditor';
import { Select } from '../../../shared/components/Select';
import { Button } from '../../../shared/components/Button';
import { usePersons } from '../../persons/api/useListQuery';
import { useLearningSubjects } from '../../learning-subjects/api/useListQuery';

const schema = z.object({ person_id: z.coerce.number().int().positive('اختر المدرب'), learning_subject_id: z.coerce.number().int().positive('اختر الموضوع التدريبي') });
type Values = z.infer<typeof schema>;
export function TrainerSubjectCreate() {
  const people = usePersons();
  const subjects = useLearningSubjects();
  const navigate = useNavigate();
  const mutation = useReferenceMutation<Values>();
  const { register, handleSubmit, formState: { errors } } = useReferenceForm<Values>({ resolver: zodResolver(schema) });
  return <section className="legacy-form-workspace"><h1>تخصص المدرب</h1>
    {mutation.isError && <p role="alert">تعذر حفظ تخصص المدرب. راجع البيانات والصلاحيات.</p>}
    <form onSubmit={handleSubmit(values => mutation.mutate(values, { onSuccess: () => navigate('/trainer-subjects') }))}>
      <Select label="المدرب *" isLoading={people.isLoading} error={errors.person_id?.message} options={(people.data || []).filter(p => p.is_trainer).map(p => ({ value: p.id ?? '', label: p.name || String(p.id) }))} {...register('person_id')} />
      <Select label="الموضوع التدريبي *" isLoading={subjects.isLoading} error={errors.learning_subject_id?.message} options={(subjects.data || []).map(s => ({ value: s.id ?? '', label: s.name || String(s.id) }))} {...register('learning_subject_id')} />
      <Button type="submit" isLoading={mutation.isPending}>حفظ البيانات</Button>
    </form></section>;
}
