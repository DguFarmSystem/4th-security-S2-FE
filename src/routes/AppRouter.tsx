import {
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import SomethingWentWrongPage from '@/components/status/error/SomethingWentWrongPage';
import { UnknownErrorBoundary } from '@/components/status/error/UnknownErrorBoundary';
import { APIErrorBoundary } from '@/components/status/error/APIErrorBoundary';
import { Suspense } from 'react';
import Loader from '@/components/status/loading/Loader';
import LandingPage from '@/pages/landing';
import WelcomePage from '@/components/landing/WelcomePage';
import SignInPage from '@/pages/auth/sign_in';
import DGUAuthenticationPage from '@/pages/auth/dgu_auth';
import { PATH, ROUTE_TYPE } from '@/constants/path';
import Layout from '@/components/layout/Layout';
import { OauthProvider } from '@/types/oauth/oauthType';
import KakaoLogin from '@/pages/auth/oauth/KakaoLogin';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import SplashGate from '@/components/landing/SplashGate';
import ArticleDetailPage from '@/pages/ArticleDetailPage';

const createAuthRouter = (routeType: ROUTE_TYPE, children: RouteObject[]) => {
  const authRouter = children.map((child: RouteObject) => ({
    element: routeType === 'PRIVATE' ? <PrivateRoute /> : <PublicRoute />,
    children: [child],
  }));
  return authRouter;
};

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: (
      <UnknownErrorBoundary>
        <APIErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Layout direction="column">
              <SplashGate>
                <Outlet />
              </SplashGate>
            </Layout>
          </Suspense>
        </APIErrorBoundary>
      </UnknownErrorBoundary>
    ),
    children: [
      ...createAuthRouter('PUBLIC', [
        {
          path: PATH.WELCOME,
          element: <WelcomePage />,
        },
        {
          path: PATH.DGU_AUTHENTICATION,
          element: <DGUAuthenticationPage />,
        },
        {
          path: PATH.OAUTH_CALLBACK(OauthProvider.KAKAO),
          element: <KakaoLogin />,
        },
        {
          path: '/article/:id',
          element: <ArticleDetailPage />,
        },
      ]),
      ...createAuthRouter('PRIVATE', [
        {
          index: true,
          element: <LandingPage />,
        },
        { path: PATH.SIGN_IN, element: <SignInPage /> },
      ]),

      { path: '*', element: <SomethingWentWrongPage /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
