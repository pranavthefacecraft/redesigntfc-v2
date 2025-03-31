import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home'
import Solit from './pages/solit/solit';

import './App.css'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/solit" element={<Solit />} />
    </Routes>
  </Router>
  )
}

export default App
