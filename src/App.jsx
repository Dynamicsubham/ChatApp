import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import './styles/main.scss';
import 'rsuite/dist/styles/rsuite-default.css';


function App() {
  return <Switch>
      <PublicRoute path="/signin">
        <SignIn />
      </PublicRoute>
      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
    </Switch>
}

export default App;
