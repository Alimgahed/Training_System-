import { apiClient } from '../../../core/api/apiClient';
import type { PathGradeCandidate } from '../types';

export const getPathGradeCandidates = async (): Promise<PathGradeCandidate[]> => {
  const response = await apiClient.get<PathGradeCandidate[]>('/path-grade-candidates');
  return response.data;
};
