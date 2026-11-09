import { apiClient } from '../../../core/api/apiClient';
import type { Organization } from '../types';

export const createOrganization = async (data: Partial<Organization>): Promise<Organization> => {
  const response = await apiClient.post<Organization>("/new-organization", data);
  return response.data;
};
