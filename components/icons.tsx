import * as React from 'react';
import Svg, { Path, Rect, Text } from 'react-native-svg';

const Home = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M0 0h24v24H0z" stroke="none" />
    <Path d="m19 8.71-5.333-4.148a2.666 2.666 0 0 0-3.274 0L5.059 8.71a2.67 2.67 0 0 0-1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.2c0-.823-.38-1.6-1.03-2.105" />
    <Path d="M16 15c-2.21 1.333-5.792 1.333-8 0" />
  </Svg>
);

const Settings = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M0 0h24v24H0z" stroke="none" />
    <Path d="M19.875 6.27A2.23 2.23 0 0 1 21 8.218v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.27 2.27 0 0 1-2.184 0l-6.75-4.27A2.23 2.23 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98z" />
    <Path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0" />
  </Svg>
);

const HexagonLetterA = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="m13.666 1.429 6.75 3.98.096.063.093.078.106.074a3.22 3.22 0 0 1 1.284 2.39l.005.204v7.284c0 1.175-.643 2.256-1.623 2.793l-6.804 4.302c-.98.538-2.166.538-3.2-.032l-6.695-4.237A3.23 3.23 0 0 1 2 15.502V8.217c0-1.106.57-2.128 1.476-2.705l6.95-4.098c1-.552 2.214-.552 3.24.015M12 7a3 3 0 0 0-3 3v6a1 1 0 0 0 2 0v-2h2v2a1 1 0 0 0 .883.993L14 17a1 1 0 0 0 1-1v-6a3 3 0 0 0-3-3m0 2a1 1 0 0 1 1 1v2h-2v-2a1 1 0 0 1 .883-.993z" />
  </Svg>
);

const HexagonLetterAPlus = (props: React.ComponentProps<typeof Svg>) => (
  <Svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M13.666 1.429l6.75 3.98l.096 .063l.093 .078l.106 .074a3.22 3.22 0 0 1 1.284 2.39l.005 .204v7.284c0 1.175 -.643 2.256 -1.623 2.793l-6.804 4.302c-.98 .538 -2.166 .538 -3.2 -.032l-6.695 -4.237a3.23 3.23 0 0 1 -1.678 -2.826v-7.285c0 -1.106 .57 -2.128 1.476 -2.705l6.95 -4.098c1 -.552 2.214 -.552 3.24 .015m-1.666 5.571a3 3 0 0 0 -3 3v6a1 1 0 0 0 2 0v-2h2v2a1 1 0 0 0 .883 .993l.117 .007a1 1 0 0 0 1 -1v-6a3 3 0 0 0 -3 -3m0 2a1 1 0 0 1 1 1v2h-2v-2a1 1 0 0 1 .883 -.993z" />
    <Path
      d="M14.5 7.2 L19.5 7.2"
      fill="none"
      stroke="white"
      strokeWidth={1.2}
      strokeLinecap="round"
    />
    <Path d="M17 5 L17 9.5" fill="none" stroke="white" strokeWidth={1.2} strokeLinecap="round" />
  </Svg>
);

const HexagonLetterB = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="m13.666 1.429 6.75 3.98.096.063.093.078.106.074a3.22 3.22 0 0 1 1.284 2.39l.005.204v7.284c0 1.175-.643 2.256-1.623 2.793l-6.804 4.302c-.98.538-2.166.538-3.2-.032l-6.695-4.237A3.23 3.23 0 0 1 2 15.502V8.217c0-1.106.57-2.128 1.476-2.705l6.95-4.098c1-.552 2.214-.552 3.24.015M12 7h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a3 3 0 0 0 3-3l-.005-.176a3 3 0 0 0-.654-1.7L14.235 12l.106-.124A3 3 0 0 0 12 7m0 6a1 1 0 0 1 0 2h-1v-2zm0-4a1 1 0 0 1 0 2h-1V9z" />
  </Svg>
);

const HexagonLetterC = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="m13.666 1.429 6.75 3.98.096.063.093.078.106.074a3.22 3.22 0 0 1 1.284 2.39l.005.204v7.284c0 1.175-.643 2.256-1.623 2.793l-6.804 4.302c-.98.538-2.166.538-3.2-.032l-6.695-4.237A3.23 3.23 0 0 1 2 15.502V8.217c0-1.106.57-2.128 1.476-2.705l6.95-4.098c1-.552 2.214-.552 3.24.015M12 7a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0 1 1 0 0 0-1.993-.117L13 14a1 1 0 0 1-2 0v-4a1 1 0 0 1 1.993-.117L13 10a1 1 0 0 0 2 0 3 3 0 0 0-3-3" />
  </Svg>
);

