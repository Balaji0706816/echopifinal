'use client'

interface VoicePanelProps {
    isConnected: boolean;
    isSpeaking: boolean;
    onToggleConversation: () => void;
  }
  
  export function VoicePanel({
    isConnected,
    isSpeaking,
    onToggleConversation,
  }: VoicePanelProps) {
    return (
      <div className="w-72 p-6 bg-white rounded-2xl shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
        <h3 className="text-lg font-bold text-gray-800">AI Assistant</h3>
        <p className="text-sm text-gray-500 mb-4">
          {isConnected ? "I'm listening..." : "Ready to chat?"}
        </p>
  
        <div className="flex items-center justify-center py-4">
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center ${
              isSpeaking ? "bg-blue-100 animate-pulse" : "bg-gray-100"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full ${
                isConnected ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          </div>
        </div>
  
        <button
          onClick={onToggleConversation}
          className={`w-full py-2 rounded-xl font-medium transition-colors ${
            isConnected
              ? "bg-red-50 text-red-600 hover:bg-red-100"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isConnected ? "End Call" : "Start Conversation"}
        </button>
      </div>
    );
  }
  