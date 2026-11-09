import { apiClient } from '../../../core/api/apiClient';
import type { Organization } from '../types';

export const getOrganizations = async (): Promise<Organization[]> => {
  const response = await apiClient.get<Organization[]>('/organizations');
  return response.data;
};
