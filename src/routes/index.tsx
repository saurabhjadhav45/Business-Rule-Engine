import {RootState} from '@store';
import {ReactElement, ReactNode, Suspense} from 'react';
import {useSelector} from 'react-redux';
import {Navigate, Route, Routes} from 'react-router-dom';

import ROUTES from './routes';

interface IRoutesProps {
  children: ReactNode;
  isAuthenticated: boolean;
}

function PrivateRoute(props: IRoutesProps) {
  const {children, isAuthenticated} = props;
  return isAuthenticated ? (children as ReactElement) : <Navigate to='/' />;
}

function PublicRoute(props: IRoutesProps) {
  const {children, isAuthenticated} = props;
  return isAuthenticated ? (
    <Navigate to='/dashboard' />
  ) : (
    (children as ReactElement)
  );
}

export default function AppRoutes() {
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);

  return (
    <Suspense fallback={<div>'Add loader here'</div>}>
      <Routes>
        {ROUTES.map((route) =>
          route.isPrivate ? (
            <Route
              key={route.name}
              path={route.path}
              element={
                <PrivateRoute isAuthenticated={isLoggedIn}>
                  <route.component />
                </PrivateRoute>
              }
            />
          ) : (
            <Route
              key={route.name}
              path={route.path}
              element={
                route.exact ? (
                  <PublicRoute isAuthenticated={isLoggedIn}>
                    <route.component />
                  </PublicRoute>
                ) : (
                  <route.component />
                )
              }
            />
          )
        )}
      </Routes>
    </Suspense>
  );
}
