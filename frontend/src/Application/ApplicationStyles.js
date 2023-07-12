import { theme } from '../components/ThemeStyles';

const applicationStyles = {
  card: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 5px rgba(0, 0, 0, 0.06), 0px 1px 10px rgba(0, 0, 0, 0.04)',
    borderRadius: '5px', // added border radius
    transition: 'padding 0.3s', // added transition
  },
  list: {
    container: {
      marginBottom: theme.spacing(2),
      backgroundColor: '#F0FFF0', // added background color
    },
  },
};

export { applicationStyles };
