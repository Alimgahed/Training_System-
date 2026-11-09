import { apiClient } from '../../../core/api/apiClient';
import type { PerformanceEvaluationItem } from '../types';

export const createPerformanceEvaluationItem = async (data: Partial<PerformanceEvaluationItem>): Promise<PerformanceEvaluationItem> => {
  const response = await apiClient.post<PerformanceEvaluationItem>("/new-performance-evaluation-item", data);
  return response.data;
};
