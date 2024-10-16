import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Sidebar = ({ onSelect, onThemeToggle, darkMode }) => {
  const items = ['Beroepstaken', 'Vaardigheden'];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        '& .MuiDrawer-paper': {
          width: 240,
          backgroundColor: darkMode ? '#1e1e1e' : '#f0f0f0',
          color: darkMode ? '#ffffff' : '#000000',
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={onThemeToggle} size="large">
          {darkMode ? <LightModeIcon fontSize="large" /> : <DarkModeIcon fontSize="large" />}
        </IconButton>
      </Box>
      <List>
        {items.map((text, index) => (
          <ListItem
            button
            key={index}
            onClick={() => onSelect(text)}
            sx={{
              py: 2, // Increase vertical padding
              '& .MuiListItemText-primary': {
                fontSize: '1.2rem', // Increase font size
                fontWeight: 'bold', // Make text bold
              },
            }}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
