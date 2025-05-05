import React from 'react';
import ProfessorSearch from '../components/ProfessorSearch';
import { UserRound, Star, Clock, Library } from 'lucide-react';

interface ProfessorPageProps {
  hasConsented: boolean | null;
}

const ProfessorPage: React.FC<ProfessorPageProps> = ({ hasConsented }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-6">
        <h2 className="text-2xl font-bold gradient-text mb-3 flex items-center">
          <UserRound className="h-6 w-6 mr-2 text-purple-600" />
          Professor Insights
        </h2>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-purple-100 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Feature 
              icon={<Star className="h-5 w-5 text-amber-500" />} 
              title="Ratings & Reviews" 
              description="Get the scoop before you enroll" 
            />
            <Feature 
              icon={<Clock className="h-5 w-5 text-teal-600" />} 
              title="Office Hours" 
              description="When to get extra help & support" 
            />
            <Feature 
              icon={<Library className="h-5 w-5 text-violet-600" />} 
              title="Teaching History" 
              description="Courses, departments & expertise" 
            />
          </div>
        </div>
      </section>
      
      <ProfessorSearch hasConsented={hasConsented} />
    </div>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start flex-1">
      <div className="bg-white p-2 rounded-full shadow-sm mr-3">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ProfessorPage;