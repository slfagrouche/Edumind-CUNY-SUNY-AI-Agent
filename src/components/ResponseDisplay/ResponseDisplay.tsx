import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SourcesDisplay from './SourcesDisplay';
import { Message, AIResponse } from '../../utils/types';
import { BookOpenCheck, Bot, HelpCircle } from 'lucide-react';

interface ResponseDisplayProps {
  response: Message & { sources?: AIResponse['sources'] };
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  const [showSources, setShowSources] = useState(false);
  
  const hasKnowledgeBaseSources = 
    response.sources?.knowledge_base && 
    response.sources.knowledge_base.length > 0;
    
  const hasWebSources = 
    response.sources?.search && 
    response.sources.search.length > 0;
    
  const hasProfessorSources = 
    response.sources?.professor_db;
    
  const hasSchoolSources =
    response.sources?.school_db &&
    response.sources.school_db.length > 0;
    
  const hasSources = hasKnowledgeBaseSources || hasWebSources || hasProfessorSources || hasSchoolSources;
  
  return (
    <div className="space-y-3">
      {response.agentType && (
        <div className="flex items-center text-sm text-indigo-400 bg-gray-800/50 px-3 py-1 rounded-t-md border-b border-gray-600">
          <Bot className="h-4 w-4 mr-2" />
          <span className="font-medium">Response from: {getAgentTypeDisplay(response.agentType)}</span>
        </div>
      )}
      
      <div className="text-gray-200 markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {response.content}
        </ReactMarkdown>
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-600">
        {hasSources ? (
          <button
            onClick={() => setShowSources(!showSources)}
            className="flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
          >
            <BookOpenCheck className="h-4 w-4 mr-1" />
            {showSources ? 'Hide sources' : 'View sources'}
          </button>
        ) : (
          <div className="text-xs text-gray-500 flex items-center">
            <HelpCircle className="h-3 w-3 mr-1" />
            No specific sources cited for this response
          </div>
        )}
        
        {!response.agentType && (
          <div className="text-xs text-gray-500">
            Response from: General Knowledge Base
          </div>
        )}
      </div>
      
      {showSources && hasSources && <SourcesDisplay sources={response.sources} />}
    </div>
  );
};

const getAgentTypeDisplay = (agentType: string): string => {
  switch (agentType) {
    case 'professor':
      return 'Professor Information System';
    case 'transfer':
      return 'Transfer Knowledge Base';
    case 'recommendation':
      return 'Program Recommendation Engine';
    case 'browser':
      return 'Web Search Engine';
    case 'error':
      return 'Error Handling System';
    default:
      return 'General Knowledge Base';
  }
};

export default ResponseDisplay;