import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom';

import About from './pages/About';
import Home from './pages/Home';
import Cartes from './pages/Cartes';

const DynamicPage = () => {
  const { page } = useParams();

  switch(page.toLowerCase()) {
    case "home":
      return <Home />;
    case "about":
      return <About />;
    case "cartes":
      return <Cartes />;
    default:
      return <Home />;
  }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cartes" element={<Cartes />} />
        <Route path="/about" element={<About />} />
        <Route path="/:page" element={<DynamicPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
