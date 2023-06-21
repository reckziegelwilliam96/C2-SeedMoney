import React from 'react';
import RoutesComponent from './Routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/reducers/store';

function App() {
  return (
    <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RoutesComponent />
            </PersistGate>
        </Provider>
  );
}

export default App;
