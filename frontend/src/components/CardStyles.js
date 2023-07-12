import { theme } from './ThemeStyles';

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

export { cardStyles };
