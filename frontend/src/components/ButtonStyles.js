import { theme } from './ThemeStyles';

const buttonStyles = {
  root: {
    backgroundColor: theme.palette.accent1.main,
    color: '#ffffff',
    borderRadius: 4,
    border: '1px solid #DAA520', // added border
    transition: 'all 0.3s', // added transition
    '&:hover': {
      backgroundColor: theme.palette.accent1.dark,
    },
  },
};

export default buttonStyles;
