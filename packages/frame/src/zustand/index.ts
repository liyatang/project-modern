import { devtools } from 'zustand/middleware';
import type { State, StateCreator, StoreMutatorIdentifier } from 'zustand';

// 搞不懂，抄作业的 https://docs.pmnd.rs/zustand/guides/typescript#middleware-that-doesn't-change-the-store-type

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

export const commonMiddlewares = commonMiddlewaresImpl as unknown as CommonMiddlewares;
