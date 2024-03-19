import React from 'react';
import { Outlet } from 'react-router-dom';
import 'chart.js/auto';
import NavBar from './components/NavBar';
import './App.css';
import MyFooter from './components/MyFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <Outlet></Outlet>
        <MyFooter  />
      </AuthProvider>

    </div>
  );
};

export default App;
