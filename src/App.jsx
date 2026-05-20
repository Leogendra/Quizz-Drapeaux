import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Descriptions from './pages/Descriptions';
import France from './pages/France';
import Etats from './pages/Etats';
import Cartes from './pages/Cartes';
import About from './pages/About';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/descriptions" element={<Descriptions />} />
        <Route path="/etats" element={<Etats />} />
        <Route path="/france" element={<France />} />
        <Route path="/cartes" element={<Cartes />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};