import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Brain, Sparkles, BookOpen, GraduationCap, Building } from 'lucide-react';
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
    <div className="glass-panel h-[600px] flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 animate-fade-in">
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full p-6 mb-4 transform transition-transform duration-300 hover:scale-110 shadow-md animate-float">
              <Brain className="w-12 h-12 text-purple-600" />
              <Sparkles className="w-6 h-6 text-indigo-500 absolute -top-1 -right-1" />
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-3">
              EduMind AI Assistant
            </h3>
            <p className="text-gray-600 max-w-md mb-6">
              Your intelligent guide to navigating CUNY and SUNY schools, programs, professors, and more.
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
              <SampleQuestion 
                icon={<GraduationCap className="h-4 w-4" />}
                question="What are the transfer requirements from CUNY to SUNY?"
                onClick={(q) => setInputValue(q)}
                color="purple"
              />
              <SampleQuestion 
                icon={<BookOpen className="h-4 w-4" />}
                question="Which CUNY schools offer Computer Science?"
                onClick={(q) => setInputValue(q)}
                color="indigo"
              />
              <SampleQuestion 
                icon={<Building className="h-4 w-4" />}
                question="What financial aid options are available at SUNY?"
                onClick={(q) => setInputValue(q)}
                color="violet"
              />
              <SampleQuestion 
                icon={<Sparkles className="h-4 w-4" />}
                question="How do I apply to CUNY's Honors Program?"
                onClick={(q) => setInputValue(q)}
                color="blue"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} opacity-0 animate-slide-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-4 shadow-sm hover-scale ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
                      : 'bg-white border border-purple-100 text-gray-800'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p>{message.content}</p>
                  ) : (
                    <ResponseDisplay response={message as Message & { sources?: AIResponse['sources'] }} />
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white border border-purple-100 rounded-2xl p-4 max-w-[80%] shadow-sm">
                  <LoadingIndicator />
                </div>
              </div>
            )}
            
            {error && <ErrorMessage message={error} />}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="border-t border-purple-100 p-4 bg-white/50 backdrop-blur-sm">
        <div className="relative">
          <textarea
            ref={inputRef}
            className="w-full border border-purple-200 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all duration-200 shadow-sm"
            placeholder="Ask about CUNY/SUNY schools, programs, transfers..."
            rows={2}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="absolute right-2 bottom-2 p-2 text-purple-600 hover:text-indigo-800 disabled:text-gray-300 transition-all duration-200 transform hover:scale-110 disabled:hover:scale-100"
            disabled={isLoading || !inputValue.trim()}
          >
            <SendHorizontal className="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

interface SampleQuestionProps {
  question: string;
  onClick: (question: string) => void;
  color: 'purple' | 'indigo' | 'violet' | 'blue';
  icon: React.ReactNode;
}

const SampleQuestion: React.FC<SampleQuestionProps> = ({ question, onClick, color, icon }) => {
  const colorClasses = {
    purple: 'hover:bg-purple-50 hover:border-purple-200 text-purple-700',
    indigo: 'hover:bg-indigo-50 hover:border-indigo-200 text-indigo-700',
    violet: 'hover:bg-violet-50 hover:border-violet-200 text-violet-700',
    blue: 'hover:bg-blue-50 hover:border-blue-200 text-blue-700',
  };

  return (
    <button
      type="button"
      className={`text-left p-3 border border-gray-200 rounded-xl text-sm ${colorClasses[color]} transition-all duration-200 transform hover:scale-105 shadow-sm flex items-start`}
      onClick={() => onClick(question)}
    >
      <span className="mr-2 mt-0.5">{icon}</span>
      <span>{question}</span>
    </button>
  );
};

export default ChatInterface;