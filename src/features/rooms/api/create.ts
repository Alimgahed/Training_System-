import { apiClient } from '../../../core/api/apiClient';
import type { TrainingRoom } from '../types';

export const createTrainingRoom = async (data: Partial<TrainingRoom>): Promise<TrainingRoom> => {
  const response = await apiClient.post<TrainingRoom>("/new-room", data);
  return response.data;
};
