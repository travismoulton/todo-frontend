import create from 'zustand';

type UserState = {
  user: { name: string; id: string } | null;
  setUser: (user: UserState['user']) => void;
};

export const useStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: UserState['user']) => set(() => ({ user })),
}));
