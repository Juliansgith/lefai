import React, { useState } from 'react';
import { CssBaseline, Box, createTheme, ThemeProvider } from '@mui/material';
import Sidebar from './components/Sidebar';
import HBOI from './pages/HBOI';
import Vaardigheden from './pages/Vaardigheden';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('Vaardigheden');
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      background: {
        default: darkMode ? '#121212' : '#f0f0f0',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
      h6: {
        fontWeight: 600,
      },
    },
  });

  const handleThemeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'Beroepstaken':
        return <HBOI />;
      case 'Vaardigheden':
        return <Vaardigheden />;
      default:
        return <Vaardigheden />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Sidebar onSelect={setSelectedTab} onThemeToggle={handleThemeToggle} darkMode={darkMode} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
