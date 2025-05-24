import { PATH } from '@/constants/path';
import { USER_ROLE, UserRole, useUserRole } from '@/hooks/useUserRole';
import { Navigate, Outlet } from 'react-router-dom';

interface RoutePolicy {
  redirectMap: Record<string, string>;
  defaultElement: React.ReactElement;
}

const routePolicies: Record<UserRole, RoutePolicy> = {
  [USER_ROLE.FIRST_VISIT]: {
    redirectMap: {},
    defaultElement: <Navigate to={PATH.WELCOME} replace />,
  },
  [USER_ROLE.GUEST]: {
    redirectMap: {
      [PATH.SIGN_IN]: PATH.WELCOME,
    },
    defaultElement: <Outlet />,
  },
  [USER_ROLE.OAUTH_AUTHED]: {
    redirectMap: {},
    defaultElement: <Navigate to={PATH.WELCOME} replace />,
  },
  [USER_ROLE.UNIV_AUTHED]: {
    redirectMap: {},
    defaultElement: <Outlet />,
  },
};

export default function PrivateRoute() {
  const currentPath = location.pathname;
  const { userRole } = useUserRole();
  const { redirectMap, defaultElement } = routePolicies[userRole];
  const redirectPath = redirectMap[currentPath];

  return redirectPath ? <Navigate to={redirectPath} replace /> : defaultElement;
}
