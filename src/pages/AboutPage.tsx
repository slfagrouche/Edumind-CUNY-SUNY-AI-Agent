import React from 'react';
import { ExternalLink } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">About the CUNY/SUNY AI Assistant</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            The CUNY/SUNY AI Assistant is designed to provide accurate information about the City University of New York (CUNY) 
            and State University of New York (SUNY) systems. It leverages advanced AI technology to answer questions about admissions, 
            transfers, programs, campus life, and more.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Information Sources</h3>
          <p className="text-gray-600 mb-4">
            Our assistant draws information from:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Official handbooks and academic catalogs</li>
            <li>University websites and knowledge bases</li>
            <li>Professor information databases</li>
            <li>Live web searches for the most current information</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Important Disclaimer</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="text-yellow-700">
              The information provided by this AI assistant is generated automatically and while we strive for accuracy,
              it may not always be complete or up-to-date. Always verify critical information with official university sources
              before making important academic decisions.
            </p>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Official Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://www.cuny.edu/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              <span className="flex-grow font-medium text-blue-700">CUNY Official Website</span>
              <ExternalLink className="h-5 w-5 text-blue-500" />
            </a>
            <a 
              href="https://www.suny.edu/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              <span className="flex-grow font-medium text-blue-700">SUNY Official Website</span>
              <ExternalLink className="h-5 w-5 text-blue-500" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;