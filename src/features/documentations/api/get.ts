import { apiClient } from '../../../core/api/apiClient';
import type { Documentation } from '../types';

export const getDocumentation = async (id: string | number): Promise<Documentation> => {
  const response = await apiClient.get<Documentation>('/documentation/' + id);
  return response.data;
};
