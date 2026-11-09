import { apiClient } from '../../../core/api/apiClient';
import type { LearningTerm } from '../types';

export const createLearningTerm = async (data: Partial<LearningTerm>): Promise<LearningTerm> => {
  const response = await apiClient.post<LearningTerm>("/new-learning-term", data);
  return response.data;
};
