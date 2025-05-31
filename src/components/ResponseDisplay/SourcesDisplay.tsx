import React from 'react';
import { FileText, Globe, UserRound, School, AlertCircle, Star, Clock, BookOpen, MapPin, Mail, Phone } from 'lucide-react';
import { AIResponse } from '../../utils/types';

interface SourcesDisplayProps {
  sources: AIResponse['sources'];
}

interface SchoolInfo {
  name?: string;
  urls?: {
    website?: string;
  };
}

interface ProfessorInfo {
  professor_info?: Record<string, unknown>;
  data?: {
    professor_info?: Record<string, unknown>;
  };
  [key: string]: unknown;
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
        <div className="mb-4">
          <div className="flex items-center text-gray-300 font-medium mb-2">
            <FileText className="h-4 w-4 mr-2 text-blue-400" />
            <span>From Official Handbooks:</span>
          </div>
          <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-700/50">
            <ul className="space-y-2">
            {sources.knowledge_base.map((source, index) => {
              const { url, displayName } = getSourceInfo(source.metadata.source);
              return (
                  <li key={`kb-${index}`} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                  {url ? (
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                          className="text-blue-300 hover:text-blue-200 font-medium hover:underline"
                    >
                      {displayName}
                    </a>
                  ) : (
                        <span className="text-blue-300 font-medium">{displayName}</span>
                  )}
                      <div className="text-xs text-gray-400 mt-1">
                        {source.metadata.page ? `Page ${source.metadata.page}` : 'General Reference'}
                      </div>
                    </div>
                </li>
              );
            })}
          </ul>
          </div>
        </div>
      )}
      
      {hasWebSources && sources.search && (
        <div className="mb-4">
          <div className="flex items-center text-gray-300 font-medium mb-2">
            <Globe className="h-4 w-4 mr-2 text-green-400" />
            <span>From Web Search:</span>
          </div>
          <div className="bg-green-900/30 rounded-lg p-3 border border-green-700/50">
            <div className="space-y-3">
            {sources.search.map((source, index) => (
                <div key={`web-${index}`} className="border-l-3 border-green-400 pl-3">
                  <div className="font-medium text-green-300">
                    {source.title || source.source || "Web Source"}
                  </div>
                  {source.content && (
                    <div className="text-sm mt-1 text-gray-300">
                      {source.content.length > 200 ? `${source.content.substring(0, 200)}...` : source.content}
                  </div>
                )}
                  <div className="flex items-center justify-between mt-2">
                {source.url ? (
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                        className="text-xs text-green-300 hover:text-green-200 hover:underline font-medium"
                  >
                        View Source →
                  </a>
                ) : (
                      <span className="text-xs text-gray-500">Source link unavailable</span>
                )}
                  </div>
                </div>
            ))}
            </div>
          </div>
        </div>
      )}
      
      {hasProfessorSources && sources.professor_db && (
        <div className="mb-4">
          <div className="flex items-center text-gray-300 font-medium mb-2">
            <UserRound className="h-4 w-4 mr-2 text-purple-400" />
            <span>Professor Information:</span>
          </div>
          <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700/50">
            <ProfessorInfoCard info={sources.professor_db} />
            </div>
        </div>
      )}

      {hasSchoolSources && sources.school_db && (
        <div className="mb-4">
          <div className="flex items-center text-gray-300 font-medium mb-2">
            <School className="h-4 w-4 mr-2 text-amber-400" />
            <span>School Information:</span>
          </div>
          <div className="bg-amber-900/30 rounded-lg p-3 border border-amber-700/50">
            <ul className="space-y-2">
            {sources.school_db.map((school: SchoolInfo, index: number) => (
                <li key={`school-${index}`} className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <span className="text-amber-300 font-medium">{school.name || "School"}</span>
                    {school.urls?.website && (
                  <a 
                    href={school.urls.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                        className="ml-2 text-xs text-amber-300 hover:text-amber-200 hover:underline"
                  >
                        Visit Website →
                  </a>
                )}
                  </div>
              </li>
            ))}
          </ul>
          </div>
        </div>
      )}
      
      {!hasKnowledgeBaseSources && !hasWebSources && !hasProfessorSources && !hasSchoolSources && (
        <div className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-700">
          <AlertCircle className="h-5 w-5 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-400 italic text-sm">
          No specific sources cited for this response.
        </p>
        </div>
      )}
    </div>
  );
};

