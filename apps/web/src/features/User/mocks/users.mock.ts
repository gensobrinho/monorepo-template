import type { TAuthUser } from '@features/Auth';

export const usersStore: TAuthUser[] = [
  { id: 'u1', name: 'João Silva' },
  { id: 'u2', name: 'Maria Souza' },
  { id: 'u3', name: 'Pedro Lima' },
];

export const MOCK_APP_USERS = usersStore;
