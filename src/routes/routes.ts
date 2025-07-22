// eslint-disable-next-line import/no-unresolved
import {lazy} from 'react';

const ROUTES = [
  {
    path: '/dashboard',
    exact: true,
    component: lazy(() => import('../pages/dashboard')),
    name: 'Home',
    isPrivate: true,
  },
  {
    path: '/',
    exact: true,
    component: lazy(() => import('../pages/auth/container/login')),
    name: 'Login',
    isPrivate: false,
  },
  {
    path: '/new-password',
    exact: true,
    component: lazy(() => import('../pages/auth/new-password')),
    name: 'NewPassword',
    isPrivate: false,
  },
  {
    path: '/rule/:id',
    exact: true,
    component: lazy(() => import('../pages/rule-details')),
    name: 'RuleDetails',
    isPrivate: true,
  },
];

export default ROUTES;
