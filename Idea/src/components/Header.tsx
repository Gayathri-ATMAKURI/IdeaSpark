import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl">💡</span>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              IdeaSpark
            </span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              to="/swipe"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/swipe'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Discover
            </Link>
            <Link
              to="/results"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/results'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Saved Ideas
            </Link>
            <Link
              to="/ai-chat"
              className={`text-sm font-medium transition-colors flex items-center ${
                location.pathname === '/ai-chat'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="mr-1">🤖</span>
              AI Chat
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/about'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 