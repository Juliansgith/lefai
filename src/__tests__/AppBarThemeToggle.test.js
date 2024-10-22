// src/components/__tests__/AppBarThemeToggle.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '../AppBar';
import { ThemeContext } from '../../ThemeContext';

test('toggles theme mode when button is clicked', () => {
  const handleThemeToggle = jest.fn();

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  render(
    <ThemeContext.Provider value={{ darkMode: false, handleThemeToggle }}>
      <ThemeProvider theme={theme}>
        <AppBar handleDrawerToggle={jest.fn()} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );

  const toggleButton = screen.getByLabelText('Switch to dark mode');
  fireEvent.click(toggleButton);
  expect(handleThemeToggle).toHaveBeenCalledTimes(1);
});
