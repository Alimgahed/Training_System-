import { apiClient } from '../../../core/api/apiClient';
import type { CourseParticipantFinalExam } from '../types';

export const getCourseParticipantFinalExams = async (): Promise<CourseParticipantFinalExam[]> => {
  const response = await apiClient.get<CourseParticipantFinalExam[]>('/course-participant-final-exams');
  return response.data;
};
