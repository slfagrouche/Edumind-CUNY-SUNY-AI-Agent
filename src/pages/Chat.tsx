import React from 'react';
import { motion } from 'framer-motion';
import ChatInterface from '../components/ChatInterface';

const Chat: React.FC = () => {
  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      <div className="h-full flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-6 border-b border-gray-800/50"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">AI Assistant</h1>
            <p className="text-gray-400 text-sm">Ask anything about CUNY & SUNY schools</p>
          </div>
        </motion.div>

        {/* Chat Interface */}
        <div className="flex-1 py-6 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full"
          >
            <ChatInterface />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Chat; 
