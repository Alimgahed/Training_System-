export interface CreateCourseRequest {
  name: string;
  duration_in_days: number;
  starting_date: string;
  end_date?: string;
  path_grade_subject_id?: number;
  path_grade_subject_term_id?: number;
  learning_subject_id?: number;
  number_of_internal_participants: number | null;
  number_of_external_participants: number | null;
  room_id: number;
  trainer_id: number;
  funding_organization_id: number | null;
  backup_trainer_id: number | null;
  coordinator_id: number | null;
  cost: string;
  is_planned: boolean;
  is_executed: boolean;
  planned_id?: number;
}

export interface Course {
  id?: number;
  name?: string | null;
  path_grade_subject_id?: number;
  path_grade_subject_term_id?: number;
  learning_subject_id?: number;
  duration_in_days?: number | null;
  starting_date?: string;
  end_date?: string;
  number_of_internal_participants?: number;
  number_of_external_participants?: number;
  room_id?: number;
  funding_organization_id?: number;
  trainer_id?: number;
  backup_trainer_id?: number;
  coordinator_id?: number;
  cost?: number;
  is_planned?: boolean;
  is_executed?: boolean;
  planned_id?: number;
  client_id?: number;
  sessions?: any[];
  documentations?: any[];
  participants?: any[];
  [key: string]: any;
}
