import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import HeygenVideo from '../components/HeygenVideo';

const AiChat = () => {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'ai'; message: string }[]>([
    { 
      type: 'ai', 
      message: "Hi! I'm Sarah, your AI Innovation Guide. I'm here to help you discover exciting project ideas tailored to your interests. What kind of projects are you interested in?" 
    }
  ]);

  const predefinedQuestions = [
    "I need ideas for a mobile app",
    "What's trending in AI projects?",
    "Suggest some IoT project ideas",
    "Help me with web3 project ideas",
    "What are some good beginner projects?"
  ];

  const handleSendMessage = () => {
    if (!currentQuestion.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { type: 'user', message: currentQuestion }]);
    
    // Simulate AI thinking
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1000)),
      {
        loading: 'Sarah is thinking...',
        success: 'Sarah has responded!',
        error: 'Error getting response',
      }
    );

    // Simulate AI response after 1 second
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        message: "That's a great area of interest! Based on current trends and your interests, here are some innovative project ideas you might like..." 
      }]);
    }, 1000);

    setCurrentQuestion('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Video Section */}
          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-lg border border-gray-700" style={{ minHeight: '400px' }}>
            <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden bg-black/50">
              <HeygenVideo />
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex flex-col h-[600px]">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-800/30 rounded-2xl backdrop-blur-lg border border-gray-700">
              {chatHistory.map((chat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      chat.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    {chat.message}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="mb-4 flex flex-wrap gap-2">
              {predefinedQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentQuestion(question)}
                  className="px-4 py-2 bg-gray-700 rounded-full text-sm hover:bg-gray-600 transition-colors"
                >
                  {question}
                </motion.button>
              ))}
            </div>

            {/* Input Section */}
            <div className="flex gap-2">
              <input
                type="text"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1 px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="px-6 py-3 bg-blue-600 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Send
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AiChat; 