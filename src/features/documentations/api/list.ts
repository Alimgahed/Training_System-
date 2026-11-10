import { apiClient } from '../../../core/api/apiClient';
import type { Documentation } from '../types';

export const getDocumentations = async (signal?: AbortSignal): Promise<Documentation[]> => {
  const response = await apiClient.get<Documentation[]>('/documentations', { signal });
  return response.data;
};
