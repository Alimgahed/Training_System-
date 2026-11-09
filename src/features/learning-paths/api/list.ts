import { apiClient } from '../../../core/api/apiClient';
import type { LearningPath } from '../types';

export const getLearningPaths = async (): Promise<LearningPath[]> => {
  const response = await apiClient.get<LearningPath[]>('/learning-paths');
  return response.data;
};
