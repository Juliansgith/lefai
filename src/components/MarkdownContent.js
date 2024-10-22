// components/MarkdownContent.js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography } from '@mui/material';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownContent = ({ content }) => {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={materialDark}
              language={match[1]}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              {...props}
            />
          ) : (
            <Typography
              component="code"
              variant="body2"
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: 1,
                px: 0.5,
                py: 0.2,
              }}
              {...props}
            >
              {children}
            </Typography>
          );
        },
        // ... other components
      }}
    />
  );
};

export default MarkdownContent;
