import { apiClient } from '../../../core/api/apiClient';
import type { Job } from '../types';

export const createJob = async (data: Partial<Job>): Promise<Job> => {
  const response = await apiClient.post<Job>("/new-job", data);
  return response.data;
};
