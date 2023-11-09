import { createStore } from '@lib/frame';

interface HomeState {
  name: string;
  setName: (name: string) => void;
}

const useHomeStore = createStore<HomeState>()((set) => ({
  name: '',
  setName: (name: string) => {
    set(() => ({ name }));
  },
}));

export { useHomeStore };
