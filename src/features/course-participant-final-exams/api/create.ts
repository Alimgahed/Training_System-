import { apiClient } from '../../../core/api/apiClient';
import type { CourseParticipantFinalExam } from '../types';

// Depending on the API, some use /new-[singular] and some use POST /[plural]
// We use a generic POST endpoint. You can adjust the URL manually if it diverges.
export const createCourseParticipantFinalExam = async (data: Partial<CourseParticipantFinalExam>): Promise<CourseParticipantFinalExam> => {
  const response = await apiClient.post<CourseParticipantFinalExam>('/' + 'course-participant-final-exams', data);
  return response.data;
};
