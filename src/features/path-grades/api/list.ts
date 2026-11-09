import { apiClient } from '../../../core/api/apiClient';
import type { PathGrade } from '../types';

export const getPathGrades = async (): Promise<PathGrade[]> => {
  const response = await apiClient.get<PathGrade[]>('/path-grades');
  return response.data;
};
