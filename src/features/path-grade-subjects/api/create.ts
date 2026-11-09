import { apiClient } from '../../../core/api/apiClient';
import type { PathGradeSubject } from '../types';

export const createPathGradeSubject = async (data: Partial<PathGradeSubject>): Promise<PathGradeSubject> => {
  const response = await apiClient.post<PathGradeSubject>("/new-path-grade-subject", data);
  return response.data;
};
