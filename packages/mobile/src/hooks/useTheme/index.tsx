import React, { createContext, useContext, useState } from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  DefaultTheme,
} from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { light } from '../../styles/themes/light';
import { dark } from '../../styles/themes/dark';
import { ThemeProviderProps, ThemeContextData } from './types';

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

function ThemeProvider({ children }: ThemeProviderProps) {
  const [selectedTheme, setSelectedTheme] = useState<DefaultTheme>(() => {
    AsyncStorage.getItem('@memenstagram/selected_theme').then((theme) => {
      if (theme === 'dark') return dark;

      return light;
    });

    return light;
  });

  async function handleChangeTheme(theme: 'light' | 'dark'): Promise<void> {
    await AsyncStorage.setItem('@memenstagram/selected_theme', theme);
    setSelectedTheme(theme === 'light' ? light : dark);
  }

  return (
    <ThemeContext.Provider value={{ handleChangeTheme, selectedTheme }}>
      <StyledThemeProvider theme={selectedTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

function useTheme(): ThemeContextData {
  return useContext(ThemeContext);
}

export { ThemeProvider, useTheme };
