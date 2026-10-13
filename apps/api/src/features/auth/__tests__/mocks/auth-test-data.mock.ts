import type { User } from '@prisma/client';
import type { LoginInput, LoginResponse, PublicUser } from '../../auth.model.js';

export const AUTH_LOGIN_INPUT: LoginInput = {
  username: 'demo',
  password: 'template123!',
};

export const AUTH_USER_ENTITY: User = {
  id: 'user-1',
  username: 'demo',
  name: 'Usuário Demo',
  passwordHash: 'hashed-password',
  createdAt: new Date('2024-01-01T00:00:00.000Z'),
  updatedAt: new Date('2024-01-01T00:00:00.000Z'),
};

export const AUTH_PUBLIC_USER: PublicUser = {
  id: 'user-1',
  name: 'Usuário Demo',
};

export const AUTH_LOGIN_RESPONSE: LoginResponse = {
  accessToken: 'mock-access-token',
};
