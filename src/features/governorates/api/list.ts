import { apiClient } from '../../../core/api/apiClient';
import type { Governorate } from '../types';

export const getGovernorates = async (): Promise<Governorate[]> => {
  const response = await apiClient.get<Governorate[]>('/governorates');
  return response.data;
};
