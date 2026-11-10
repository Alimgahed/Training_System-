import { apiClient } from '../../../core/api/apiClient';
import type { Governorate } from '../types';

export const getGovernorate = async (id: string | number, signal?: AbortSignal): Promise<Governorate> => {
  const response = await apiClient.get<Governorate>('/governorate/' + id, { signal });
  return response.data;
};
