import React, { useState, useCallback } from 'react';
import { ArrowRight, Sparkles, UserCheck, Video, Loader2, Mic } from 'lucide-react';
import { generateMarketingCopy } from '../services/geminiService';
import { GeneratedContent, LoadingState } from '../types';
import Interviewprep from "../../interview/interviewprep";

const Hero: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [content, setContent] = useState<GeneratedContent>({
    headline: "Master Your Next Interview with AI Avatars",
    subheadline: "Practice with lifelike 3D mentors. Our ElevenLabs-powered voice AI and MediaPipe tracking give you real-time feedback on your performance."
  });

  const handleGenerate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoadingState(LoadingState.LOADING);
    try {
      const result = await generateMarketingCopy(topic);
      setContent(result);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      setLoadingState(LoadingState.ERROR);
    }
  }, [topic]);

  return (
    <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-8 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            Live: MediaPipe 3D Tracking Enabled
            <ArrowRight size={14} className="text-blue-400" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            {loadingState === LoadingState.LOADING ? (
              <span className="animate-pulse bg-slate-200 text-transparent rounded-lg">Preparing Interview...</span>
            ) : (
              content.headline
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {loadingState === LoadingState.LOADING ? (
               <span className="animate-pulse bg-slate-100 text-transparent block w-full h-16">Customizing your AI mentor...</span>
            ) : (
              content.subheadline
            )}
          </p>

          {/* Interactive Generator */}
          <div className="max-w-md mx-auto mb-10">
             <form onSubmit={handleGenerate} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <div className="relative flex items-center bg-white rounded-full p-1.5 shadow-xl ring-1 ring-slate-900/5">
                   <div className="pl-4 text-slate-400">
                      <Mic size={18} />
                   </div>
                   <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Enter a job role (e.g. 'Senior React Dev')"
                      className="flex-1 border-0 bg-transparent py-2 px-3 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                   />
                   <button
                      type="submit"
                      disabled={loadingState === LoadingState.LOADING || !topic}
                      className="flex-none rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2"
                   >
                      {loadingState === LoadingState.LOADING ? <Loader2 className="animate-spin" size={16} /> : 'Build Interview'}
                   </button>
                </div>
             </form>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Interviewprep />
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2">
              <Video size={20} className="text-blue-500" />
              Try Avatar Mode
            </button>
          </div>

          {/* Social Proof */}
          <div className="border-t border-slate-100 pt-10">
            <p className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-wider">Powered by cutting-edge AI</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60">
               <span className="font-bold text-slate-400 text-xl italic tracking-tighter text-slate-800 underline decoration-blue-500">ElevenLabs</span>
               <span className="font-bold text-slate-400 text-xl text-slate-800">MediaPipe</span>
               <span className="font-bold text-slate-400 text-xl text-slate-800">Google Gemini</span>
               <span className="font-bold text-slate-400 text-xl text-slate-800">Three.js</span>
            </div>
          </div>
        </div>

        {/* Floating UI Elements (Avatar Context) */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 hidden xl:block -translate-x-12">
            <div className="bg-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 max-w-xs animate-float">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">92%</div>
                    <div>
                        <div className="text-sm font-bold text-slate-800">Confidence Score</div>
                        <div className="text-xs text-slate-500">Based on facial tracking</div>
                    </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[92%]"></div>
                </div>
            </div>
        </div>

        <div className="absolute top-1/3 right-0 hidden xl:block translate-x-12">
             <div className="bg-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 max-w-xs animate-float-delayed">
                <div className="text-sm font-bold text-slate-800 mb-2">Live Analysis</div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <UserCheck size={14} className="text-green-500" />
                        <span>Good Eye Contact</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <UserCheck size={14} className="text-green-500" />
                        <span>Clear Articulation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <UserCheck size={14} className="text-blue-500" />
                        <span>Natural Gesture</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;