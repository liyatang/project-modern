import type { ReactNode } from 'react';
import { Suspense, lazy } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

// 默认懒加载，构建时分离为独立 chunk
const modules = import.meta.glob('../pages/**/index.tsx');

const pages: { path: string; element: ReactNode }[] = [];

for (const file in modules) {
  const module: () => Promise<any> = modules[file];

  const path = file.replace('../pages', '').replace('/index.tsx', '');
  const Element = lazy(module);

  pages.push({
    path,
    element: <Element key={path} data-path={path} />,
  });
}

const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  ...pages,
];

const AppRouter = () => <Suspense fallback={<>loading</>}>{useRoutes(routes)}</Suspense>;

export default AppRouter;
