import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface LandingProps {
  isFirstVisit: boolean;
  onVisit: () => void;
}

const Landing = ({ isFirstVisit, onVisit }: LandingProps) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    onVisit();
    navigate('/swipe');
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center max-w-3xl mx-auto"
      >
        <motion.h2 
          className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Transform Your Ideas into Reality
        </motion.h2>
        
        <motion.p 
          className="text-gray-400 text-lg max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Welcome to IDEA SPARK, where innovation meets execution. Start building your next big project with our powerful platform.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-purple-500/30 transition-shadow"
            onClick={handleGetStarted}
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* First Visit Animation */}
        {isFirstVisit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-8 text-sm text-gray-500"
          >
            ✨ New to IdeaSpark? Start your journey here!
          </motion.div>
        )}
      </motion.div>
    </motion.main>
  );
};

export default Landing; 