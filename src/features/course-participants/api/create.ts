import { apiClient } from '../../../core/api/apiClient';
import type { CourseParticipant } from '../types';

// Depending on the API, some use /new-[singular] and some use POST /[plural]
// We use a generic POST endpoint. You can adjust the URL manually if it diverges.
export const createCourseParticipant = async (data: Partial<CourseParticipant>): Promise<CourseParticipant> => {
  const response = await apiClient.post<CourseParticipant>('/' + 'course-participants', data);
  return response.data;
};
