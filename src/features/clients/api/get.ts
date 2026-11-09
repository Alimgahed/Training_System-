import { apiClient } from '../../../core/api/apiClient';
import type { Client } from '../types';

export const getClient = async (id: string | number): Promise<Client> => {
  const response = await apiClient.get<Client>('/client/' + id);
  return response.data;
};
