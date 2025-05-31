import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Brain, Sparkles, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import ResponseDisplay from './ResponseDisplay/ResponseDisplay';
import { queryAIAssistant } from '../services/api';
import { Message, AIResponse } from '../utils/types';

interface ChatInterfaceProps {
  hasConsented?: boolean | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ hasConsented }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const query = inputValue.trim();
    if (!query || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: query,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);
    
    try {
      const userId = hasConsented ? 'consented-user' : 'anonymous';
      const response = await queryAIAssistant(query, userId);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        role: 'assistant',
        timestamp: new Date(),
        agentType: response.agent_type,
        sources: response.sources,
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (err) {
      console.error('Error querying AI Assistant:', err);
      setError('Failed to get a response. Please try again or rephrase your question.');
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="h-full max-w-5xl mx-auto flex flex-col bg-gradient-to-b from-gray-900/95 to-black/95 border border-gray-700/50 rounded-2xl backdrop-blur-xl overflow-hidden">
      {/* Chat Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 p-6 flex-shrink-0"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-white to-gray-200 rounded-full p-3">
                <Brain className="h-8 w-8 text-black" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-gray-900"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">HIPE Campus Mind</h2>
              <p className="text-sm text-gray-400">AI Academic Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Online</span>
          </div>
        </div>
      </motion.div>

      {/* Messages Area - Fixed height with internal scrolling */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-6 space-y-6">
          {messages.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="h-full flex flex-col items-center justify-center text-center py-16"
            >
              <div className="relative mb-8">
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full p-8 backdrop-blur-sm border border-purple-500/30">
                  <Sparkles className="w-16 h-16 text-purple-400" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-purple-500/20 border-t-purple-500/60 rounded-full"
                />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">
                Welcome to HIPE Campus Mind
              </h3>
              <p className="text-lg text-gray-400 max-w-md mb-8">
                Ask me anything about CUNY & SUNY schools, professors, programs, and more.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                {[
                  "Tell me about Professor Smith at Brooklyn College",
                  "What programs does Hunter College offer?",
                  "How do I transfer between CUNY schools?",
                  "What are the admission requirements for SUNY schools?"
                ].map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setInputValue(suggestion)}
                    className="text-left p-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-gray-500/50 rounded-xl transition-all duration-300 hover:scale-105 group"
                  >
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {suggestion}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
                >
                  <div className={`flex items-end space-x-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                        : 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-gray-300" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`relative group ${message.role === 'user' ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50'} rounded-2xl p-4 shadow-xl backdrop-blur-sm`}>
                      {/* Message Content */}
                      {message.role === 'user' ? (
                        <p className="text-white font-medium leading-relaxed">{message.content}</p>
                      ) : (
                        <div className="text-gray-200">
                          <ResponseDisplay response={message as Message & { sources?: AIResponse['sources'] }} />
                        </div>
                      )}
                      
                      {/* Timestamp */}
                      <div className={`text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>

                      {/* Message Tail */}
                      <div className={`absolute top-4 w-3 h-3 transform rotate-45 ${
                        message.role === 'user' 
                          ? 'right-[-6px] bg-gradient-to-br from-blue-600 to-purple-600' 
                          : 'left-[-6px] bg-gradient-to-br from-gray-800 to-gray-900 border-l border-b border-gray-700/50'
                      }`} />
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Loading Message */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-6"
                >
                  <div className="flex items-end space-x-3 max-w-[85%]">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-gray-300" />
                    </div>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
                      <LoadingIndicator />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <ErrorMessage message={error} />
                </motion.div>
              )}
            </AnimatePresence>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area - Fixed at bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700/50 p-6 flex-shrink-0"
      >
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                className="w-full bg-gray-800/80 border border-gray-600/50 text-white placeholder-gray-400 rounded-2xl px-6 py-4 pr-16 resize-none transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:bg-gray-800/90 backdrop-blur-sm min-h-[3.5rem] max-h-32"
                placeholder="Ask about CUNY & SUNY schools..."
                rows={1}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                style={{ height: 'auto' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
              />
              
              {/* Character count */}
              <div className="absolute bottom-2 right-16 text-xs text-gray-500">
                {inputValue.length}/500
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`relative overflow-hidden rounded-2xl p-4 font-semibold transition-all duration-300 shadow-lg ${
                isLoading || !inputValue.trim()
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-blue-500/25'
              }`}
              disabled={isLoading || !inputValue.trim()}
            >
              <motion.div
                animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
              >
                <SendHorizontal className="h-6 w-6" />
              </motion.div>
              
              {/* Button shine effect */}
              {!isLoading && inputValue.trim() && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </motion.button>
          </div>
          
          {/* Input hints */}
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>AI ready</span>
            </span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ChatInterface;