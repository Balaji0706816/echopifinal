"use client";

import { useEffect, useRef } from "react";

export default function AvatarPlayer({ webrtcUrl }: { webrtcUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.src = webrtcUrl;
    videoRef.current.play();
  }, [webrtcUrl]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="rounded-xl shadow-lg"
    />
  );
}
