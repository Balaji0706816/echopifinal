export default function SimulationPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-16">
      <div className="max-w-2xl w-full mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-10 relative">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">Simulation Room</h1>
        <p className="text-center text-gray-600 mb-8">
          Your interview simulation will appear here in the future. Stay tuned for guided practice, feedback, and interactive Q&amp;A.
        </p>
        <div className="flex justify-center">
          <svg
            width="88"
            height="88"
            viewBox="0 0 88 88"
            fill="none"
            className="mx-auto mb-6 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="44" cy="44" r="44" fill="#EEF2FF"/>
            <path d="M29 33a5 5 0 015-5h20a5 5 0 015 5v24a5 5 0 01-5 5H34a5 5 0 01-5-5V33z" stroke="#6366F1" strokeWidth="2.4" fill="white"/>
            <rect x="39" y="43" width="10" height="10" rx="2" fill="#6366F1"/>
            <rect x="35.5" y="34.5" width="17" height="6" rx="2" stroke="#A5B4FC" strokeWidth="1.2" fill="white"/>
          </svg>
        </div>
        <div className="text-center">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-2 rounded-full">
            Coming Soon: Interactive Simulation &amp; AI Feedback
          </span>
        </div>
      </div>
    </div>
  );
}
