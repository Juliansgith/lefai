// src/components/__tests__/AppBar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '../AppBar';
import { ThemeContext } from '../../ThemeContext';

test('renders AppBar with title', () => {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  render(
    <ThemeContext.Provider
      value={{ darkMode: false, handleThemeToggle: jest.fn() }}
    >
      <ThemeProvider theme={theme}>
        <AppBar handleDrawerToggle={jest.fn()} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );

  expect(screen.getByText(/Your Website Title/i)).toBeInTheDocument();
});
