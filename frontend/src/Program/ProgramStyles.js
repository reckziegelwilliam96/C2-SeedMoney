import { styled } from '@mui/system';

export const programStyles = styled('div')(({ theme }) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: theme.spacing(1),
  },
  description: {
    flex: '1 0 auto',
  },
  link: {
    marginTop: 'auto',
  },
}));
