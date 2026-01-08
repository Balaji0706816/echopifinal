'use client'

import React from 'react';
import { InterviewForm } from './InterviewForm'; // Adjust path as needed
import { FeedbackDashboard } from './FeedbackDashboard'; // Adjust path as needed
// Import your types. If they are in a central file, import from there.
// For this example, I am assuming these types match what is in your App.tsx
import { InterviewInfo, InterviewFeedback } from '../types'; 
import Link from 'next/link';

export type ModalTab = 'details' | 'job-context' | 'feedback';

interface ExtendedInterviewInfo extends InterviewInfo {
  jobDescription?: string;
}

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  
  // Tab State
  activeTab: ModalTab;
  setActiveTab: (tab: ModalTab) => void;
  
  // Data & Form State
  formData: ExtendedInterviewInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onFieldChange: (field: keyof ExtendedInterviewInfo, value: string) => void;
  isFormComplete: boolean;
  
  // Actions
  onStartSimulation: () => void;
  
  // Analysis State
  feedback: InterviewFeedback | null;
  isAnalysing: boolean;
}

export const SessionModal: React.FC<SessionModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  formData,
  onInputChange,
  onFieldChange,
  isFormComplete,
  onStartSimulation,
  feedback,
  isAnalysing
}) => {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 ease-out" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl h-[650px] bg-white rounded-[24px] shadow-[0_0_50px_-12px_rgb(0,0,0,0.25)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex-none flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Session Configuration</h2>
            <p className="text-gray-500 text-sm mt-0.5">Customize your simulation parameters</p>
          </div>
          
          <button
            onClick={onClose}
            className="group p-2 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Steps */}
        <div className="flex-none px-8 py-4 bg-white border-b border-gray-100">
          <div className="flex gap-8">
            <NavButton 
              active={activeTab === 'details'} 
              label="1. Basic Setup" 
              step={1} 
              onClick={() => setActiveTab('details')}
            />
            <NavButton 
              active={activeTab === 'job-context'} 
              label="2. Job Context" 
              step={2} 
              disabled={!isFormComplete}
              onClick={() => isFormComplete && setActiveTab('job-context')}
            />
            {/* <NavButton 
              active={activeTab === 'feedback'} 
              label="3. Analysis" 
              step={3} 
              disabled={!feedback && !isAnalysing}
              onClick={() => (feedback || isAnalysing) && setActiveTab('feedback')}
            /> */}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth custom-scrollbar bg-gray-50/50">
          <div className="max-w-3xl mx-auto h-full">
            
            {/* --- TAB 1: DETAILS --- */}
            {activeTab === 'details' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <InterviewForm 
                  formData={formData} 
                  onChange={onInputChange} 
                  onStart={() => setActiveTab('job-context')} // Proceed to next step
                  isComplete={isFormComplete}
                />
              </div>
            )}

            {/* --- TAB 2: JOB DESCRIPTION --- */}
            {activeTab === 'job-context' && (
              <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
                
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                          {/* Doc Icon */}
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Target Role Description</h3>
                    </div>
                    <p className="text-gray-500 text-sm mt-1 ml-12">
                      Paste the full job description below. Our AI will analyze keywords and requirements to tailor the simulation.
                    </p>
                  </div>

                  {/* JD Text Area */}
                  <div className="flex-grow relative group ml-1">
                    <textarea
                      name="jobDescription"
                      className="w-full h-full resize-none p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-black/20 focus:border-black transition-all text-sm text-gray-700 leading-relaxed placeholder:text-gray-400 font-mono"
                      placeholder="Paste job description here (e.g. 'Senior React Developer needed...')"
                      value={formData.jobDescription || ''}
                      onChange={(e) => onFieldChange('jobDescription', e.target.value)}
                    />
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
                      <button 
                        onClick={() => setActiveTab('details')}
                        className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-xl hover:bg-gray-100"
                      >
                        Back
                      </button>
                      <Link
                        href={`/simulation`}
                        className="
                          px-8 py-2.5 bg-black hover:bg-black-600 text-white text-sm font-semibold rounded-xl 
                          shadow-[0_4px_14px_0_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] 
                          transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                        "
                      >
                        Generate Simulation
                      </Link>
                  </div>
                </div>

              </div>
            )}

            {/* --- TAB 3: FEEDBACK --- */}
            {activeTab === 'feedback' && (
              <div className="h-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                {isAnalysing ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-6">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-gray-100 border-t-indigo-600 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">Analyzing Performance</h3>
                      <p className="text-gray-500 max-w-xs mx-auto">Our AI is generating actionable insights from your session...</p>
                    </div>
                  </div>
                ) : (
                  feedback && <FeedbackDashboard feedback={feedback} onReset={onClose} />
                )}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Component: NavButton ---
const NavButton: React.FC<{ 
  active: boolean; 
  label: string; 
  step: number; 
  disabled?: boolean;
  onClick: () => void;
}> = ({ active, label, step, disabled, onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`
      flex items-center gap-2 pb-4 px-2 text-sm font-medium border-b-2 transition-all duration-200 outline-none
      ${active 
        ? 'border-indigo-600 text-indigo-600' 
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed hover:border-transparent hover:text-gray-500' : ''}
    `}
  >
    <span className={`
      flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold transition-colors
      ${active ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'}
    `}>
      {step}
    </span>
    {label}
  </button>
);