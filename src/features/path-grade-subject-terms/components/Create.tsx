import { zodResolver } from '@hookform/resolvers/zod';
import { useReferenceForm as useForm, useReferenceMutation } from '../../../shared/components/ReferenceEditor';
import { Link,useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
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

  return (
    <div className="legacy-form-workspace" style={{ padding: '30px', maxWidth: '800px', margin: '40px auto', backgroundColor: '#fdfdfd', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '2px solid #eaeaea', paddingBottom: '15px' }}>
        <h2>بيانات السجل</h2>
        <Link to="/path-grade-subject-terms"><Button>العودة للقائمة</Button></Link>
      </div>

      {mutation.isError && <p role="alert" className="user-feedback is-error">تعذر الحفظ. راجع البيانات والصلاحيات ثم حاول مجدداً.</p>}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
          label="الكود (Code) *" 
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

        <div style={{ gridColumn: '1 / -1', marginTop: '20px' }}>
          <Button type="submit" isLoading={mutation.isPending} style={{ width: '100%', padding: '15px', fontSize: '18px', backgroundColor: '#27ae60' }}>
            حفظ البيانات
          </Button>
        </div>
      </form>
    </div>
  );
}
