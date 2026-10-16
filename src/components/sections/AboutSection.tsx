"use client"

import { useState, useEffect } from "react"
import { personalInfo, sections } from "../data"

export default function AboutSection() {
  const [typedText, setTypedText] = useState("")
  const [showStats, setShowStats] = useState(false)

  const fullText = personalInfo.bio

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
        setTimeout(() => setShowStats(true), 500)
      }
    }, 30) // Faster typing for better performance

    return () => clearInterval(timer)
  }, [fullText])

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Optimized background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-cyan-400 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Profile section */}
        <div className="relative">
          <div className="relative group">
            {/* Simplified rotating rings for better performance */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-spin-slow" />
            <div className="absolute inset-4 rounded-full border border-purple-400/30 animate-spin-reverse" />

            {/* Profile container */}
            <div
              className="relative w-80 h-80 mx-auto rounded-full overflow-hidden border-4 border-cyan-400/50 
                            shadow-2xl shadow-cyan-500/50 group-hover:shadow-cyan-500/80 transition-all duration-500"
            >
              {/* Profile image placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-cyan-900/50 to-purple-900/50 flex items-center justify-center">
                <div className="text-8xl animate-bounce">👨‍💻</div>
              </div>

              {/* Simplified hover effects */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            {/* Reduced floating particles */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-float opacity-60"
                style={{
                  left: `${20 + Math.cos((i * Math.PI * 2) / 4) * 45}%`,
                  top: `${20 + Math.sin((i * Math.PI * 2) / 4) * 45}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}

            {/* Status indicator */}
            <div className="absolute top-4 right-4 w-6 h-6 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50">
              <div className="absolute inset-1 bg-green-300 rounded-full animate-ping" />
            </div>
          </div>

          {/* Name and title */}
          <div className="text-center mt-8">
            <div className="relative">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                {personalInfo.name}
              </h1>
            </div>
            <p className="text-xl text-cyan-400 font-semibold">{personalInfo.title}</p>
            <p className="text-gray-400 mt-2">{personalInfo.location}</p>
          </div>
        </div>

        {/* Content section */}
        <div className="space-y-8">
          {/* Typewriter text */}
          <div
            className="relative p-8 rounded-2xl border border-cyan-400/30 backdrop-blur-xl
                          bg-gradient-to-br from-black/60 to-cyan-900/20"
          >
            <div className="text-2xl leading-relaxed text-gray-300 font-mono">
              {typedText}
              <span className="animate-pulse text-cyan-400">|</span>
            </div>
          </div>

          {/* Stats */}
          {showStats && (
            <div className="grid grid-cols-3 gap-6 animate-slideInUp">
              {[
                {
                  label: "Projects",
                  value: sections.stats.totalProjects,
                  icon: "🚀",
                  color: "from-blue-400 to-cyan-400",
                },
                {
                  label: "Experience",
                  value: sections.stats.experience,
                  icon: "⏱️",
                  color: "from-purple-400 to-pink-400",
                },
                {
                  label: "Technologies",
                  value: sections.stats.technologies,
                  icon: "⚡",
                  color: "from-yellow-400 to-orange-400",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-xl border border-cyan-400/30 backdrop-blur-xl
                             bg-gradient-to-br from-black/60 to-cyan-900/20
                             hover:from-black/80 hover:to-cyan-900/40
                             transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div
                      className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-400 font-semibold">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-4">
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 group relative overflow-hidden py-4 px-8 rounded-xl
                               bg-gradient-to-r from-cyan-500 to-blue-500
                               hover:from-cyan-400 hover:to-blue-400
                               text-white font-bold transition-all duration-300
                               hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <span className="relative z-10">Download CV</span>
            </a>

            <button
              className="px-8 py-4 rounded-xl border-2 border-cyan-400/50 text-cyan-400 
                               hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300
                               hover:scale-105"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