interface ProfessorInfoCardProps {
  info: ProfessorInfo;
}

const ProfessorInfoCard: React.FC<ProfessorInfoCardProps> = ({ info }) => {
  // Extract professor info from different possible structures
  const professorData = info.professor_info || info.data?.professor_info || info;
  
  // Helper function to safely get value
  const getValue = (key: string): string => {
    const value = professorData[key as keyof typeof professorData];
    if (value === null || value === undefined || value === '' || value === 'N/A') {
      return '';
    }
    return String(value);
  };

  // Helper function to safely get numeric value
  const getNumericValue = (key: string): number | null => {
    const value = professorData[key as keyof typeof professorData];
    if (value === null || value === undefined || value === '' || value === 'N/A') {
      return null;
    }
    const numValue = Number(value);
    return isNaN(numValue) ? null : numValue;
  };

  // Extract all available information with multiple field name options
  const name = getValue('name') || getValue('professor_name') || getValue('full_name');
  const department = getValue('department') || getValue('dept');
  const school = getValue('school') || getValue('college') || getValue('university');
  
  // Rating information
  const rating = getNumericValue('avg_rating') || getNumericValue('rating') || getNumericValue('overall_rating') || getNumericValue('score');
  const difficulty = getNumericValue('avg_difficulty') || getNumericValue('difficulty') || getNumericValue('difficulty_rating');
  const wouldTakeAgain = getNumericValue('would_take_again') || getNumericValue('take_again_percentage');
  const numRatings = getNumericValue('num_ratings') || getNumericValue('total_ratings') || getNumericValue('review_count');
  
  // Contact information
  const office = getValue('office') || getValue('office_location') || getValue('room');
  const officeHours = getValue('office_hours') || getValue('hours');
  const email = getValue('email') || getValue('contact_email');
  const phone = getValue('phone') || getValue('contact_phone');
  
  // Academic information
  const expertise = getValue('expertise') || getValue('specialization') || getValue('research_areas');
  const courses = (professorData as { courses?: string[] }).courses || (professorData as { classes_taught?: string[] }).classes_taught || [];
  const tags = (professorData as { tags?: string[] }).tags || (professorData as { student_tags?: string[] }).student_tags || [];

  // Check what sections have data
  const hasBasicInfo = name || department || school;
  const hasRatingInfo = rating !== null || difficulty !== null || wouldTakeAgain !== null || numRatings !== null;
  const hasContactInfo = office || officeHours || email || phone;
  const hasAcademicInfo = expertise || (courses && courses.length > 0);
  const hasTags = tags && tags.length > 0;

  if (!hasBasicInfo && !hasRatingInfo && !hasContactInfo && !hasAcademicInfo) {
    return (
      <div className="text-center py-4">
        <AlertCircle className="h-8 w-8 mx-auto text-amber-400 mb-2" />
        <p className="text-gray-300 mb-2">Limited professor information available</p>
        <a 
          href="https://www.ratemyprofessors.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:underline text-sm"
        >
          Search on Rate My Professors →
        </a>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Basic Information */}
      {hasBasicInfo && (
        <div>
          {name && (
            <h3 className="text-lg font-bold text-purple-300 mb-1">{name}</h3>
          )}
          {department && (
            <p className="text-purple-400 font-medium">{department}</p>
          )}
          {school && (
            <p className="text-purple-500 text-sm">{school}</p>
          )}
        </div>
      )}

      {/* Rating Information */}
      {hasRatingInfo && (
        <div className="bg-gray-800 rounded-md p-3 border border-purple-600/50">
          <h4 className="font-semibold text-purple-300 mb-2 flex items-center">
            <Star className="h-4 w-4 mr-1" />
            Ratings & Reviews
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {rating !== null && (
              <div>
                <span className="text-gray-400">Overall Rating:</span>
                <div className="font-bold text-purple-300">{rating}/5.0</div>
              </div>
            )}
            {difficulty !== null && (
              <div>
                <span className="text-gray-400">Difficulty:</span>
                <div className="font-bold text-purple-300">{difficulty}/5.0</div>
              </div>
            )}
            {wouldTakeAgain !== null && (
              <div>
                <span className="text-gray-400">Would Take Again:</span>
                <div className="font-bold text-purple-300">{wouldTakeAgain}%</div>
              </div>
            )}
            {numRatings !== null && (
              <div>
                <span className="text-gray-400">Total Reviews:</span>
                <div className="font-bold text-purple-300">{numRatings}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contact Information */}
      {hasContactInfo && (
        <div className="bg-gray-800 rounded-md p-3 border border-purple-600/50">
          <h4 className="font-semibold text-purple-300 mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            Contact Information
          </h4>
          <div className="space-y-2 text-sm">
            {office && (
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-2 text-gray-500" />
                <span className="text-gray-400">Office:</span>
                <span className="ml-2 font-medium text-gray-300">{office}</span>
              </div>
            )}
            {officeHours && (
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-2 text-gray-500" />
                <span className="text-gray-400">Office Hours:</span>
                <span className="ml-2 font-medium text-gray-300">{officeHours}</span>
              </div>
            )}
            {email && (
              <div className="flex items-center">
                <Mail className="h-3 w-3 mr-2 text-gray-500" />
                <span className="text-gray-400">Email:</span>
                <a href={`mailto:${email}`} className="ml-2 text-indigo-400 hover:underline font-medium">
                  {email}
                </a>
              </div>
            )}
            {phone && (
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-2 text-gray-500" />
                <span className="text-gray-400">Phone:</span>
                <a href={`tel:${phone}`} className="ml-2 text-indigo-400 hover:underline font-medium">
                  {phone}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Academic Information */}
      {hasAcademicInfo && (
        <div className="bg-gray-800 rounded-md p-3 border border-purple-600/50">
          <h4 className="font-semibold text-purple-300 mb-2 flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            Academic Information
          </h4>
          {expertise && (
            <div className="mb-3">
              <span className="text-gray-400 text-sm">Expertise/Research Areas:</span>
              <p className="text-sm font-medium mt-1 text-gray-300">{expertise}</p>
            </div>
          )}
          {courses && courses.length > 0 && (
            <div>
              <span className="text-gray-400 text-sm">Courses Taught:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {courses.slice(0, 6).map((course: string, index: number) => (
                  <span key={index} className="bg-purple-800/50 text-purple-300 px-2 py-1 rounded text-xs font-medium">
                    {course}
                  </span>
                ))}
                {courses.length > 6 && (
                  <span className="text-gray-500 text-xs px-2 py-1">
                    +{courses.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Student Tags */}
      {hasTags && (
        <div>
          <span className="text-gray-400 text-sm">Student Tags:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.slice(0, 8).map((tag: string, index: number) => (
              <span key={index} className="bg-blue-800/50 text-blue-300 px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
            {tags.length > 8 && (
              <span className="text-gray-500 text-xs px-2 py-1">
                +{tags.length - 8} more
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Source Attribution */}
      <div className="border-t border-purple-600/50 pt-3 flex justify-between items-center text-xs">
        <a 
          href="https://www.ratemyprofessors.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:underline"
        >
          Data from Rate My Professors
        </a>
        {(!hasRatingInfo && !hasContactInfo) && (
          <span className="text-amber-400 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Limited data available
          </span>
        )}
      </div>
    </div>
  );
};

export default SourcesDisplay;