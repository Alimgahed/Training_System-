import { apiClient } from '../../../core/api/apiClient';
import type { Course } from '../types';

export const getCourses = async (): Promise<Course[]> => {
  const response = await apiClient.get<Course[]>('/courses');
  return response.data;
};
