import { motion, AnimatePresence } from 'framer-motion';
import IdeaCard from './IdeaCard';
import { useState, useMemo } from 'react';
import SoundEffects from '../audio/SoundEffects';
import useIdeaStore from '../../store/useIdeaStore';

// Demo ideas for the hackathon (could be loaded from API, but hardcoded for now)
const demoIdeas = [
  {
    id: 1,
    title: "AI-Powered Recipe Generator",
    description: "Create an app that generates unique recipes based on available ingredients using artificial intelligence and suggests wine pairings.",
    category: "AI/ML",
    color: "#635BFF"
  },
  {
    id: 2,
    title: "Social Impact Tracker",
    description: "Build a platform that helps people track and share their environmental and social impact activities, with gamification elements.",
    category: "Social",
    color: "#00B8D9"
  },
  {
    id: 3,
    title: "AR Fitness Coach",
    description: "Develop an augmented reality fitness coach that provides real-time form corrections and workout guidance with 3D motion tracking.",
    category: "Health",
    color: "#FF5CA2"
  },
  {
    id: 4,
    title: "Smart Study Planner",
    description: "An AI-driven study planner that adapts to your learning style and creates personalized study schedules with spaced repetition.",
    category: "Education",
    color: "#36B37E"
  },
  {
    id: 5,
    title: "Mindful Meditation App",
    description: "A meditation app that uses biometric feedback to customize sessions and track mental wellness progress over time.",
    category: "Health",
    color: "#FF5CA2"
  },
  {
    id: 6,
    title: "Community Skill Exchange",
    description: "Platform where people can trade skills and knowledge, creating a time-based economy for learning and teaching.",
    category: "Social",
    color: "#00B8D9"
  },
  {
    id: 7,
    title: "AI Music Composer",
    description: "Create an AI that composes original music based on emotions, images, or text input, with collaborative features.",
    category: "AI/ML",
    color: "#635BFF"
  },
  {
    id: 8,
    title: "Smart Garden Monitor",
    description: "IoT device that monitors plant health, automates watering, and provides care recommendations using ML algorithms.",
    category: "IoT",
    color: "#00875A"
  },
  {
    id: 9,
    title: "Language Learning Game",
    description: "An immersive language learning game that uses AR to place vocabulary in real-world contexts with native speaker interactions.",
    category: "Education",
    color: "#36B37E"
  },
  {
    id: 10,
    title: "Sustainable Fashion Tracker",
    description: "App that tracks the environmental impact of your wardrobe and suggests sustainable alternatives with local availability.",
    category: "Social",
    color: "#00B8D9"
  },
  {
    id: 11,
    title: "Virtual Pet Therapist",
    description: "AI-powered virtual pet that provides emotional support and helps with mental health exercises through interactive play.",
    category: "Health",
    color: "#FF5CA2"
  },
  {
    id: 12,
    title: "Smart Home Energy Optimizer",
    description: "IoT system that learns your habits and automatically optimizes energy usage while maintaining comfort levels.",
    category: "IoT",
    color: "#00875A"
  },
  {
    id: 13,
    title: "Personal Finance AI Advisor",
    description: "AI-powered financial advisor that provides personalized investment strategies and budget recommendations based on spending patterns.",
    category: "AI/ML",
    color: "#635BFF"
  },
  {
    id: 14,
    title: "Local Food Network",
    description: "Platform connecting local farmers with consumers, enabling direct farm-to-table purchases and reducing food waste.",
    category: "Social",
    color: "#00B8D9"
  },
  {
    id: 15,
    title: "Sleep Quality Optimizer",
    description: "Smart alarm system that tracks sleep cycles and wakes you at the optimal time, with personalized recommendations for better sleep.",
    category: "Health",
    color: "#FF5CA2"
  },
  {
    id: 16,
    title: "Interactive History Explorer",
    description: "Educational platform using VR to let students experience historical events firsthand through immersive simulations.",
    category: "Education",
    color: "#36B37E"
  },
  {
    id: 17,
    title: "Smart Traffic Management",
    description: "IoT system for optimizing traffic flow in real-time using AI and connected sensors throughout the city.",
    category: "IoT",
    color: "#00875A"
  },
  {
    id: 18,
    title: "AI Interview Coach",
    description: "Practice interviews with AI that provides real-time feedback on your responses, body language, and speech patterns.",
    category: "AI/ML",
    color: "#635BFF"
  },
  {
    id: 19,
    title: "Community Service Matcher",
    description: "App that matches volunteers with local community service opportunities based on skills and interests.",
    category: "Social",
    color: "#00B8D9"
  },
  {
    id: 20,
    title: "Posture Correction System",
    description: "Wearable device that monitors posture and provides gentle reminders to maintain proper alignment throughout the day.",
    category: "Health",
    color: "#FF5CA2"
  },
  {
    id: 21,
    title: "Math Visualization Tool",
    description: "Interactive platform that makes complex mathematical concepts easier to understand through 3D visualizations and animations.",
    category: "Education",
    color: "#36B37E"
  },
  {
    id: 22,
    title: "Smart Waste Sorter",
    description: "IoT-enabled waste bin that automatically sorts recyclables and provides recycling statistics and rewards.",
    category: "IoT",
    color: "#00875A"
  },
  {
    id: 23,
    title: "AI Art Collaborator",
    description: "Creative tool that helps artists generate new ideas and variations of their work using machine learning.",
    category: "AI/ML",
    color: "#635BFF"
  },
  {
    id: 24,
    title: "Elderly Care Network",
    description: "Platform connecting seniors with local helpers for daily tasks, social interaction, and emergency assistance.",
    category: "Social",
    color: "#00B8D9"
  },
  {
    id: 25,
    title: "Nutrition Optimizer",
    description: "App that analyzes your diet and suggests personalized meal plans to meet specific health goals and dietary requirements.",
    category: "Health",
    color: "#FF5CA2"
  },
  {
    id: 26,
    title: "Virtual Science Lab",
    description: "VR platform for conducting science experiments safely, with realistic simulations and interactive learning modules.",
    category: "Education",
    color: "#36B37E"
  },
  {
    id: 27,
    title: "Smart Water Monitor",
    description: "IoT system for tracking household water usage and detecting leaks, with automated conservation features.",
    category: "IoT",
    color: "#00875A"
  },
  {
    id: 28,
    title: "AI Travel Planner",
    description: "Intelligent travel assistant that creates personalized itineraries based on your interests, budget, and travel style.",
    category: "AI/ML",
    color: "#635BFF"
  },
  {
    id: 29,
    title: "Local Event Hub",
    description: "Platform for discovering and organizing community events, with features for local businesses and artists.",
    category: "Social",
    color: "#00B8D9"
  },
  {
    id: 30,
    title: "Mental Health Tracker",
    description: "App that helps monitor mood patterns and provides personalized coping strategies and professional resources.",
    category: "Health",
    color: "#FF5CA2"
  },
  {
    id: 31,
    title: "Coding Game Platform",
    description: "Interactive platform teaching programming through engaging games and real-world project challenges.",
    category: "Education",
    color: "#36B37E"
  },
  {
    id: 32,
    title: "Smart Parking System",
    description: "IoT solution for finding available parking spots in real-time, with automated payment and reservation features.",
    category: "IoT",
    color: "#00875A"
  },
  {
    id: 33,
    title: "AI Writing Assistant",
    description: "Smart writing tool that helps improve content quality with style suggestions and automated editing features.",
    category: "AI/ML",
    color: "#635BFF"
  },
  {
    id: 34,
    title: "Skill Share Economy",
    description: "Platform for trading professional skills and services within local communities, using a point-based system.",
    category: "Social",
    color: "#00B8D9"
  },
  {
    id: 35,
    title: "Fitness Challenge Platform",
    description: "Social fitness app that creates personalized workout challenges and connects users with similar fitness goals.",
    category: "Health",
    color: "#FF5CA2"
  },
  {
    id: 36,
    title: "Language Exchange Hub",
    description: "Platform matching language learners for conversation practice, with AI-powered pronunciation feedback.",
    category: "Education",
    color: "#36B37E"
  },
  {
    id: 37,
    title: "Smart Air Quality Monitor",
    description: "IoT device that tracks indoor air quality and automatically adjusts ventilation systems for optimal breathing conditions.",
    category: "IoT",
    color: "#00875A"
  },
  {
    id: 38,
    title: "AI Career Coach",
    description: "Career development platform using AI to provide personalized job recommendations and skill development paths.",
    category: "AI/ML",
    color: "#635BFF"
  },
  {
    id: 39,
    title: "Community Garden Manager",
    description: "App for coordinating community garden activities, sharing resources, and tracking plant growth.",
    category: "Social",
    color: "#00B8D9"
  },
  {
    id: 40,
    title: "Stress Relief Assistant",
    description: "App offering personalized stress management techniques using biometric feedback and guided exercises.",
    category: "Health",
    color: "#FF5CA2"
  },
  {
    id: 41,
    title: "AR Chemistry Lab",
    description: "Augmented reality app for visualizing chemical reactions and molecular structures in 3D space.",
    category: "Education",
    color: "#36B37E"
  },
  {
    id: 42,
    title: "Smart Security System",
    description: "IoT-based home security solution with AI-powered threat detection and automated response features.",
    category: "IoT",
    color: "#00875A"
  },
  {
    id: 43,
    title: "AI Fashion Designer",
    description: "Platform that generates unique clothing designs based on user preferences and current fashion trends.",
    category: "AI/ML",
    color: "#635BFF"
  },
  {
    id: 44,
    title: "Time Bank Platform",
    description: "Community service exchange where people trade time and skills instead of money.",
    category: "Social",
    color: "#00B8D9"
  },
  {
    id: 45,
    title: "Personalized Health Coach",
    description: "AI-powered health coach that creates custom wellness plans based on individual health data and goals.",
    category: "Health",
    color: "#FF5CA2"
  },
  {
    id: 46,
    title: "Interactive Music Teacher",
    description: "Platform that teaches music theory and instrument playing through interactive lessons and real-time feedback.",
    category: "Education",
    color: "#36B37E"
  },
  {
    id: 47,
    title: "Smart Lighting System",
    description: "IoT lighting solution that adapts to natural light levels and user activities for optimal energy efficiency.",
    category: "IoT",
    color: "#00875A"
  },
  {
    id: 48,
    title: "AI Personal Stylist",
    description: "Fashion recommendation system that suggests outfits based on your style, weather, and occasion.",
    category: "AI/ML",
    color: "#635BFF"
  },
  {
    id: 49,
    title: "Pet Sitting Network",
    description: "Platform connecting pet owners with trusted local pet sitters, including real-time updates and tracking.",
    category: "Social",
    color: "#00B8D9"
  },
  {
    id: 50,
    title: "Habit Formation Coach",
    description: "App that helps users build positive habits through personalized challenges and progress tracking.",
    category: "Health",
    color: "#FF5CA2"
  }
];

