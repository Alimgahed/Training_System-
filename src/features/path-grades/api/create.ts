import { apiClient } from '../../../core/api/apiClient';
import type { PathGrade } from '../types';

export const createPathGrade = async (data: Partial<PathGrade>): Promise<PathGrade> => {
  const response = await apiClient.post<PathGrade>("/new-path-grade", data);
  return response.data;
};
