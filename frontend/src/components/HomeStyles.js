// HomeStyles.js
import { styled } from '@mui/system';
import { theme } from './ThemeStyles'; // Please adjust this import path to where your theme is actually located

export const HomeContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  padding: theme.spacing(4),
});

export const Title = styled('h1')({
  fontSize: '2.5em',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
});

export const Slogan = styled('h2')({
  fontSize: '1.5em',
  color: theme.palette.secondary.main,
  marginBottom: theme.spacing(4),
});

export const WelcomeMessage = styled('h3')({
  fontSize: '1.2em',
  color: theme.palette.primary.dark,
  marginBottom: theme.spacing(2),
});

export const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
});

export const MainContent = styled('div')({
  flexGrow: 1,
});
