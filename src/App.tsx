"use client"

import { useState, useRef, useCallback } from "react"
import { useGLTF } from "@react-three/drei"
import LandingPage from "./components/landing/LandingPage"
import { RoomAssemblyLoader } from "./components/landing/RoomAssemblyLoader"
import ThreeDRoomExperience from "./components/ThreeDRoomExperience"

// Preload the 3D model so it starts downloading immediately
useGLTF.preload("/3droom2.glb")

export default function App() {
  const [section, setSection] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("section") || ""
    }
    return ""
  })
  const [phase, setPhase] = useState<"landing" | "loading" | "room">(() => {
    if (typeof window !== "undefined") {
      const s = new URLSearchParams(window.location.search).get("section")
      if (s) return "room"
      const p = new URLSearchParams(window.location.search).get("phase")
      if (p === "loading" || p === "room") return p
    }
    return "landing"
  })
  const contentRef = useRef<HTMLDivElement>(null)

  const handleEnterPortfolio = useCallback(() => {
    setPhase("loading")
  }, [])

  const handleLoadComplete = useCallback(() => {
    setPhase("room")
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full bg-obsidian film-grain">
      {phase === "landing" && (
        <LandingPage onEnterPortfolio={handleEnterPortfolio} />
      )}

      {phase === "loading" && (
        <RoomAssemblyLoader onComplete={handleLoadComplete} autoLoop={false} />
      )}

      {phase === "room" && (
        <ThreeDRoomExperience
          section={section}
          setSection={setSection}
          contentRef={contentRef}
        />
      )}
    </div>
  )
}
