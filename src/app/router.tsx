import { useRoutes, Navigate } from 'react-router-dom';
import { pagesRoutes, PagesRoutes } from 'virtual:react-pages';

const routes = [
  {
    path: '/',
    element: <Navigate to={PagesRoutes.HOME} />,
  },
  ...pagesRoutes,
];

console.log('routes', routes);

const AppRouter = () => useRoutes(routes);

export default AppRouter;
