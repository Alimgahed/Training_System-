import { apiClient } from '../../../core/api/apiClient';
import type { TrainerSubject } from '../types';

export const getTrainerSubject = async (id: string | number): Promise<TrainerSubject> => {
  const response = await apiClient.get<TrainerSubject>('/trainer-subject/' + id);
  return response.data;
};
