import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './App.css'
import Home from './pages/Home'
import Browse from './pages/Browse'
import MovieDetail from './pages/MovieDetail'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const bbInstanceRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    const initBetterbugs = async () => {
      if (typeof window !== 'undefined') {
        const { default: Betterbugs } = await import('@betterbugs/web-sdk');
        const instance = new Betterbugs({
          apiKey: '87585a4e6feae0303b3c679663f68623',
          mode: 'production',
        });
        if (isMounted) {
          bbInstanceRef.current = instance;
        }
      }
    };
    initBetterbugs();
    return () => {
      isMounted = false;
      bbInstanceRef.current?.destroy?.();
    };
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
