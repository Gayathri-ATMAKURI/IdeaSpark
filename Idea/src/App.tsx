import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AnimatedBackground from './components/AnimatedBackground';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import Landing from './pages/Landing';
import CardStack from './components/cards/CardStack';
import Results from './pages/Results';
import AiChat from './pages/AiChat';
import About from './pages/About';

const AppContent = () => {
  const location = useLocation();
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <AnimatedBackground />
      <ThemeToggle />
      <Header />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <Landing 
                isFirstVisit={isFirstVisit} 
                onVisit={() => setIsFirstVisit(false)} 
              />
            } 
          />
          <Route path="/swipe" element={<CardStack />} />
          <Route path="/results" element={<Results />} />
          <Route path="/ai-chat" element={<AiChat />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App; 