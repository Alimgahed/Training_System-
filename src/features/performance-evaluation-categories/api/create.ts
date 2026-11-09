import { apiClient } from '../../../core/api/apiClient';
import type { PerformanceEvaluationCategory } from '../types';

export const createPerformanceEvaluationCategory = async (data: Partial<PerformanceEvaluationCategory>): Promise<PerformanceEvaluationCategory> => {
  const response = await apiClient.post<PerformanceEvaluationCategory>("/new-performance-evaluation-category", data);
  return response.data;
};
