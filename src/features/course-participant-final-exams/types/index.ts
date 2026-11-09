export interface CourseParticipantFinalExam {
  id?: number;
  exam_date?: string;
  organized_by?: string | null;
  course_participant_id?: number;
  documentation_id?: number;
  exam_score?: number;
  client_id?: number;
  [key: string]: any;
}
