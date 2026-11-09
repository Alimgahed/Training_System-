import { apiClient } from '../../../core/api/apiClient';
import type { LearningPath } from '../types';

export const createLearningPath = async (data: Partial<LearningPath>): Promise<LearningPath> => {
  const response = await apiClient.post<LearningPath>("/new-learning-path", data);
  return response.data;
};
