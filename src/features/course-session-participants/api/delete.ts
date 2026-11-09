import { apiClient } from '../../../core/api/apiClient';

export const deleteCourseSessionParticipant = async (id: number): Promise<void> => { await apiClient.delete(`/course-session-participant/${id}`); };
