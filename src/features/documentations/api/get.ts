import { apiClient } from '../../../core/api/apiClient';
import type { Documentation } from '../types';

export const getDocumentation = async (id: string | number, signal?: AbortSignal): Promise<Documentation> => {
  const response = await apiClient.get<Documentation>('/documentation/' + id, { signal });
  return response.data;
};
