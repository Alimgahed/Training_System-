import { apiClient } from '../../../core/api/apiClient';
import type { CourseSession } from '../types';

export const createCourseSession = async (data: Partial<CourseSession>): Promise<CourseSession> => {
  const response = await apiClient.post<CourseSession>('/new-course-session', data);
  return response.data;
};
