import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../core/api/apiClient';
import type { Course } from '../types';
import type { CourseFilters } from './plannedCourses';

export const getExecutedCourses = async (filters: CourseFilters = {}, signal?: AbortSignal): Promise<Course[]> => {
  const response = await apiClient.get<Course[]>('/get-executed-courses', { params: filters, signal });
  return response.data;
};

export const useExecutedCourses = (filters: CourseFilters = {}) => {
  return useQuery({
    queryKey: ['executed-courses', filters],
    queryFn: ({ signal }) => getExecutedCourses(filters, signal),
  });
};
