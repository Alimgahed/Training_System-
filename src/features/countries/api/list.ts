import { apiClient } from '../../../core/api/apiClient';
import type { Country } from '../types';

export const getCountrys = async (signal?: AbortSignal): Promise<Country[]> => {
  const response = await apiClient.get<Country[]>('/countries', { signal });
  return response.data;
};
