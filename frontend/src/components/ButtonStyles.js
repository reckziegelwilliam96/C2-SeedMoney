import { theme } from './ThemeStyles';

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

export default buttonStyles;
