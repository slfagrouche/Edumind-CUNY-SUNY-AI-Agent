import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl max-w-[80%] flex items-start shadow-sm hover-scale">
        <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5 text-red-500" />
        <div>
          <p className="font-medium">Unable to complete your request</p>
          <p className="mt-1 text-red-700">{message}</p>
          <div className="mt-3 flex items-center text-sm text-red-600">
            <RefreshCw className="h-3 w-3 mr-1" />
            <p>Try rephrasing your question or checking your connection.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;