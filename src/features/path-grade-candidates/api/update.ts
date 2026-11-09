import { apiClient } from '../../../core/api/apiClient';
import type { PathGradeCandidate,PathGradeCandidateRequest } from '../types';

export const updatePathGradeCandidate = async (id: number, payload: PathGradeCandidateRequest): Promise<PathGradeCandidate> =>
  (await apiClient.put<PathGradeCandidate>(`/path-grade-candidate/${id}`, payload)).data;
