import { lazy, Suspense } from 'react';
import { set } from 'lodash-es';
import type { RouteObject } from 'react-router-dom';

/*
const modules = {
  '../pages/account/index.page.tsx': () => '../pages/account/index.page.tsx',
  '../pages/account/layout.tsx': () => '../pages/account/layout.tsx',
  '../pages/account/info/index.page.tsx': () => '../pages/account/info/index.page.tsx',
};
*/
type Modules = Record<string, () => Promise<any>>;

/*
const pathModules = {
  account: {
    path: 'account',
    module: () => '../pages/account/layout.tsx',
    children: {
      '': () => '../pages/account/index.page.tsx',
      info: {
        path: 'info',
        children: {
          '': () => '../pages/account/info/index.page.tsx'
        }
      }
    }
  }
}
*/
type PathModules = Record<
  string,
  { path: string; index?: true; module: Promise<any>; children?: PathModules }
>;

type PathModulesValues = {
  path: string;
  index?: true;
  module: Promise<any>;
  children?: PathModulesValues[];
}[];

function modulesToPathModules(modules: Modules): PathModules {
  const pathModules: PathModules = {};

  Object.keys(modules).forEach((key) => {
    const module: () => Promise<any> = modules[key];

    if (key.includes('/layout.tsx')) {
      const path = key.split('/pages').pop()!.replace('/layout.tsx', '');

      const setPath = path.slice(1).replace(/\//g, '.children.');
      let lastPath = path.split('/').slice(-1)[0];
      if (lastPath.startsWith('[') && lastPath.endsWith(']')) {
        lastPath = `${lastPath.slice(1, -1)}`;
      }

      set(pathModules, `${setPath}.path`, lastPath);
      set(pathModules, `${setPath}.module`, module);
    } else if (key.includes('/index.page.tsx')) {
      const path = key.split('/pages').pop()!.replace('/index.page.tsx', '');

      const setPath = path.slice(1).replace(/\//g, '.children.');
      let lastPath = path.split('/').slice(-1)[0];
      if (lastPath.startsWith('[') && lastPath.endsWith(']')) {
        lastPath = `${lastPath.slice(1, -1)}`;
      }

      set(pathModules, `${setPath}.path`, lastPath);
      set(pathModules, `${setPath}.children..index`, true);
      set(pathModules, `${setPath}.children..module`, module);
    }
  });

  return pathModules;
}

function pathModulesToValues(pathModules): PathModulesValues {
  function valuesDeep(obj: PathModules) {
    const arr = Object.values(obj);
    // 递归
    return arr.map((item) => {
      if (item.children) {
        return { ...item, children: valuesDeep(item.children) };
      }
      return item;
    });
  }

  return valuesDeep(pathModules);
}

function createElement({ module }) {
  const Element = lazy(module);
  return (
    <Suspense>
      <Element />
    </Suspense>
  );
}

function moduleToElement(pathModulesValues: PathModulesValues): RouteObject[] {
  function deep(arr) {
    return arr.map((item) => {
      const route: RouteObject = {
        path: item.path,
        index: item.index,
      };

      // 如果有 layout
      if (item.module) {
        route.element = createElement({ module: item.module });
      }

      // 处理 children
      if (item.children) {
        route.children = deep(item.children);
      }

      return route;
    });
  }

  return deep(pathModulesValues);
}

function modulesToRoutes(modules: Modules): RouteObject[] {
  // 转换成对象形式
  const pathModules = modulesToPathModules(modules);
  // 再转数组
  const values = pathModulesToValues(pathModules);
  // 转成 route
  return moduleToElement(values);
}

export { modulesToRoutes };
