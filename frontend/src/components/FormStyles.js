import { theme } from './ThemeStyles';

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

export { formStyles };