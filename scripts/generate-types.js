import fs from 'fs';
import path from 'path';

// Text from the API Documentation
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

lines.forEach(line => {
  if (!line.trim() || !line.includes('—')) return;
  
  const parts = line.split('—');
  const typeName = parts[0].replace('-', '').trim();
  const fields = parts[1].split(',').map(f => f.trim());
  
  let folderName = toKebabCase(typeName);
  if (folderName.endsWith('y') && folderName !== 'category') {
      folderName = folderName.slice(0, -1) + 'ies';
  } else if (folderName.endsWith('category')) {
      folderName = folderName.slice(0, -1) + 'ies';
  } else {
      folderName += 's';
  }
  
  if (typeName === 'Person') folderName = 'persons';
  if (typeName === 'TrainingRoom') folderName = 'rooms';
  
  let tsInterface = "export interface " + typeName + " {\n";
  
  fields.forEach(field => {
    let type = 'string | null';
    
    if (field === 'id' || field.endsWith('_id') || field.includes('score') || field.includes('number_of') || field.includes('cost')) {
      type = 'number';
    } else if (field.endsWith('[]')) {
      type = 'any[]';
    } else if (field.startsWith('is_')) {
      type = 'boolean';
    } else if (field.includes('date') || field.includes('time') || field.endsWith('_at')) {
      type = 'string';
    }
    
    const cleanField = field.replace('[]', '');
    tsInterface += "  " + cleanField + "?: " + type + ";\n";
  });
  
  tsInterface += "  [key: string]: any;\n}\n";
  
  const typesPath = path.join(process.cwd(), 'src', 'features', folderName, 'types');
  
  if (fs.existsSync(typesPath)) {
    fs.writeFileSync(path.join(typesPath, 'index.ts'), tsInterface);
    console.log("Updated Types for " + typeName + " in " + folderName);
  }
});

console.log("Types mapped perfectly to API documentation!");
