import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid';
import 'react-native-get-random-values';
import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

export type SemesterType = {
  id: string;
  session: string;
  semester: string;
};

type SemesterState = {
  activeSemesterId: string | null;
  setActiveSemesterId: (id: string) => void;
  semesters: SemesterType[];
  addSemester: (data: Omit<SemesterType, 'id'>) => string;
  removeSemester: (id: string) => void;
};

const persistConfig: PersistOptions<SemesterState> = {
  name: 'point-scale-semesters-store',
  storage: createJSONStorage(() => AsyncStorage),
};

export const useSemesterStore = create(
  persist<SemesterState>(
    (set, get) => ({
      semesters: [],
      activeSemesterId: null,
      setActiveSemesterId: (id: string) => {
        set((state) => {
          return {
            ...state,
            activeSemesterId: id,
          };
        });
      },
      addSemester: (data: Omit<SemesterType, 'id'>) => {
        const id = nanoid();
        const { activeSemesterId } = get();
        // console.log({ activeSemesterId: activeSemesterId || id });
        set((state) => {
          const semester = {
            ...data,
            id,
          };
          return {
            ...state,
            semesters: [semester, ...state.semesters],
            activeSemesterId: activeSemesterId || id,
          };
        });
        return id;
      },
      removeSemester: (semester_id: string) => {
        const { activeSemesterId } = get();
        const isActiveSessionToRemoved = semester_id === activeSemesterId;

        set((state) => {
          const semesters = state.semesters.filter((semester) => semester.id !== semester_id);
          return {
            ...state,
            semesters,
            activeSemesterId: isActiveSessionToRemoved ? semesters[0]?.id : activeSemesterId,
          };
        });
      },
    }),
    persistConfig,
  ),
);
