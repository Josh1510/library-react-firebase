import React from 'react';
import Signup from './accountmanagment/Signup';
import Signin from './accountmanagment/Signin';
import ForgotPassword from './accountmanagment/ForgotPassword.js';
import Dashboard from './accountmanagment/Dashboard';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './accountmanagment/PrivateRoute';
import UpdateProfile from './accountmanagment/UpdateProfile';
import Library from './library/Library';

// Initialise firebase app

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute path="/user-dashboard" component={Dashboard} />
            <PrivateRoute path="/" component={Library} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
