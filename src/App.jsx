import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Assets from './pages/Assets';
import Members from './pages/Members';
import Profile from './pages/Profile';
import SessionDetails from './pages/SessionDetails';
import Registration from './pages/Registration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="assets" element={<Assets />} />
          <Route path="members" element={<Members />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/session/:id" element={<SessionDetails />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
