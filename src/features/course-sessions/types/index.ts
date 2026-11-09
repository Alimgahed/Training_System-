export interface CourseSession {
  id?: number;
  session_date?: string;
  start_time?: string;
  end_time?: string;
  course_id?: number;
  client_id?: number;
  [key: string]: any;
}
