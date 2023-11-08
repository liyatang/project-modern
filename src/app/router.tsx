import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
// @ts-ignore
import routes from '~react-pages';

const AppRouter = () => {
  return <Suspense fallback={<div>Loading...</div>}>{useRoutes(routes)}</Suspense>;
};

export default AppRouter;
