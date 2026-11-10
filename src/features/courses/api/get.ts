import { apiClient } from '../../../core/api/apiClient';
import type { Course } from '../types';

export const getCourse = async (id: string | number, signal?: AbortSignal): Promise<Course> => {
  const response = await apiClient.get<Course>('/course/' + id, { signal });
  return response.data;
};
