import React, { useState, useRef } from 'react';
import { Search, User, School, MessageCircle } from 'lucide-react';
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
  
  return (
    <div className="max-w-4xl mx-auto bg-gray-900/90 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
      {/* Search Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <User className="h-4 w-4 mr-2 text-gray-400" />
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-gray-800/90 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 transition-all duration-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400/50"
              placeholder="Enter first name"
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <User className="h-4 w-4 mr-2 text-gray-400" />
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-gray-800/90 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 transition-all duration-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400/50"
              placeholder="Enter last name"
              required
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="collegeName" className="flex items-center text-sm font-medium text-gray-300 mb-2">
            <School className="h-4 w-4 mr-2 text-gray-400" />
            College/University*
          </label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            className="w-full bg-gray-800/90 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 transition-all duration-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400/50"
            placeholder="Enter college or university name"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="question" className="flex items-center text-sm font-medium text-gray-300 mb-2">
            <MessageCircle className="h-4 w-4 mr-2 text-gray-400" />
            Question (Optional)
          </label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="w-full bg-gray-800/90 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 resize-none transition-all duration-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400/50"
            placeholder="What would you like to know about this professor?"
            rows={3}
            disabled={isLoading}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 bg-white text-black hover:bg-gray-100 rounded-xl py-3 px-6 font-semibold transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2"></div>
                Searching...
              </span>
            ) : (
              <span className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Find Professor
              </span>
            )}
          </button>
          
          {response && (
            <button
              type="button"
              onClick={handleReset}
              className="flex-none bg-gray-700 text-gray-200 border border-gray-600 rounded-xl py-3 px-6 font-medium hover:bg-gray-600 transition-colors duration-300"
              disabled={isLoading}
            >
              New Search
            </button>
          )}
        </div>
      </form>
      
      {/* Error Display */}
      {error && (
        <div className="px-6 pb-6">
          <ErrorMessage message={error} />
        </div>
      )}
      
      {/* Response Display */}
      {response && (
        <div className="border-t border-gray-700/50 p-6">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600/50">
            <ResponseDisplay response={response} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorSearch;