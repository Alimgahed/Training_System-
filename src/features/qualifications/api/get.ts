import { apiClient } from '../../../core/api/apiClient';
import type { Qualification } from '../types';

export const getQualification = async (id: string | number): Promise<Qualification> => {
  const response = await apiClient.get<Qualification>('/qualification/' + id);
  return response.data;
};
