"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import Room from "./Room"
import Overlay from "./Overlay"
import { useEffect, useState } from "react"
import type { MutableRefObject } from "react"

interface ThreeDRoomExperienceProps {
  section: string
  setSection: (section: string) => void
  contentRef: MutableRefObject<HTMLDivElement | null>
}

export default function ThreeDRoomExperience({ section, setSection, contentRef }: ThreeDRoomExperienceProps) {
  const [mounted, setMounted] = useState(false)

  const handleCloseOverlay = () => {
    setSection("")
  }

  useEffect(() => {
    // Fade in the 3D room
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Close overlay on click outside
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node
      if (section && contentRef.current && !contentRef.current.contains(target)) {
        setSection("")
      }
    }

    document.addEventListener("mousedown", handleClick, true)
    return () => document.removeEventListener("mousedown", handleClick, true)
  }, [section, contentRef, setSection])

  return (
    <div
      className={`fixed inset-0 w-full h-full bg-obsidian transition-opacity duration-1000 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Subtle ambient vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,15,0.6) 100%)",
        }}
      />

      <Canvas
        shadows
        camera={{ position: [0, 1, 5], fov: 60 }}
        eventPrefix="client"
        gl={{ antialias: true, alpha: false }}
      >
        {/* Warm lighting setup */}
        <Environment preset="apartment" />
        <ambientLight intensity={0.3} color="#fef3c7" />
        <directionalLight
          position={[8, 10, 5]}
          intensity={0.7}
          color="#fef3c7"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        {/* Accent rim light */}
        <pointLight position={[-5, 3, -3]} intensity={0.3} color="#f59e0b" distance={15} />
        <pointLight position={[5, 2, 3]} intensity={0.2} color="#6366f1" distance={12} />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={8}
        />

        <Room onSelect={setSection} isAnySectonOpen={!!section} />
      </Canvas>

      {/* Overlay panel */}
      {section && (
        <div ref={contentRef}>
          <Overlay section={section} onClose={handleCloseOverlay} />
        </div>
      )}

      {/* Hint at bottom when no section is open */}
      {!section && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-fade-up">
          <span className="font-mono text-[10px] text-stone-600 tracking-[0.3em] uppercase">
            Click objects to explore
          </span>
        </div>
      )}
    </div>
  )
}
