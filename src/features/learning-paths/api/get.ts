import { apiClient } from '../../../core/api/apiClient';
import type { LearningPath } from '../types';

export const getLearningPath = async (id: string | number): Promise<LearningPath> => {
  const response = await apiClient.get<LearningPath>('/learning-path/' + id);
  return response.data;
};
