// Create a context for the BottomSheet
import BottomSheet from '@gorhom/bottom-sheet';
import React, { createContext, useCallback, useRef, useState } from 'react';

type bottomSheetTypes = 'result' | 'courseOrder' | 'gradeSettings';
interface BottomSheetContextType {
  activeResultId: string | undefined;
  setActiveResultId: React.Dispatch<React.SetStateAction<string | undefined>>;
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  open: (type: bottomSheetTypes) => void;
  close: (type: bottomSheetTypes) => void;
  courseOrderBottomSheetRef: React.RefObject<BottomSheet | null>;
  gradeSettingsBottomSheetRef: React.RefObject<BottomSheet | null>;
}

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const courseOrderBottomSheetRef = useRef<BottomSheet>(null);
  const gradeSettingsBottomSheetRef = useRef<BottomSheet>(null);
  const [activeResultId, setActiveResultId] = useState<string | undefined>(undefined);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const open = (type: bottomSheetTypes) => {
    switch (type) {
      case 'result':
        bottomSheetRef.current?.snapToIndex(1);
        break;
      case 'courseOrder':
        courseOrderBottomSheetRef.current?.snapToIndex(1);
        break;
      case 'gradeSettings':
        gradeSettingsBottomSheetRef.current?.snapToIndex(1);
        break;
      default:
        break;
    }
  };
  const close = (type: bottomSheetTypes) => {
    switch (type) {
      case 'result':
        bottomSheetRef.current?.close();
        break;
      case 'courseOrder':
        courseOrderBottomSheetRef.current?.close();
        break;
      default:
        break;
    }
  };

  return (
    <BottomSheetContext.Provider
      value={{
        activeResultId,
        setActiveResultId,
        bottomSheetRef,
        open,
        close,
        courseOrderBottomSheetRef,
        gradeSettingsBottomSheetRef,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheetContext = () => {
  const context = React.useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheetContext must be used within a BottomSheetProvider');
  }
  return context;
};
