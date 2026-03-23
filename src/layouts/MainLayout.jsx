import React from 'react';
import { Outlet } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';

const MainLayout = () => {
  return (
    <>
      <TopAppBar />
      <Outlet />
      <BottomNavBar />
    </>
  );
};

export default MainLayout;
