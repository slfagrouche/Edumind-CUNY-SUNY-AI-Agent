import React from 'react';
import ChatInterface from '../components/ChatInterface';
import { BookOpen, GraduationCap, Building } from 'lucide-react';

interface HomeProps {
  hasConsented: boolean | null;
}

const Home: React.FC<HomeProps> = ({ hasConsented }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-6">
        <h2 className="text-2xl font-bold gradient-text mb-3 flex items-center">
          <GraduationCap className="h-6 w-6 mr-2 text-purple-600" />
          Your College Questions, Answered
        </h2>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-purple-100 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Feature 
              icon={<BookOpen className="h-5 w-5 text-indigo-600" />} 
              title="Programs & Admissions" 
              description="Find programs, deadlines & requirements" 
            />
            <Feature 
              icon={<Building className="h-5 w-5 text-purple-600" />} 
              title="Campus Life" 
              description="Housing, clubs & student resources" 
            />
            <Feature 
              icon={<GraduationCap className="h-5 w-5 text-violet-600" />} 
              title="Transfer Info" 
              description="Credits, applications & timelines" 
            />
          </div>
        </div>
      </section>
      
      <ChatInterface hasConsented={hasConsented} />
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

export default Home;