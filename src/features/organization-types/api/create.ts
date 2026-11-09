import { apiClient } from '../../../core/api/apiClient';
import type { OrganizationType } from '../types';

export const createOrganizationType = async (data: Partial<OrganizationType>): Promise<OrganizationType> => {
  const response = await apiClient.post<OrganizationType>("/new-organization-type", data);
  return response.data;
};
