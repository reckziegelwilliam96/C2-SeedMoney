import React, { useState } from 'react';
import RoutesComponent from './Routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/reducers/store';
import { logout } from './store/actions/userActions';

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RoutesComponent onLogout={handleLogout} logoutKey={logoutKey} />
      </PersistGate>
    </Provider>
  );
}

export default App;
