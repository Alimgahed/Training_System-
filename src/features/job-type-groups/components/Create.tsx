import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link,useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { useCreateJobTypeGroupMutation } from '../api/useCreateMutation';

import { useWorkGroups } from '../../work-groups/api/useListQuery';

const schema = z.object({
  code: z.string().min(1, 'هذا الحقل مطلوب'),
  name: z.string().min(1, 'هذا الحقل مطلوب'),
  work_group_id: z.coerce.number(),

});

type FormInputs = z.infer<typeof schema>;

export function JobTypeGroupCreate() {
  const navigate = useNavigate();
  const mutation = useCreateJobTypeGroupMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const { data: datauseWorkGroups, isLoading: loadinguseWorkGroups } = useWorkGroups();

  const onSubmit = (data: FormInputs) => {
    mutation.mutate(data, { onSuccess: () => navigate('/job-type-groups') });
  };

  return (
    <div className="legacy-form-workspace" style={{ padding: '30px', maxWidth: '800px', margin: '40px auto', backgroundColor: '#fdfdfd', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '2px solid #eaeaea', paddingBottom: '15px' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>إضافة JobTypeGroup جديد</h2>
        <Link to="/job-type-groups"><Button>العودة للقائمة</Button></Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Input 
          label="الكود (Code) *" 
          type="text" 
          error={errors.code?.message as string} 
          {...register('code')} 
        />
        <Input 
          label="الاسم / الوصف *" 
          type="text" 
          error={errors.name?.message as string} 
          {...register('name')} 
        />
        <Select 
          label="مجموعة العمل *" 
          error={errors.work_group_id?.message as string} 
          isLoading={loadinguseWorkGroups}
          options={datauseWorkGroups?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []} 
          {...register('work_group_id')} 
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
