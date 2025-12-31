
import React from 'react';
import { InterviewInfo, InterviewType } from '../types';

interface Props {
  formData: InterviewInfo;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onStart: () => void;
  isComplete: boolean;
}

export const InterviewForm: React.FC<Props> = ({ formData, onChange, onStart, isComplete }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            Target Role
          </label>
          <input
            type="text"
            name="role"
            placeholder="e.g. Senior Frontend Engineer"
            value={formData.role}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            placeholder="e.g. Google, Stripe, etc."
            value={formData.companyName}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Interview Focus
          </label>
          <select
            name="interviewType"
            value={formData.interviewType}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none"
          >
            <option value="">Select Category</option>
            <option value="behavioral">Behavioral (Soft Skills)</option>
            <option value="technical">Technical (Coding & Logic)</option>
            <option value="system-design">System Design</option>
            <option value="hr">HR & Culture Fit</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Estimated Date
          </label>
          <input
            type="date"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          disabled={!isComplete}
          onClick={onStart}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2
            ${isComplete 
              ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-indigo-200" 
              : "bg-slate-300 cursor-not-allowed opacity-50"}
          `}
        >
          {isComplete ? (
            <>
              Enter Simulation Room
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          ) : "Complete details to start"}
        </button>
      </div>
    </div>
  );
};
