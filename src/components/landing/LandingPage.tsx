"use client"

import { useState, useEffect } from "react"
import WavyBackground from "./WavyBackground"
import HeroSection from "./HeroSection"
import TypewriterText from "./TypewriterText"

interface LandingPageProps {
  onEnterNeuroverse: () => void
}

export default function LandingPage({ onEnterNeuroverse }: LandingPageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const roles = ["Full Stack Developer", "AI/ML Engineer", "IOT Developer", "DevOps Engineer"]

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white flex flex-col items-center justify-center">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <WavyBackground mousePosition={mousePosition} />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center p-4 md:p-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Typewriter Titles */}
        <div className="h-8 md:h-10 mb-12 mt-4">
          <TypewriterText prefix="I am a " phrases={roles} />
        </div>

        {/* CTA Button - Super Crazy Design */}
        <button
          onClick={onEnterNeuroverse}
         className="relative px-10 py-4 rounded-full text-xl font-bold uppercase tracking-widest
           bg-gradient-to-br from-purple-700 via-fuchsia-700 to-cyan-700 text-white
           overflow-hidden group transition-all duration-700 ease-in-out
           hover:from-purple-600 hover:via-fuchsia-600 hover:to-cyan-600 hover:scale-105
           border border-purple-500/60 hover:border-cyan-400/60
           animate-gradient-shift transform-gpu perspective-[1000px]
           hover:rotate-x-3 hover:rotate-y-3 hover:skew-x-1 text-shadow-neon"

        >
          <span className="relative z-10 flex items-center gap-3">
            ACCESS NEURO-PORTFOLIO
            <span className="text-2xl animate-bounce-slow">→</span>
          </span>
          {/* Animated border glow */}
          <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/50 transition-colors duration-300" />
          {/* Pulsating background effect */}
          <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 animate-pulse-slow" />
          {/* Inner shimmer effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer" />
        </button>
      </div>
    </div>
  )
}
