"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import Room from "./Room"
import Overlay from "./Overlay"
import { useEffect } from "react"
import type { MutableRefObject } from "react"

interface ThreeDRoomExperienceProps {
  section: string
  setSection: (section: string) => void
  contentRef: MutableRefObject<HTMLDivElement | null>
}

export default function ThreeDRoomExperience({ section, setSection, contentRef }: ThreeDRoomExperienceProps) {
  const handleCloseOverlay = () => {
    setSection("")
  }

  // The click outside logic now lives here, as it's specific to the 3D room and its overlay
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node
      if (section && contentRef.current && !contentRef.current.contains(target)) {
        setSection("")
      }
    }

    document.addEventListener("mousedown", handleClick, true)
    return () => document.removeEventListener("mousedown", handleClick, true)
  }, [section, contentRef, setSection]) // Added setSection to dependencies

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 60 }} eventPrefix="client">
        {/* Enhanced lighting setup */}
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} maxPolarAngle={Math.PI / 2} />

        <Room onSelect={setSection} isAnySectonOpen={!!section} />
      </Canvas>

      {/* Enhanced overlay with new component */}
      {section && (
        <div ref={contentRef}>
          <Overlay section={section} onClose={handleCloseOverlay} />
        </div>
      )}
    </div>
  )
}
