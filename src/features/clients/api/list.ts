import { apiClient } from '../../../core/api/apiClient';
import type { Client } from '../types';

export const getClients = async (): Promise<Client[]> => {
  const response = await apiClient.get<Client[]>('/clients');
  return response.data;
};
