import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import DramaDetails from './pages/DramaDetails';
import WatchEpisode from './pages/WatchEpisode';
import Header from './components/Header';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/drama/*" element={<DramaDetails />} />
          <Route path="/watch/:slug" element={<WatchEpisode />} />
        </Routes>
      </div>
    </Router>
  );
}