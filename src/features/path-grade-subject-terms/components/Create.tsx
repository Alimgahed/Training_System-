import { zodResolver } from '@hookform/resolvers/zod';
import { useReferenceForm as useForm, useReferenceMutation } from '../../../shared/components/ReferenceEditor';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { TrainingRecordForm } from '../../../shared/components/TrainingRecordForm';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';

import { useLearningTerms } from '../../learning-terms/api/useListQuery';
import { usePathGradeSubjects } from '../../path-grade-subjects/api/useListQuery';

const schema = z.object({
  path_grade_subjects_id: z.coerce.number().int().positive('اختر قيمة من القائمة'),
  term_id: z.coerce.number().int().positive('اختر قيمة من القائمة'),
  code: z.string().min(1, 'هذا الحقل مطلوب'),
  notes: z.string().min(1, 'هذا الحقل مطلوب'),

});

type FormInputs = z.infer<typeof schema>;

export function PathGradeSubjectTermCreate() {
  const navigate = useNavigate();
  const mutation = useReferenceMutation<FormInputs>();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const { data: datausePathGradeSubjects, isLoading: loadingusePathGradeSubjects } = usePathGradeSubjects();
  const { data: datauseLearningTerms, isLoading: loadinguseLearningTerms } = useLearningTerms();

  const onSubmit = (data: FormInputs) => {
    mutation.mutate(data, { onSuccess: () => navigate('/path-grade-subject-terms') });
  };

  return <TrainingRecordForm title="مادة ترم" backPath="/path-grade-subject-terms" onSubmit={handleSubmit(onSubmit)} pending={mutation.isPending} error={mutation.isError}>
        <Select
          label="مادة درجة المسار *"
          error={errors.path_grade_subjects_id?.message as string}
          isLoading={loadingusePathGradeSubjects}
          options={datausePathGradeSubjects?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []}
          {...register('path_grade_subjects_id')}
        />
        <Select
          label="الترم *"
          error={errors.term_id?.message as string}
          isLoading={loadinguseLearningTerms}
          options={datauseLearningTerms?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []}
          {...register('term_id')}
        />
        <Input
          label="الكود *"
          type="text"
          error={errors.code?.message as string}
          {...register('code')}
        />
        <Input
          label="ملاحظات *"
          type="text"
          error={errors.notes?.message as string}
          {...register('notes')}
        />

  </TrainingRecordForm>;
}
