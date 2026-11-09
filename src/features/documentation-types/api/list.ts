import { apiClient } from '../../../core/api/apiClient';
import type { DocumentationType } from '../types';

export const getDocumentationTypes = async (): Promise<DocumentationType[]> => {
  const response = await apiClient.get<DocumentationType[]>('/documentation-types');
  return response.data;
};
