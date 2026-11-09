import { apiClient } from '../../../core/api/apiClient';
import type { Documentation } from '../types';

export const createDocumentation = async (data: Partial<Documentation>): Promise<Documentation> => {
  const response = await apiClient.post<Documentation>("/new-documentation", data);
  return response.data;
};
