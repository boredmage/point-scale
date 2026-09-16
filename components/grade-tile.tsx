import React from 'react';
import { View } from 'react-native';
import { GetGradeIcon } from './getGradeIcon';

const tint: Record<string, string> = {
  A: '#E3F7EC',
  B: '#E4EEFC',
  C: '#FFF4D6',
  D: '#FFE9D6',
  E: '#FFE3DC',
  F: '#FDE2E2',
};

/** Soft tinted square holding the hexagon grade icon. Used on course cards. */
const GradeTile = ({ grade, size = 44 }: { grade: string; size?: number }) => (
  <View
    className="items-center justify-center rounded-xl"
    style={{ width: size, height: size, backgroundColor: tint[grade] ?? '#F1F2F7' }}
  >
    <GetGradeIcon grade={grade} width={size * 0.68} height={size * 0.68} />
  </View>
);

export default GradeTile;
