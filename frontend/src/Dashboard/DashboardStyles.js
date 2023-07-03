import { styled } from '@mui/system';

export const dashboardStyles = styled('div')(({ theme }) => ({
  title: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.accent1.main,
  },
  noApplications: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
    textAlign: 'center',
    paddingTop: theme.spacing(2),
  },
}));
