import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../core/api/apiClient';
import type { Course } from '../types';

export interface CourseFilters {
  path_grade_subject_id?: number;
  path_grade_subject_term_id?: number;
  learning_subject_id?: number;
}

export const getPlannedCourses = async (filters: CourseFilters = {}, signal?: AbortSignal): Promise<Course[]> => {
  const response = await apiClient.get<Course[]>('/get-planned-courses', { params: filters, signal });
  return response.data;
};

export const usePlannedCourses = (filters: CourseFilters = {}, enabled = true) => {
  return useQuery({
    enabled,
    queryKey: ['planned-courses', filters],
    queryFn: ({ signal }) => getPlannedCourses(filters, signal),
  });
};
