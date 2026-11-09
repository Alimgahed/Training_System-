import { apiClient } from '../../../core/api/apiClient';
import type { QualificationType } from '../types';

export const getQualificationTypes = async (): Promise<QualificationType[]> => {
  const response = await apiClient.get<QualificationType[]>('/qualification-types');
  return response.data;
};
