import { apiClient } from '../../../core/api/apiClient';
import type { Department } from '../types';

export const getDepartment = async (id: string | number): Promise<Department> => {
  const response = await apiClient.get<Department>('/department/' + id);
  return response.data;
};
