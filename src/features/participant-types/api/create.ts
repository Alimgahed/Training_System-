import { apiClient } from '../../../core/api/apiClient';
import type { ParticipantType } from '../types';

// Depending on the API, some use /new-[singular] and some use POST /[plural]
// We use a generic POST endpoint. You can adjust the URL manually if it diverges.
export const createParticipantType = async (data: Partial<ParticipantType>): Promise<ParticipantType> => {
  const response = await apiClient.post<ParticipantType>('/' + 'participant-types', data);
  return response.data;
};
