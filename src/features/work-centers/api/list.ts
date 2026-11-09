import { apiClient } from '../../../core/api/apiClient';
import type { WorkCenter } from '../types';

export const getWorkCenters = async (): Promise<WorkCenter[]> => {
  const response = await apiClient.get<WorkCenter[]>('/work-centers');
  return response.data;
};
