import React, { useState, useRef } from 'react';
import { RefreshCw, User, School, MessageCircle, GraduationCap } from 'lucide-react';
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
  const [hasPreviousSearch, setHasPreviousSearch] = useState(false);
  
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
      setHasPreviousSearch(true);
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
    setHasPreviousSearch(false);
    
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  
  return (
    <div className="glass-panel overflow-hidden">
      <form ref={formRef} onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <User className="h-4 w-4 mr-1 text-purple-600" />
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              placeholder="Enter first name"
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <User className="h-4 w-4 mr-1 text-purple-600" />
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              placeholder="Enter last name"
              required
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="collegeName" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <School className="h-4 w-4 mr-1 text-indigo-600" />
            College/University*
          </label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            className="w-full border border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            placeholder="Enter college or university name"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="question" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <MessageCircle className="h-4 w-4 mr-1 text-violet-600" />
            Question (Optional)
          </label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="w-full border border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none shadow-sm"
            placeholder="What would you like to know about this professor? Leave blank for general information."
            rows={3}
            disabled={isLoading}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg py-2.5 px-4 font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center disabled:opacity-70 shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Searching...
              </span>
            ) : (
              <span className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Find Professor
              </span>
            )}
          </button>
          
          {hasPreviousSearch && (
            <button
              type="button"
              onClick={handleReset}
              className="flex-none bg-gray-100 text-gray-800 border border-gray-300 rounded-lg py-2.5 px-4 font-medium hover:bg-gray-200 transition-colors duration-200 shadow-sm"
              disabled={isLoading}
            >
              New Search
            </button>
          )}
        </div>
      </form>
      
      {error && (
        <div className="px-6 pb-6">
          <ErrorMessage message={error} />
        </div>
      )}
      
      {response && (
        <div className="border-t border-purple-100 p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
          <h3 className="text-lg font-semibold gradient-text mb-4 flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-purple-600" />
            Professor Information
          </h3>
          <div className="bg-white border border-purple-100 rounded-lg p-4 shadow-sm">
            <ResponseDisplay response={response} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorSearch;