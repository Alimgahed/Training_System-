import { apiClient } from '../../../core/api/apiClient';
import type { QualificationType } from '../types';

export const getQualificationType = async (id: string | number): Promise<QualificationType> => {
  const response = await apiClient.get<QualificationType>('/qualification-type/' + id);
  return response.data;
};
