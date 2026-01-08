'use client';

import React from 'react';
import { Search, MoreHorizontal, User, Mail, Send } from 'lucide-react';

const FeaturesGrid = () => {
  return (
    <section className="bg-white py-24 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-[1.1] mb-6">
            Four ways we make your <br className="hidden md:block" />
            meetings better
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* --- CARD 1: REAL-TIME AI (Blue) --- */}
          <div className="bg-[#5B95F8] rounded-[32px] p-8 h-[480px] relative overflow-hidden flex flex-col justify-between group">
            
            {/* Mock UI: The Floating Chat Interface */}
            <div className="absolute top-8 left-8 right-8 h-[300px] bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-4 shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
               {/* Floating "Next Step" Button */}
               <div className="absolute top-4 right-4 bg-[#1F2125] text-white text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-700 shadow-lg">
                 What do I say next?
               </div>
               
               {/* Mock Transcript Text */}
               <div className="mt-12 space-y-3 opacity-90">
                 <p className="text-white/90 text-sm leading-relaxed">
                   "I hear you on the integration concerns—that's usually the first thing that comes up. We've actually built direct connectors..."
                 </p>
               </div>

               {/* Bottom Input Bar */}
               <div className="absolute bottom-4 left-4 right-4 bg-white/10 rounded-lg h-10 flex items-center px-3 border border-white/10">
                  <div className="w-4 h-4 rounded-sm border border-white/30 mr-2"></div>
                  <div className="w-20 h-1.5 bg-white/20 rounded-full"></div>
               </div>
            </div>

            {/* Spacer to push text down */}
            <div className="flex-grow"></div>

            {/* Text Content */}
            <div className="relative z-10 mt-6">
              <h3 className="text-2xl font-bold text-white mb-3">
                AI that answers questions for you, real-time
              </h3>
              <p className="text-blue-100 text-lg leading-relaxed opacity-90">
                Cluely uses the screen, transcript, and AI to answer questions for you, live.
              </p>
            </div>
          </div>


          {/* --- CARD 2: INSTANT EMAILS (Gray, Text Top) --- */}
          <div className="bg-[#F3F5F8] rounded-[32px] p-8 h-[480px] relative overflow-hidden flex flex-col group">
             {/* Text Content */}
             <div className="relative z-10 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Instant follow-up emails
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Send perfectly drafted follow-up emails within seconds after every call.
              </p>
            </div>

            {/* Abstract Visual / Negative Space */}
            <div className="flex-grow relative">
               {/* Mock Email Composition Window floating up from bottom */}
               <div className="absolute -bottom-10 left-8 right-8 bg-white rounded-t-2xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-6 border border-gray-100 h-[250px] transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <Mail size={14} />
                     </div>
                     <div className="h-2 w-32 bg-gray-100 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                     <div className="h-2 w-full bg-gray-50 rounded-full"></div>
                     <div className="h-2 w-5/6 bg-gray-50 rounded-full"></div>
                     <div className="h-2 w-4/6 bg-gray-50 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-6 right-6 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                     <Send size={16} />
                  </div>
               </div>
            </div>
          </div>


          {/* --- CARD 3: WHO ARE YOU TALKING TO (Gray, Split Layout) --- */}
          <div className="bg-[#F3F5F8] rounded-[32px] p-8 h-[400px] relative overflow-hidden flex items-center group">
            
            {/* Left: Text */}
            <div className="w-1/2 pr-4 relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Who are you <br /> really talking to?
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Learn everything about anyone before every call — where they work, what they do, and more.
              </p>
            </div>

            {/* Right: Mock Profile Card */}
            <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[280px] bg-white rounded-xl shadow-xl border border-gray-100 p-5 transform rotate-[-3deg] transition-all duration-500 group-hover:rotate-0 group-hover:scale-105">
               <div className="text-xs text-gray-400 font-medium mb-4 uppercase tracking-wider">Cluely &lt;&gt; Acme Intro</div>
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                     <User className="text-gray-400" size={24} />
                  </div>
                  <div>
                     <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                     <div className="h-2 w-12 bg-gray-100 rounded"></div>
                  </div>
               </div>
               <div className="bg-gray-50 rounded p-3 mb-2">
                  <div className="flex items-center gap-2 mb-1">
                     <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                     <span className="text-[10px] font-bold text-gray-700">San Francisco • CEO</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-snug">
                     21-year-old CEO of Cluely, an AI startup real-time meeting assistant.
                  </p>
               </div>
            </div>
          </div>


          {/* --- CARD 4: BEAUTIFUL NOTES (Gray, Image Top, Text Bottom) --- */}
          <div className="bg-[#F3F5F8] rounded-[32px] p-8 h-[400px] relative overflow-hidden flex flex-col justify-between group">
             
             {/* Top: Mock Meeting Notes UI */}
             <div className="relative w-full h-[180px] bg-white rounded-xl shadow-sm border border-gray-100 p-5 overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.02]">
                {/* Header of notes */}
                <div className="flex justify-between items-start mb-6">
                   <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-red-500">RL</div>
                      <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-500">NS</div>
                   </div>
                   <div className="flex gap-1">
                      <div className="w-6 h-6 rounded bg-gray-50 flex items-center justify-center"><MoreHorizontal size={14} className="text-gray-400"/></div>
                   </div>
                </div>
                {/* Lines of text */}
                <div className="space-y-3">
                   <div className="text-xs font-bold text-gray-300 uppercase tracking-widest">Meeting Notes</div>
                   <div className="h-2 w-3/4 bg-gray-100 rounded-full"></div>
                   <div className="h-2 w-1/2 bg-gray-100 rounded-full"></div>
                </div>
             </div>

             {/* Bottom: Text */}
             <div className="mt-8 relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Beautiful meeting notes
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Instant shareable meeting notes generated by AI.
                </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;