import { apiClient } from '../../../core/api/apiClient';
import type { OrganizationType } from '../types';

export const getOrganizationTypes = async (): Promise<OrganizationType[]> => {
  const response = await apiClient.get<OrganizationType[]>('/organization-types');
  return response.data;
};
