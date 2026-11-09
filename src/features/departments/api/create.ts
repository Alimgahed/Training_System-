import { apiClient } from '../../../core/api/apiClient';
import type { Department } from '../types';

export const createDepartment = async (data: Partial<Department>): Promise<Department> => {
  const response = await apiClient.post<Department>("/new-department", data);
  return response.data;
};
