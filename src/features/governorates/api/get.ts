import { apiClient } from '../../../core/api/apiClient';
import type { Governorate } from '../types';

export const getGovernorate = async (id: string | number): Promise<Governorate> => {
  const response = await apiClient.get<Governorate>('/governorate/' + id);
  return response.data;
};
