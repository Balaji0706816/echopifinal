'use client'

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Avatar } from '../../components/Avatar'; 

export default function AvatarPage() {
  return (
    // Changed bg-colors to gray/white for better contrast
    <div className='flex justify-center items-center w-full h-[80vh] bg-gray-100'>
      <div className='w-full md:w-1/2 h-[80vh] rounded-2xl bg-black shadow-xl overflow-hidden'>
        
        {/* Adjusted Camera Z to 2 (Moved back so we see the whole head) */}
        <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
          
          {/* Brighter lights to ensure visibility */}
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, 10]} intensity={0.5} />
          <Environment preset="city" />

          <Suspense fallback={null}>
            <Avatar />
          </Suspense>

          {/* Controls to let you look around if you can't see it */}
          <OrbitControls target={[0, 0, 0]} enableZoom={true} />
        </Canvas>
      </div>
    </div>
  );
}