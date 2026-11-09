import { apiClient } from '../../../core/api/apiClient';
import type { Qualification } from '../types';

export const getQualifications = async (): Promise<Qualification[]> => {
  const response = await apiClient.get<Qualification[]>('/qualifications');
  return response.data;
};
