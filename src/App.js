// App.js
import React, { useState } from 'react';
import { CssBaseline, Box, createTheme, ThemeProvider, Toolbar } from '@mui/material';
import Sidebar from './components/Sidebar';
import HBOI from './pages/HBOI';
import Vaardigheden from './pages/Vaardigheden';
import AppBar from './components/AppBar';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('Vaardigheden');
  const [darkMode, setDarkMode] = useState(true);

  // State to control the mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });

  const handleThemeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
    // Close the drawer when a tab is selected on mobile
    setMobileOpen(false);
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
      <Box sx={{ display: 'flex' }}>
        <AppBar
          onThemeToggle={handleThemeToggle}
          darkMode={darkMode}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Sidebar
          onSelect={handleTabSelect}
          selectedTab={selectedTab}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Add a toolbar to account for the AppBar height */}
          <Toolbar />
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
