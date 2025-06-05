import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/booking/:id" element={<Booking />} />
  </Routes>
);

export default App;
