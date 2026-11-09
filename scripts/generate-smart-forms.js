import fs from 'fs';
import path from 'path';

const modelsDoc = `
- Client — id, name
- Country — id, name, client_id, governorates[]
- Governorate — id, name, country_id, client_id
- OrganizationType — id, name, client_id
- Organization — id, name, code, address, organization_type_id, governorate_id, client_id, work_centers[], departments[]
- WorkGroup — id, code, name, client_id
- JobTypeGroup — id, code, name, work_group_id, client_id
- WorkCenter — id, name, governorate_id, organization_id, client_id
- WorkSite — id, code, name, work_center_id, client_id
- Department — id, code, name, organization_id, client_id
- QualificationType — id, name, client_id
- Qualification — id, code, name, qualification_type_id, client_id
- Job — id, code, name, client_id
- Grade — id, code, name, grade_interval, client_id
- LearningPath — id, code, name, qualification_type_id, client_id
- LearningTerm — id, name, client_id
- LearningSubject — id, name, client_id
- PathGrade — id, learning_path_id, grade_id, client_id, path_grade_subjects[]
- PathGradeSubject — id, name, code, path_grade_id, learning_subject_id, client_id
- PathGradeSubjectTerm — id, path_grade_subjects_id, path_grade_subject.path_grade.learning_path?: LearningPath, path_grade_subject.path_grade.grade?: Grade, path_grade_subject.learning_subject, term, code, notes, client_id
- EvaluationType — id, name, client_id
- ParticipantType — id, name, client_id
- Group — id, name
- TrainingRoom — id, name, work_site_id, client_id
- CourseSession — id, session_date, start_time, end_time, course_id, client_id
- CourseParticipant — id, course_id, person_id, client_id, final_exams[], performance_evaluation_details[]
- CourseSessionParticipant — id, course_session_id, person_id, client_id
- CourseParticipantFinalExam — id, exam_date, organized_by, course_participant_id, documentation_id, exam_score, client_id
- Documentation — id, name, file_path, documentation_type_id, learning_subject_id, path_grade_subject_id, path_grade_subject_term_id, course_id, course_session_id, client_id
- DocumentationType — id, name, client_id
- PerformanceEvaluationCategory — id, name, client_id
- PerformanceEvaluationItem — id, name, minimum_score, maximum_score, client_id
- PerformanceEvaluationParticipantCategory — id, participant_type_id, performance_evaluation_category_id, client_id, items[]
- PerformanceEvaluationParticipantCategoryItem — id, performance_evaluation_participant_category_id, performance_evaluation_item_id, client_id
- PerformanceEvaluationCourseDetail — id, course_id, score, notes, entered_by, entered_at, performance_evaluation_participant_category_item_id, client_id
- PerformanceEvaluationCourseParticipantDetail — id, course_participant_id, score, notes, entered_by, entered_at, performance_evaluation_participant_category_item_id, client_id
- PathGradeCandidate — id, person_id, path_grade_id, term_id, final_evaluation_id, client_id
`;

const arDict = {
  name: 'الاسم / الوصف',
  code: 'الكود (Code)',
  address: 'العنوان',
  country_id: 'الدولة',
  governorate_id: 'المحافظة',
  organization_type_id: 'نوع الجهة',
  organization_id: 'الجهة',
  work_group_id: 'مجموعة العمل',
  work_center_id: 'مركز العمل',
  work_site_id: 'موقع العمل',
  department_id: 'الإدارة',
  qualification_type_id: 'نوع المؤهل',
  qualification_id: 'المؤهل',
  job_id: 'الوظيفة',
  grade_id: 'الدرجة',
  grade_interval: 'المدة البينية',
  learning_path_id: 'المسار التدريبي',
  learning_subject_id: 'الموضوع التدريبي',
  learning_term_id: 'الترم التدريبي',
  term_id: 'الترم',
  path_grade_id: 'مرحلة المسار (Path Grade)',
  path_grade_subjects_id: 'مادة درجة المسار',
  notes: 'ملاحظات',
  evaluation_type_id: 'نوع التقييم',
  participant_type_id: 'نوع المشارك',
  performance_evaluation_category_id: 'فئة تقييم الأداء',
  performance_evaluation_item_id: 'عنصر تقييم الأداء',
  performance_evaluation_participant_category_id: 'فئة مشارك التقييم',
  performance_evaluation_participant_category_item_id: 'عنصر الفئة',
  minimum_score: 'الحد الأدنى',
  maximum_score: 'الحد الأقصى',
  score: 'الدرجة',
  entered_by: 'تم الإدخال بواسطة',
  entered_at: 'تاريخ الإدخال',
  file_path: 'مسار الملف',
  documentation_type_id: 'نوع الوثيقة',
  documentation_id: 'الوثيقة',
  course_id: 'الدورة التدريبية',
  course_session_id: 'الجلسة التدريبية',
  course_participant_id: 'المشارك',
  person_id: 'الشخص / الموظف',
  final_evaluation_id: 'التقييم النهائي',
  exam_date: 'تاريخ الاختبار',
  organized_by: 'نظم بواسطة',
  exam_score: 'درجة الاختبار',
  session_date: 'تاريخ الجلسة',
  start_time: 'وقت البدء',
  end_time: 'وقت الانتهاء',
  duration_in_days: 'المدة (بالأيام)',
};