const HexagonLetterD = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="m13.666 1.429 6.75 3.98.096.063.093.078.106.074a3.22 3.22 0 0 1 1.284 2.39l.005.204v7.284c0 1.175-.643 2.256-1.623 2.793l-6.804 4.302c-.98.538-2.166.538-3.2-.032l-6.695-4.237A3.23 3.23 0 0 1 2 15.502V8.217c0-1.106.57-2.128 1.476-2.705l6.95-4.098c1-.552 2.214-.552 3.24.015M12 7h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a3 3 0 0 0 3-3v-4a3 3 0 0 0-3-3m0 2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1V9z" />
  </Svg>
);

const HexagonLetterE = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M13.666 1.429l6.75 3.98l.096 .063l.093 .078l.106 .074a3.22 3.22 0 0 1 1.284 2.39l.005 .204v7.284c0 1.175 -.643 2.256 -1.623 2.793l-6.804 4.302c-.98 .538 -2.166 .538 -3.2 -.032l-6.695 -4.237a3.23 3.23 0 0 1 -1.678 -2.826v-7.285c0 -1.106 .57 -2.128 1.476 -2.705l6.95 -4.098c1 -.552 2.214 -.552 3.24 .015m.334 5.571h-4a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1 -1l-.007 -.117a1 1 0 0 0 -.993 -.883h-3v-2h1.5a1 1 0 0 0 .993 -.883l.007 -.117a1 1 0 0 0 -1 -1h-1.5v-2h3a1 1 0 0 0 0 -2" />
  </Svg>
);

const HexagonLetterF = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="m13.666 1.429 6.75 3.98.096.063.093.078.106.074a3.22 3.22 0 0 1 1.284 2.39l.005.204v7.284c0 1.175-.643 2.256-1.623 2.793l-6.804 4.302c-.98.538-2.166.538-3.2-.032l-6.695-4.237A3.23 3.23 0 0 1 2 15.502V8.217c0-1.106.57-2.128 1.476-2.705l6.95-4.098c1-.552 2.214-.552 3.24.015M14 7h-4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1l.117-.007A1 1 0 0 0 11 16v-3h2a1 1 0 0 0 .993-.883L14 12a1 1 0 0 0-1-1h-2V9h3a1 1 0 0 0 0-2" />
  </Svg>
);

const Pencil = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M0 0h24v24H0z" stroke="none" />
    <Path d="M4 20h4L18.5 9.5a2.828 2.828 0 1 0-4-4L4 16zm9.5-13.5 4 4" />
  </Svg>
);

const Category = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m10 0h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M10 13H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m7 0a4 4 0 1 1-3.995 4.2L13 17l.005-.2A4 4 0 0 1 17 13" />
  </Svg>
);

const Badges = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M16.486 12.143 12 14.833l-4.486-2.69A1 1 0 0 0 6 13v4a1 1 0 0 0 .486.857l5 3a1 1 0 0 0 1.028 0l5-3A1 1 0 0 0 18 17v-4a1 1 0 0 0-1.514-.857" />
    <Path d="M16.486 3.143 12 5.833l-4.486-2.69A1 1 0 0 0 6 4v4a1 1 0 0 0 .486.857l5 3a1 1 0 0 0 1.028 0l5-3A1 1 0 0 0 18 8V4a1 1 0 0 0-1.514-.857" />
  </Svg>
);

const Trash = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M0 0h24v24H0z" stroke="none" />
    <Path d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
  </Svg>
);

const CircleDashedCheck = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M0 0h24v24H0z" stroke="none" />
    <Path d="M8.56 3.69a9 9 0 0 0-2.92 1.95M3.69 8.56A9 9 0 0 0 3 12m.69 3.44a9 9 0 0 0 1.95 2.92m2.92 1.95A9 9 0 0 0 12 21m3.44-.69a9 9 0 0 0 2.92-1.95m1.95-2.92A9 9 0 0 0 21 12m-.69-3.44a9 9 0 0 0-1.95-2.92m-2.92-1.95A9 9 0 0 0 12 3m-3 9 2 2 4-4" />
  </Svg>
);

const SortAscendingShapes = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M7 5a1 1 0 0 1 1 1v9.584l1.293-1.291a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-.112.097l-.11.071-.114.054-.105.035-.149.03L7 19l-.075-.003-.126-.017-.111-.03-.111-.044-.098-.052-.096-.067-.09-.08-3-3a1 1 0 0 1 1.414-1.414L6 15.586V6a1 1 0 0 1 1-1m12-2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-1.136 10.496 3.5 6A1 1 0 0 1 20.5 21h-7a1 1 0 0 1-.864-1.504l3.5-6a1 1 0 0 1 1.728 0" />
  </Svg>
);

