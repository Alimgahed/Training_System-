import { apiClient } from '../../../core/api/apiClient';

export const deleteCourseSession = async (id: number): Promise<void> => { await apiClient.delete(`/course-session/${id}`); };
