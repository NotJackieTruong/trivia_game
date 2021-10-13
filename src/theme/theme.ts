import { ColorDark, ColorDefault } from './colors';

import { AppTheme } from '#config';

const Default: AppTheme = {
  dark: false,
  colors: ColorDefault
};
const Dark: AppTheme = {
  dark: true,
  colors: ColorDark
};
export const MyAppTheme = {
  default: Default,
  dark: Dark
};

export type ThemeType = keyof typeof MyAppTheme;
