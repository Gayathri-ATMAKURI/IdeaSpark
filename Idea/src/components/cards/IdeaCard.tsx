import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  color: string;
}

interface IdeaCardProps {
  idea: Idea;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop?: boolean;
}

const IdeaCard = ({ idea, onSwipe, isTop = false }: IdeaCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  
  const handleDragStart = () => setIsDragging(true);
  
  const handleDragEnd = (_event: never, info: { offset: { x: number } }) => {
    const swipeThreshold = 100;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      onSwipe(info.offset.x > 0 ? 'right' : 'left');
    }
  };

  // Add keyboard controls
  useEffect(() => {
    if (!isTop) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          onSwipe('left');
          break;
        case 'ArrowRight':
          onSwipe('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTop, onSwipe]);

  return (
    <motion.div
      style={{
        x,
        rotate,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={controls}
      className="absolute w-[340px] h-[440px] rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing bg-white/95 will-change-transform"
    >
      <div className="w-full h-full rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
        {/* Enhanced Glass Background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, ${idea.color}30, ${idea.color}50)`,
            backdropFilter: 'blur(12px)',
            boxShadow: `inset 0 0 100px ${idea.color}25`,
          }}
        />

        {/* Text Protection Layer */}
        <motion.div
          className="absolute inset-0 z-1 opacity-40"
          style={{
            background: `linear-gradient(180deg, 
              rgba(255,255,255,0.95) 0%, 
              rgba(255,255,255,0.8) 50%, 
              rgba(255,255,255,0.95) 100%)`
          }}
        />

        <div className="relative z-10 flex flex-col gap-6">
          <motion.div 
            className="flex items-center"
            animate={{ scale: isDragging ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span 
              className="px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              style={{ 
                backgroundColor: `${idea.color}35`,
                color: idea.color,
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.9)',
                boxShadow: `0 4px 15px ${idea.color}40`
              }}
            >
              {idea.category}
            </span>
          </motion.div>

          <motion.h3 
            className="text-2xl font-bold text-gray-900"
            style={{
              textShadow: '0 2px 4px rgba(255, 255, 255, 0.8)',
              WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.1)'
            }}
          >
            {idea.title}
          </motion.h3>
          
          <motion.p 
            className="text-base text-gray-800 leading-relaxed"
            style={{
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.6)',
              WebkitTextStroke: '0.2px rgba(0, 0, 0, 0.05)'
            }}
          >
            {idea.description}
          </motion.p>
        </div>

        {/* Swipe Indicators */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none">
          <motion.div
            className="bg-red-500/80 text-white px-6 py-3 rounded-full font-medium"
            style={{ opacity: useTransform(x, [-50, 0], [0.8, 0]) }}
          >
            Skip
          </motion.div>
          <motion.div
            className="bg-green-500/80 text-white px-6 py-3 rounded-full font-medium"
            style={{ opacity: useTransform(x, [0, 50], [0, 0.8]) }}
          >
            Save
          </motion.div>
        </div>
        
        <div className="relative z-10 flex justify-between items-center mt-8">
          <motion.div 
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-xl backdrop-blur-sm"
            style={{ 
              opacity: useTransform(x, [-50, 0], [1, 0.3]),
              scale: useTransform(x, [-100, 0], [1.1, 1])
            }}
          >
            <span className="text-red-500 text-2xl">✕</span>
          </motion.div>
          
          <motion.div 
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-xl backdrop-blur-sm"
            style={{ 
              opacity: useTransform(x, [0, 50], [0.3, 1]),
              scale: useTransform(x, [0, 100], [1, 1.1])
            }}
          >
            <span className="text-green-500 text-2xl">✓</span>
          </motion.div>
        </div>

        {/* Enhanced Interactive Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle at ${isDragging ? '50%' : '100%'} 50%, ${idea.color}30 0%, transparent 70%)`,
            opacity: useTransform(x, [-200, 0, 200], [0.8, 0, 0.8]),
            mixBlendMode: 'soft-light'
          }}
        />
      </div>
    </motion.div>
  );
};

export default IdeaCard; 