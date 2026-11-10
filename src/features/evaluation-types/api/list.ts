import { apiClient } from '../../../core/api/apiClient';
import type { EvaluationType } from '../types';

export const getEvaluationTypes = async (signal?: AbortSignal): Promise<EvaluationType[]> => {
  const response = await apiClient.get<EvaluationType[]>('/evaluation-types', { signal });
  return response.data;
};
