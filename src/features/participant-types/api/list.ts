import { apiClient } from '../../../core/api/apiClient';
import type { ParticipantType } from '../types';

export const getParticipantTypes = async (): Promise<ParticipantType[]> => {
  const response = await apiClient.get<ParticipantType[]>('/participant-types');
  return response.data;
};
