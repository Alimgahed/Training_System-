import { zodResolver } from '@hookform/resolvers/zod';
import { useReferenceForm as useForm, useReferenceMutation } from '../../../shared/components/ReferenceEditor';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { TrainingRecordForm } from '../../../shared/components/TrainingRecordForm';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';

import { useQualificationTypes } from '../../qualification-types/api/useListQuery';

const schema = z.object({
  code: z.coerce.number().int('الكود يجب أن يكون رقماً صحيحاً'),
  name: z.string().trim().min(1, 'هذا الحقل مطلوب'),
  qualification_type_id: z.coerce.number().int().positive('اختر قيمة من القائمة'),

});

type FormInputs = z.infer<typeof schema>;

export function LearningPathCreate() {
  const navigate = useNavigate();
  const mutation = useReferenceMutation<FormInputs>();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const { data: datauseQualificationTypes, isLoading: loadinguseQualificationTypes } = useQualificationTypes();

  const onSubmit = (data: FormInputs) => {
    mutation.mutate(data, { onSuccess: () => navigate('/learning-paths') });
  };

  return <TrainingRecordForm title="مسار تدريبي" backPath="/learning-paths" onSubmit={handleSubmit(onSubmit)} pending={mutation.isPending} error={mutation.isError}>
        <Input
          label="الكود *"
          type="text"
          error={errors.code?.message as string}
          {...register('code')}
        />
        <Input
          label="الاسم *"
          type="text"
          error={errors.name?.message as string}
          {...register('name')}
        />
        <Select
          label="نوع المؤهل *"
          error={errors.qualification_type_id?.message as string}
          isLoading={loadinguseQualificationTypes}
          options={datauseQualificationTypes?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []}
          {...register('qualification_type_id')}
        />

  </TrainingRecordForm>;
}
