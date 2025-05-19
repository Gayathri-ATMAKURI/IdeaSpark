import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IdeaCard from '../components/IdeaCard';
import toast from 'react-hot-toast';

// Sample ideas data
const ideas = [
  {
    id: 1,
    title: "AI-Powered Personal Stylist 👗",
    description: "An app that uses AI to analyze your wardrobe and suggest outfits based on your style preferences, weather, and occasion.",
    category: "AI/ML",
    difficulty: "Advanced",
    color: "#FF5CA2"
  },
  {
    id: 2,
    title: "Smart Plant Care System 🌱",
    description: "IoT device that monitors plant health, watering needs, and provides care recommendations through a mobile app.",
    category: "IoT",
    difficulty: "Intermediate",
    color: "#00B8D9"
  },
  {
    id: 3,
    title: "Virtual Study Groups 📚",
    description: "Platform connecting students worldwide for real-time study sessions, resource sharing, and collaborative learning.",
    category: "Education",
    difficulty: "Beginner",
    color: "#635BFF"
  },
  {
    id: 4,
    title: "Health Habit Tracker 💪",
    description: "App that gamifies healthy habits, tracks progress, and connects users with similar health goals.",
    category: "Health",
    difficulty: "Intermediate",
    color: "#00B8D9"
  },
  {
    id: 5,
    title: "Local Event Discovery 🎉",
    description: "Social platform for discovering and organizing local events, meetups, and community activities.",
    category: "Social",
    difficulty: "Beginner",
    color: "#FF5CA2"
  },
  {
    id: 6,
    title: "AI Recipe Generator 🍳",
    description: "Create personalized recipes based on available ingredients and dietary preferences using AI.",
    category: "AI/ML",
    difficulty: "Intermediate",
    color: "#635BFF"
  },
  {
    id: 7,
    title: "Smart Home Energy Monitor ⚡",
    description: "IoT system to track and optimize home energy usage with AI-powered recommendations.",
    category: "IoT",
    difficulty: "Advanced",
    color: "#00B8D9"
  },
  {
    id: 8,
    title: "Language Learning Game 🎮",
    description: "Interactive game that makes learning new languages fun and engaging through storytelling.",
    category: "Education",
    difficulty: "Beginner",
    color: "#FF5CA2"
  },
  {
    id: 9,
    title: "Mental Health Journal App 🧘",
    description: "AI-powered journaling app that tracks mood patterns and provides personalized wellness insights.",
    category: "Health",
    difficulty: "Intermediate",
    color: "#635BFF"
  },
  {
    id: 10,
    title: "Community Garden Network 🌿",
    description: "Platform connecting urban gardeners, sharing resources, and organizing community gardening events.",
    category: "Social",
    difficulty: "Beginner",
    color: "#00B8D9"
  },
  {
    id: 11,
    title: "AI Art Style Transfer 🎨",
    description: "App that transforms photos into different artistic styles using neural networks.",
    category: "AI/ML",
    difficulty: "Advanced",
    color: "#FF5CA2"
  },
  {
    id: 12,
    title: "Smart Pet Care System ��",
    description: "IoT device for monitoring pet health, activity, and automated feeding schedules.",
    category: "IoT",
    difficulty: "Intermediate",
    color: "#635BFF"
  },
  {
    id: 13,
    title: "Interactive Math Learning 📐",
    description: "AR-based app that makes learning mathematics interactive and visual.",
    category: "Education",
    difficulty: "Intermediate",
    color: "#00B8D9"
  },
  {
    id: 14,
    title: "Sleep Quality Analyzer 😴",
    description: "App that tracks sleep patterns and provides personalized recommendations for better sleep.",
    category: "Health",
    difficulty: "Beginner",
    color: "#FF5CA2"
  },
  {
    id: 15,
    title: "Local Food Sharing 🥗",
    description: "Platform connecting neighbors to share home-cooked meals and reduce food waste.",
    category: "Social",
    difficulty: "Beginner",
    color: "#635BFF"
  },
  {
    id: 16,
    title: "AI Music Composer 🎵",
    description: "Generate unique music compositions based on mood and style preferences.",
    category: "AI/ML",
    difficulty: "Advanced",
    color: "#00B8D9"
  },
  {
    id: 17,
    title: "Smart Parking System 🚗",
    description: "IoT solution for finding and reserving parking spots in real-time.",
    category: "IoT",
    difficulty: "Intermediate",
    color: "#FF5CA2"
  },
  {
    id: 18,
    title: "Virtual Science Lab 🔬",
    description: "Interactive platform for conducting virtual science experiments.",
    category: "Education",
    difficulty: "Advanced",
    color: "#635BFF"
  },
  {
    id: 19,
    title: "Fitness Challenge App 🏃",
    description: "Social fitness platform with challenges and rewards for staying active.",
    category: "Health",
    difficulty: "Beginner",
    color: "#00B8D9"
  },
  {
    id: 20,
    title: "Skill Exchange Network 🤝",
    description: "Platform for people to teach and learn skills from each other.",
    category: "Social",
    difficulty: "Intermediate",
    color: "#FF5CA2"
  },
  {
    id: 21,
    title: "AI Code Assistant 💻",
    description: "AI-powered tool that helps developers write and debug code more efficiently.",
    category: "AI/ML",
    difficulty: "Advanced",
    color: "#635BFF"
  },
  {
    id: 22,
    title: "Smart Waste Management ♻️",
    description: "IoT system for optimizing waste collection and recycling processes.",
    category: "IoT",
    difficulty: "Intermediate",
    color: "#00B8D9"
  },
  {
    id: 23,
    title: "Virtual Book Club 📖",
    description: "Platform for organizing and participating in virtual book discussions.",
    category: "Education",
    difficulty: "Beginner",
    color: "#FF5CA2"
  },
  {
    id: 24,
    title: "Meditation Timer App 🧘‍♀️",
    description: "Guided meditation app with customizable sessions and progress tracking.",
    category: "Health",
    difficulty: "Beginner",
    color: "#635BFF"
  },
  {
    id: 25,
    title: "Local Business Network 🏪",
    description: "Platform connecting local businesses with customers and each other.",
    category: "Social",
    difficulty: "Intermediate",
    color: "#00B8D9"
  },
  {
    id: 26,
    title: "AI Story Generator 📝",
    description: "Create unique stories and narratives based on user prompts and preferences.",
    category: "AI/ML",
    difficulty: "Intermediate",
    color: "#FF5CA2"
  },
  {
    id: 27,
    title: "Smart Garden System 🌺",
    description: "Automated gardening system with climate control and plant monitoring.",
    category: "IoT",
    difficulty: "Advanced",
    color: "#635BFF"
  },
  {
    id: 28,
    title: "Coding Bootcamp Platform 👨‍💻",
    description: "Interactive platform for learning programming with real-world projects.",
    category: "Education",
    difficulty: "Advanced",
    color: "#00B8D9"
  },
  {
    id: 29,
    title: "Nutrition Tracker App 🥗",
    description: "AI-powered app for tracking nutrition and meal planning.",
    category: "Health",
    difficulty: "Intermediate",
    color: "#FF5CA2"
  },
  {
    id: 30,
    title: "Volunteer Matching Platform 🤲",
    description: "Connect volunteers with local organizations and causes.",
    category: "Social",
    difficulty: "Beginner",
    color: "#635BFF"
  },
  {
    id: 31,
    title: "AI Video Editor 🎬",
    description: "Automated video editing tool with smart scene detection and effects.",
    category: "AI/ML",
    difficulty: "Advanced",
    color: "#00B8D9"
  },
  {
    id: 32,
    title: "Smart Security System 🔒",
    description: "IoT-based home security with AI-powered threat detection.",
    category: "IoT",
    difficulty: "Advanced",
    color: "#FF5CA2"
  },
  {
    id: 33,
    title: "Virtual Museum Tours 🏛️",
    description: "Interactive platform for exploring museums and art galleries virtually.",
    category: "Education",
    difficulty: "Intermediate",
    color: "#635BFF"
  },
  {
    id: 34,
    title: "Workout Planner App 💪",
    description: "Personalized workout plans with progress tracking and social features.",
    category: "Health",
    difficulty: "Intermediate",
    color: "#00B8D9"
  },
  {
    id: 35,
    title: "Local Artist Marketplace 🎨",
    description: "Platform for local artists to showcase and sell their work.",
    category: "Social",
    difficulty: "Beginner",
    color: "#FF5CA2"
  },
  {
    id: 36,
    title: "AI Photo Editor 📸",
    description: "Smart photo editing tool with automatic enhancement features.",
    category: "AI/ML",
    difficulty: "Intermediate",
    color: "#635BFF"
  },
  {
    id: 37,
    title: "Smart Thermostat System 🌡️",
    description: "AI-powered climate control system for optimal home temperature.",
    category: "IoT",
    difficulty: "Intermediate",
    color: "#00B8D9"
  },
  {
    id: 38,
    title: "Virtual Tutoring Platform 👨‍🏫",
    description: "Connect students with tutors for personalized learning sessions.",
    category: "Education",
    difficulty: "Intermediate",
    color: "#FF5CA2"
  },
  {
    id: 39,
    title: "Stress Relief App 🧘‍♂️",
    description: "App with breathing exercises and stress management techniques.",
    category: "Health",
    difficulty: "Beginner",
    color: "#635BFF"
  },
  {
    id: 40,
    title: "Community Sports League 🏀",
    description: "Platform for organizing and managing local sports leagues.",
    category: "Social",
    difficulty: "Intermediate",
    color: "#00B8D9"
  },
  {
    id: 41,
    title: "AI Voice Assistant ��️",
    description: "Customizable voice assistant for personal and professional use.",
    category: "AI/ML",
    difficulty: "Advanced",
    color: "#FF5CA2"
  },
  {
    id: 42,
    title: "Smart Lighting System ��",
    description: "IoT-based lighting control with mood-based automation.",
    category: "IoT",
    difficulty: "Beginner",
    color: "#635BFF"
  },
  {
    id: 43,
    title: "Virtual Language Exchange 🌍",
    description: "Platform for practicing languages with native speakers.",
    category: "Education",
    difficulty: "Intermediate",
    color: "#00B8D9"
  },
  {
    id: 44,
    title: "Sleep Sound Generator 🌙",
    description: "App that creates personalized sleep sounds and white noise.",
    category: "Health",
    difficulty: "Beginner",
    color: "#FF5CA2"
  },
  {
    id: 45,
    title: "Local Food Delivery 🍕",
    description: "Platform connecting local restaurants with customers.",
    category: "Social",
    difficulty: "Beginner",
    color: "#635BFF"
  },
  {
    id: 46,
    title: "AI Writing Assistant ✍️",
    description: "Tool for improving writing with grammar and style suggestions.",
    category: "AI/ML",
    difficulty: "Intermediate",
    color: "#00B8D9"
  },
  {
    id: 47,
    title: "Smart Water Monitor 💧",
    description: "IoT device for tracking water quality and usage.",
    category: "IoT",
    difficulty: "Advanced",
    color: "#FF5CA2"
  },
  {
    id: 48,
    title: "Virtual Science Fair 🔬",
    description: "Online platform for showcasing student science projects.",
    category: "Education",
    difficulty: "Intermediate",
    color: "#635BFF"
  },
  {
    id: 49,
    title: "Fitness Class Platform 🏋️",
    description: "Virtual platform for live and recorded fitness classes.",
    category: "Health",
    difficulty: "Intermediate",
    color: "#00B8D9"
  },
  {
    id: 50,
    title: "Local Music Scene 🎵",
    description: "Platform for discovering and supporting local musicians.",
    category: "Social",
    difficulty: "Beginner",
    color: "#FF5CA2"
  },
  {
    id: 51,
    title: "AI Game Developer 🎮",
    description: "Tool for generating game assets and levels using AI.",
    category: "AI/ML",
    difficulty: "Advanced",
    color: "#635BFF"
  },
  {
    id: 52,
    title: "Smart Pet Door 🐕",
    description: "IoT device for automated pet access with security features.",
    category: "IoT",
    difficulty: "Intermediate",
    color: "#00B8D9"
  },
  {
    id: 53,
    title: "Virtual Art Classes ��",
    description: "Online platform for learning art from professional artists.",
    category: "Education",
    difficulty: "Beginner",
    color: "#FF5CA2"
  },
  {
    id: 54,
    title: "Meditation Challenge App 🧘‍♀️",
    description: "App for tracking and sharing meditation progress.",
    category: "Health",
    difficulty: "Beginner",
    color: "#635BFF"
  },
  {
    id: 55,
    title: "Local Craft Market 🛍️",
    description: "Platform for artisans to sell handmade products.",
    category: "Social",
    difficulty: "Intermediate",
    color: "#00B8D9"
  }
];

