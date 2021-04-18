import { ReactNode } from 'react';
import { DefaultTheme } from 'styled-components';

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface ThemeContextData {
  handleChangeTheme(theme: 'light' | 'dark'): void;
  selectedTheme: DefaultTheme;
}
