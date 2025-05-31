import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
      </div>
      <div className="ml-3 text-gray-300 text-sm flex items-center">
        <Sparkles className="h-3 w-3 text-indigo-400 mr-1 animate-pulse-gentle" />
        <span>HIPE Campus Mind is thinking...</span>
      </div>
    </div>
  );
};

export default LoadingIndicator;