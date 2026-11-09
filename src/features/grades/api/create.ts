import { apiClient } from '../../../core/api/apiClient';
import type { Grade } from '../types';

export const createGrade = async (data: Partial<Grade>): Promise<Grade> => {
  const response = await apiClient.post<Grade>("/new-grade", data);
  return response.data;
};
