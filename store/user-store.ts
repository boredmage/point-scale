import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type GradeScale = '4.0' | '5.0';

type UserStore = {
  hasFinishedOnboarding: boolean;
  gradeScale: GradeScale;
  toggleHasOnboarded: () => void;
  setGradeScale: (scale: GradeScale) => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      hasFinishedOnboarding: false,
      gradeScale: '4.0',
      toggleHasOnboarded: () =>
        set((state) => ({
          ...state,
          hasFinishedOnboarding: !state.hasFinishedOnboarding,
        })),
      setGradeScale: (scale: GradeScale) =>
        set((state) => ({
          ...state,
          gradeScale: scale,
        })),
    }),
    {
      name: 'pointscale-user-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
