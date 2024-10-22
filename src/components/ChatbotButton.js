// components/ChatbotButton.js
import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

function ChatbotButton({ handleOpen }) {
  return (
    <Fab
      color="primary"
      aria-label="Open chatbot"
      onClick={handleOpen}
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
    >
      <ChatIcon />
    </Fab>
  );
}

ChatbotButton.propTypes = {
  handleOpen: PropTypes.func.isRequired,
};

export default ChatbotButton;
