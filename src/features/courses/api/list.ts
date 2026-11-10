import { apiClient } from '../../../core/api/apiClient';
import type { Course } from '../types';

export const getCourses = async (signal?: AbortSignal): Promise<Course[]> => {
  const response = await apiClient.get<Course[]>('/courses', { signal });
  return response.data;
};
