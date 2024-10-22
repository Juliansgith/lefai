// components/MarkdownContent.js
import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import {
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  Paper,
} from '@mui/material';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  materialDark,
  materialLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '@mui/material/styles';

/* eslint-disable react/jsx-props-no-spreading */

// Define custom renderers outside the component

function Heading1({ node, ...props }) {
  return <Typography variant="h4" gutterBottom {...props} />;
}

Heading1.propTypes = {
  node: PropTypes.shape({}).isRequired, // Define node as a shape object
};

function Heading2({ node, ...props }) {
  return <Typography variant="h5" gutterBottom {...props} />;
}

Heading2.propTypes = {
  node: PropTypes.shape({}).isRequired, // Define node as a shape object
};

function Heading3({ node, ...props }) {
  return <Typography variant="h6" gutterBottom {...props} />;
}

Heading3.propTypes = {
  node: PropTypes.shape({}).isRequired, // Define node as a shape object
};

function Paragraph({ node, ...props }) {
  return <Typography variant="body1" paragraph {...props} />;
}

Paragraph.propTypes = {
  node: PropTypes.shape({}).isRequired, // Define node as a shape object
};

function ListItem({ node, ordered, ...props }) {
  return (
    <li>
      <Typography variant="body1" component="span" {...props} />
    </li>
  );
}

ListItem.propTypes = {
  node: PropTypes.shape({}).isRequired, // Define node as a shape object
  ordered: PropTypes.bool,
};

ListItem.defaultProps = {
  ordered: false, // Add defaultProps for ordered
};

function CodeBlock({ node, inline, className, children, ...props }) {
  const theme = useTheme();
  const syntaxTheme =
    theme.palette.mode === 'dark' ? materialDark : materialLight;

  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      style={syntaxTheme}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
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
}

CodeBlock.propTypes = {
  node: PropTypes.shape({}).isRequired, // Define node as a shape object
  inline: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CodeBlock.defaultProps = {
  inline: false, // Add defaultProps for inline
  className: '', // Add defaultProps for className
};

function TableRenderer({ node, ...props }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" {...props} />
    </TableContainer>
  );
}

TableRenderer.propTypes = {
  node: PropTypes.shape({}).isRequired, // Define node as a shape object
};

function TableCellRenderer({ node, ...props }) {
  return <TableCell {...props} />;
}

TableCellRenderer.propTypes = {
  node: PropTypes.shape({}).isRequired, // Define node as a shape object
};

function TableRowRenderer({ node, ...props }) {
  return <TableRow {...props} />;
}

TableRowRenderer.propTypes = {
  node: PropTypes.shape({}).isRequired, // Define node as a shape object
};

function MarkdownContent({ content }) {
  const components = {
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    p: Paragraph,
    li: ListItem,
    code: CodeBlock,
    table: TableRenderer,
    th: TableCellRenderer,
    tr: TableRowRenderer,
    td: TableCellRenderer,
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
/* eslint-enable react/jsx-props-no-spreading */

MarkdownContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default MarkdownContent;
