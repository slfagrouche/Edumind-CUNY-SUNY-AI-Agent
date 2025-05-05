import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { GraduationCap, User, Info, Brain, Sparkles } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50 font-['Plus_Jakarta_Sans']">
      <header className="bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-700 text-white shadow-lg border-b border-purple-300">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-white rounded-full p-2 mr-3 shadow-md">
              <GraduationCap className="h-7 w-7 text-purple-700" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold flex items-center">
                EduMind <Sparkles className="h-5 w-5 mx-1 text-yellow-300" />
              </h1>
              <p className="text-xs text-purple-200">CUNY & SUNY AI Guide</p>
            </div>
          </div>
          
          <nav className="flex space-x-2 md:space-x-3">
            <NavLink to="/" currentPath={location.pathname} icon={<Brain className="h-5 w-5" />} label="AI Assistant" />
            <NavLink to="/professor" currentPath={location.pathname} icon={<User className="h-5 w-5" />} label="Professor Info" />
            <NavLink to="/about" currentPath={location.pathname} icon={<Info className="h-5 w-5" />} label="About" />
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 border border-purple-100">
          <Outlet />
        </div>
      </main>
      
      <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white mt-auto">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-3 md:mb-0">
            <GraduationCap className="h-5 w-5 mr-2 text-purple-300" />
            <span className="font-semibold">EduMind</span>
          </div>
          
          <p className="text-purple-200 text-sm text-center">
            AI-powered educational assistant &copy; {new Date().getFullYear()}
          </p>
          
          <div className="text-xs text-purple-300 mt-2 md:mt-0">
            Responses are AI-generated and may require verification
          </div>
        </div>
      </footer>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  currentPath: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, currentPath, icon, label }) => {
  const isActive = currentPath === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-white/20 text-white shadow-md'
          : 'text-purple-100 hover:bg-white/10 hover:text-white'
      }`}
    >
      <span className="mr-2">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default Layout;