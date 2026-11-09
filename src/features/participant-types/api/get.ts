import { apiClient } from '../../../core/api/apiClient';
import type { ParticipantType } from '../types';

export const getParticipantType = async (id: string | number): Promise<ParticipantType> => {
  const response = await apiClient.get<ParticipantType>('/participant-type/' + id);
  return response.data;
};
