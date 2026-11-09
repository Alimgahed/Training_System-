import { apiClient } from '../../../core/api/apiClient';
import type { WorkGroup } from '../types';

export const getWorkGroup = async (id: string | number): Promise<WorkGroup> => {
  const response = await apiClient.get<WorkGroup>('/work-group/' + id);
  return response.data;
};