const CardStack = () => {
  // Category filter state
  const [categories] = useState(['All', 'AI/ML', 'Social', 'Health', 'Education', 'IoT']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  // Animation and swipe state
  const [lastSwipeDirection, setLastSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [playSwipeRight, setPlaySwipeRight] = useState(false);
  const [playSwipeLeft, setPlaySwipeLeft] = useState(false);
  const [showTickAnimation, setShowTickAnimation] = useState(false);

  // Zustand store for saved/viewed ideas
  const addIdea = useIdeaStore((state) => state.addIdea);
  const viewedIdeaIds = useIdeaStore((state) => state.viewedIdeaIds);
  const addViewedIdea = useIdeaStore((state) => state.addViewedIdea);

  // Filter out already viewed ideas (so you can't swipe the same one twice)
  const availableIdeas = useMemo(() => {
    return demoIdeas.filter(idea => !viewedIdeaIds.includes(idea.id));
  }, [viewedIdeaIds]);

  // Main swipe handler
  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return; // Don't allow double swipes
    setIsAnimating(true);
    setLastSwipeDirection(direction);
    // Get the top idea
    const currentIdea = filteredIdeas[0];
    if (currentIdea) {
      // Mark as viewed
      addViewedIdea(currentIdea.id);
      if (direction === 'right') {
        setPlaySwipeRight(true);
        setShowTickAnimation(true);
        setConfetti(true);
        // Save the idea to the store
        addIdea({
          id: currentIdea.id,
          title: currentIdea.title,
          description: currentIdea.description,
          category: currentIdea.category,
          color: currentIdea.color,
        });
        // Hide tick/confetti after a bit
        setTimeout(() => {
          setShowTickAnimation(false);
          setConfetti(false);
          setPlaySwipeRight(false);
        }, 1500);
      } else {
        setPlaySwipeLeft(true);
        setTimeout(() => setPlaySwipeLeft(false), 1000); // 1s for wrong animation
      }
    }
    // Reset animation lock
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };

  // Button click handler (for the big ✓ and ✕ buttons)
  const handleButtonClick = (direction: 'left' | 'right') => {
    if (isAnimating || filteredIdeas.length === 0) return;
    handleSwipe(direction);
  };

  // Filter ideas by category
  const filteredIdeas = selectedCategory === 'All'
    ? availableIdeas
    : availableIdeas.filter(idea => idea.category === selectedCategory);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-8">
      {/* Category Filter Bar */}
      <motion.div
        className="flex gap-3 mb-12 flex-wrap justify-center max-w-2xl px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Render category filter buttons */}
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all relative
              ${selectedCategory === category
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Card Stack Area */}
      <div className="relative h-[440px] w-[340px]">
        <AnimatePresence mode="popLayout">
          {/* Show up to 3 cards in the stack */}
          {filteredIdeas.slice(0, 3).map((idea, index) => (
            <motion.div
              key={idea.id}
              style={{
                zIndex: filteredIdeas.length - index,
              }}
              className="absolute top-0 left-0 right-0"
              initial={false}
              animate={{
                scale: 1 - index * 0.05,
                y: index * 15,
                opacity: 1 - index * 0.2,
              }}
              transition={{
                duration: 0.2,
                ease: 'easeOut'
              }}
              exit={{
                x: lastSwipeDirection === 'left' ? -300 : 300,
                opacity: 0,
                transition: { duration: 0.2 }
              }}
            >
              {/* The actual idea card */}
              <IdeaCard
                idea={idea}
                onSwipe={handleSwipe}
                isTop={index === 0}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Tick Animation (for right swipe) */}
        {showTickAnimation && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-green-500/90 rounded-full p-4 shadow-lg flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </motion.div>
        )}
        {/* Wrong Animation (for left swipe) */}
        {playSwipeLeft && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-red-500/90 rounded-full p-4 shadow-lg flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </motion.div>
        )}

        {/* Empty State Message */}
        {filteredIdeas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center p-8 rounded-2xl bg-gray-100/80 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No more ideas!
              </h3>
              <p className="text-gray-600">
                Check other categories or come back later.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Action Buttons (bottom) */}
      <motion.div
        className="mt-8 flex items-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonClick('left')}
          className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          disabled={isAnimating || filteredIdeas.length === 0}
        >
          <span className="text-red-500 text-3xl select-none">✕</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonClick('right')}
          className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          disabled={isAnimating || filteredIdeas.length === 0}
        >
          <span className="text-green-500 text-3xl select-none">✓</span>
        </motion.button>
      </motion.div>

      {/* Progress Bar (shows how many ideas left) */}
      <motion.div
        className="mt-6 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="text-gray-600 font-medium min-w-[100px] text-right">
          {filteredIdeas.length} remaining
        </span>
        <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: '100%' }}
            animate={{
              width: `${(filteredIdeas.length / demoIdeas.length) * 100}%`,
              backgroundColor: filteredIdeas.length < 3 ? '#ef4444' : '#10b981'
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Sound Effects (swipe left/right) */}
      <SoundEffects
        playSwipeRight={playSwipeRight}
        playSwipeLeft={playSwipeLeft}
      />

      {/* Confetti Effect (for right swipe) */}
      {confetti && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-500 rounded-full"
              initial={{
                top: '50%',
                left: '50%',
                scale: 0,
              }}
              animate={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 1 + Math.random(),
                ease: 'easeOut',
                delay: Math.random() * 0.2,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CardStack; 