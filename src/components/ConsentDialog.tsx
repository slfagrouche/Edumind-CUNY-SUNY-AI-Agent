import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ConsentDialogProps {
  onAccept: () => void;
  onDecline: () => void;
}

const ConsentDialog: React.FC<ConsentDialogProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all duration-300 animate-slide-in">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-indigo-600/20 rounded-full p-3 border border-indigo-500/30">
            <ShieldCheck className="w-8 h-8 text-indigo-400" />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          Help Us Improve Your Experience
        </h2>
        
        <div className="text-gray-300 space-y-3 mb-6">
          <p>
            We'd like to store your questions to improve the student experience by:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Identifying frequently asked questions</li>
            <li>Improving response accuracy</li>
            <li>Enhancing the knowledge base</li>
          </ul>
          <p className="text-sm italic text-gray-400">
            Your questions will only be used to improve the service and will not be used to train any AI models.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onAccept}
            className="flex-1 bg-indigo-600 text-white rounded-lg py-2 px-4 font-medium hover:bg-indigo-700 transform transition-all duration-200 hover:scale-105"
          >
            I Agree
          </button>
          <button
            onClick={onDecline}
            className="flex-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg py-2 px-4 font-medium hover:bg-gray-600 transform transition-all duration-200 hover:scale-105"
          >
            No Thanks
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentDialog;