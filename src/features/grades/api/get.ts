import { apiClient } from '../../../core/api/apiClient';
import type { Grade } from '../types';

export const getGrade = async (id: string | number): Promise<Grade> => {
  const response = await apiClient.get<Grade>('/grade/' + id);
  return response.data;
};
