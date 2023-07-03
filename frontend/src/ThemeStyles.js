import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#83b083',
    },
    secondary: {
      main: '#b3733a',
    },
    accent1: {
      main: '#f7e8a5',
      dark: '#bca77a',
    },
    accent2: {
      main: '#b7d9e4',
    },
  },
  spacing: 4,
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 16,
  },
  shadows: [
    'none',
    '0px 2px 4px -1px rgba(0, 0, 0, 0.1), 0px 4px 5px 0px rgba(0, 0, 0, 0.06), 0px 1px 10px 0px rgba(0, 0, 0, 0.04)',
    '0px 3px 6px -1px rgba(0, 0, 0, 0.1), 0px 6px 16px 0px rgba(0, 0, 0, 0.06), 0px 9px 28px 8px rgba(0, 0, 0, 0.04)',
  ],
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
    },
  },
});

const formStyles = {
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.accent1.main,
    color: '#000000',
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: theme.palette.secondary.main,
    borderRadius: 4,
    '&::placeholder': {
      color: theme.palette.secondary.main,
    },
  },
  button: {
    backgroundColor: theme.palette.accent1.main,
    color: '#ffffff',
    borderRadius: 4,
    '&:hover': {
      backgroundColor: theme.palette.accent1.dark,
    },
  },
};

const cardStyles = {
  root: {
    backgroundColor: '#ffffff',
    boxShadow: theme.shadows[1],
    color: '#000000',
    margin: theme.spacing(4),
    padding: theme.spacing(2),
  },
  button: {
    backgroundColor: '#f7e8a5',
    color: '#ffffff',
    borderRadius: 4,
    '&:hover': {
      backgroundColor: '#bca77a',
    },
  },
  list: {
    container: {
      marginBottom: theme.spacing(2),
    },
  },
};

const listStyles = {
  container: {
    marginBottom: theme.spacing(2),
  },
};

const buttonStyles = {
  root: {
    backgroundColor: theme.palette.accent1.main,
    color: '#ffffff',
    borderRadius: 4,
    '&:hover': {
      backgroundColor: theme.palette.accent1.dark,
    },
  },
};

const applicationStyles = {
  card: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.1), 0px 4px 5px 0px rgba(0, 0, 0, 0.06), 0px 1px 10px 0px rgba(0, 0, 0, 0.04)',
  },
  list: {
    container: {
      marginBottom: theme.spacing(2),
    },
  },
};

export { theme, formStyles, cardStyles, listStyles, buttonStyles, applicationStyles };
