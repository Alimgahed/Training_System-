import { apiClient } from '../../../core/api/apiClient';
import type { CourseParticipant } from '../types';

export const getCourseParticipant = async (id: string | number, signal?: AbortSignal): Promise<CourseParticipant> => {
  const response = await apiClient.get<CourseParticipant>('/course-participant/' + id, { signal });
  return response.data;
};
