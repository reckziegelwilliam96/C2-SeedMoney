import React, { useState } from 'react';
import RoutesComponent from './components/Routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/reducers/store';
import { logout } from './store/actions/userActions';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './components/ThemeStyles';

function App() {
  const [logoutKey, setLogoutKey] = useState(Date.now());

  const handleLogout = () => {
    store.dispatch(logout());
    persistor.purge();
    setLogoutKey(Date.now());
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RoutesComponent onLogout={handleLogout} logoutKey={logoutKey} />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
