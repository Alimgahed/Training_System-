import { apiClient } from '../../../core/api/apiClient';
import type { LearningTerm } from '../types';

export const getLearningTerms = async (): Promise<LearningTerm[]> => {
  const response = await apiClient.get<LearningTerm[]>('/learning-terms');
  return response.data;
};
