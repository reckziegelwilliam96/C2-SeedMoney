import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './NavBar';
import Home from './Home';
import NotFound from './NotFound';
import Registration from './Auth/Registration';
import Login from './Auth/Login';
import Profile from './Profile/Profile';
import EditProfile from './Profile/EditProfile';
import Grants from './Grant/Grant';
import GrantDetail from './Grant/GrantDetail';
import MyApplications from './Application/MyApplications';
import ApplicationDetail from './Application/ApplicationDetail';
import ApplicationForm from './Application/ApplicationForm';

const RoutesComponent = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/users/:userId" element={<Profile />} />
        <Route path="/users/:userId/edit" element={<EditProfile />} />
        <Route path="/grants" element={<Grants />} />
        <Route path="/grants/:grantId" element={<GrantDetail />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/applications/:applicationId" element={<ApplicationDetail />} />
        <Route path="/applications/:grantId" element={<ApplicationForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;
