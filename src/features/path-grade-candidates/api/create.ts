import { apiClient } from '../../../core/api/apiClient';
import type { PathGradeCandidate,PathGradeCandidateRequest } from '../types';

export const createPathGradeCandidate = async (data: PathGradeCandidateRequest): Promise<PathGradeCandidate> => {
  const response = await apiClient.post<PathGradeCandidate>('/new-path-grade-candidate', data);
  return response.data;
};
