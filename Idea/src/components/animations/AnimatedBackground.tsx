import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  
  const particles = Array.from({ length: 50 });
  const gradientPos = useMotionValue(0);
  const gradient = useTransform(
    gradientPos,
    [0, 1],
    [
      'linear-gradient(45deg, rgba(99,91,255,0.15) 0%, rgba(0,184,217,0.15) 50%, rgba(255,92,162,0.15) 100%)',
      'linear-gradient(225deg, rgba(99,91,255,0.15) 0%, rgba(0,184,217,0.15) 50%, rgba(255,92,162,0.15) 100%)'
    ]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: clientX / innerWidth,
        y: clientY / innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    controls.start({
      background: [
        'linear-gradient(45deg, rgba(99,91,255,0.15), rgba(0,184,217,0.15), rgba(255,92,162,0.15))',
        'linear-gradient(225deg, rgba(99,91,255,0.15), rgba(0,184,217,0.15), rgba(255,92,162,0.15))'
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear'
      }
    });

    let timeout: NodeJS.Timeout;
    const moveGradient = () => {
      gradientPos.set(0);
      controls.start({
        backgroundPosition: ['0% 0%', '100% 100%'],
        transition: {
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }
      });
      timeout = setTimeout(moveGradient, 20000);
    };
    moveGradient();
    return () => clearTimeout(timeout);
  }, [controls, gradientPos]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          background: gradient,
          backgroundSize: '400% 400%'
        }}
        animate={controls}
      />
      
      {particles.map((_, i) => {
        const x = useMotionValue(Math.random() * 100);
        const y = useMotionValue(Math.random() * 100);
        const size = Math.random() * 3 + 1;
        const delay = Math.random() * 5;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              x: `${x.get()}%`,
              y: `${y.get()}%`,
              width: size,
              height: size,
              background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
              boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.3)`
            }}
            animate={{
              x: [
                `${x.get()}%`,
                `${x.get() + (mousePosition.x - 0.5) * 20}%`,
                `${x.get()}%`
              ],
              y: [
                `${y.get()}%`,
                `${y.get() + (mousePosition.y - 0.5) * 20}%`,
                `${y.get()}%`
              ],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: delay,
              ease: 'easeInOut'
            }}
          />
        );
      })}

      <svg className="absolute inset-0 w-full h-full opacity-30">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" />
          <feDisplacementMap in="SourceGraphic" scale="50" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
};

export default AnimatedBackground; 