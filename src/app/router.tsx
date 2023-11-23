import { useRoutes, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { modulesToRoutes } from '@lib/tool';

// 默认懒加载，构建时分离为独立 chunk
const modules = import.meta.glob(['../pages/**/index.page.tsx', '../pages/**/layout.tsx']);

const pages: RouteObject[] = modulesToRoutes(modules);

const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  ...pages,
];

const AppRouter = () => useRoutes(routes);

export default AppRouter;
