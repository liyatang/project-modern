import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

const requireContext = require['context'](
  // 组件目录的相对路径
  '../pages',
  // 是否查询子目录
  true,
  // 组件文件名的正则表达式
  // 只会包括以 `.tsx` 结尾的文件
  /\.page\.tsx$/,
  // 异步加载
  'lazy'
);

const pages = requireContext.keys().map((page) => {
  // ./home/index.page.tsx => /home
  // slice(1, -9)
  const path = page.slice(1, -15);

  // lazy
  const Element = lazy(() => requireContext(page));

  return {
    path,
    element: (
      <Suspense fallback={<></>}>
        {/* 挂个 data-path，便于排查问题 */}
        <Element key={path} data-path={path} />
      </Suspense>
    ),
  };
});

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  ...pages,
];

const router = createBrowserRouter(routes, {
  basename: '/app',
});

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
