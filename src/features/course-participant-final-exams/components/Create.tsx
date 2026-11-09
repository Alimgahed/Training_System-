import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link,useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { useCreateCourseParticipantFinalExamMutation } from '../api/useCreateMutation';

import { useCourseParticipants } from '../../course-participants/api/useListQuery';
import { useDocumentations } from '../../documentations/api/useListQuery';

const schema = z.object({
  exam_date: z.string().min(1, 'هذا الحقل مطلوب'),
  organized_by: z.string().min(1, 'هذا الحقل مطلوب'),
  course_participant_id: z.coerce.number(),
  documentation_id: z.coerce.number(),
  exam_score: z.coerce.number(),

});

type FormInputs = z.infer<typeof schema>;

export function CourseParticipantFinalExamCreate() {
  const navigate = useNavigate();
  const mutation = useCreateCourseParticipantFinalExamMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const { data: datauseCourseParticipants, isLoading: loadinguseCourseParticipants } = useCourseParticipants();
  const { data: datauseDocumentations, isLoading: loadinguseDocumentations } = useDocumentations();

  const onSubmit = (data: FormInputs) => {
    mutation.mutate(data, { onSuccess: () => navigate('/course-participant-final-exams') });
  };

  return (
    <div className="legacy-form-workspace" style={{ padding: '30px', maxWidth: '800px', margin: '40px auto', backgroundColor: '#fdfdfd', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '2px solid #eaeaea', paddingBottom: '15px' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>إضافة CourseParticipantFinalExam جديد</h2>
        <Link to="/course-participant-final-exams"><Button>العودة للقائمة</Button></Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Input 
          label="تاريخ الاختبار *" 
          type="date" 
          error={errors.exam_date?.message as string} 
          {...register('exam_date')} 
        />
        <Input 
          label="نظم بواسطة *" 
          type="text" 
          error={errors.organized_by?.message as string} 
          {...register('organized_by')} 
        />
        <Select 
          label="المشارك *" 
          error={errors.course_participant_id?.message as string} 
          isLoading={loadinguseCourseParticipants}
          options={datauseCourseParticipants?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []} 
          {...register('course_participant_id')} 
        />
        <Select 
          label="الوثيقة *" 
          error={errors.documentation_id?.message as string} 
          isLoading={loadinguseDocumentations}
          options={datauseDocumentations?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []} 
          {...register('documentation_id')} 
        />
        <Input 
          label="درجة الاختبار *" 
          type="number" 
          error={errors.exam_score?.message as string} 
          {...register('exam_score')} 
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
