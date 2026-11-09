import { apiClient } from '../../../core/api/apiClient';
import type { OrganizationType } from '../types';

export const getOrganizationType = async (id: string | number): Promise<OrganizationType> => {
  const response = await apiClient.get<OrganizationType>('/organization-type/' + id);
  return response.data;
};
