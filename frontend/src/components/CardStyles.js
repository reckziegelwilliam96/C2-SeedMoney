import { theme } from './ThemeStyles';

const cardStyles = {
  root: {
    backgroundColor: '#ffffff',
    boxShadow: theme.shadows[1],
    color: '#000000',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: '5px',
    transition: 'padding 0.3s',
    '&:hover': {
      transform: 'scale(1.02)', // Slightly enlarges the card when hovered over
      boxShadow: theme.shadows[3], // Increases the shadow depth when hovered over
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
  list: {
    container: {
      marginBottom: theme.spacing(2),
    },
  },
};

export { cardStyles };
