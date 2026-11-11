import { zodResolver } from '@hookform/resolvers/zod';
import { useReferenceForm as useForm, useReferenceMutation } from '../../../shared/components/ReferenceEditor';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { TrainingRecordForm } from '../../../shared/components/TrainingRecordForm';
import { Input } from '../../../shared/components/Input';


const schema = z.object({
  name: z.string().trim().min(1, 'هذا الحقل مطلوب'),

});

type FormInputs = z.infer<typeof schema>;

export function LearningSubjectCreate() {
  const navigate = useNavigate();
  const mutation = useReferenceMutation<FormInputs>();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });


  const onSubmit = (data: FormInputs) => {
    mutation.mutate(data, { onSuccess: () => navigate('/learning-subjects') });
  };

  return <TrainingRecordForm title="موضوع تدريبي" backPath="/learning-subjects" onSubmit={handleSubmit(onSubmit)} pending={mutation.isPending} error={mutation.isError}>
        <Input
          label="الاسم *"
          type="text"
          error={errors.name?.message as string}
          {...register('name')}
        />

  </TrainingRecordForm>;
}
