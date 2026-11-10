import { apiClient } from '../../../core/api/apiClient';
import type { DocumentationType } from '../types';

export const getDocumentationTypes = async (signal?: AbortSignal): Promise<DocumentationType[]> => {
  const response = await apiClient.get<DocumentationType[]>('/documentation-types', { signal });
  return response.data;
};
