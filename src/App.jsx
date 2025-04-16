import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home'
import Solit from './pages/solit/solit';
import Tanda from './pages/Tanda/tanda';
import Rafw from './pages/rafw/Rafw';
import Towork from './pages/towork/towork';
import HousingSearch from './pages/housing-search/housingsearch';
import Bhms from './pages/bhms/bhms';
import StudyEnglish from './pages/studyenglish/studyenglish';


import './App.css'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/solit" element={<Solit />} />
      <Route path="/tanda" element={<Tanda />} />
      <Route path="/rafw" element={<Rafw />} />
      <Route path="/towork" element={<Towork />} />
      <Route path="/housingsearch" element={<HousingSearch />} />
      <Route path="/bhms" element={<Bhms />} />
      <Route path="/studyenglish" element={<StudyEnglish />} />
    </Routes>
  </Router>
  )
}

export default App
