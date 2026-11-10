import { apiClient } from '../../../core/api/apiClient';
import type { CourseSessionParticipant } from '../types';

export const getCourseSessionParticipant = async (id: string | number, signal?: AbortSignal): Promise<CourseSessionParticipant> => {
  const response = await apiClient.get<CourseSessionParticipant>('/course-session-participant/' + id, { signal });
  return response.data;
};
