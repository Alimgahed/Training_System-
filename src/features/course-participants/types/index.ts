export interface CourseParticipant {
  id?: number;
  course_id?: number;
  person_id?: number;
  client_id?: number;
  final_exams?: any[];
  performance_evaluation_details?: any[];
  [key: string]: any;
}
