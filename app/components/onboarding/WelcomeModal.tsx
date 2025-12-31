
"use client"
import  { useState, useEffect } from "react";
import { Heart, Shield, Sparkles, ArrowRight, X } from "lucide-react";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("aides-t2d-welcome-seen");
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("aides-t2d-welcome-seen", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 transition-all duration-500 animate-in fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-emerald-50 rounded-full blur-3xl" />

        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative p-8 pt-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <Heart className="w-10 h-10 text-blue-600 fill-blue-600/10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome to AIDES-T2D</h2>
              <p className="text-blue-600 font-medium tracking-wide text-sm uppercase">Emotional Support Redefined</p>
            </div>

            <div className="space-y-4 max-w-sm">
              <p className="text-slate-600 leading-relaxed">
                Thank you for joining the <span className="text-slate-900 font-semibold italic">Artificial Intelligence–Driven Emotional Support</span> study.
              </p>
              
              <div className="grid grid-cols-1 gap-4 text-left">
                <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors duration-300">
                  <div className="mt-1 p-1 bg-white rounded-md shadow-sm">
                    <Shield className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">Secure & Confidential</h4>
                    <p className="text-xs text-slate-500">Your reflections and data are protected within our study portal.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 transition-colors duration-300">
                  <div className="mt-1 p-1 bg-white rounded-md shadow-sm">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">Empathetic AI</h4>
                    <p className="text-xs text-slate-500">Personalized support designed specifically for the diabetes journey.</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="group relative flex items-center justify-center space-x-2 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-blue-200 hover:shadow-blue-300 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              Study Protocol v2.4 • Confidential Participant Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
