import { styled } from '@mui/system';

export const SideColumnStyles = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: '64px', // adjust this to the height of your NavBar
    left: 0,
    height: 'calc(100vh - 64px)', // subtract the height of the NavBar
    width: '33vh', // adjust this to change the width of the navbar
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    overflow: 'auto',
    padding: 0,
    boxSizing: 'border-box',
    margin: 0,
}));
