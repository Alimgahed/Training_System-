import { apiClient } from '../../../core/api/apiClient';
import type { PerformanceEvaluationItem } from '../types';

export const getPerformanceEvaluationItem = async (id: string | number): Promise<PerformanceEvaluationItem> => {
  const response = await apiClient.get<PerformanceEvaluationItem>('/performance-evaluation-item/' + id);
  return response.data;
};
