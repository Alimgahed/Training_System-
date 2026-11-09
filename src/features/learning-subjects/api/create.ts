import { apiClient } from '../../../core/api/apiClient';
import type { LearningSubject } from '../types';

export const createLearningSubject = async (data: Partial<LearningSubject>): Promise<LearningSubject> => {
  const response = await apiClient.post<LearningSubject>("/new-learning-subject", data);
  return response.data;
};
