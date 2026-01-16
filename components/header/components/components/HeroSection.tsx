'use client';

import { Button } from './Button';

interface HeroSectionProps {
  onLoginClick: () => void;
}

export function HeroSection({ onLoginClick }: HeroSectionProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30 flex flex-col relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div
        className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-teal-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70" />

      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-teal-700/10 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-teal-700/80" />
          </div>
          <span className="text-xl font-semibold text-slate-700 tracking-tight">
            AIDES-T2D
          </span>
        </div>

        <div className="hidden md:flex space-x-6">
          <button className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">
            About the Study
          </button>
          <button className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">
            Privacy Policy
          </button>
          <button className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">
            Contact Support
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Secure Participant Portal
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-slate-800 mb-6 leading-tight">
            Welcome to the <br />
            <span className="font-semibold text-teal-800">
              AIDES-T2D Study Portal
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-4 max-w-2xl mx-auto leading-relaxed">
            A secure space to share your daily reflections, receive personalized
            emotional support, and track your experience living with Type 2
            diabetes.
          </p>

          <p className="text-slate-500 text-sm md:text-base mb-10 font-light max-w-xl mx-auto">
            Your participation helps us better understand the emotional side of
            living with diabetes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={onLoginClick}
              className="flex items-center justify-center text-lg px-8 py-4"
            >
              <span>Log In to Your Dashboard</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex items-center justify-center space-x-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 text-slate-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-xs text-slate-400 font-medium">
                Encrypted & Private
              </span>
            </div>

            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 text-slate-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-xs text-slate-400 font-medium">
                Emotional Support
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-50/80 border-t border-slate-100 py-6 text-center">
        <p className="text-xs text-slate-400">
          © 2024 AIDES-T2D Research Study. All rights reserved. This portal does
          not provide medical advice.
        </p>
      </footer>
    </div>
  );
}
