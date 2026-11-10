import { apiClient } from '../../../core/api/apiClient';
import type { Grade } from '../types';

export const getGrade = async (id: string | number, signal?: AbortSignal): Promise<Grade> => {
  const response = await apiClient.get<Grade>('/grade/' + id, { signal });
  return response.data;
};
