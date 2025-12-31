
import React, { useState, useCallback } from 'react';
import { InterviewInfo, Tab, Message, InterviewFeedback } from './types';
import { InterviewForm } from './components/InterviewForm';
import { MockInterviewChat } from './components/MockInterviewChat';
import { FeedbackDashboard } from './components/FeedbackDashboard';
import { generateFeedback } from './services/geminiService';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("details");
  const [hasStartedMock, setHasStartedMock] = useState(false);
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);

  const [formData, setFormData] = useState<InterviewInfo>({
    interviewType: 'behavioral',
    companyName: "",
    interviewDate: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormComplete = !!(
    formData.interviewType &&
    formData.companyName &&
    formData.role &&
    formData.interviewDate
  );

  const handleStartMock = () => {
    setHasStartedMock(true);
    setActiveTab("mock");
  };

  const handleFinishInterview = async (history: Message[]) => {
    setActiveTab("feedback");
    setIsAnalysing(true);
    try {
      const result = await generateFeedback(history, formData);
      setFeedback(result);
    } catch (error) {
      console.error("Feedback generation failed", error);
    } finally {
      setIsAnalysing(false);
    }
  };

  const resetAll = () => {
    setHasStartedMock(false);
    setActiveTab("details");
    setFeedback(null);
    setIsAnalysing(false);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-indigo-100">
      
   

      <button
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-indigo-700 shadow-xl shadow-indigo-100"
      >
        <span className="flex items-center gap-2">
          Start Preparation Session
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </button>

      {/* Modern Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={resetAll} />
          
          <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Session Manager</h2>
                <p className="text-slate-500 text-sm">Configure your tailored simulation environment</p>
              </div>
              <button
                onClick={resetAll}
                className="p-2 rounded-xl hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Steps / Navigation */}
            <div className="flex px-8 py-4 bg-white border-b border-slate-100 gap-8">
              <NavButton 
                active={activeTab === 'details'} 
                label="Simulation Setup" 
                step={1} 
                onClick={() => !hasStartedMock && setActiveTab('details')}
              />
              <NavButton 
                active={activeTab === 'mock'} 
                label="Mock Interview" 
                step={2} 
                disabled={!hasStartedMock}
                onClick={() => hasStartedMock && setActiveTab('mock')}
              />
              <NavButton 
                active={activeTab === 'feedback'} 
                label="Performance Insights" 
                step={3} 
                disabled={!feedback && !isAnalysing}
                onClick={() => feedback && setActiveTab('feedback')}
              />
            </div>

            {/* Tab Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {activeTab === 'details' && (
                <InterviewForm 
                  formData={formData} 
                  onChange={handleChange} 
                  onStart={handleStartMock}
                  isComplete={isFormComplete}
                />
              )}

              {activeTab === 'mock' && (
                <MockInterviewChat 
                  info={formData} 
                  onFinish={handleFinishInterview} 
                />
              )}

              {activeTab === 'feedback' && (
                isAnalysing ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="text-slate-600 font-medium animate-pulse">Analysing your performance data...</p>
                  </div>
                ) : (
                  feedback && <FeedbackDashboard feedback={feedback} onReset={resetAll} />
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <div className="fixed bottom-8 flex items-center gap-6 text-slate-400 text-sm">
        <span className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          AI Engines Operational
        </span>
        <span className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy Policy</span>
        <span className="hover:text-indigo-600 cursor-pointer transition-colors">Terms of Service</span>
      </div>
    </div>
  );
};

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
    className={`flex items-center gap-3 py-2 transition-all relative
      ${active ? 'text-indigo-600' : 'text-slate-400'}
      ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:text-indigo-400 cursor-pointer'}
    `}
  >
    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2
      ${active ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}
    `}>
      {step}
    </span>
    <span className="font-semibold text-sm whitespace-nowrap">{label}</span>
    {active && <div className="absolute -bottom-4 left-0 right-0 h-1 bg-indigo-600 rounded-full" />}
  </button>
);

export default App;
