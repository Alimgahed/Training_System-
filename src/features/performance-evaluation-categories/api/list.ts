import { apiClient } from '../../../core/api/apiClient';
import type { PerformanceEvaluationCategory } from '../types';

export const getPerformanceEvaluationCategorys = async (): Promise<PerformanceEvaluationCategory[]> => {
  const response = await apiClient.get<PerformanceEvaluationCategory[]>('/performance-evaluation-categories');
  return response.data;
};
