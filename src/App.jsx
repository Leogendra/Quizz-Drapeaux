import { BrowserRouter, Routes, Route } from 'react-router-dom';

import About from './pages/About';
import Home from './pages/Home';
import France from './pages/France';
import Etats from './pages/Etats';
import Cartes from './pages/Cartes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/etats" element={<Etats />} />
        <Route path="/france" element={<France />} />
        <Route path="/cartes" element={<Cartes />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};