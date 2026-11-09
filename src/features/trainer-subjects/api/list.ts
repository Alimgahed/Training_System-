import { apiClient } from '../../../core/api/apiClient';
import type { TrainerSubject } from '../types';

export const getTrainerSubjects = async (): Promise<TrainerSubject[]> => {
  const response = await apiClient.get<TrainerSubject[]>('/trainer-subjects');
  return response.data;
};
