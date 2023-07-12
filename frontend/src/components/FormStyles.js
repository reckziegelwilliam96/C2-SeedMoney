import { theme } from './ThemeStyles';

const formStyles = {
    root: {
      padding: theme.spacing(3), // Increased padding for better readability
      backgroundColor: '#E8F5E9',
      color: '#000000',
    },
    input: {
      backgroundColor: '#ffffff',
      borderColor: theme.palette.secondary.main,
      borderRadius: 4,
      padding: '10px', // Added padding for better readability
      '&::placeholder': {
        color: '#808080', // Changed to a lighter color for better contrast
      },
    },
    button: {
      backgroundColor: theme.palette.accent1.main,
      color: '#ffffff',
      borderRadius: 4,
      '&:hover': {
        backgroundColor: theme.palette.accent1.dark,
        transition: 'background-color 0.3s ease', // Added transition for a smoother hover effect
      },
    },
  };

export { formStyles };
