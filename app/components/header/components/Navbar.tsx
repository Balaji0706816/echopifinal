import React, { useState } from 'react';
import { Menu, X, Mic } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 text-white p-1.5 rounded-lg">
              <Mic size={20} fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Echopi</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            
            <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm">Practice Sessions</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm">AI Feedback</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm">Library</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
         
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium text-sm transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Start Mock Interview
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-slate-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 absolute w-full animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">3D Avatar</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Practice Sessions</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">AI Feedback</a>
            <div className="pt-4 pb-2 border-t border-slate-100 mt-2">
               <button className="block w-full text-left px-3 py-2 text-base font-medium text-slate-600">Log in</button>
               <button className="block w-full text-left px-3 py-2 text-base font-medium text-blue-600">Start Free Trial</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;