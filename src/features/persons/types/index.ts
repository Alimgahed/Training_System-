export interface PersonRelation {
  id?: number;
  code?: string | number | null;
  name?: string | null;
  [key: string]: any;
}

export interface Person {
  id?: number;
  code?: string | null;
  name?: string | null;

  governorate_id?: number;
  governorate?: PersonRelation | null;

  address?: string | null;
  telephone_whatsapp?: string | null;

  qualification_id?: number;
  qualification?: PersonRelation | null;

  job_id?: number | null;
  job?: PersonRelation | null;

  organization_id?: number;
  organization?: PersonRelation | null;

  department_id?: number | null;
  department?: PersonRelation | null;

  work_site_id?: number | null;
  work_site?: PersonRelation | null;

  job_type_group?: number | null;
  job_type_group_id?: number | null;
  job_type_group_data?: PersonRelation | null;

  current_learning_path_id?: number | null;
  current_learning_path?: PersonRelation | null;

  current_grade?: number | null;
  current_grade_id?: number | null;
  current_grade_data?: PersonRelation | null;

  date_of_current_grade?: string | null;
  contract_date?: string | null;

  is_active?: boolean;
  is_trainer?: boolean;

  trainer_certifying_organization_id?: number | null;
  trainer_certifying_organization?: PersonRelation | null;

  user_name?: string | null;
  group_id?: number | null;

  client_id?: number;
  client?: PersonRelation | null;

  trainer_subjects?: any[];
  coordinated_courses?: any[];
  trainer_courses?: any[];
  backup_trainer_courses?: any[];
  course_participants?: any[];
  [key: string]: any;
}

export interface CreatePersonRequest {
  code?: string | null;
  name: string;
  governorate_id: number;
  address?: string | null;
  telephone_whatsapp?: string | null;
  qualification_id: number;
  job_id?: number | null;
  organization_id: number;
  department_id?: number | null;
  work_site_id?: number | null;
  job_type_group_id?: number | null;
  current_learning_path_id?: number | null;
  current_grade_id?: number | null;
  date_of_current_grade?: string | null;
  contract_date?: string | null;
  is_trainer: boolean;
  trainer_certifying_organization_id?: number | null;
}
