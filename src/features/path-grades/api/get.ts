import { apiClient } from '../../../core/api/apiClient';
import type { PathGrade } from '../types';

export const getPathGrade = async (id: string | number): Promise<PathGrade> => {
  const response = await apiClient.get<PathGrade>('/path-grade/' + id);
  return response.data;
};
