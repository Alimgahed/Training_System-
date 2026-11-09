import { apiClient } from '../../../core/api/apiClient';
import type { Person } from '../types';

export const getPerson = async (id: string | number): Promise<Person> => {
  const response = await apiClient.get<Person>('/person/' + id);
  return response.data;
};
