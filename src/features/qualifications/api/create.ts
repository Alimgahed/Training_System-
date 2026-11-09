import { apiClient } from '../../../core/api/apiClient';
import type { Qualification } from '../types';

export const createQualification = async (data: Partial<Qualification>): Promise<Qualification> => {
  const response = await apiClient.post<Qualification>("/new-qualification", data);
  return response.data;
};
