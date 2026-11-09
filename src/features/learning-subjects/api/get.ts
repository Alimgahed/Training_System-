import { apiClient } from '../../../core/api/apiClient';
import type { LearningSubject } from '../types';

export const getLearningSubject = async (id: string | number): Promise<LearningSubject> => {
  const response = await apiClient.get<LearningSubject>('/learning-subject/' + id);
  return response.data;
};
