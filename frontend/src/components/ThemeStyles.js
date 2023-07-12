import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#228B22',
    },
    secondary: {
      main: '#272B2E',
    },
    accent1: {
      main: '#FFD700',
      dark: '#DAA520',
    },
    accent2: {
      main: '#1E90FF',
    },
    background: {
      default: '#f5f5f5', // Changed to a lighter color for contrast
    },
  },
  spacing: 8, // Increased spacing for better visual separation
  typography: {
    fontFamily: 'Arial, sans-serif', // Changed font for a fresh look
    fontSize: 16,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.2)', // Increased shadow intensity for depth
    '0px 4px 5px rgba(0,0,0,0.1)',
    '0px 1px 10px rgba(0,0,0,0.08)',
  ],
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      long: 350,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.activeLink': {
            fontWeight: 'bold',
            color: '#FFD700',
          },
        },
      },
    },
  },
});

export { theme };
