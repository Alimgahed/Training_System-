import { apiClient } from '../../../core/api/apiClient';
import type { EvaluationType } from '../types';

export const createEvaluationType = async (data: Partial<EvaluationType>): Promise<EvaluationType> => {
  const response = await apiClient.post<EvaluationType>("/new-evaluation-type", data);
  return response.data;
};
