import { apiClient } from '../../../core/api/apiClient';
import type { Documentation } from '../types';

export const getDocumentations = async (): Promise<Documentation[]> => {
  const response = await apiClient.get<Documentation[]>('/documentations');
  return response.data;
};
