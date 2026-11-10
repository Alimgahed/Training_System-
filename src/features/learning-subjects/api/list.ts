import { apiClient } from '../../../core/api/apiClient';
import type { LearningSubject } from '../types';

export const getLearningSubjects = async (signal?: AbortSignal): Promise<LearningSubject[]> => {
  const response = await apiClient.get<LearningSubject[]>('/learning-subjects', { signal });
  return response.data;
};
