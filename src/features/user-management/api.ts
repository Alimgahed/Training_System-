import { apiClient } from '../../core/api/apiClient';

export interface UserSummary {
  id: number;
  code?: string | null;
  name?: string | null;
  username: string;
  group_id?: number;
  is_active?: boolean;
}

export interface AllowedGroup {
  id: number;
  name: string;
}

export interface RegisterUserRequest {
  person_id: number;
  username: string;
  password: string;
  group_id: number;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface ResetPasswordRequest {
  new_password: string;
}

export const getUsers = async (): Promise<UserSummary[]> => (await apiClient.get<UserSummary[]>('/users')).data;
export const getAllowedGroups = async (): Promise<AllowedGroup[]> => (await apiClient.get<AllowedGroup[]>('/allowed-groups')).data;
export const registerUser = async (payload: RegisterUserRequest): Promise<void> => { await apiClient.post('/register-user', payload); };
export const changePassword = async (payload: ChangePasswordRequest): Promise<void> => { await apiClient.post('/change-password', payload); };
export const resetUserPassword = async (personId: number, payload: ResetPasswordRequest): Promise<void> => { await apiClient.post(`/person/${personId}/reset-password`, payload); };
export const logoutUser = async (): Promise<void> => { await apiClient.post('/logout'); };
