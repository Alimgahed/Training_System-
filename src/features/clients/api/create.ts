import { apiClient } from '../../../core/api/apiClient';
import type { Client } from '../types';

// Depending on the API, some use /new-[singular] and some use POST /[plural]
// We use a generic POST endpoint. You can adjust the URL manually if it diverges.
export const createClient = async (data: Partial<Client>): Promise<Client> => {
  const response = await apiClient.post<Client>('/' + 'clients', data);
  return response.data;
};
