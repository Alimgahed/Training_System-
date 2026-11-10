import { apiClient } from '../../../core/api/apiClient';
import type { Grade } from '../types';

export const getGrades = async (signal?: AbortSignal): Promise<Grade[]> => {
  const response = await apiClient.get<Grade[]>('/grades', { signal });
  return response.data;
};
