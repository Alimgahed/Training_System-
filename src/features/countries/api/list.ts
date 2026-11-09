import { apiClient } from '../../../core/api/apiClient';
import type { Country } from '../types';

export const getCountrys = async (): Promise<Country[]> => {
  const response = await apiClient.get<Country[]>('/countries');
  return response.data;
};
