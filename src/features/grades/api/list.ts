import { apiClient } from '../../../core/api/apiClient';
import type { Grade } from '../types';

export const getGrades = async (): Promise<Grade[]> => {
  const response = await apiClient.get<Grade[]>('/grades');
  return response.data;
};
