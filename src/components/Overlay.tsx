"use client"

import { useState, useEffect } from "react"
import LoadingShimmer from "./LoadingShimmer"
import ProjectsSection from "./sections/ProjectsSection"
import SkillsSection from "./sections/SkillsSection"
import AboutSection from "./sections/AboutSection"
import ContactSection from "./sections/ContactSection"
import CertificatesSection from "./sections/CertificatesSection"
import AchievementsSection from "./sections/AchievementsSection"
import TimelineExperience from "./TimelineExperience"

interface Props {
  section: string
  onClose: () => void
}

export default function Overlay({ section, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (section) {
      setIsLoading(true)
      setIsVisible(false)

      const loadTimer = setTimeout(() => {
        setIsLoading(false)
        setIsVisible(true)
      }, 800)

      return () => clearTimeout(loadTimer)
    }
  }, [section])

  if (!section) return null

  const renderSection = () => {
    switch (section) {
      case "projects":
        return <ProjectsSection />
      case "skills":
        return <SkillsSection />
      case "about":
        return <AboutSection />
      case "contact":
        return <ContactSection />
      case "certificates":
        return <CertificatesSection />
      case "achievements":
        return <AchievementsSection />
      case "experience":
        return <TimelineExperience />
      default:
        return <div>Section not found</div>
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Enhanced backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto" onClick={onClose} />

      {/* Main overlay */}
      <div
        className={`
          pointer-events-auto relative max-w-7xl mx-4 w-full max-h-[90vh] overflow-y-auto
          rounded-2xl border border-cyan-400/30 shadow-2xl
          transition-all duration-700 ease-out
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.95), rgba(6,182,212,0.1))",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 50px rgba(6,182,212,0.3), inset 0 1px 0 rgba(6,182,212,0.2)",
        }}
      >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-500/50 opacity-50 animate-pulse" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full 
                     bg-gradient-to-r from-red-500/20 to-red-600/20 
                     hover:from-red-500/40 hover:to-red-600/40
                     border border-red-500/50 text-red-400 hover:text-red-300
                     flex items-center justify-center transition-all duration-200
                     hover:scale-110 hover:shadow-lg hover:shadow-red-500/25 text-xl"
        >
          ✕
        </button>

        <div className="p-8">
          {/* Futuristic Header */}
          <div className="mb-12 text-center">
            <div className="relative inline-block">
              <h2
                className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                           from-cyan-400 via-blue-400 to-purple-400 mb-6 uppercase tracking-wider"
              >
                {section}
              </h2>

              {/* Glitch effect lines */}
              <div className="absolute inset-0 text-6xl font-bold text-cyan-400/20 uppercase tracking-wider animate-glitch">
                {section}
              </div>
            </div>

            {/* Animated underline */}
            <div className="flex justify-center">
              <div className="h-1 w-40 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Loading state */}
          {isLoading ? (
            <LoadingShimmer />
          ) : (
            <div
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {renderSection()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
