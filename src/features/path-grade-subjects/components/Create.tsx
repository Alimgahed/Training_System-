import { zodResolver } from '@hookform/resolvers/zod';
import { useReferenceForm as useForm, useReferenceMutation } from '../../../shared/components/ReferenceEditor';
import { Link,useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
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

  return (
    <div className="legacy-form-workspace" style={{ padding: '30px', maxWidth: '800px', margin: '40px auto', backgroundColor: '#fdfdfd', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '2px solid #eaeaea', paddingBottom: '15px' }}>
        <h1>بيانات مادة المسار</h1>
        <Link to="/path-grade-subjects"><Button>العودة للقائمة</Button></Link>
      </div>

      {mutation.isError && <p role="alert" className="user-feedback is-error">تعذر الحفظ. راجع البيانات والصلاحيات ثم حاول مجدداً.</p>}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Input 
          label="الاسم / الوصف *" 
          type="text" 
          error={errors.name?.message as string} 
          {...register('name')} 
        />
        <Input 
          label="الكود (Code) *" 
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

        <div style={{ gridColumn: '1 / -1', marginTop: '20px' }}>
          <Button type="submit" isLoading={mutation.isPending} style={{ width: '100%', padding: '15px', fontSize: '18px', backgroundColor: '#27ae60' }}>
            حفظ البيانات
          </Button>
        </div>
      </form>
    </div>
  );
}
