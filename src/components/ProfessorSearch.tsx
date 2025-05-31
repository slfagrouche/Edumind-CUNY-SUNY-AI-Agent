import React, { useState, useRef } from 'react';
import { Search, User, School, MessageCircle, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorMessage from './ErrorMessage';
import ResponseDisplay from './ResponseDisplay/ResponseDisplay';
import { queryProfessor } from '../services/api';
import { Message } from '../utils/types';

interface ProfessorSearchProps {
  hasConsented?: boolean | null;
}

const ProfessorSearch: React.FC<ProfessorSearchProps> = ({ hasConsented }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    collegeName: '',
    question: ''
  });
  
  const [response, setResponse] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.collegeName) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const userId = hasConsented ? 'consented-user' : 'anonymous';
      const result = await queryProfessor(
        formData.firstName,
        formData.lastName,
        formData.collegeName,
        formData.question || 'What can you tell me about this professor?',
        userId
      );
      
      // Create message object
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: result.response,
        role: 'assistant',
        timestamp: new Date(),
        agentType: result.agent_type,
        sources: result.sources,
      };
      
      setResponse(aiMessage);
    } catch (err) {
      console.error('Error querying professor information:', err);
      setError('Failed to get professor information. Please try again or check your search details.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      collegeName: '',
      question: ''
    });
    setResponse(null);
    setError(null);
    
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const suggestedQuestions = [
    "What is their teaching style?",
    "What courses do they teach?",
    "What are their research interests?",
    "How do students rate this professor?"
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-700/50 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl"
      >
        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-6 border-b border-gray-600/50">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-3">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Professor Search</h2>
              <p className="text-sm text-gray-400">Find detailed information about any professor</p>
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="firstName" className="flex items-center text-sm font-semibold text-gray-300 mb-3">
                <User className="h-4 w-4 mr-2 text-blue-400" />
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-gray-800/80 border border-gray-600/50 text-white placeholder-gray-400 rounded-xl px-4 py-4 transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:bg-gray-800/90 backdrop-blur-sm"
                placeholder="Enter first name"
                required
                disabled={isLoading}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="lastName" className="flex items-center text-sm font-semibold text-gray-300 mb-3">
                <User className="h-4 w-4 mr-2 text-blue-400" />
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-gray-800/80 border border-gray-600/50 text-white placeholder-gray-400 rounded-xl px-4 py-4 transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:bg-gray-800/90 backdrop-blur-sm"
                placeholder="Enter last name"
                required
                disabled={isLoading}
              />
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <label htmlFor="collegeName" className="flex items-center text-sm font-semibold text-gray-300 mb-3">
              <School className="h-4 w-4 mr-2 text-purple-400" />
              College/University*
            </label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              className="w-full bg-gray-800/80 border border-gray-600/50 text-white placeholder-gray-400 rounded-xl px-4 py-4 transition-all duration-300 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 focus:bg-gray-800/90 backdrop-blur-sm"
              placeholder="e.g., Brooklyn College, Hunter College, SUNY Albany"
              required
              disabled={isLoading}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <label htmlFor="question" className="flex items-center text-sm font-semibold text-gray-300 mb-3">
              <MessageCircle className="h-4 w-4 mr-2 text-green-400" />
              Question (Optional)
            </label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="w-full bg-gray-800/80 border border-gray-600/50 text-white placeholder-gray-400 rounded-xl px-4 py-4 resize-none transition-all duration-300 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:bg-gray-800/90 backdrop-blur-sm"
              placeholder="What would you like to know about this professor?"
              rows={4}
              disabled={isLoading}
            />
            
            {/* Suggested Questions */}
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={() => setFormData(prev => ({ ...prev, question: suggestion }))}
                    className="text-xs bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white px-3 py-1.5 rounded-full transition-all duration-200 border border-gray-600/30 hover:border-gray-500/50"
                    disabled={isLoading}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex-1 relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl py-4 px-6 font-semibold transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                  />
                  Searching...
                </span>
              ) : (
                <span className="flex items-center">
                  <Search className="h-5 w-5 mr-3" />
                  Find Professor
                </span>
              )}
              
              {/* Button shine effect */}
              {!isLoading && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </motion.button>
            
            {response && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleReset}
                className="flex-none bg-gray-700/80 text-gray-200 border border-gray-600/50 rounded-xl py-4 px-6 font-semibold hover:bg-gray-600/80 hover:border-gray-500/50 transition-all duration-300 backdrop-blur-sm"
                disabled={isLoading}
              >
                New Search
              </motion.button>
            )}
          </motion.div>
        </form>
      </motion.div>
      
      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6"
          >
            <ErrorMessage message={error} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Response Display */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-700/50 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
              <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-6 border-b border-gray-600/50">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-full p-3">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Professor Information</h3>
                    <p className="text-sm text-gray-400">
                      {formData.firstName} {formData.lastName} at {formData.collegeName}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/30 backdrop-blur-sm">
                  <ResponseDisplay response={response} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfessorSearch;