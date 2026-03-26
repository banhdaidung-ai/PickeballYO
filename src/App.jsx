import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Assets from './pages/Assets';
import Members from './pages/Members';
import Profile from './pages/Profile';
import Fund from './pages/Fund';
import AddTransaction from './pages/AddTransaction';
import SessionDetails from './pages/SessionDetails';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';

import AdminNews from './pages/AdminNews';
import NewsEditor from './pages/NewsEditor';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import Guide from './pages/Guide';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-surface flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="assets" element={<Assets />} />
          <Route path="fund" element={<Fund />} />
          <Route path="members" element={<Members />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<Admin />} />
          <Route path="news" element={<NewsList />} />
          <Route path="admin/news" element={<AdminNews />} />
          <Route path="guide" element={<Guide />} />
        </Route>
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/admin/news/new" element={<NewsEditor />} />
        <Route path="/admin/news/edit/:id" element={<NewsEditor />} />
        <Route path="/session/:id" element={<SessionDetails />} />
        <Route path="/fund/add" element={<AddTransaction />} />
        <Route path="/fund/edit/:id" element={<AddTransaction />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
