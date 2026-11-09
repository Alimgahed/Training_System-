import { apiClient } from '../../../core/api/apiClient';
import type { Job } from '../types';

export const getJob = async (id: string | number): Promise<Job> => {
  const response = await apiClient.get<Job>('/job/' + id);
  return response.data;
};
