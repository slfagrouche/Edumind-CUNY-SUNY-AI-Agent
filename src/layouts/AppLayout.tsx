import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { GraduationCap, MessageCircle, User, Home, Info } from 'lucide-react';

const AppLayout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen minimal-bg text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="bg-white rounded-lg p-2 mr-3 group-hover:bg-gray-100 transition-colors">
                <GraduationCap className="h-6 w-6 text-black" />
              </div>
              <span className="font-bold text-xl">HIPE Campus Mind</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-1">
              <NavLink 
                to="/" 
                icon={<Home className="h-4 w-4" />}
                label="Home"
                isActive={isActive('/')}
              />
              <NavLink 
                to="/chat" 
                icon={<MessageCircle className="h-4 w-4" />}
                label="Chat"
                isActive={isActive('/chat')}
              />
              <NavLink 
                to="/professor" 
                icon={<User className="h-4 w-4" />}
                label="Professors"
                isActive={isActive('/professor')}
              />
              <NavLink 
                to="/about" 
                icon={<Info className="h-4 w-4" />}
                label="About"
                isActive={isActive('/about')}
              />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white rounded-lg p-1.5 mr-2">
                <GraduationCap className="h-4 w-4 text-black" />
              </div>
              <span className="font-medium text-sm">HIPE Campus Mind AI</span>
            </div>
            
            <div className="flex space-x-6 text-xs text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${isActive 
          ? 'bg-white text-black' 
          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
        }
      `}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  );
};

export default AppLayout; 
