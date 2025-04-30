import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks/hooks';
import LayoutWrapperComponent from '@/components/layout/layout-wrapper';
const LoginPage = lazy(() => import('@/screens/login/login.screen'));
const PageNotFound = lazy(() => import('@/screens/errors/not-found.screen'));
const DashboardPage = lazy(() => import('@/screens/dashboard/dashboard.screen'));

// Redirect if token exists
const RedirectIfAuthenticated: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { token } = useAppSelector(state => state.auth);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children || <Outlet />}</>;
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/dashboard',
    element: <RedirectIfAuthenticated />,
    children: [
      {
        path: '',
        element: <LayoutWrapperComponent />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

const Router: React.FC = () => {
  return (
    <Suspense fallback={'/'}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Router;
