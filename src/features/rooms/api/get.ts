import { apiClient } from '../../../core/api/apiClient';
import type { Room } from '../types';

export const getRoom = async (id: string | number): Promise<Room> => {
  const response = await apiClient.get<Room>('/room/' + id);
  return response.data;
};