function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function getRouteAndHookInfo(field) {
  let target = field.replace('_id', '');
  
  if (target === 'trainer_certifying_organization') target = 'organization';
  if (target === 'funding_organization') target = 'organization';
  if (target === 'planned') target = 'course';
  if (target === 'term') target = 'learning_term';
  if (target === 'path_grade_subjects') target = 'path_grade_subject';
  
  let folderName = target.replace(/_/g, '-');
  if (folderName.endsWith('y') && folderName !== 'category') folderName = folderName.slice(0, -1) + 'ies';
  else if (folderName.endsWith('category')) folderName = folderName.slice(0, -1) + 'ies';
  else folderName += 's';

  if (target === 'person') folderName = 'persons';
  if (target === 'room') folderName = 'rooms';

  const camelTarget = target.replace(/_([a-z])/g, g => g[1].toUpperCase());
  let hookName = 'use' + camelTarget.charAt(0).toUpperCase() + camelTarget.slice(1) + 's';

  if (target === 'person') hookName = 'usePersons';

  return { folderName, hookName };
}

const lines = modelsDoc.trim().split('\n');
const basePath = path.join(process.cwd(), 'src', 'features');

lines.forEach(line => {
  if (!line.trim() || !line.includes('—')) return;
  const parts = line.split('—');
  const typeName = parts[0].replace('-', '').trim();
  const fields = parts[1].split(',').map(f => f.trim());
  
  // Skip Person and Course as they are handcrafted
  if (typeName === 'Person' || typeName === 'Course') return;

  let folderName = toKebabCase(typeName);
  if (folderName.endsWith('y') && folderName !== 'category') folderName = folderName.slice(0, -1) + 'ies';
  else if (folderName.endsWith('category')) folderName = folderName.slice(0, -1) + 'ies';
  else folderName += 's';
  
  if (typeName === 'TrainingRoom') folderName = 'rooms';

  let imports = `import { useNavigate, Link } from 'react-router-dom';\nimport { useForm } from 'react-hook-form';\nimport { zodResolver } from '@hookform/resolvers/zod';\nimport { z } from 'zod';\nimport { Button } from '../../../shared/components/Button';\nimport { Input } from '../../../shared/components/Input';\nimport { Select } from '../../../shared/components/Select';\nimport { useCreate${typeName}Mutation } from '../api/useCreateMutation';\n\n`;

  let zodFields = "";
  let formInputs = "";
  let hooksCode = "";

  fields.forEach(field => {
    if (field === 'id' || field === 'client_id' || field.endsWith('[]')) return;

    const label = arDict[field] || field;

    let zType = "z.string().min(1, 'هذا الحقل مطلوب')";
    if (field.endsWith('_id') || field.includes('score') || field.includes('number_of') || field.includes('cost')) {
      zType = "z.coerce.number()";
    } else if (field.startsWith('is_')) {
      zType = "z.boolean().optional()";
    }

    zodFields += `  ${field}: ${zType},\n`;

    if (field.endsWith('_id')) {
      const { folderName: relFolder, hookName: relHook } = getRouteAndHookInfo(field);
      // Don't import from self to avoid circular or weird paths if it references same table
      if (relFolder !== folderName) {
         imports += `import { ${relHook} } from '../../${relFolder}/api/useListQuery';\n`;
      } else {
         imports += `import { ${relHook} } from '../api/useListQuery';\n`;
      }
      
      hooksCode += `  const { data: data${relHook}, isLoading: loading${relHook} } = ${relHook}();\n`;
      
      formInputs += `        <Select 
          label="${label} *" 
          error={errors.${field}?.message as string} 
          isLoading={loading${relHook}}
          options={data${relHook}?.map((item: any) => ({ value: item.id, label: item.name || item.code || item.id.toString() })) || []} 
          {...register('${field}')} 
        />\n`;
    } else if (field.startsWith('is_')) {
      formInputs += `        <label style={{ display: 'flex', gap: '10px', alignItems: 'center', fontWeight: 'bold' }}>
          <input type="checkbox" style={{ transform: 'scale(1.5)' }} {...register('${field}')} />
          ${label}
        </label>\n`;
    } else {
      let iType = 'text';
      if (field.includes('date')) iType = 'date';
      else if (field.includes('time')) iType = 'time';
      else if (zType.includes('number')) iType = 'number';

      formInputs += `        <Input 
          label="${label} *" 
          type="${iType}" 
          error={errors.${field}?.message as string} 
          {...register('${field}')} 
        />\n`;
    }
  });

  const formComponentContent = `${imports}
const schema = z.object({
${zodFields}
});

type FormInputs = z.infer<typeof schema>;

export function ${typeName}Create() {
  const navigate = useNavigate();
  const mutation = useCreate${typeName}Mutation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

${hooksCode}
  const onSubmit = (data: FormInputs) => {
    mutation.mutate(data, { onSuccess: () => navigate('/${folderName}') });
  };

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '40px auto', backgroundColor: '#fdfdfd', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '2px solid #eaeaea', paddingBottom: '15px' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>إضافة ${typeName} جديد</h2>
        <Link to="/${folderName}"><Button>العودة للقائمة</Button></Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
${formInputs}
        <div style={{ gridColumn: '1 / -1', marginTop: '20px' }}>
          <Button type="submit" isLoading={mutation.isPending} style={{ width: '100%', padding: '15px', fontSize: '18px', backgroundColor: '#27ae60' }}>
            حفظ البيانات
          </Button>
        </div>
      </form>
    </div>
  );
}
`;
  
  const targetPath = path.join(basePath, folderName, 'components', 'Create.tsx');
  if (fs.existsSync(path.dirname(targetPath))) {
    fs.writeFileSync(targetPath, formComponentContent);
    console.log(`Smart Form Generated: ${typeName}`);
  }
});
