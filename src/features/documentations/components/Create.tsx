import { zodResolver } from '@hookform/resolvers/zod';
import { useReferenceForm as useForm, useReferenceMutation } from '../../../shared/components/ReferenceEditor';
import { Link,useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';

import { useCourseSessions } from '../../course-sessions/api/useListQuery';
import { useCourses } from '../../courses/api/useListQuery';
import { useDocumentationTypes } from '../../documentation-types/api/useListQuery';
import { useLearningSubjects } from '../../learning-subjects/api/useListQuery';
import { usePathGradeSubjectTerms } from '../../path-grade-subject-terms/api/useListQuery';
import { usePathGradeSubjects } from '../../path-grade-subjects/api/useListQuery';

const schema = z.object({
  name: z.string().trim().min(1, 'هذا الحقل مطلوب'),
  file_path: z.string().min(1, 'هذا الحقل مطلوب'),
  documentation_type_id: z.coerce.number().int().nonnegative(),
  learning_subject_id: z.coerce.number().int().nonnegative(),
  path_grade_subject_id: z.coerce.number().int().nonnegative(),
  path_grade_subject_term_id: z.coerce.number().int().nonnegative(),
  course_id: z.coerce.number().int().nonnegative(),
  course_session_id: z.coerce.number().int().nonnegative(),

}).refine(data => [data.learning_subject_id, data.path_grade_subject_id, data.path_grade_subject_term_id, data.course_id, data.course_session_id].filter(Boolean).length === 1, { message: 'اختر جهة ارتباط واحدة فقط للوثيقة من الحقول التالية', path: ['learning_subject_id'] });

type FormInputs = z.infer<typeof schema>;

export function DocumentationCreate() {
  const navigate = useNavigate();
  const mutation = useReferenceMutation<FormInputs>();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const { data: datauseDocumentationTypes, isLoading: loadinguseDocumentationTypes } = useDocumentationTypes();
  const { data: datauseLearningSubjects, isLoading: loadinguseLearningSubjects } = useLearningSubjects();
  const { data: datausePathGradeSubjects, isLoading: loadingusePathGradeSubjects } = usePathGradeSubjects();
  const { data: datausePathGradeSubjectTerms, isLoading: loadingusePathGradeSubjectTerms } = usePathGradeSubjectTerms();
  const { data: datauseCourses, isLoading: loadinguseCourses } = useCourses();
  const { data: datauseCourseSessions, isLoading: loadinguseCourseSessions } = useCourseSessions();

  const onSubmit = (data: FormInputs) => {
    const payload = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, key.endsWith('_id') && value === 0 ? null : value]));
    mutation.mutate(payload as FormInputs, { onSuccess: () => navigate('/documentations') });
  };

  return (
    <div className="legacy-form-workspace" style={{ padding: '30px', maxWidth: '800px', margin: '40px auto', backgroundColor: '#fdfdfd', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '2px solid #eaeaea', paddingBottom: '15px' }}>
        <h1>بيانات الوثيقة</h1>
        <Link to="/documentations"><Button>العودة للقائمة</Button></Link>
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
          label="مسار الملف *" 
          type="text" 
          error={errors.file_path?.message as string} 
          {...register('file_path')} 
        />
        <Select 
          label="نوع الوثيقة (اختياري)" 
          error={errors.documentation_type_id?.message as string} 
          isLoading={loadinguseDocumentationTypes}
          options={datauseDocumentationTypes?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []} 
          {...register('documentation_type_id')} 
        />
        <Select 
          label="ارتباط بموضوع تدريبي" 
          error={errors.learning_subject_id?.message as string} 
          isLoading={loadinguseLearningSubjects}
          options={datauseLearningSubjects?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []} 
          {...register('learning_subject_id')} 
        />
        <Select 
          label="ارتباط بمادة درجة المسار" 
          error={errors.path_grade_subject_id?.message as string} 
          isLoading={loadingusePathGradeSubjects}
          options={datausePathGradeSubjects?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []} 
          {...register('path_grade_subject_id')} 
        />
        <Select 
          label="ارتباط بمادة فصل تدريبي" 
          error={errors.path_grade_subject_term_id?.message as string} 
          isLoading={loadingusePathGradeSubjectTerms}
          options={datausePathGradeSubjectTerms?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []} 
          {...register('path_grade_subject_term_id')} 
        />
        <Select 
          label="ارتباط بدورة تدريبية" 
          error={errors.course_id?.message as string} 
          isLoading={loadinguseCourses}
          options={datauseCourses?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []} 
          {...register('course_id')} 
        />
        <Select 
          label="ارتباط بجلسة تدريبية" 
          error={errors.course_session_id?.message as string} 
          isLoading={loadinguseCourseSessions}
          options={datauseCourseSessions?.map((item: any) => ({ value: item.id ?? "", label: item.name || item.code || String(item.id ?? "") })) || []} 
          {...register('course_session_id')} 
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
