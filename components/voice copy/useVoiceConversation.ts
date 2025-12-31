"use client";

import { useConversation } from "@elevenlabs/react";

export function useVoiceConversation() {
  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onError: (error) => console.error("Error:", error),
  });

  const isConnected = conversation.status === "connected";
  const isSpeaking = conversation.isSpeaking;

  const start = async () => {
    await navigator.mediaDevices.getUserMedia({ audio: true });

    await conversation.startSession({
      agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!,
      connectionType: "websocket",
    });
  };

  const stop = async () => {
    await conversation.endSession();
  };

  return {
    status: conversation.status,
    isConnected,
    isSpeaking,
    start,
    stop,
  };
}
