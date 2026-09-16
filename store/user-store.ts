import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type GradeScale = '4.0' | '5.0';

type UserStore = {
  hasFinishedOnboarding: boolean;
  gradeScale: GradeScale;
  finishOnboarding: () => void;
  setGradeScale: (scale: GradeScale) => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      hasFinishedOnboarding: false,
      gradeScale: '4.0',
      finishOnboarding: () =>
        set((state) => ({
          ...state,
          hasFinishedOnboarding: true,
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

/**
 * True once the persisted user store has been read back from AsyncStorage.
 * Until then `hasFinishedOnboarding` is still the default `false`, so any
 * redirect based on it must wait.
 */
export const useUserStoreHydrated = () => {
  const [hydrated, setHydrated] = useState(useUserStore.persist.hasHydrated());

  useEffect(() => {
    const unsubscribe = useUserStore.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useUserStore.persist.hasHydrated());
    return unsubscribe;
  }, []);

  return hydrated;
};
