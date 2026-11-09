import { apiClient } from '../../../core/api/apiClient';
import type { WorkSite } from '../types';

export const getWorkSites = async (): Promise<WorkSite[]> => {
  const response = await apiClient.get<WorkSite[]>('/work-sites');
  return response.data;
};
