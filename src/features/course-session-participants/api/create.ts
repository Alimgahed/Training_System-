import { apiClient } from '../../../core/api/apiClient';
import type { CourseSessionParticipant } from '../types';

export const createCourseSessionParticipant = async (data: Partial<CourseSessionParticipant>): Promise<CourseSessionParticipant> => {
  const response = await apiClient.post<CourseSessionParticipant>('/new-course-session-participant', data);
  return response.data;
};
