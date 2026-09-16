import { platformSelect } from 'nativewind/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#5271FF',
        'primary-soft': '#E8ECFF',
        surface: '#F5F6FA',
        ink: '#15172B',
        muted: '#6B6E85',
        faint: '#9A9DB3',
        line: '#E4E6EF',
      },
      fontFamily: {
        system: platformSelect({
          ios: 'GoogleSans-Regular',
          android: 'GoogleSans_400Regular',
          default: 'GoogleSans_400Regular',
        }),
        'system-medium': platformSelect({
          ios: 'GoogleSans-Medium',
          android: 'GoogleSans_500Medium',
          default: 'GoogleSans_500Medium',
        }),
      },
      animation: {
        spinReverse: 'spinReverse 240s linear infinite',
      },
      keyframes: {
        spinReverse: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
};
