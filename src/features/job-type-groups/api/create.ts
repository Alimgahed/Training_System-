import { apiClient } from '../../../core/api/apiClient';
import type { JobTypeGroup } from '../types';

// Depending on the API, some use /new-[singular] and some use POST /[plural]
// We use a generic POST endpoint. You can adjust the URL manually if it diverges.
export const createJobTypeGroup = async (data: Partial<JobTypeGroup>): Promise<JobTypeGroup> => {
  const response = await apiClient.post<JobTypeGroup>('/' + 'job-type-groups', data);
  return response.data;
};