const Swipe = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedIdeas, setLikedIdeas] = useState<typeof ideas>([]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setLikedIdeas(prev => [...prev, ideas[currentIndex]]);
      toast.success('Idea saved! 💡');
    }

    if (currentIndex < ideas.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Navigate to results when all ideas are swiped
      navigate('/results', { state: { likedIdeas } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4"
    >
      {/* Progress Indicator */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
          <span>Ideas Discovered</span>
          <span>{currentIndex + 1} / {ideas.length}</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / ideas.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Card Stack */}
      <div className="relative w-full max-w-md h-[600px]">
        <AnimatePresence>
          {ideas.slice(currentIndex, currentIndex + 3).map((idea, index) => (
            <motion.div
              key={idea.title}
              className="absolute w-full"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ 
                scale: index === 0 ? 1 : 0.8,
                opacity: 1,
                y: index === 0 ? 0 : 20 * index,
                zIndex: 3 - index
              }}
              exit={{ 
                x: 1000,
                opacity: 0,
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.3 }}
            >
              <IdeaCard
                idea={idea}
                onSwipe={handleSwipe}
                isTop={index === 0}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe('left')}
          className="p-4 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
        >
          <span className="text-2xl">👎</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe('right')}
          className="p-4 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors"
        >
          <span className="text-2xl">👍</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Swipe; 