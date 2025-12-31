'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import { SnowAvatar } from '../components/SnowAvatar'
import { Suspense } from 'react'

function Loader() {
  return (
    <Html center>
      <div className="text-white">Loading 3D model...</div>
    </Html>
  )
}

export default function Home() {
  return (
    <main className="h-screen w-full bg-gray-900 flex flex-col items-center justify-center">
      <div className="w-full h-[80vh]">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          
          {/* Environment adds realistic reflections to eyes/skin */}
          <Environment preset="city" />

          {/* The Avatar */}
          <Suspense fallback={<Loader />}>
            <SnowAvatar />
          </Suspense>

          {/* Camera Controls (Rotate/Zoom) */}
          <OrbitControls 
            target={[0, 0, 0]} 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
          />
        </Canvas>
      </div>

      <h1 className="text-white text-2xl mt-4">AI Avatar Test</h1>
    </main>
  )
}