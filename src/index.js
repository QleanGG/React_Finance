import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import StockSearch from './components/StockSearch';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import StockPage from './components/StockPage';
import About from './components/About';
import StockDetail from './components/StockDetail';
import ProfilePage from './components/Profile/ProfilePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}></Route>
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stocks" element={<StockPage />} />
          <Route path="/stocks/:symbol" element={<StockDetail />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);