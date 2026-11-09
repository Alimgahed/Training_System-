import { apiClient } from '../../../core/api/apiClient';
import type { JobTypeGroup } from '../types';

export const getJobTypeGroups = async (): Promise<JobTypeGroup[]> => {
  const response = await apiClient.get<JobTypeGroup[]>('/job-type-groups');
  return response.data;
};
