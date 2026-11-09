import { apiClient } from '../../../core/api/apiClient';
import type { CourseSession } from '../types';

export const getCourseSessions = async (): Promise<CourseSession[]> => {
  const response = await apiClient.get<CourseSession[]>('/course-sessions');
  return response.data;
};
