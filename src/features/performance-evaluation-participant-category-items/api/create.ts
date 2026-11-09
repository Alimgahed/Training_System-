import { apiClient } from '../../../core/api/apiClient';
import type { PerformanceEvaluationParticipantCategoryItem } from '../types';

export const createPerformanceEvaluationParticipantCategoryItem = async (data: Partial<PerformanceEvaluationParticipantCategoryItem>): Promise<PerformanceEvaluationParticipantCategoryItem> => {
  const response = await apiClient.post<PerformanceEvaluationParticipantCategoryItem>("/new-performance-evaluation-participant-category-item", data);
  return response.data;
};
