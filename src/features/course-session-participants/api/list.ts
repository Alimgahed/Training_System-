import { apiClient } from '../../../core/api/apiClient';
import type { CourseSessionParticipant } from '../types';

export const getCourseSessionParticipants = async (): Promise<CourseSessionParticipant[]> => {
  const response = await apiClient.get<CourseSessionParticipant[]>('/course-session-participants');
  return response.data;
};
