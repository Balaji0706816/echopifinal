
import React from 'react';
import { InterviewFeedback } from '../types';

interface Props {
  feedback: InterviewFeedback;
  onReset: () => void;
}

export const FeedbackDashboard: React.FC<Props> = ({ feedback, onReset }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-50 border-4 border-indigo-100 mb-4">
          <span className="text-3xl font-bold text-indigo-600">{feedback.score}</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-800">Overall Assessment</h3>
        <p className="text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed">
          {feedback.overallSummary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-2xl">
          <h4 className="flex items-center gap-2 text-emerald-700 font-bold mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Key Strengths
          </h4>
          <ul className="space-y-3">
            {feedback.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700 bg-white/60 p-3 rounded-lg border border-emerald-100/50">
                <span className="text-emerald-500">•</span> {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50/50 border border-amber-100 p-6 rounded-2xl">
          <h4 className="flex items-center gap-2 text-amber-700 font-bold mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Growth Areas
          </h4>
          <ul className="space-y-3">
            {feedback.improvements.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700 bg-white/60 p-3 rounded-lg border border-amber-100/50">
                <span className="text-amber-500">•</span> {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full py-4 text-indigo-600 font-semibold hover:bg-indigo-50 rounded-xl transition-all"
      >
        Prepare Another Session
      </button>
    </div>
  );
};
