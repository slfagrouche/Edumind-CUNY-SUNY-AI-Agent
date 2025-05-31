import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Mail,
  School,
  BookOpen,
  Users,
  MapPin,
  Phone,
  Globe
} from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white rounded-full p-6 mr-4">
                <Brain className="h-16 w-16 text-black" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About HIPE Campus Mind</h1>
            
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Your comprehensive AI-powered platform for navigating the City University of New York (CUNY) 
              and State University of New York (SUNY) systems. Get instant access to professor information, 
              academic guidance, and essential resources to make informed decisions about your education.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">15,000+</div>
              <div className="text-gray-400">Professor Profiles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">CUNY & SUNY Schools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-400">Student Satisfaction</div>
            </div>
          </div>

          {/* CUNY & SUNY Resources */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* CUNY Resources */}
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <School className="h-8 w-8 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">CUNY System Resources</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start">
                  <BookOpen className="h-5 w-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Academic Programs</h3>
                    <p className="text-sm">Over 1,700 degree programs across 25 campuses serving 275,000+ students</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Student Support</h3>
                    <p className="text-sm">Financial aid, tutoring, career services, and transfer assistance</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Campus Locations</h3>
                    <p className="text-sm">All five NYC boroughs plus graduate schools and professional programs</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                  <h4 className="font-semibold text-blue-300 mb-2">Key CUNY Resources:</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• CUNYfirst - Student portal and registration</li>
                    <li>• CUNY Transfer Explorer - Course equivalencies</li>
                    <li>• CUNY Career Services - Job placement assistance</li>
                    <li>• CUNY Libraries - Research and study resources</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* SUNY Resources */}
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <School className="h-8 w-8 text-green-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">SUNY System Resources</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start">
                  <BookOpen className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Academic Excellence</h3>
                    <p className="text-sm">7,000+ degree programs across 64 campuses serving 400,000+ students</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Research Opportunities</h3>
                    <p className="text-sm">Undergraduate research, internships, and study abroad programs</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Statewide Network</h3>
                    <p className="text-sm">Universities, colleges, and community colleges throughout New York State</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-700/30">
                  <h4 className="font-semibold text-green-300 mb-2">Key SUNY Resources:</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• SUNY Transfer Path - Seamless transfer planning</li>
                    <li>• SUNY Online - Distance learning opportunities</li>
                    <li>• SUNY Research Foundation - Funding opportunities</li>
                    <li>• SUNY Global - International programs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-gray-900/30 border border-gray-700/30 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Additional Academic Resources</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Globe className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Transfer Services</h3>
                <p className="text-sm text-gray-400">Seamless credit transfer between CUNY and SUNY institutions</p>
              </div>
              
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Academic Planning</h3>
                <p className="text-sm text-gray-400">Course planning, degree requirements, and graduation tracking</p>
              </div>
              
              <div className="text-center">
                <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Student Life</h3>
                <p className="text-sm text-gray-400">Campus activities, housing, dining, and student organizations</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Have questions about CUNY or SUNY? Need help navigating your academic journey? 
              We're here to help you succeed.
            </p>
            
            <a 
              href="mailto:SaidLfagrouche@gmail.com"
              className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center"
            >
              <Mail className="mr-3 h-5 w-5" />
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;