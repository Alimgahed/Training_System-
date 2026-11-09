import { apiClient } from '../../../core/api/apiClient';
import type { CreatePersonRequest,Person } from '../types';

export const createPerson = async (data: CreatePersonRequest): Promise<Person> => {
  const response = await apiClient.post<Person>('/new-person', data);
  return response.data;
};
