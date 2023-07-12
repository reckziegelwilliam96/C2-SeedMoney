import { theme } from '../components/ThemeStyles';

const ProfileStyles = {
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centers the grid on the page
  },
  card: {
    padding: theme.spacing(2),
    borderRadius: '0.5rem',
    boxShadow: theme.shadows[2],
    marginBottom: theme.spacing(2),
    width: '100%', // Ensures the card takes up the full width of its container
    maxWidth: '800px', // Limits the maximum width of the card
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: '0.5rem',
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    '&:hover': {
      backgroundColor: theme.palette.accent2.main,
    },
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%', // Ensures the grid item takes up the full width of its container
    maxWidth: '800px', // Limits the maximum width of the grid item
  },
};

export { ProfileStyles };
