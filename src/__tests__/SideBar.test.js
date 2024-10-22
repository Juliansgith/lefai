// src/components/__tests__/Sidebar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Sidebar from '../Sidebar';

test('renders Sidebar and handles navigation', () => {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const handleSelect = jest.fn();

  render(
    <ThemeProvider theme={theme}>
      <Sidebar
        onSelect={handleSelect}
        selectedTab="Vaardigheden"
        mobileOpen={false}
        handleDrawerToggle={jest.fn()}
      />
    </ThemeProvider>
  );

  expect(screen.getByText('Vaardigheden')).toBeInTheDocument();

  // Simulate click on 'Beroepstaken'
  fireEvent.click(screen.getByText('Beroepstaken'));
  expect(handleSelect).toHaveBeenCalledWith('Beroepstaken');
});
