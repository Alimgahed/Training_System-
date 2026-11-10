import { apiClient } from '../../../core/api/apiClient';
import type { Organization } from '../types';

export const getOrganizations = async (signal?: AbortSignal): Promise<Organization[]> => {
  const response = await apiClient.get<Organization[]>('/organizations', { signal });
  return response.data;
};
