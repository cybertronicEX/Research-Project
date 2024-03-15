import React, { useState } from 'react';
import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './Components/Home';
import FashionProfiler from './Components/FashionProfiler/FashionProfiler';
// import DataExtraction from './Components/DataExtraction/DataExtraction';
import Navbar from './NavBar/NavBar';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import Recommender from './Components/Recommender/Recommender';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    console.log("Logging in with:", username, password);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route path="login" element={<Login handleLogin={handleLogin} />} />
      <Route
        path="/*"
        element={
          isLoggedIn ? (
            <Routes>
              <Route path="/" element={<><Navbar handleLogout={handleLogout} /><div className="container"><Home /></div></>} />
              <Route path="/fashionProfiler" element={<><Navbar handleLogout={handleLogout} /><div className="container"><FashionProfiler /></div></>} />
              {/* <Route path="/dataExtraction" element={<><Navbar handleLogout={handleLogout} /><div className="container"><DataExtraction /></div></>} /> */}
              <Route path="/profile" element={<><Navbar handleLogout={handleLogout} /><div className="container"><Profile /></div></>} />
              <Route path="/recommender" element={<><Navbar handleLogout={handleLogout} /><div className="container"><Recommender /></div></>} />
            </Routes>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
