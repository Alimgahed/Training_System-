import { apiClient } from '../../../core/api/apiClient';
import type { CourseSession } from '../types';

export const getCourseSession = async (id: string | number): Promise<CourseSession> => {
  const response = await apiClient.get<CourseSession>('/course-session/' + id);
  return response.data;
};
