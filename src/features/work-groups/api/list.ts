import { apiClient } from '../../../core/api/apiClient';
import type { WorkGroup } from '../types';

export const getWorkGroups = async (): Promise<WorkGroup[]> => {
  const response = await apiClient.get<WorkGroup[]>('/work-groups');
  return response.data;
};
