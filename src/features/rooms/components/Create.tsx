import { zodResolver } from '@hookform/resolvers/zod';
import { useReferenceForm as useForm, useReferenceMutation } from '../../../shared/components/ReferenceEditor';
import { Link,useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';

import { useWorkSites } from '../../work-sites/api/useListQuery';

const schema = z.object({
  name: z.string().trim().min(1, 'هذا الحقل مطلوب'),
  work_site_id: z.coerce.number().int().positive('اختر قيمة من القائمة'),

});

type FormInputs = z.infer<typeof schema>;

export function TrainingRoomCreate() {
  const navigate = useNavigate();
  const mutation = useReferenceMutation<FormInputs>();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const { data: datauseWorkSites, isLoading: loadinguseWorkSites } = useWorkSites();

  const onSubmit = (data: FormInputs) => {
    mutation.mutate(data, { onSuccess: () => navigate('/rooms') });
  };

  return (
    <div className="legacy-form-workspace" style={{ padding: '30px', maxWidth: '800px', margin: '40px auto', backgroundColor: '#fdfdfd', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '2px solid #eaeaea', paddingBottom: '15px' }}>
        <h1>بيانات قاعة التدريب</h1>
        <Link to="/rooms"><Button>العودة للقائمة</Button></Link>
      </div>

      {mutation.isError && <p role="alert" className="user-feedback is-error">تعذر الحفظ. راجع البيانات والصلاحيات ثم حاول مجدداً.</p>}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Input 
          label="الاسم / الوصف *" 
          type="text" 
          error={errors.name?.message as string} 
          {...register('name')} 
        />
        <Select 
          label="موقع العمل *" 
          error={errors.work_site_id?.message as string} 
          isLoading={loadinguseWorkSites}
          options={datauseWorkSites?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []} 
          {...register('work_site_id')} 
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
