import { apiClient } from '../../../core/api/apiClient';

export const deletePathGradeCandidate = async (id: number): Promise<void> => {
  await apiClient.delete(`/path-grade-candidate/${id}`);
};
