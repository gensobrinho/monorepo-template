import type { User } from '@prisma/client';
import type {
  ChangePasswordInput,
  CreateUserInput,
  PublicUser,
  UpdateUserInput,
} from '../../user.model.js';

export const USER_ENTITY: User = {
  id: 'user-1',
  username: 'ana',
  name: 'Ana Admin',
  passwordHash: 'hashed-password',
  createdAt: new Date('2024-01-01T00:00:00.000Z'),
  updatedAt: new Date('2024-01-01T00:00:00.000Z'),
};

export const USER_PUBLIC: PublicUser = {
  id: 'user-1',
  name: 'Ana Admin',
};

export const CREATE_USER_INPUT: CreateUserInput = {
  username: 'bruno',
  name: 'Bruno Dev',
  password: 'Secret123!',
};

export const UPDATE_USER_INPUT: UpdateUserInput = {
  username: 'ana.updated',
  name: 'Ana Updated',
  password: 'NewSecret123!',
};

export const CHANGE_PASSWORD_INPUT: ChangePasswordInput = {
  currentPassword: 'template123!',
  newPassword: 'NewSecret123!',
};

export const CREATED_USER_ENTITY: User = {
  id: 'user-2',
  username: 'bruno',
  name: 'Bruno Dev',
  passwordHash: 'hashed-new-password',
  createdAt: new Date('2024-01-02T00:00:00.000Z'),
  updatedAt: new Date('2024-01-02T00:00:00.000Z'),
};

export const CREATED_USER_PUBLIC: PublicUser = {
  id: 'user-2',
  name: 'Bruno Dev',
};
