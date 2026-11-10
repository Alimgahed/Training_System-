import { apiClient } from '../../../core/api/apiClient';
import type { CourseSession } from '../types';

export const getCourseSessions = async (signal?: AbortSignal): Promise<CourseSession[]> => {
  const response = await apiClient.get<CourseSession[]>('/course-sessions', { signal });
  return response.data;
};
