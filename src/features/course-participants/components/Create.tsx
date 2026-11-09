import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link,useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Select } from '../../../shared/components/Select';
import { useCreateCourseParticipantMutation } from '../api/useCreateMutation';

import { useCourses } from '../../courses/api/useListQuery';
import { usePersons } from '../../persons/api/useListQuery';

const schema = z.object({
  course_id: z.coerce.number(),
  person_id: z.coerce.number(),

});

type FormInputs = z.infer<typeof schema>;

export function CourseParticipantCreate() {
  const navigate = useNavigate();
  const mutation = useCreateCourseParticipantMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const { data: datauseCourses, isLoading: loadinguseCourses } = useCourses();
  const { data: datausePersons, isLoading: loadingusePersons } = usePersons();

  const onSubmit = (data: FormInputs) => {
    mutation.mutate(data, { onSuccess: () => navigate('/course-participants') });
  };

  return (
    <div className="legacy-form-workspace" style={{ padding: '30px', maxWidth: '800px', margin: '40px auto', backgroundColor: '#fdfdfd', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '2px solid #eaeaea', paddingBottom: '15px' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>إضافة CourseParticipant جديد</h2>
        <Link to="/course-participants"><Button>العودة للقائمة</Button></Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Select 
          label="الدورة التدريبية *" 
          error={errors.course_id?.message as string} 
          isLoading={loadinguseCourses}
          options={datauseCourses?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []} 
          {...register('course_id')} 
        />
        <Select 
          label="الشخص / الموظف *" 
          error={errors.person_id?.message as string} 
          isLoading={loadingusePersons}
          options={datausePersons?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []} 
          {...register('person_id')} 
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
