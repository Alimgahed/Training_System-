import { apiClient } from '../../../core/api/apiClient';
import type { DocumentationType } from '../types';

export const createDocumentationType = async (data: Partial<DocumentationType>): Promise<DocumentationType> => {
  const response = await apiClient.post<DocumentationType>("/new-documentation-type", data);
  return response.data;
};
