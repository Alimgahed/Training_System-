import { apiClient } from '../../../core/api/apiClient';
import type { PathGradeSubject } from '../types';

export const getPathGradeSubject = async (id: string | number): Promise<PathGradeSubject> => {
  const response = await apiClient.get<PathGradeSubject>('/path-grade-subject/' + id);
  return response.data;
};
