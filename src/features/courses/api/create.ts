import { apiClient } from '../../../core/api/apiClient';
import type { Course, CreateCourseRequest } from '../types';

export const createCourse = async (data: CreateCourseRequest): Promise<Course> => {
  const response = await apiClient.post<Course>('/new-course', data);
  return response.data;
};
