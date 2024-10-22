// components/Sidebar.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Toolbar,
  Divider,
} from '@mui/material';

const drawerWidth = 240;

function Sidebar({ onSelect, selectedTab, mobileOpen, handleDrawerToggle }) {
  const items = ['Beroepstaken', 'Vaardigheden'];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerContent = (
    <div>
      <Toolbar />
      <Divider />
      <nav aria-label="main navigation">
        <List>
          {items.map(text => (
            <ListItem
              button
              key={text}
              selected={selectedTab === text}
              onClick={() => onSelect(text)}
              aria-label={`Navigate to ${text}`}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </nav>
    </div>
  );

  return (
    <>
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}

Sidebar.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default Sidebar;
