import { apiClient } from '../../../core/api/apiClient';
import type { LearningSubject } from '../types';

export const getLearningSubjects = async (): Promise<LearningSubject[]> => {
  const response = await apiClient.get<LearningSubject[]>('/learning-subjects');
  return response.data;
};
