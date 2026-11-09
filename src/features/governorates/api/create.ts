import { apiClient } from '../../../core/api/apiClient';
import type { Governorate } from '../types';

export const createGovernorate = async (data: Partial<Governorate>): Promise<Governorate> => {
  const response = await apiClient.post<Governorate>("/new-governorate", data);
  return response.data;
};
