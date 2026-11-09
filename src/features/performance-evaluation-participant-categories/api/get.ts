import { apiClient } from '../../../core/api/apiClient';
import type { PerformanceEvaluationParticipantCategory } from '../types';

export const getPerformanceEvaluationParticipantCategory = async (id: string | number): Promise<PerformanceEvaluationParticipantCategory> => {
  const response = await apiClient.get<PerformanceEvaluationParticipantCategory>('/performance-evaluation-participant-category/' + id);
  return response.data;
};
