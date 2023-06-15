import React from 'react';
import RoutesComponent from './Routes';
import { Provider } from 'react-redux';
import store from './store/reducers/store';

function App() {
  return (
    <Provider store={store}>
      <RoutesComponent />
    </Provider>
  );
}

export default App;
