import type { TAuthUser } from '@features/Auth';

export type TCreateUserPayload = {
  username: string;
  name: string;
  password: string;
};

export type TUpdateUserPayload = {
  username?: string;
  name: string;
  password?: string;
};

export type TChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export interface IUserRepository {
  getUsers(): Promise<TAuthUser[]>;
  getUserById(id: string): Promise<TAuthUser>;
  createUser(payload: TCreateUserPayload): Promise<TAuthUser>;
  updateUser(id: string, payload: TUpdateUserPayload): Promise<TAuthUser>;
  changePassword(payload: TChangePasswordPayload): Promise<void>;
  deleteUser(id: string): Promise<void>;
}
