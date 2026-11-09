import { apiClient } from '../../../core/api/apiClient';
import type { Person } from '../types';

export const getPersons = async (): Promise<Person[]> => {
  const response = await apiClient.get<Person[]>('/persons');
  return response.data;
};
