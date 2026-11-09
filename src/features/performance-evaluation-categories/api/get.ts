import { apiClient } from '../../../core/api/apiClient';
import type { PerformanceEvaluationCategory } from '../types';

export const getPerformanceEvaluationCategory = async (id: string | number): Promise<PerformanceEvaluationCategory> => {
  const response = await apiClient.get<PerformanceEvaluationCategory>('/performance-evaluation-category/' + id);
  return response.data;
};
