export interface Documentation {
  id?: number;
  name?: string | null;
  file_path?: string | null;
  documentation_type_id?: number;
  learning_subject_id?: number;
  path_grade_subject_id?: number;
  path_grade_subject_term_id?: number;
  course_id?: number;
  course_session_id?: number;
  client_id?: number;
  [key: string]: any;
}
