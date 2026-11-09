import { apiClient } from '../../../core/api/apiClient';
import type { Room } from '../types';

export const getRooms = async (): Promise<Room[]> => {
  const response = await apiClient.get<Room[]>('/rooms');
  return response.data;
};
