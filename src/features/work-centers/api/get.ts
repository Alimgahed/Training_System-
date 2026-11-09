import { apiClient } from '../../../core/api/apiClient';
import type { WorkCenter } from '../types';

export const getWorkCenter = async (id: string | number): Promise<WorkCenter> => {
  const response = await apiClient.get<WorkCenter>('/work-center/' + id);
  return response.data;
};
