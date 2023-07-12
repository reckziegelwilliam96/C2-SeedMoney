import { styled } from '@mui/system';

export const SideColumnStyles = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: '64px', // increased top margin
    left: 0,
    height: 'calc(100vh - 80px)', // adjust height accordingly
    width: '33vh',
    backgroundColor: '#F0FFF0', // light green background
    boxShadow: '0px 5px 15px rgba(0,0,0,0.1)', // larger shadow
    overflow: 'auto',
    padding: theme.spacing(2), // added padding
    boxSizing: 'border-box',
    transition: 'top 0.3s',
}));
