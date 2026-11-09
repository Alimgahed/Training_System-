import { apiClient } from '../../../core/api/apiClient';
import type { PerformanceEvaluationParticipantCategoryItem } from '../types';

export const getPerformanceEvaluationParticipantCategoryItem = async (id: string | number): Promise<PerformanceEvaluationParticipantCategoryItem> => {
  const response = await apiClient.get<PerformanceEvaluationParticipantCategoryItem>('/performance-evaluation-participant-category-item/' + id);
  return response.data;
};
