import { apiClient } from '../../../core/api/apiClient';
import type { LearningTerm } from '../types';

export const getLearningTerm = async (id: string | number): Promise<LearningTerm> => {
  const response = await apiClient.get<LearningTerm>('/learning-term/' + id);
  return response.data;
};
