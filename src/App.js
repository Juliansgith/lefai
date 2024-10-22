// App.js
import React, { useState, Suspense, lazy, useContext } from 'react';
import {
  CssBaseline,
  Box,
  createTheme,
  ThemeProvider as MuiThemeProvider,
  Toolbar,
  CircularProgress,
} from '@mui/material';
import { ThemeContext } from './ThemeContext';
import Sidebar from './components/Sidebar';
import AppBar from './components/AppBar';
import ChatbotButton from './components/ChatbotButton';
import ChatbotModal from './components/ChatbotModal';

const HBOI = lazy(() => import('./pages/HBOI'));
const Vaardigheden = lazy(() => import('./pages/Vaardigheden'));

function App() {
  const [selectedTab, setSelectedTab] = useState('Vaardigheden');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const { darkMode } = useContext(ThemeContext);

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
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabSelect = tab => {
    setSelectedTab(tab);
    setMobileOpen(false);
  };

  const handleChatbotOpen = () => {
    setChatbotOpen(true);
  };

  const handleChatbotClose = () => {
    setChatbotOpen(false);
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
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar handleDrawerToggle={handleDrawerToggle} />
        <Sidebar
          onSelect={handleTabSelect}
          selectedTab={selectedTab}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Suspense
            fallback={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            {renderContent()}
          </Suspense>
        </Box>
        <ChatbotButton handleOpen={handleChatbotOpen} />
        <ChatbotModal open={chatbotOpen} handleClose={handleChatbotClose} />
      </Box>
    </MuiThemeProvider>
  );
}

export default App;
