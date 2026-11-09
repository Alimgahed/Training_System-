import { apiClient } from '../../../core/api/apiClient';
import type { PathGradeSubjectTerm } from '../types';

export const createPathGradeSubjectTerm = async (data: Partial<PathGradeSubjectTerm>): Promise<PathGradeSubjectTerm> => {
  const response = await apiClient.post<PathGradeSubjectTerm>("/new-path-grade-subject-term", data);
  return response.data;
};
