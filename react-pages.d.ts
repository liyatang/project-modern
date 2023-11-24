declare module 'virtual:react-pages' {
  import type { RouteObject } from 'react-router-dom';

  export const pagesRoutes: RouteObject[];

  export const PagesRoutes: {
    X6: '/x6';
    USER: '/user';
    USER_LOGIN: '/user/login';
    'USER_[USERUUID]': '/user/:userUUID';
    'USER_[USERUUID]_INFO': '/user/:userUUID/info';
    TEST: '/test';
    HOME: '/home';
    DEMO: '/demo';
  };
}
