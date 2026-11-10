import { apiClient } from '../../../core/api/apiClient';
import type { CourseSessionParticipant } from '../types';

export const getCourseSessionParticipants = async (signal?: AbortSignal): Promise<CourseSessionParticipant[]> => {
  const response = await apiClient.get<CourseSessionParticipant[]>('/course-session-participants', { signal });
  return response.data;
};
