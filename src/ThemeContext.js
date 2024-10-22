// ThemeContext.js
import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  const handleThemeToggle = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const contextValue = useMemo(
    () => ({ darkMode, handleThemeToggle }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
