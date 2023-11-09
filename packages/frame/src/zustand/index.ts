import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { State, StateCreator, StoreMutatorIdentifier } from 'zustand';

// 有点复杂，抄作业
// https://docs.pmnd.rs/zustand/guides/typescript#middleware-that-doesn't-change-the-store-type
type CommonMiddlewares = <
  T extends State,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>;

type CommonMiddlewaresImpl = <T extends State>(
  f: StateCreator<T, [], []>,
  name?: string,
) => StateCreator<T, [], []>;

const commonMiddlewaresImpl: CommonMiddlewaresImpl = (f) => (set, get, store) => {
  const creator = devtools(f);

  return creator(set, get, store);
};

const commonMiddlewares = commonMiddlewaresImpl as unknown as CommonMiddlewares;

/** 封装 createStore，统一入口和中间件 */
const createStore = (<T>(createState) => {
  if (createState) {
    return create<T>()(commonMiddlewares(createState));
  }

  return (createState: StateCreator<T, [], []>) => {
    return create<T>()(commonMiddlewares(createState));
  };
}) as typeof create;

export { createStore };
