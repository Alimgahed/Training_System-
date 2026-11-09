import { apiClient } from '../../../core/api/apiClient';
import type { PerformanceEvaluationItem } from '../types';

export const getPerformanceEvaluationItems = async (): Promise<PerformanceEvaluationItem[]> => {
  const response = await apiClient.get<PerformanceEvaluationItem[]>('/performance-evaluation-items');
  return response.data;
};
