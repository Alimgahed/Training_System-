import { apiClient } from '../../../core/api/apiClient';
import type { Department } from '../types';

export const getDepartment = async (id: string | number, signal?: AbortSignal): Promise<Department> => {
  const response = await apiClient.get<Department>('/department/' + id, { signal });
  return response.data;
};
