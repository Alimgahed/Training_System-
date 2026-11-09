import { apiClient } from '../../../core/api/apiClient';
import type { EvaluationType } from '../types';

export const getEvaluationTypes = async (): Promise<EvaluationType[]> => {
  const response = await apiClient.get<EvaluationType[]>('/evaluation-types');
  return response.data;
};
