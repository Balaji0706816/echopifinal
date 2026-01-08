'use client';

import React from 'react';
import { 
  Command, 
  ArrowRight, 
  Twitter, 
  Linkedin, 
  Github, 
  ShieldCheck, 
  Globe,
  Mic
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#F3F5F8] pt-24 pb-12 px-6 font-sans relative overflow-hidden">
      
      {/* --- NEW: Fading Top Border Merging to White --- */}
      {/* This gradient starts white at the top and fades to transparent, blending seamlessly with the previous section */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>

      {/* Background Decor - Subtle Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        
        {/* --- 1. THE "BENTO" TOP SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
          
          {/* Left Card: The Main CTA (Glassmorphism) */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-md border border-white/50 p-10 rounded-[40px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="relative z-10">
              {/* Logo */}
              <div className="flex-shrink-0 mb-8 flex items-center gap-2 cursor-pointer">
                <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 text-white p-1.5 rounded-lg">
                  <Mic size={20} fill="currentColor" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
                Ready to upgrade your workflow?
              </h2>
              <p className="text-xl text-gray-500 mb-8 max-w-md leading-relaxed">
                Join 10,000+ teams using Cluely to automate their meeting notes today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#1A1C20] hover:bg-black text-white text-lg font-medium py-3 px-8 rounded-full transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                  Get Started Free <ArrowRight size={18} />
                </button>
                <button className="bg-white hover:bg-gray-5 text-gray-700 border border-gray-200 text-lg font-medium py-3 px-8 rounded-full transition-all hover:border-gray-300">
                  Book Demo
                </button>
              </div>
            </div>

            {/* Decorative Background Icon */}
            <Command className="absolute -bottom-10 -right-10 text-gray-100 rotate-[-15deg]" size={240} strokeWidth={0.5} />
          </div>

          {/* Right Card: Social Proof / Status */}
          <div className="lg:col-span-5 flex flex-col gap-6">
             
             {/* Status Card - Restored bg-[#1A1C20] so white text is visible */}
             <div className="bg-[#1A1C20] text-white p-8 rounded-[40px] shadow-xl flex-grow flex flex-col justify-between relative overflow-hidden">
                {/* Abstract Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 blur-2xl rounded-full"></div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-green-400 text-sm font-semibold tracking-wide uppercase">Operational</span>
                  </div>
                  {/* Changed text-black back to text-white for contrast on dark card */}
                  <h3 className="text-2xl font-semibold mb-1 text-white">99.99% Uptime</h3>
                  <p className="text-gray-400">Reliability you can trust.</p>
                </div>

                <div className="mt-8 flex gap-3 opacity-50">
                   <ShieldCheck size={28} />
                   <Globe size={28} />
                </div>
             </div>

             {/* Review/Trust Snippet */}
             <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-5 h-5 bg-yellow-400 rounded-sm clip-star" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}}></div>
                  ))}
                </div>
                <p className="text-gray-900 font-medium text-lg leading-snug">
                  "The best AI tool we've used all year. It's magic."
                </p>
             </div>
          </div>
        </div>


        {/* --- 2. THE LINKS GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-t border-gray-200 pt-16 mb-16">
          
          <div className="lg:col-span-2 pr-8">
            <div className="flex items-center gap-2 mb-6">
               <div className="bg-black text-white p-1.5 rounded-lg">
                  <Mic size={20} fill="currentColor" />
               </div> 
            </div>
            <p className="text-gray-500 mb-6">
              Making meetings actionable, searchable, and actually useful for teams everywhere.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-gray-400 transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-700 hover:border-blue-700 transition-all"><Linkedin size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition-all"><Github size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Product</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Security</a></li>
            </ul>
          </div>

        </div>

        {/* --- 3. BOTTOM BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
           <p className="text-gray-400 text-sm">© 2026 Echopi All rights reserved.</p>
           <div className="flex items-center gap-2 mt-4 md:mt-0"></div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;