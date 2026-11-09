export interface CourseSessionParticipant {
  id?: number;
  course_session_id?: number;
  course_participant_id?: number;
  course_participant?: {
    id?: number;
    course_id?: number;
    person?: { id?: number; name?: string; code?: string };
  };
  client_id?: number;
}

export type CourseSessionParticipantRequest = Pick<CourseSessionParticipant, 'course_session_id' | 'course_participant_id'>;
