import { apiClient } from '../../../core/api/apiClient';
import type { QualificationType } from '../types';

export const createQualificationType = async (data: Partial<QualificationType>): Promise<QualificationType> => {
  const response = await apiClient.post<QualificationType>("/new-qualification-type", data);
  return response.data;
};
