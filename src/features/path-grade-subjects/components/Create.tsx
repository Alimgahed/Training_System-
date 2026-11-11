import { zodResolver } from '@hookform/resolvers/zod';
import { useReferenceForm as useForm, useReferenceMutation } from '../../../shared/components/ReferenceEditor';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { TrainingRecordForm } from '../../../shared/components/TrainingRecordForm';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';

import { useLearningSubjects } from '../../learning-subjects/api/useListQuery';
import { usePathGrades } from '../../path-grades/api/useListQuery';

const schema = z.object({
  name: z.string().trim().min(1, 'هذا الحقل مطلوب'),
  code: z.string().min(1, 'هذا الحقل مطلوب'),
  path_grade_id: z.coerce.number().int().positive('اختر قيمة من القائمة'),
  learning_subject_id: z.coerce.number().int().positive('اختر قيمة من القائمة'),

});

type FormInputs = z.infer<typeof schema>;

export function PathGradeSubjectCreate() {
  const navigate = useNavigate();
  const mutation = useReferenceMutation<FormInputs>();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const { data: datausePathGrades, isLoading: loadingusePathGrades } = usePathGrades();
  const { data: datauseLearningSubjects, isLoading: loadinguseLearningSubjects } = useLearningSubjects();

  const onSubmit = (data: FormInputs) => {
    mutation.mutate(data, { onSuccess: () => navigate('/path-grade-subjects') });
  };

  return <TrainingRecordForm title="مادة درجة مسار" backPath="/path-grade-subjects" onSubmit={handleSubmit(onSubmit)} pending={mutation.isPending} error={mutation.isError}>
        <Input
          label="الاسم *"
          type="text"
          error={errors.name?.message as string}
          {...register('name')}
        />
        <Input
          label="الكود *"
          type="text"
          error={errors.code?.message as string}
          {...register('code')}
        />
        <Select
          label="مرحلة المسار (Path Grade) *"
          error={errors.path_grade_id?.message as string}
          isLoading={loadingusePathGrades}
          options={datausePathGrades?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []}
          {...register('path_grade_id')}
        />
        <Select
          label="الموضوع التدريبي *"
          error={errors.learning_subject_id?.message as string}
          isLoading={loadinguseLearningSubjects}
          options={datauseLearningSubjects?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []}
          {...register('learning_subject_id')}
        />

  </TrainingRecordForm>;
}
