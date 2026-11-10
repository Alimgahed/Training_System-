import { apiClient } from '../../../core/api/apiClient';
import type { Department } from '../types';

export const getDepartments = async (signal?: AbortSignal): Promise<Department[]> => {
  const response = await apiClient.get<Department[]>('/departments', { signal });
  return response.data;
};
