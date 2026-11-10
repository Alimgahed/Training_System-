import { apiClient } from '../../../core/api/apiClient';
import type { Governorate } from '../types';

export const getGovernorates = async (signal?: AbortSignal): Promise<Governorate[]> => {
  const response = await apiClient.get<Governorate[]>('/governorates', { signal });
  return response.data;
};
