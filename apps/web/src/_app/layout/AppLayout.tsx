import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@shared/components';
import { getNavItems } from './navItems';

const LayoutRoot = styled.div({
  display: 'flex',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
});

const MainArea = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  height: '100%',
  overflow: 'hidden',
  backgroundColor: theme.colors.default.bg,
}));

export function AppLayout() {
  const navItems = getNavItems();

  return (
    <LayoutRoot>
      <Sidebar items={navItems} />
      <MainArea>
        <Outlet />
      </MainArea>
    </LayoutRoot>
  );
}
