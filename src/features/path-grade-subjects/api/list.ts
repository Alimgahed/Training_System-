import { apiClient } from '../../../core/api/apiClient';
import type { PathGradeSubject } from '../types';

export const getPathGradeSubjects = async (): Promise<PathGradeSubject[]> => {
  const response = await apiClient.get<PathGradeSubject[]>('/path-grade-subjects');
  return response.data;
};
