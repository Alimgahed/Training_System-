import { apiClient } from '../../../core/api/apiClient';
import type { EvaluationType } from '../types';

export const getEvaluationType = async (id: string | number, signal?: AbortSignal): Promise<EvaluationType> => {
  const response = await apiClient.get<EvaluationType>('/evaluation-type/' + id, { signal });
  return response.data;
};
