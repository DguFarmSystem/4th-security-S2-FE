import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string;
  isUnivAuthenticated: boolean;
  isGuest: boolean;
  setAccessToken: (token: string) => void;
  setIsUnivAuthenticated: (value: boolean) => void;
  setIsGuest: (value: boolean) => void;
  clearAuth: () => void;
}

const initialState = {
  accessToken: '',
  isUnivAuthenticated: false,
  isGuest: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setAccessToken: (token) => set({ accessToken: token }),
      setIsUnivAuthenticated: (value) => set({ isUnivAuthenticated: value }),
      setIsGuest: (value) => set({ isGuest: value }),
      clearAuth: () => set(initialState),
    }),
    {
      name: 'SOT-auth-storage',
    }
  )
);