const CircleCheck = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34m-1.293 5.953a1 1 0 0 0-1.32-.083l-.094.083L11 12.585l-1.293-1.292-.094-.083a1 1 0 0 0-1.403 1.403l.083.094 2 2 .094.083a1 1 0 0 0 1.226 0l.094-.083 4-4 .083-.094a1 1 0 0 0-.083-1.32" />
  </Svg>
);

const RotateClockwise2 = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M0 0h24v24H0z" stroke="none" />
    <Path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01m.57 4.09v.01m2.53 3.26v.01M11 19.94v.01" />
  </Svg>
);

const Target = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M0 0h24v24H0z" stroke="none" />
    <Path d="M11 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0" />
    <Path d="M7 12a5 5 0 1 0 10 0 5 5 0 1 0-10 0" />
    <Path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" />
  </Svg>
);

const ChartLine = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M0 0h24v24H0z" stroke="none" />
    <Path d="M4 19h16M4 15l4-6 4 2 4-5 4 4" />
  </Svg>
);

const Adjustments = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M0 0h24v24H0z" stroke="none" />
    <Path d="M4 10a2 2 0 1 0 4 0 2 2 0 0 0-4 0m2-6v4m0 4v8m4-4a2 2 0 1 0 4 0 2 2 0 0 0-4 0m2-12v10m0 4v2m4-13a2 2 0 1 0 4 0 2 2 0 0 0-4 0m2-3v1m0 4v11" />
  </Svg>
);

const MessageReport = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-4.724l-4.762 2.857a1 1 0 0 1-1.508-.743L7 21v-2H6a4 4 0 0 1-3.995-3.8L2 15V7a4 4 0 0 1 4-4zm-6 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 2 0V14a1 1 0 0 0-1-1m0-6a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1" />
  </Svg>
);

const ComingSoon = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={80} height={20} {...props}>
    <Rect
      x={0}
      y={0}
      width={80}
      height={20}
      rx={10}
      ry={40}
      fill="#5271FF"
      stroke="#FFFFFF"
      strokeWidth={1}
    />
    <Text
      x={40}
      y={13}
      textAnchor="middle"
      fontFamily="GoogleSans-Medium, GoogleSans_500Medium, sans-serif"
      fontSize={9}
      fill="#FFF"
    >
      COMING SOON
    </Text>
  </Svg>
);

const RoudedArrowDown = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M12 2q-.327 0-.642.005l-.616.017-.299.013-.579.034-.553.046c-4.785.464-6.732 2.411-7.196 7.196l-.046.553-.034.579q-.008.147-.013.299l-.017.616-.004.318L2 12q0 .327.005.642l.017.616.013.299.034.579.046.553c.464 4.785 2.411 6.732 7.196 7.196l.553.046.579.034q.147.008.299.013l.616.017L12 22l.642-.005.616-.017.299-.013.579-.034.553-.046c4.785-.464 6.732-2.411 7.196-7.196l.046-.553.034-.579q.008-.147.013-.299l.017-.616L22 12l-.005-.642-.017-.616-.013-.299-.034-.579-.046-.553c-.464-4.785-2.411-6.732-7.196-7.196l-.553-.046-.579-.034-.299-.013-.616-.017-.318-.004zm0 5a1 1 0 0 1 .993.883L13 8v5.585l2.293-2.292a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 .083 1.32l-.083.094-4 4a1 1 0 0 1-.112.097l-.11.071-.114.054-.105.035-.149.03L12 17l-.075-.003-.126-.017-.111-.03-.111-.044-.098-.052-.092-.064-.094-.083-4-4a1 1 0 0 1 1.32-1.497l.094.083L11 13.585V8a1 1 0 0 1 1-1" />
  </Svg>
);

const ArrowNarrowLeft = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M0 0h24v24H0z" stroke="none" />
    <Path d="M5 12h14M5 12l4 4m-4-4 4-4" />
  </Svg>
);

const Point = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M12 7a5 5 0 1 1-4.995 5.217l-.005-.217.005-.217A5 5 0 0 1 12 7" />
  </Svg>
);

export {
  Adjustments,
  ArrowNarrowLeft,
  Badges,
  Category,
  ChartLine,
  CircleCheck,
  CircleDashedCheck,
  ComingSoon,
  HexagonLetterA,
  HexagonLetterAPlus,
  HexagonLetterB,
  HexagonLetterC,
  HexagonLetterD,
  HexagonLetterE,
  HexagonLetterF,
  Home,
  MessageReport,
  Pencil,
  Point,
  RotateClockwise2,
  RoudedArrowDown,
  Settings,
  SortAscendingShapes,
  Target,
  Trash,
};
