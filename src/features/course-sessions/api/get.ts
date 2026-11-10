import { apiClient } from '../../../core/api/apiClient';
import type { CourseSession } from '../types';

export const getCourseSession = async (id: string | number, signal?: AbortSignal): Promise<CourseSession> => {
  const response = await apiClient.get<CourseSession>('/course-session/' + id, { signal });
  return response.data;
};
