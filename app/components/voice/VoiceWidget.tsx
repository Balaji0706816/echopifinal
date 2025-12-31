"use client";

import { useState } from "react";
import { useVoiceConversation } from "./useVoiceConversation";
import { VoicePanel } from "./VoicePanel";
import { VoiceFAB } from "./VoiceFAB";

export default function VoiceWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const { isConnected, isSpeaking, start, stop } = useVoiceConversation();

  const toggleConversation = async () => {
    try {
      isConnected ? await stop() : await start();
    } catch (err) {
      console.error("Voice error:", err);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-transform duration-300 transform scale-100">
          <VoicePanel
            isConnected={isConnected}
            isSpeaking={isSpeaking}
            onToggleConversation={toggleConversation}
          />
        </div>
      )}


      <VoiceFAB
      
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
             />
    </div>
  );
}
