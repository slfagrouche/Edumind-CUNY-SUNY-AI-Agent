import React from 'react';
import { FileText, Globe, UserRound, School, AlertCircle } from 'lucide-react';
import { AIResponse } from '../../utils/types';

interface SourcesDisplayProps {
  sources: AIResponse['sources'];
}

// Function to get the appropriate URL and display name for a source based on its filename
const getSourceInfo = (source: string): { url: string | null; displayName: string } => {
  if (source === 'hbson-student-handbook.pdf') {
    return {
      url: 'https://www.hunter.cuny.edu/pending-migration/nursing/hbson-student-handbook.pdf',
      displayName: 'Hunter College - Nursing Student Handbook'
    };
  } else if (source === 'Student_Handbook (1).pdf') {
    return {
      url: 'https://www.brooklyn.edu/wp-content/uploads/Student_Handbook.pdf',
      displayName: 'Brooklyn College - Student Handbook'
    };
  } else if (source === 'StudentHandbook.pdf' || source === 'StudentHandbook (1).pdf') {
    return {
      url: 'https://www.citytech.cuny.edu/current-student/docs/StudentHandbook.pdf',
      displayName: 'City Tech - Student Handbook'
    };
  }
  return { url: null, displayName: source };
};

const SourcesDisplay: React.FC<SourcesDisplayProps> = ({ sources }) => {
  const hasKnowledgeBaseSources = 
    sources?.knowledge_base && 
    sources.knowledge_base.length > 0;
    
  const hasWebSources = 
    sources?.search && 
    sources.search.length > 0;
    
  const hasProfessorSources = 
    sources?.professor_db;
  
  const hasSchoolSources =
    sources?.school_db &&
    sources.school_db.length > 0;

  return (
    <div className="mt-3 text-sm">
      {hasKnowledgeBaseSources && sources.knowledge_base && (
        <div className="mb-3">
          <div className="flex items-center text-gray-700 font-medium mb-1">
            <FileText className="h-4 w-4 mr-1 text-blue-600" />
            <span>From Official Handbooks:</span>
          </div>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            {sources.knowledge_base.map((source, index) => {
              const { url, displayName } = getSourceInfo(source.metadata.source);
              return (
                <li key={`kb-${index}`}>
                  {url ? (
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {displayName}
                    </a>
                  ) : (
                    displayName
                  )}
                  {source.metadata.page ? ` (Page ${source.metadata.page})` : ' (General Reference)'}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      
      {hasWebSources && sources.search && (
        <div className="mb-3">
          <div className="flex items-center text-gray-700 font-medium mb-1">
            <Globe className="h-4 w-4 mr-1 text-green-600" />
            <span>From Web Search:</span>
          </div>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            {sources.search.map((source, index) => (
              <li key={`web-${index}`} className="mb-2">
                <div className="font-medium">{source.source || "Web Source"}</div>
                {source.content ? (
                  <div className="text-xs mt-1 text-gray-500 italic">
                    {source.content.length > 150 ? `${source.content.substring(0, 150)}...` : source.content}
                  </div>
                ) : (
                  <div className="text-xs mt-1 text-gray-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    <span>Content details not available</span>
                  </div>
                )}
                {source.url ? (
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline block mt-1"
                  >
                    View Source
                  </a>
                ) : (
                  <span className="text-xs text-gray-500 block mt-1">Source link unavailable</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {hasProfessorSources && sources.professor_db && (
        <div className="mb-3">
          <div className="flex items-center text-gray-700 font-medium mb-1">
            <UserRound className="h-4 w-4 mr-1 text-purple-600" />
            <span>Professor Information:</span>
          </div>
          {sources.professor_db.professor_info ? (
            <div className="pl-6">
              <ProfessorInfoCard info={sources.professor_db.professor_info} />
            </div>
          ) : (
            <p className="text-gray-600 pl-6 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1 text-amber-500" />
              <span>Limited information available from </span>
              <a 
                href="https://www.ratemyprofessors.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 text-blue-600 hover:underline"
              >
                Rate My Professors
              </a>
            </p>
          )}
        </div>
      )}

      {hasSchoolSources && sources.school_db && (
        <div className="mb-3">
          <div className="flex items-center text-gray-700 font-medium mb-1">
            <School className="h-4 w-4 mr-1 text-amber-600" />
            <span>School Information:</span>
          </div>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            {sources.school_db.map((school: any, index: number) => (
              <li key={`school-${index}`}>
                {school.name || "School"}
                {school.urls?.website ? (
                  <a 
                    href={school.urls.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-1 text-blue-600 hover:underline"
                  >
                    (Visit Website)
                  </a>
                ) : (
                  <span className="ml-1 text-gray-400">(Website unavailable)</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {!hasKnowledgeBaseSources && !hasWebSources && !hasProfessorSources && !hasSchoolSources && (
        <p className="text-gray-500 italic flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          No specific sources cited for this response.
        </p>
      )}
    </div>
  );
};

interface ProfessorInfo {
  name?: string;
  department?: string;
  rating?: string | number;
  office_hours?: string;
  expertise?: string;
  courses?: string[];
  [key: string]: any;
}

interface ProfessorInfoCardProps {
  info: ProfessorInfo;
}

const ProfessorInfoCard: React.FC<ProfessorInfoCardProps> = ({ info }) => {
  const hasCompleteData = info.rating || info.office_hours || info.expertise;
  
  // Extract relevant fields from professor info
  const relevantFields: {[key: string]: string} = {
    'Name': info.name || 'N/A',
    'Department': info.department || 'N/A',
    'Rating': info.rating ? `${info.rating}` : 'N/A',
    'Office Hours': info.office_hours || 'N/A',
    'Expertise': info.expertise || 'N/A',
  };
  
  return (
    <div className="bg-purple-50 rounded-md p-3 text-sm">
      <table className="w-full">
        <tbody>
          {Object.entries(relevantFields).map(([key, value]) => (
            <tr key={key} className="border-b border-purple-100 last:border-0">
              <td className="py-1 pr-2 text-purple-800 font-medium">{key}:</td>
              <td className="py-1 text-gray-700">
                {value === 'N/A' ? (
                  <span className="text-gray-400 italic">Not available</span>
                ) : (
                  value
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {info.courses && info.courses.length > 0 && (
        <div className="mt-2">
          <span className="text-purple-800 font-medium">Courses:</span>
          <ul className="list-disc pl-5 mt-1 text-gray-700">
            {info.courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-3 text-xs text-gray-500 flex justify-between items-center">
        <a 
          href="https://www.ratemyprofessors.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Data from Rate My Professors
        </a>
        
        {!hasCompleteData && (
          <span className="text-amber-600 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Limited information available
          </span>
        )}
      </div>
    </div>
  );
};

export default SourcesDisplay;