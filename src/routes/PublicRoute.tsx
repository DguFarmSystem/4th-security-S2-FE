import { PATH } from '@/constants/path';
import { USER_ROLE, UserRole, useUserRole } from '@/hooks/useUserRole';
import { Navigate, Outlet } from 'react-router-dom';

interface RoutePolicy {
  redirectMap: Record<string, string>;
  defaultElement: React.ReactElement;
}

const routePolicies: Record<UserRole, RoutePolicy> = {
  [USER_ROLE.FIRST_VISIT]: {
    redirectMap: {
      [PATH.SIGN_IN]: PATH.WELCOME,
      [PATH.DGU_AUTHENTICATION]: PATH.WELCOME,
    },
    defaultElement: <Outlet />,
  },
  [USER_ROLE.GUEST]: {
    redirectMap: {
      [PATH.SIGN_IN]: PATH.WELCOME,
      [PATH.DGU_AUTHENTICATION]: PATH.WELCOME,
    },
    defaultElement: <Outlet />,
  },
  [USER_ROLE.OAUTH_AUTHED]: {
    redirectMap: {
      [PATH.SIGN_IN]: PATH.WELCOME,
    },
    defaultElement: <Outlet />,
  },
  [USER_ROLE.UNIV_AUTHED]: {
    redirectMap: {},
    defaultElement: <Navigate to={PATH.ROOT} replace />,
  },
};

export default function PublicRoute() {
  const currentPath = location.pathname;
  const { userRole } = useUserRole();
  const { redirectMap, defaultElement } = routePolicies[userRole];
  const redirectPath = redirectMap[currentPath];

  return redirectPath ? <Navigate to={redirectPath} replace /> : defaultElement;
}
