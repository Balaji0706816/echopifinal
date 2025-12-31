'use client'

import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Pre-load the model so it loads faster
useGLTF.preload('/snowme_v4.2.glb')

export function SnowAvatar() {
  // 1. Load the model from the public folder
  const { scene } = useGLTF('/snowme_v4.2.glb')

  // 2. Reference to find the mesh for morph targets
  const groupRef = useRef<THREE.Group>(null)
  const headMeshRef = useRef<THREE.Mesh>(null)

  // 3. Find the mesh with morph targets after scene loads
  useEffect(() => {
    if (groupRef.current) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.morphTargetDictionary) {
          headMeshRef.current = child
          console.log("Found mesh with morph targets:", child.name)
          console.log("Morph target names:", Object.keys(child.morphTargetDictionary))
        }
      })
    }
  }, [scene])

  // 4. Debug: Log scene structure
  useEffect(() => {
    console.log("GLTF Scene:", scene)
    scene.traverse((child) => {
      console.log("Scene child:", child.name, child.type)
    })
  }, [scene])

  // 5. Animation Loop (This is where the Lip Sync happens)
  useFrame((state) => {
    const mesh = headMeshRef.current
    if (mesh && mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
        // --- TEST CODE: DELETE THIS LATER ---
        // This makes the mouth open/close automatically just to prove it works
        const time = state.clock.getElapsedTime()
        const fakeAudioVolume = (Math.sin(time * 5) + 1) / 2 // Oscillates between 0 and 1
        
        // accessing the shape key we made in Blender (e.g., "viseme_A")
        // CHECK BLENDER: Did you name it "viseme_A" or something else?
        const mouthOpenIndex = mesh.morphTargetDictionary['viseme_A']
        
        if (mouthOpenIndex !== undefined) {
            mesh.morphTargetInfluences[mouthOpenIndex] = fakeAudioVolume
        }
        // ------------------------------------
    }
  })

  // 6. Render the entire scene
  return (
    <group ref={groupRef} dispose={null} position={[0, -1.5, 0]} scale={1.8}>
      <primitive object={scene} />
    </group>
  )
}