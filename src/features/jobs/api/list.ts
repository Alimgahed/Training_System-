import { apiClient } from '../../../core/api/apiClient';
import type { Job } from '../types';

export const getJobs = async (): Promise<Job[]> => {
  const response = await apiClient.get<Job[]>('/jobs');
  return response.data;
};
