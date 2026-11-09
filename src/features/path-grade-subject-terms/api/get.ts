import { apiClient } from '../../../core/api/apiClient';
import type { PathGradeSubjectTerm } from '../types';

export const getPathGradeSubjectTerm = async (id: string | number): Promise<PathGradeSubjectTerm> => {
  const response = await apiClient.get<PathGradeSubjectTerm>('/path-grade-subject-term/' + id);
  return response.data;
};
