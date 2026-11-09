import { apiClient } from '../../../core/api/apiClient';
import type { PerformanceEvaluationParticipantCategory } from '../types';

export const createPerformanceEvaluationParticipantCategory = async (data: Partial<PerformanceEvaluationParticipantCategory>): Promise<PerformanceEvaluationParticipantCategory> => {
  const response = await apiClient.post<PerformanceEvaluationParticipantCategory>("/new-performance-evaluation-participant-category", data);
  return response.data;
};
