import { apiClient } from '../../../core/api/apiClient';
import type { Department } from '../types';

export const getDepartments = async (): Promise<Department[]> => {
  const response = await apiClient.get<Department[]>('/departments');
  return response.data;
};
