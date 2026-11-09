import { apiClient } from '../../../core/api/apiClient';
import type { WorkSite } from '../types';

export const createWorkSite = async (data: Partial<WorkSite>): Promise<WorkSite> => {
  const response = await apiClient.post<WorkSite>("/new-work-site", data);
  return response.data;
};
