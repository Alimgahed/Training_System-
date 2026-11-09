import { apiClient } from '../../../core/api/apiClient';
import type { Country } from '../types';

export const createCountry = async (data: Partial<Country>): Promise<Country> => {
  const response = await apiClient.post<Country>("/new-country", data);
  return response.data;
};
