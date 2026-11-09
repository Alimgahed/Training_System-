import { apiClient } from '../../../core/api/apiClient';
import type { WorkGroup } from '../types';

// Depending on the API, some use /new-[singular] and some use POST /[plural]
// We use a generic POST endpoint. You can adjust the URL manually if it diverges.
export const createWorkGroup = async (data: Partial<WorkGroup>): Promise<WorkGroup> => {
  const response = await apiClient.post<WorkGroup>('/' + 'work-groups', data);
  return response.data;
};
