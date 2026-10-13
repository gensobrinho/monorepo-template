import LoginScreen from '@/src/features/Auth/views/LoginScreen';
import DemoFormScreen from '@/src/features/Demo/views/DemoFormScreen';
import DemoScreen from '@/src/features/Demo/views/DemoScreen';
import Home from '@features/Home/views/Home';
import UserCreateScreen from '@/src/features/User/views/UserCreateScreen';
import UserScreen from '@/src/features/User/views/UserScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { RoutesEnum } from '../types/RoutesEnum';
import { PrivateRoute } from './PrivateRoute';

export function AppRouter() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={RoutesEnum.LOGIN} element={<LoginScreen />} />
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route path={RoutesEnum.HOME} element={<Home />} />
              <Route path={RoutesEnum.DEMO_CREATE} element={<DemoFormScreen />} />
              <Route path={RoutesEnum.DEMO_EDIT} element={<DemoFormScreen />} />
              <Route path={RoutesEnum.DEMO} element={<DemoScreen />} />
              <Route path={`${RoutesEnum.DEMO}/:id`} element={<DemoScreen />} />
              <Route path={RoutesEnum.USERS} element={<UserScreen />} />
              <Route path={RoutesEnum.USER_CREATE} element={<UserCreateScreen />} />
              <Route path={RoutesEnum.USER_EDIT} element={<UserCreateScreen />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
