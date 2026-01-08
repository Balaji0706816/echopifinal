'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, Mic, ChevronRight, ChevronDown, 
  Code, Users, Brain, Activity, Video, 
  BookOpen, PlayCircle, FileText, Sparkles 
} from 'lucide-react';

// --- Configuration Data ---
const NAV_ITEMS = [
  {
    label: 'Practice',
    href: '#',
    children: [
      { 
        label: 'Behavioral', 
        desc: 'Master soft skills & STAR method', 
        icon: Users, 
        href: '#' 
      },
      { 
        label: 'Technical', 
        desc: 'Coding challenges & algorithm prep', 
        icon: Code, 
        href: '#' 
      },
      { 
        label: 'System Design', 
        desc: 'Architecture & scalability interviews', 
        icon: Brain, 
        href: '#' 
      },
    ]
  },
  {
    label: 'Features',
    href: '#',
    children: [
      { 
        label: 'Real-time Feedback', 
        desc: 'Instant AI analysis of your answers', 
        icon: Activity, 
        href: '#' 
      },
      { 
        label: '3D Body Language', 
        desc: 'Spatial tracking via MediaPipe', 
        icon: Video, 
        href: '#' 
      },
      { 
        label: 'Resume Analysis', 
        desc: 'ATS optimization & keyword matching', 
        icon: FileText, 
        href: '#' 
      },
    ]
  },
  {
    label: 'Library',
    href: '#',
    children: [
      { 
        label: 'Question Bank', 
        desc: '500+ Top tech company questions', 
        icon: BookOpen, 
        href: '#' 
      },
      { 
        label: 'My Recordings', 
        desc: 'Review your past sessions', 
        icon: PlayCircle, 
        href: '#' 
      },
    ]
  }
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [hoveredDesktopItem, setHoveredDesktopItem] = useState<string | null>(null);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Helper to toggle mobile accordions
  const toggleMobileDropdown = (label: string) => {
    setActiveMobileDropdown(activeMobileDropdown === label ? null : label);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* --- Logo --- */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer group z-50 relative">
              <div className="bg-slate-900 text-white p-2 rounded-xl shadow-sm transition-transform group-hover:scale-105">
                <Mic size={18} fill="currentColor" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-black">
                EchoPilot
              </span>
            </Link>

            {/* --- Desktop Navigation --- */}
            <div className="hidden md:flex items-center space-x-1 h-full">
              {NAV_ITEMS.map((item) => (
                <div 
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setHoveredDesktopItem(item.label)}
                  onMouseLeave={() => setHoveredDesktopItem(null)}
                >
                  <button 
                    className={`
                      px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-1
                      ${hoveredDesktopItem === item.label ? 'text-slate-900 bg-slate-50' : 'text-slate-500 hover:text-slate-900'}
                    `}
                  >
                    {item.label}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${hoveredDesktopItem === item.label ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Desktop Dropdown Panel */}
                  <div 
                    className={`
                      absolute top-full left-1/2 -translate-x-1/2 w-[320px] pt-4
                      transition-all duration-200 ease-out origin-top-center
                      ${hoveredDesktopItem === item.label ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}
                    `}
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-2">
                      {item.children.map((child) => (
                        <a 
                          key={child.label} 
                          href={child.href}
                          className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item"
                        >
                          <div className="mt-1 p-2 bg-slate-50 rounded-lg text-slate-600 group-hover/item:bg-white group-hover/item:text-blue-600 group-hover/item:shadow-sm transition-all">
                            <child.icon size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 group-hover/item:text-blue-600 transition-colors">
                              {child.label}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                              {child.desc}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- Desktop CTA --- */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-sm font-medium text-slate-600 hover:text-slate-900 px-2">
                Log in
              </button>
              <button className="
                bg-slate-900 hover:bg-black text-white 
                px-5 py-2.5 rounded-full 
                font-medium text-sm 
                transition-all duration-300 
                shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.15)] 
                hover:-translate-y-0.5
                cursor-pointer flex items-center gap-2
              ">
                <Sparkles size={16} />
                <span>Start Mock Interview</span>
              </button>
            </div>

            {/* --- Mobile Hamburger Button --- */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -mr-2 text-slate-500 hover:text-slate-900 transition-colors focus:outline-none"
                aria-label="Open menu"
              >
                <Menu size={26} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay (Drawer) --- */}
      <div 
        className={`fixed inset-0 z-[60] md:hidden transition-visibility duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sliding Sidebar Panel */}
        <div 
          className={`
            absolute top-0 left-0 bottom-0 
            w-[85%] max-w-[360px] bg-white 
            shadow-2xl flex flex-col
            transform transition-transform duration-300 ease-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100 flex-none">
             <div className="flex items-center gap-2">
                <div className="bg-slate-900 text-white p-1.5 rounded-lg">
                  <Mic size={16} fill="currentColor" />
                </div>
                <span className="font-bold text-lg tracking-tight text-slate-900">EchoPilot</span>
             </div>
             <button 
               onClick={() => setIsMobileMenuOpen(false)}
               className="p-2 -mr-2 text-slate-400 hover:text-slate-900 transition-colors"
             >
               <X size={20} />
             </button>
          </div>

          {/* Mobile Links (Scrollable) */}
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
             <div className="mb-8">
               <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Menu</p>
               
               {/* Mobile Accordions */}
               {NAV_ITEMS.map((item) => (
                  <div key={item.label} className="mb-2">
                    <button 
                      onClick={() => toggleMobileDropdown(item.label)}
                      className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      {item.label}
                      <ChevronRight 
                        size={16} 
                        className={`text-slate-300 transition-transform duration-200 ${activeMobileDropdown === item.label ? 'rotate-90 text-blue-600' : ''}`} 
                      />
                    </button>

                    {/* Collapsible Content */}
                    <div 
                      className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${activeMobileDropdown === item.label ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                      `}
                    >
                      <div className="px-4 pb-2 pt-1 space-y-1">
                        {item.children.map((child) => (
                          <a 
                            key={child.label}
                            href={child.href}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-colors"
                          >
                            <child.icon size={18} className="opacity-70" />
                            <span className="text-sm font-medium">{child.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
               ))}
             </div>

             {/* Mobile CTA Area */}
             <div className="px-2 mt-auto">
                <button className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-slate-200 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                  <Sparkles size={18} />
                  Start Mock Interview
                </button>
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                   <button className="py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">Log In</button>
                   <button className="py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">Sign Up</button>
                </div>
             </div>
          </div>
          
          {/* Mobile Footer */}
          <div className="p-6 border-t border-slate-100 flex-none bg-slate-50/50">
            <p className="text-xs text-slate-400 text-center">© 2024 EchoPilot Inc.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;