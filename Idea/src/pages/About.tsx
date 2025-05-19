import { motion } from 'framer-motion';
import { useState } from 'react';

const techStack = [
  {
    name: 'React 18',
    icon: '⚛️',
    description: 'Modern UI development with the latest React features',
    link: 'https://reactjs.org'
  },
  {
    name: 'TypeScript',
    icon: '📝',
    description: 'Type-safe development for better code quality',
    link: 'https://www.typescriptlang.org'
  },
  {
    name: 'Tailwind CSS',
    icon: '🎨',
    description: 'Utility-first CSS framework for rapid UI development',
    link: 'https://tailwindcss.com'
  },
  {
    name: 'Framer Motion',
    icon: '🎬',
    description: 'Production-ready animation library',
    link: 'https://www.framer.com/motion'
  },
  {
    name: 'Zustand',
    icon: '📦',
    description: 'Lightweight state management solution',
    link: 'https://github.com/pmndrs/zustand'
  },
  {
    name: 'Vite',
    icon: '🚀',
    description: 'Next generation frontend tooling',
    link: 'https://vitejs.dev'
  }
];

interface EasterEggProps {
  show: boolean;
  onClose: () => void;
}

const AnimatedEasterEgg = ({ show, onClose }: EasterEggProps) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-8 rounded-2xl text-center"
        animate={{
          rotate: [0, 10, -10, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-4">🎉 You Found It!</h3>
        <p className="text-lg">
          You've discovered our hidden easter egg! Keep exploring for more surprises...
        </p>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleLogoClick = () => {
    setShowEasterEgg(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-6xl mb-6 cursor-pointer inline-block"
          onClick={handleLogoClick}
        >
          💡
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
          About Idea Spark
        </h1>
        <p className="text-xl text-gray-300">
          Reimagining ideation through elegant design and delightful interactions
        </p>
      </motion.div>

      {/* Team Story */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto mb-20"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
        <motion.div
          className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-lg border border-gray-700"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="text-gray-300 leading-relaxed mb-6">
            Idea Spark was born from a simple observation: great ideas often come when we least expect them, but we need an elegant way to capture and organize them. We built this platform to make ideation as natural as swiping through your favorite social media feed.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Our mission is to help creators, developers, and innovators discover and collect inspiring project ideas through a beautiful and intuitive interface. We believe that the next big innovation might just be a swipe away.
          </p>
        </motion.div>
      </motion.section>

      {/* Tech Stack */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Tech Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, index) => (
            <motion.a
              key={tech.name}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-lg border border-gray-700 hover:border-primary-500 transition-colors"
            >
              <span className="text-4xl mb-4 block">{tech.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
              <p className="text-gray-400">{tech.description}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* GitHub Integration */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-8">Connect With Us</h2>
        <motion.a
          href="https://github.com/yourusername/ideaspark"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-6 h-6 mr-3"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
              clipRule="evenodd"
            />
          </svg>
          Star us on GitHub
        </motion.a>
      </motion.section>

      {/* Easter Egg */}
      <AnimatedEasterEgg show={showEasterEgg} onClose={() => setShowEasterEgg(false)} />
    </div>
  );
};

export default About; 