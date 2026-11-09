import { apiClient } from '../../../core/api/apiClient';
import type { JobTypeGroup } from '../types';

export const getJobTypeGroup = async (id: string | number): Promise<JobTypeGroup> => {
  const response = await apiClient.get<JobTypeGroup>('/job-type-group/' + id);
  return response.data;
};
