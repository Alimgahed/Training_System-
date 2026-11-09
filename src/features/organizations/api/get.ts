import { apiClient } from '../../../core/api/apiClient';
import type { Organization } from '../types';

export const getOrganization = async (id: string | number): Promise<Organization> => {
  const response = await apiClient.get<Organization>('/organization/' + id);
  return response.data;
};
