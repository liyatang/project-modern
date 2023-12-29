import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import { StrictMode } from 'react';
import { pagesRoutes, PagesRoutes } from 'virtual:react-pages';

const routes = [
  {
    path: '/',
    element: <Navigate to={PagesRoutes.HOME} />,
  },
  ...pagesRoutes,
];

const AppRoute = () => useRoutes(routes);

const App = () => {
  return (
    <StrictMode>
      <Router>
        <div className="app">
          <AppRoute />
        </div>
      </Router>
    </StrictMode>
  );
};

export default App;
