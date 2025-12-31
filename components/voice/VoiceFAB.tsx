'use client'

interface VoiceFABProps {
    isOpen: boolean;
    onToggle: () => void;
  }
  
  export function VoiceFAB({ isOpen, onToggle }: VoiceFABProps) {
    return (
      <button
        onClick={onToggle}
        className="h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
      >
        <span className="text-2xl">{isOpen ? "✕" : "🎙️"}</span>
      </button>
    );
  }
  