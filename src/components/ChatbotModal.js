// components/ChatbotModal.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'fixed',
  bottom: 80,
  right: 16,
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
  maxHeight: '70vh',
  overflowY: 'auto',
};

const initialConversationStarters = [
  'How can I assist you today?',
  'Do you need help with something specific?',
  'What would you like to learn about?',
];

function ChatbotModal({ open, handleClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am here to help you.' },
    { role: 'assistant', content: 'You can ask me anything.' },
  ]); // Predefined conversation starters
  const [input, setInput] = useState(''); // Track the user input
  const [loading, setLoading] = useState(false); // Track API call status

  const handleMessageSend = async () => {
    if (!input.trim()) return; // Do not send empty messages

    // Add the user's message to the chat
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);

    setInput(''); // Clear input field
    setLoading(true); // Start loading spinner for the response

    try {
      // Send the chat message to the Ollama API
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3.2', // Adjust model name based on what you're using
          messages: [...messages, userMessage], // Send the full conversation
          stream: false,
        }),
      });

      const data = await response.json();

      // Add the bot's response to the chat
      const botMessage = { role: 'assistant', content: data.message.content };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching from chatbot:', error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton
          aria-label="Close chatbot"
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Chat Messages */}
        <Box sx={{ mb: 2 }}>
          {messages.map((message, index) => (
            <Typography
              key={`message-${index}-${message.content}`} // Avoid using array index alone for key
              align={message.role === 'user' ? 'right' : 'left'}
              sx={{ mb: 1 }}
            >
              <strong>{message.role === 'user' ? 'You' : 'Bot'}:</strong>{' '}
              {message.content}
            </Typography>
          ))}
        </Box>

        {/* Input Field and Send Button */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleMessageSend()}
          disabled={loading}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleMessageSend}
          disabled={loading}
          sx={{ mt: 1 }}
        >
          {loading ? 'Sending...' : 'Send'}
        </Button>

        {/* Conversation Starters */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Need help starting?</Typography>
          {initialConversationStarters.map((starter, index) => (
            <Button
              key={`starter-${index}-${starter}`} // Avoid using array index alone for key
              variant="text"
              onClick={() => setInput(starter)}
              fullWidth
              sx={{ textAlign: 'left' }}
            >
              {starter}
            </Button>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}

ChatbotModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ChatbotModal;
