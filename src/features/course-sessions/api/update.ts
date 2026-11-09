import { apiClient } from '../../../core/api/apiClient';
import type { CourseSession } from '../types';

export const updateCourseSession = async (id: number, payload: Pick<CourseSession, 'session_date' | 'start_time' | 'end_time' | 'course_id'>): Promise<CourseSession> =>
  (await apiClient.put<CourseSession>(`/course-session/${id}`, payload)).data;
