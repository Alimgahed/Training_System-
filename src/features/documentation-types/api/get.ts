import { apiClient } from '../../../core/api/apiClient';
import type { DocumentationType } from '../types';

export const getDocumentationType = async (id: string | number): Promise<DocumentationType> => {
  const response = await apiClient.get<DocumentationType>('/documentation-type/' + id);
  return response.data;
};
