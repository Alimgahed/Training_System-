import { apiClient } from '../../../core/api/apiClient';
import type { CourseParticipant } from '../types';

export const getCourseParticipants = async (): Promise<CourseParticipant[]> => {
  const response = await apiClient.get<CourseParticipant[]>('/course-participants');
  return response.data;
};
