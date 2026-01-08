'use client';

import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
import { useConversation } from '@elevenlabs/react';

type GLTFResult = GLTF & {
  nodes: {
    FBHead?: THREE.Mesh;
    [key: string]: any;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

export function Avatar() {
  // 1. Load the Model
  const { nodes, materials } = useGLTF('/avatar.glb') as unknown as GLTFResult;
  const headMeshRef = useRef<THREE.Mesh>(null);

  // 2. Find the correct Mesh Name (Auto-detection)
  // FaceBuilder usually names it 'FBHead', 'FBHead_mesh', or 'Mesh'
  const headMesh = nodes.FBHead || nodes.FBHead_mesh || nodes.Mesh || nodes.Head;

  // 3. ElevenLabs Setup
  const conversation = useConversation({
    onConnect: () => console.log("Connected to AI"),
    onDisconnect: () => console.log("Disconnected"),
    onError: (e) => console.error("Error:", e),
  });

  const currentVolume = useRef(0);

  // 4. BLINK STATE (The internal timer)
  const blinkState = useRef({
    isBlinking: false,    // Are we currently closing/opening eyes?
    startTime: 0,         // When did this blink start?
    duration: 0.15,       // How fast is the blink (0.15s is natural)
    nextBlinkTime: 2      // Time until the next blink
  });

  // Volume Polling (Listening to AI)
  useEffect(() => {
    if (conversation.status === 'connected') {
      const interval = setInterval(async () => {
        const vol = await conversation.getOutputVolume();
        currentVolume.current = Math.min(vol * 2.5, 1);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [conversation.status]);

  // 5. ANIMATION LOOP (Runs 60 times a second)
  useFrame((state) => {
    if (!headMeshRef.current || !headMeshRef.current.morphTargetDictionary || !headMeshRef.current.morphTargetInfluences) return;

    const t = state.clock.getElapsedTime();
    const dict = headMeshRef.current.morphTargetDictionary;
    const infl = headMeshRef.current.morphTargetInfluences;

    // --- A. TALKING (Jaw) ---
    const jawIdx = dict['jawOpen'];
    if (jawIdx !== undefined) {
      infl[jawIdx] = THREE.MathUtils.lerp(infl[jawIdx], currentVolume.current, 0.2);
    }

    // --- B. BLINKING (Eyes) ---
    
    // Step 1: Trigger the blink randomly
    if (!blinkState.current.isBlinking && t > blinkState.current.nextBlinkTime) {
      blinkState.current.isBlinking = true;
      blinkState.current.startTime = t;
      // Schedule next blink randomly (between 2s and 6s from now)
      blinkState.current.nextBlinkTime = t + 2 + Math.random() * 4;
    }

    // Step 2: Animate the blink motion
    if (blinkState.current.isBlinking) {
      const elapsed = t - blinkState.current.startTime;
      const progress = elapsed / blinkState.current.duration; // 0.0 to 1.0

      let blinkValue = 0;

      if (progress < 0.5) {
        // Closing Eyes (0 -> 1)
        blinkValue = progress * 2;
      } else if (progress < 1.0) {
        // Opening Eyes (1 -> 0)
        blinkValue = 2 - (progress * 2);
      } else {
        // Blink Done
        blinkValue = 0;
        blinkState.current.isBlinking = false;
      }

      // Step 3: Apply to both eyes
      // FaceBuilder standard names are 'eyeBlink_L' and 'eyeBlink_R'
      const leftIndex = dict['eyeBlink_L'];
      const rightIndex = dict['eyeBlink_R'];

      if (leftIndex !== undefined) infl[leftIndex] = blinkValue;
      if (rightIndex !== undefined) infl[rightIndex] = blinkValue;
    }
  });

  const startConversation = async () => {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    await conversation.startSession({ agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!, connectionType: "websocket" });
  };

  // Safe Render: If model failed to load, show red box
  if (!headMesh) {
    console.error("Could not find head mesh. Available nodes:", Object.keys(nodes));
    return <mesh><boxGeometry /><meshBasicMaterial color="red" /></mesh>;
  }

  return (
    <group dispose={null}>
      <mesh
        ref={headMeshRef}
        onClick={startConversation}
        name="FBHead"
        geometry={headMesh.geometry}
        material={headMesh.material}
        morphTargetDictionary={headMesh.morphTargetDictionary}
        morphTargetInfluences={headMesh.morphTargetInfluences}
        position={[0, -1.5, 0]} 
        scale={[1.5, 1.5, 1.5]}
      />
    </group>
  );
}

useGLTF.preload('/avatar.glb');