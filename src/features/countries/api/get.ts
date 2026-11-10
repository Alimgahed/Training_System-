import { apiClient } from '../../../core/api/apiClient';
import type { Country } from '../types';

export const getCountry = async (id: string | number, signal?: AbortSignal): Promise<Country> => {
  const response = await apiClient.get<Country>('/country/' + id, { signal });
  return response.data;
};
