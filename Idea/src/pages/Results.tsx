import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useIdeaStore from '../store/useIdeaStore';

const Results = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');
  const savedIdeas = useIdeaStore((state) => state.savedIdeas);

  const filteredIdeas = filter === 'all' 
    ? savedIdeas 
    : savedIdeas.filter(idea => idea.category === filter);

  const categories = ['all', ...new Set(savedIdeas.map(idea => idea.category))];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Your Saved Ideas
          </h1>
          <p className="text-gray-400">
            {savedIdeas.length} ideas saved
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Ideas Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredIdeas.map((idea) => (
            <motion.div
              key={idea.title}
              variants={item}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                  {idea.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {idea.title}
              </h3>
              <p className="text-gray-400">
                {idea.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredIdeas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 mb-4">No ideas found in this category</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/swipe')}
              className="px-6 py-3 bg-blue-600 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Discover More Ideas
            </motion.button>
          </motion.div>
        )}

        {/* Restart Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/swipe')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg"
          >
            Start Over
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Results; 