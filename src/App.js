import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Main, OTP } from './views';
import { store, persistor } from './redux/store/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={null}
        persistor={persistor}
      >
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/otp" component={OTP} />
        </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;