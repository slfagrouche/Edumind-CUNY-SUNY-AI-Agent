import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Search, Users } from 'lucide-react';
import ProfessorSearch from '../components/ProfessorSearch';

interface ProfessorPageProps {
  hasConsented: boolean | null;
}

const ProfessorPage: React.FC<ProfessorPageProps> = ({ hasConsented }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-br from-white to-gray-200 rounded-full p-4">
                <GraduationCap className="h-12 w-12 text-black" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-white/20 border-t-white/60 rounded-full"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Professor
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Search for professors across CUNY and SUNY institutions. Get insights about their teaching style, research, and student feedback.
          </p>
          
          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center space-x-8 mt-8"
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-2xl font-bold text-white">25+</span>
              </div>
              <p className="text-sm text-gray-400">CUNY Schools</p>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Search className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-2xl font-bold text-white">64+</span>
              </div>
              <p className="text-sm text-gray-400">SUNY Schools</p>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <GraduationCap className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-2xl font-bold text-white">1000+</span>
              </div>
              <p className="text-sm text-gray-400">Professors</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Search Interface */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ProfessorSearch hasConsented={hasConsented} />
        </motion.div>
      </div>
    </div>
  );
};

export default ProfessorPage;