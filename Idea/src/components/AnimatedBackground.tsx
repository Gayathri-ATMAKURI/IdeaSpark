import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20" />
      
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20"
        animate={{
          backgroundPosition: [
            '0% 0%',
            '100% 100%',
            '0% 0%',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '400% 400%',
        }}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: mousePosition.x * 20 - 10,
          y: mousePosition.y * 20 - 10,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      >
        {/* Lightbulb */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-4xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          💡
        </motion.div>

        {/* Rocket */}
        <motion.div
          className="absolute top-1/3 right-1/4 text-4xl"
          animate={{
            y: [0, -30, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🚀
        </motion.div>

        {/* Sparkles */}
        <motion.div
          className="absolute bottom-1/4 left-1/3 text-4xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ✨
        </motion.div>
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
    </div>
  );
};

export default AnimatedBackground; 