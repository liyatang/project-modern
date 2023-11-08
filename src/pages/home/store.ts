import { commonMiddlewares } from '@lib/frame';
import { create } from 'zustand';

interface HomeState {
  name: string;
  setName: (name: string) => void;
}

const useHomeStore = create<HomeState>()(
  commonMiddlewares((set) => ({
    name: '',
    setName: (name: string) => {
      set(() => ({ name }));
    },
  })),
);

export { useHomeStore };
