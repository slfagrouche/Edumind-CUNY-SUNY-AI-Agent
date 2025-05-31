import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Brain } from 'lucide-react';
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
    if (!query) return;
    
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
  
  return (
    <div className="max-w-4xl mx-auto bg-gray-900/90 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
      {/* Chat Messages Area */}
      <div className="h-[600px] overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="bg-white rounded-full p-6 mb-6">
              <Brain className="w-12 h-12 text-black" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              HIPE Campus Mind AI
            </h3>
            <p className="text-gray-400 max-w-md">
              Ask about professors, programs, transfers, and more at CUNY & SUNY schools.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.role === 'user' 
                      ? 'bg-white text-black' 
                      : 'bg-gray-800/90 border border-gray-600/50 text-white'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p className="font-medium">{message.content}</p>
                  ) : (
                    <ResponseDisplay response={message as Message & { sources?: AIResponse['sources'] }} />
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800/90 border border-gray-600/50 rounded-2xl p-4 max-w-[85%]">
                  <LoadingIndicator />
                </div>
              </div>
            )}
            
            {error && <ErrorMessage message={error} />}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="border-t border-gray-700/50 p-6">
        <div className="flex items-end space-x-4">
          <div className="flex-grow">
            <textarea
              ref={inputRef}
              className="w-full bg-gray-800/90 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 resize-none transition-all duration-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400/50"
              placeholder="Ask about CUNY & SUNY schools..."
              rows={2}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="bg-white text-black hover:bg-gray-100 p-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !inputValue.trim()}
          >
            <SendHorizontal className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;