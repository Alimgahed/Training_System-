import { apiClient } from '../../core/api/apiClient';

export interface Group { id: number; name: string }

export const getGroups = async (): Promise<Group[]> => (await apiClient.get<Group[]>('/groups')).data;
export const getGroup = async (id: number): Promise<Group> => (await apiClient.get<Group>(`/group/${id}`)).data;
