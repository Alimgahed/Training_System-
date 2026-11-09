import { apiClient } from '../../../core/api/apiClient';
import type { PerformanceEvaluationParticipantCategory } from '../types';

export const getPerformanceEvaluationParticipantCategorys = async (): Promise<PerformanceEvaluationParticipantCategory[]> => {
  const response = await apiClient.get<PerformanceEvaluationParticipantCategory[]>('/performance-evaluation-participant-categories');
  return response.data;
};
