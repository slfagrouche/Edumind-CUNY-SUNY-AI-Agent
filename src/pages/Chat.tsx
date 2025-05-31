import React from 'react';
import { motion } from 'framer-motion';
import ChatInterface from '../components/ChatInterface';

const Chat: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chat Interface */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ChatInterface />
        </motion.div>
      </div>
    </div>
  );
};

export default Chat; 
