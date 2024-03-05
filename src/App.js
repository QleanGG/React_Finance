import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'chart.js/auto';
import StockSearch from './components/StockSearch';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Register from './components/Register'; // Ensure this path is correct
import Login from './components/Login'; // Ensure this path is correct
import './App.css';
import MyFooter from './components/MyFooter';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './AuthContext';
import ProfilePage from './components/Profile/ProfilePage';


const App = () => {

  
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <Outlet></Outlet>
        <MyFooter />
      </AuthProvider>

    </div>
  );
};

export default App;
