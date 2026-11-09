import { apiClient } from '../../../core/api/apiClient';
import type { CourseSessionParticipant,CourseSessionParticipantRequest } from '../types';

export const updateCourseSessionParticipant = async (id: number, payload: CourseSessionParticipantRequest): Promise<CourseSessionParticipant> =>
  (await apiClient.put<CourseSessionParticipant>(`/course-session-participant/${id}`, payload)).data;
