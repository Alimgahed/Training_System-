import { apiClient } from '../../../core/api/apiClient';
import type { WorkCenter } from '../types';

export const createWorkCenter = async (data: Partial<WorkCenter>): Promise<WorkCenter> => {
  const response = await apiClient.post<WorkCenter>("/new-work-center", data);
  return response.data;
};
