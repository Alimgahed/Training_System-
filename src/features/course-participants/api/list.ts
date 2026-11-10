import { apiClient } from '../../../core/api/apiClient';
import type { CourseParticipant } from '../types';

export const getCourseParticipants = async (signal?: AbortSignal): Promise<CourseParticipant[]> => {
  const response = await apiClient.get<CourseParticipant[]>('/course-participants', { signal });
  return response.data;
};
