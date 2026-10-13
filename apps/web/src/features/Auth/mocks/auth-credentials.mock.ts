import type { TAuthUser } from '../types/TAuthUser';

interface MockAccount {
  username: string;
  password: string;
  token: string;
  user: TAuthUser;
}

// Credenciais fictícias usadas exclusivamente pela simulação local.
export const MOCK_ACCOUNTS: readonly MockAccount[] = [
  {
    username: 'demo',
    password: 'template123!',
    token: 'mock-token-demo',
    user: { id: '1', name: 'Usuário Demo' },
  },
];
