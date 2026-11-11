import { zodResolver } from '@hookform/resolvers/zod';
import { useReferenceForm as useForm, useReferenceMutation } from '../../../shared/components/ReferenceEditor';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { TrainingRecordForm } from '../../../shared/components/TrainingRecordForm';
import { Select } from '../../../shared/components/Select';

import { useGrades } from '../../grades/api/useListQuery';
import { useLearningPaths } from '../../learning-paths/api/useListQuery';

const schema = z.object({
  learning_path_id: z.coerce.number().int().positive('اختر قيمة من القائمة'),
  grade_id: z.coerce.number().int().positive('اختر قيمة من القائمة'),

});

type FormInputs = z.infer<typeof schema>;

export function PathGradeCreate() {
  const navigate = useNavigate();
  const mutation = useReferenceMutation<FormInputs>();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const { data: datauseLearningPaths, isLoading: loadinguseLearningPaths } = useLearningPaths();
  const { data: datauseGrades, isLoading: loadinguseGrades } = useGrades();

  const onSubmit = (data: FormInputs) => {
    mutation.mutate(data, { onSuccess: () => navigate('/path-grades') });
  };

  return <TrainingRecordForm title="درجة مسار" backPath="/path-grades" onSubmit={handleSubmit(onSubmit)} pending={mutation.isPending} error={mutation.isError}>
        <Select
          label="المسار التدريبي *"
          error={errors.learning_path_id?.message as string}
          isLoading={loadinguseLearningPaths}
          options={datauseLearningPaths?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []}
          {...register('learning_path_id')}
        />
        <Select
          label="الدرجة *"
          error={errors.grade_id?.message as string}
          isLoading={loadinguseGrades}
          options={datauseGrades?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []}
          {...register('grade_id')}
        />

  </TrainingRecordForm>;
}
