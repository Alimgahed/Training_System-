import { apiClient } from '../../../core/api/apiClient';
import type { PathGradeSubjectTerm } from '../types';

export const getPathGradeSubjectTerms = async (): Promise<PathGradeSubjectTerm[]> => {
  const response = await apiClient.get<PathGradeSubjectTerm[]>('/path-grade-subject-terms');
  return response.data;
};
