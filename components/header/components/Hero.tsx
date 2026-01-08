'use client';

import React, { useState, useCallback } from 'react';
import { ArrowRight, Video, Loader2, Mic } from 'lucide-react';
import { generateMarketingCopy } from '../services/geminiService'; // Ensure generateFeedback is imported
import { GeneratedContent, LoadingState } from '../types';
import VideoCallAssistantOverlay from '../../VideoCallAssistantOverlay';
import { SessionModal, ModalTab } from '../../interview/components/SessionModal'; // Import your new component
import { InterviewInfo } from '../../interview/types';
import { ExtendedInterviewInfo } from '@/components/interview/interviewprep';

// Constants for UI consistency
const BRANDS = [
  { name: 'ElevenLabs', style: 'decoration-blue-500/30 underline underline-offset-4' },
  { name: 'MediaPipe', style: '' },
  { name: 'Google Gemini', style: '' },
  { name: 'Three.js', style: '' },
];

const Hero: React.FC = () => {
  // --- Hero Content State ---
  const [topic, setTopic] = useState<string>('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [content, setContent] = useState<GeneratedContent>({
    headline: "Master Interviews with AI.",
    subheadline: "Practice with lifelike 3D mentors. Our ElevenLabs-powered voice AI and MediaPipe tracking provide real-time performance analytics."
  });

  // --- Modal & Session State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ModalTab>("details");
  const [isAnalysing, setIsAnalysing] = useState(false);

  const [formData, setFormData] = useState<InterviewInfo>({
    interviewType: 'behavioral',
    companyName: "",
    interviewDate: "",
    role: "",
  });

  const isLoading = loadingState === LoadingState.LOADING;

  // --- Handlers ---

  // Handle form data changes from the Modal
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFieldChange = (field: keyof InterviewInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormComplete = !!(
    formData.interviewType &&
    formData.companyName &&
    formData.role &&
    formData.interviewDate
  );

  const handleStartSimulation = () => {
    // Logic to actually start the 3D scene or chat interface goes here
    console.log("Starting simulation with:", formData);
    setIsModalOpen(false);
    // Trigger navigation or state change to show the actual interview interface
  };

  const resetAll = () => {
    setActiveTab("details");
    setIsAnalysing(false);
    setIsModalOpen(false);
  };

  // --- Existing Hero Logic (Updated) ---

  const handleGenerate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    // Optional: Keep the marketing copy generation, OR
    // Use this input to "Quick Start" the modal
    setLoadingState(LoadingState.LOADING);
    
    // Simulate a quick loading effect then open modal with pre-filled data
    setTimeout(() => {
      setFormData(prev => ({ ...prev, role: topic }));
      setLoadingState(LoadingState.IDLE);
      setIsModalOpen(true); // Open the modal
    }, 800);

  }, [topic]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Ambient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
         <div className="flex flex-col items-center">
           {/* Status Badge */}
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-black/20 shadow-sm mb-10 transition-all hover:border-black/20 cursor-default group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/20 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black/20"></span>
            </span>
            <span className="text-xs font-semibold text-slate-600 tracking-tight uppercase">
              v2.0: MediaPipe 3D Spatial Tracking
            </span>
            <ArrowRight size={14} className="ml-1 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Headline Section */}
          <div className="min-h-[160px] md:min-h-[200px]" aria-live="polite">
            <h1 className="text-3xl md:text-5xl tracking-tighter text-slate-900 mb-6 transition-all duration-500 leading-[1.1]">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-black-900">
                {content.headline}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10 tracking-tight font-medium">
              {content.subheadline}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            
            {/* Main CTA - Opens Modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="
                group relative inline-flex items-center justify-center px-8 py-3 
                font-semibold text-white transition-all duration-300 
                bg-[#1A1C20] hover:bg-black 
                rounded-2xl 
                shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)] 
                hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.25)]
                hover:-translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                border border-white/10 
                cursor-pointer
              "
            >
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
              <span className="flex items-center gap-3 text-lg tracking-tight">
                Start Preparation Session
                <svg 
                  className="w-5 h-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>

            {/* Secondary CTA */}
            <button 
              className="
                group relative px-8 py-3 
                bg-white hover:bg-gray-50 
                border border-gray-200 hover:border-gray-300
                rounded-2xl 
                font-semibold text-gray-900 
                shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)]
                transition-all duration-300 
                flex items-center gap-3 
                active:scale-[0.98] cursor-pointer
              "
            >
              <div className="flex items-center justify-center w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                <Video size={20} className="text-gray-900" strokeWidth={2.5} />
              </div>
              <span className="tracking-tight">Initialize Interviewer Mode</span>
            </button>
          </div>
         </div>

          <VideoCallAssistantOverlay />

          {/* Quick Start Input */}
          <div className="max-w-xl mx-auto mb-16 mt-10">
            <form onSubmit={handleGenerate} className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition duration-700"></div>
              <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl p-2 shadow-xl shadow-slate-200/40">
                <Mic className="ml-4 text-slate-400" size={20} />
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="E.g. Senior Software Engineer at Google..."
                  className="flex-1 px-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium tracking-tight"
                />
                <button
                  type="submit"
                  disabled={isLoading || !topic}
                  className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold transition-all hover:bg-blue-600 disabled:bg-slate-100 disabled:text-slate-400 flex items-center gap-2 active:scale-95"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Quick Start'}
                </button>
              </div>
            </form>
          </div>

          {/* Tech Stack Social Proof */}
          <div className="pt-12 border-t border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-8">
              Engineered with Industry Standards
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 grayscale opacity-60 hover:opacity-100 transition-opacity duration-500">
              {BRANDS.map((brand) => (
                <span 
                  key={brand.name} 
                  className={`text-sm md:text-base font-bold font-mono text-slate-700 tracking-tighter ${brand.style}`}
                >
                  {brand.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- REUSED SESSION MODAL --- */}
      <SessionModal 
        isOpen={isModalOpen}
        onClose={resetAll}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        formData={formData}
        onInputChange={handleInputChange}
        onFieldChange={(field: keyof ExtendedInterviewInfo, value: string) => handleFieldChange(field as keyof InterviewInfo, value)}
        isFormComplete={isFormComplete}
        onStartSimulation={handleStartSimulation}
          feedback={null}
        isAnalysing={isAnalysing}
      />

    </section>
  );
};

export default Hero;