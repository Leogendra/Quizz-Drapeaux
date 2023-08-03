import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Cartes from './pages/Cartes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cartes" element={<Cartes />} />
        <Route path="/about" element={<About />} />
        
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;