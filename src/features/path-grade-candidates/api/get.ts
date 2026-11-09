import { apiClient } from '../../../core/api/apiClient';
import type { PathGradeCandidate } from '../types';

export const getPathGradeCandidate = async (id: string | number): Promise<PathGradeCandidate> => {
  const response = await apiClient.get<PathGradeCandidate>(`/path-grade-candidate/${id}`);
  return response.data;
};
