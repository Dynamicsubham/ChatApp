import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/home/index';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import './styles/main.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import { ProfileProvider } from './context/profile.context';


function App() {
  return (
    <ProfileProvider>
      <Switch>
      <PublicRoute path="/signin">
        <SignIn />
      </PublicRoute>
      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
    </Switch>
    </ProfileProvider>
    
  ) 
}

export default App;
