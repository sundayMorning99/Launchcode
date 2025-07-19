import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import Home from './components/Home'; 
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <NavBar />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} /> {/* any path other then '/' and '/search' will load NotFound page. */} 
        </Routes>
      </main>
    </Router>
  );
}

export default App;
