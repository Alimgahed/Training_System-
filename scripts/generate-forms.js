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
- Person — id, code, name, governorate_id, address, telephone_whatsapp, qualification_id, job_id, organization_id, department_id, work_site_id, job_type_group_id, current_learning_path_id, current_grade_id, date_of_current_grade, contract_date, is_active, is_trainer, trainer_certifying_organization_id, user_name, group_id, client_id
- UserSummary — id, code, name, username, group_id, is_active
- PathGradeCandidate — id, person_id, path_grade_id, term_id, final_evaluation_id, client_id
- Course — id, name, path_grade_subject_id, path_grade_subject_term_id, learning_subject_id, duration_in_days, starting_date, end_date, number_of_internal_participants, number_of_external_participants, room_id, funding_organization_id, trainer_id, backup_trainer_id, coordinator_id, cost, is_planned, is_executed, planned_id, client_id, sessions[], documentations[], participants[]
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
`;

function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

const lines = modelsDoc.trim().split('\n');
const basePath = path.join(process.cwd(), 'src', 'features');

let routerImports = "import { createBrowserRouter } from 'react-router-dom';\nimport { Dashboard } from './Dashboard';\n";
let routerRoutes = "";

lines.forEach(line => {
  if (!line.trim() || !line.includes('—')) return;
  
  const parts = line.split('—');
  const typeName = parts[0].replace('-', '').trim();
  const fields = parts[1].split(',').map(f => f.trim());
  
  let folderName = toKebabCase(typeName);
  if (folderName.endsWith('y') && folderName !== 'category') folderName = folderName.slice(0, -1) + 'ies';
  else if (folderName.endsWith('category')) folderName = folderName.slice(0, -1) + 'ies';
  else folderName += 's';
  
  if (typeName === 'Person') folderName = 'persons';
  if (typeName === 'TrainingRoom') folderName = 'rooms';

  // 1. Generate API Create call
  const apiPath = path.join(basePath, folderName, 'api');
  if (!fs.existsSync(apiPath)) return; // Skip if folder doesn't exist

  const createApiContent = `import { apiClient } from '../../../core/api/apiClient';
import type { ${typeName} } from '../types';

// Depending on the API, some use /new-[singular] and some use POST /[plural]
// We use a generic POST endpoint. You can adjust the URL manually if it diverges.
export const create${typeName} = async (data: Partial<${typeName}>): Promise<${typeName}> => {
  const response = await apiClient.post<${typeName}>('/' + '${folderName}', data);
  return response.data;
};
`;
  fs.writeFileSync(path.join(apiPath, 'create.ts'), createApiContent);

  // 2. Generate React Query Mutation Hook
  const mutationHookContent = `import { useMutation, useQueryClient } from '@tanstack/react-query';
import { create${typeName} } from './create';

export const useCreate${typeName}Mutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: create${typeName},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${folderName}'] });
    },
  });
};
`;
  fs.writeFileSync(path.join(apiPath, `useCreateMutation.ts`), mutationHookContent);

  // 3. Generate Zod Schema and UI Form
  let zodFields = "";
  let formInputs = "";

  fields.forEach(field => {
    if (field === 'id' || field === 'client_id' || field.endsWith('[]')) return;

    const cleanField = field.replace('[]', '');
    let zType = "z.string().min(1, 'هذا الحقل مطلوب')";
    let inputType = "text";
    
    if (field.endsWith('_id') || field.includes('score') || field.includes('number_of') || field.includes('cost')) {
      zType = "z.coerce.number()"; // Using coerce to auto-convert string inputs to numbers
      inputType = "number";
    } else if (field.startsWith('is_')) {
      zType = "z.boolean().optional()";
      inputType = "checkbox";
    }

    zodFields += `  ${cleanField}: ${zType},\n`;

    if (inputType === 'checkbox') {
      formInputs += `        <label style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input type="checkbox" {...register('${cleanField}')} />
          ${cleanField}
        </label>\n`;
    } else {
      formInputs += `        <Input 
          label="${cleanField}" 
          type="${inputType}" 
          error={errors.${cleanField}?.message as string} 
          {...register('${cleanField}')} 
        />\n`;
    }
  });

  const formComponentContent = `import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { useCreate${typeName}Mutation } from '../api/useCreateMutation';

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

  const onSubmit = (data: FormInputs) => {
    mutation.mutate(data, {
      onSuccess: () => navigate('/${folderName}')
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>إضافة ${typeName} جديد</h2>
        <Link to="/${folderName}"><Button>العودة للقائمة</Button></Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
${formInputs}
        <Button type="submit" isLoading={mutation.isPending}>حفظ البيانات</Button>
      </form>
    </div>
  );
}
`;
  
  const componentsPath = path.join(basePath, folderName, 'components');
  fs.writeFileSync(path.join(componentsPath, 'Create.tsx'), formComponentContent);

  // 4. Modify List.tsx to add "Add New" button
  const listPath = path.join(componentsPath, 'List.tsx');
  if (fs.existsSync(listPath)) {
    let listContent = fs.readFileSync(listPath, 'utf8');
    // Inject Add button next to Back button
    listContent = listContent.replace(
      '<Link to="/"><Button>العودة للرئيسية</Button></Link>',
      `<Link to="/"><Button>العودة للرئيسية</Button></Link>
        <Link to="/${folderName}/new"><Button variant="primary">إضافة جديد</Button></Link>`
    );
    fs.writeFileSync(listPath, listContent);
  }

  // 5. Build Router Strings
  routerImports += `import { ${typeName}List } from '../features/${folderName}/components/List';\n`;
  routerImports += `import { ${typeName}Detail } from '../features/${folderName}/components/Detail';\n`;
  routerImports += `import { ${typeName}Create } from '../features/${folderName}/components/Create';\n`;
  
  routerRoutes += `  { path: '/${folderName}', element: <${typeName}List /> },\n`;
  routerRoutes += `  { path: '/${folderName}/new', element: <${typeName}Create /> },\n`;
  routerRoutes += `  { path: '/${folderName}/:id', element: <${typeName}Detail /> },\n`;

  console.log(`Generated Forms for ${typeName}`);
});

// Write updated router.tsx
const routerContent = `${routerImports}

export const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
${routerRoutes}
]);
`;
fs.writeFileSync(path.join(process.cwd(), 'src', 'app', 'router.tsx'), routerContent);

console.log("All create forms, APIs, and routes generated perfectly!");
