import { apiClient } from '../../../core/api/apiClient';
import type { Country } from '../types';

export const getCountry = async (id: string | number): Promise<Country> => {
  const response = await apiClient.get<Country>('/country/' + id);
  return response.data;
};
