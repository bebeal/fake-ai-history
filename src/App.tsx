import React, { useEffect } from 'react';
import { Avatar, ThemeProvider, createTheme } from '@mui/material';
import { Test } from './utils/tests';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const AppTheme = createTheme({
  components: {
    // Override for Grid component to center content and remove default margin and padding
    MuiGrid: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          margin: '0',
          padding: '0',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
  },
});

const App = () => {
  return (
    <Test />
  )
}

export default App;
