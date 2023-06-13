import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import Home from './Home';
import NotFound from './NotFound';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import Profile from '../Profile/Profile';
import GrantDetail from '../Grant/GrantDetail';
import MyApplications from '../Application/MyApplications';
import ApplicationDetail from '../Application/ApplicationDetail';
import ApplicationForm from '../Application/ApplicationForm';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/grants/:id" component={GrantDetail} />
        <Route path="/applications" exact component={MyApplications} />
        <Route path="/applications/:id" component={ApplicationDetail} />
        <Route path="/applications/:grantId" component={ApplicationForm} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
