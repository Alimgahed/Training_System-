import { apiClient } from '../../../core/api/apiClient';
import type { CourseParticipantFinalExam } from '../types';

export const getCourseParticipantFinalExams = async (signal?: AbortSignal): Promise<CourseParticipantFinalExam[]> => {
  const response = await apiClient.get<CourseParticipantFinalExam[]>('/course-participant-final-exams', { signal });
  return response.data;
};
