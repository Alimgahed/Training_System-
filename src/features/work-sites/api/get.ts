import { apiClient } from '../../../core/api/apiClient';
import type { WorkSite } from '../types';

export const getWorkSite = async (id: string | number): Promise<WorkSite> => {
  const response = await apiClient.get<WorkSite>('/work-site/' + id);
  return response.data;
};
