import { zodResolver } from '@hookform/resolvers/zod';
import { useReferenceForm as useForm, useReferenceMutation } from '../../../shared/components/ReferenceEditor';
import { Link,useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Select } from '../../../shared/components/Select';

import { useParticipantTypes } from '../../participant-types/api/useListQuery';
import { usePerformanceEvaluationCategorys } from '../../performance-evaluation-categories/api/useListQuery';

const schema = z.object({
  participant_type_id: z.coerce.number().int().positive('اختر قيمة من القائمة'),
  performance_evaluation_category_id: z.coerce.number().int().positive('اختر قيمة من القائمة'),

});

type FormInputs = z.infer<typeof schema>;

export function PerformanceEvaluationParticipantCategoryCreate() {
  const navigate = useNavigate();
  const mutation = useReferenceMutation<FormInputs>();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const { data: datauseParticipantTypes, isLoading: loadinguseParticipantTypes } = useParticipantTypes();
  const { data: datausePerformanceEvaluationCategorys, isLoading: loadingusePerformanceEvaluationCategorys } = usePerformanceEvaluationCategorys();

  const onSubmit = (data: FormInputs) => {
    mutation.mutate(data, { onSuccess: () => navigate('/performance-evaluation-participant-categories') });
  };

  return (
    <div className="legacy-form-workspace" style={{ padding: '30px', maxWidth: '800px', margin: '40px auto', backgroundColor: '#fdfdfd', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '2px solid #eaeaea', paddingBottom: '15px' }}>
        <h1>بيانات فئة تقييم المشاركين</h1>
        <Link to="/performance-evaluation-participant-categories"><Button>العودة للقائمة</Button></Link>
      </div>

      {mutation.isError && <p role="alert" className="user-feedback is-error">تعذر الحفظ. راجع البيانات والصلاحيات ثم حاول مجدداً.</p>}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Select 
          label="نوع المشارك *" 
          error={errors.participant_type_id?.message as string} 
          isLoading={loadinguseParticipantTypes}
          options={datauseParticipantTypes?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []} 
          {...register('participant_type_id')} 
        />
        <Select 
          label="فئة تقييم الأداء *" 
          error={errors.performance_evaluation_category_id?.message as string} 
          isLoading={loadingusePerformanceEvaluationCategorys}
          options={datausePerformanceEvaluationCategorys?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []} 
          {...register('performance_evaluation_category_id')} 
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
