import { apiClient } from '../../../core/api/apiClient';
import type { PerformanceEvaluationParticipantCategoryItem } from '../types';

export interface PerformanceEvaluationParticipantCategoryItemFilters {
  participant_type_id?: number;
  performance_evaluation_category_id?: number;
}

export const getPerformanceEvaluationParticipantCategoryItems = async (filters: PerformanceEvaluationParticipantCategoryItemFilters = {}): Promise<PerformanceEvaluationParticipantCategoryItem[]> => {
  const response = await apiClient.get<PerformanceEvaluationParticipantCategoryItem[]>('/performance-evaluation-participant-category-items', { params: filters });
  return response.data;
};
