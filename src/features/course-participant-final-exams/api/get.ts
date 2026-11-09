import { apiClient } from '../../../core/api/apiClient';
import type { CourseParticipantFinalExam } from '../types';

export const getCourseParticipantFinalExam = async (id: string | number): Promise<CourseParticipantFinalExam> => {
  const response = await apiClient.get<CourseParticipantFinalExam>('/course-participant-final-exam/' + id);
  return response.data;
};
