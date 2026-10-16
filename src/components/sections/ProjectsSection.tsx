"use client"

import { useState, useEffect, useRef } from "react"
import { sections } from "../data"

interface Project {
  title: string
  description: string
  link: string
  tech?: string[]
  status?: string
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  const projects = sections.projects as Project[]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          if (entry.isIntersecting) {
            setVisibleProjects((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.2 },
    )

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Holographic project grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {projects.map((project, index) => (
          <div
            key={index}
          ref={(el) => {
  projectRefs.current[index] = el
}}

            data-index={index}
            className={`group relative transition-all duration-1000 ${
              visibleProjects.includes(index)
                ? "opacity-100 translate-y-0 rotate-0"
                : "opacity-0 translate-y-20 rotate-3"
            }`}
            style={{ transitionDelay: `${index * 0.3}s` }}
          >
            {/* Holographic container */}
            <div
              className="relative p-8 rounded-2xl border border-cyan-400/30 backdrop-blur-xl
                         bg-gradient-to-br from-black/60 via-cyan-900/20 to-black/60
                         hover:from-black/80 hover:via-cyan-900/40 hover:to-black/80
                         transition-all duration-700 hover:scale-105 cursor-pointer
                         hover:shadow-2xl hover:shadow-cyan-500/50"
              onClick={() => setSelectedProject(selectedProject === index ? null : index)}
            >
              {/* Scanning lines effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan opacity-0 group-hover:opacity-100" />
                <div
                  className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-purple-400 to-transparent animate-scan opacity-0 group-hover:opacity-100"
                  style={{ animationDelay: "0.5s" }}
                />
              </div>

              {/* Project status indicator */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 animate-pulse shadow-lg shadow-green-400/50">
                <div className="absolute inset-1 rounded-full bg-green-300 animate-ping" />
              </div>

              {/* Project header */}
              <div className="relative z-10 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                    {project.title}
                  </h3>
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50">
                    <span className="text-green-400 text-xs font-bold tracking-wider">● LIVE</span>
                  </div>
                </div>

                {/* Glitch effect title */}
                <div className="absolute top-0 left-0 text-3xl font-bold text-cyan-400/20 animate-glitch pointer-events-none">
                  {project.title}
                </div>
              </div>

              {/* Project description with typewriter effect */}
              <div className="relative mb-6">
                <p className="text-gray-300 leading-relaxed text-lg">{project.description}</p>
              </div>

              {/* Tech stack with animated badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {["React", "TypeScript", "Three.js", "Firebase"].map((tech, techIndex) => (
                  <div
                    key={tech}
                    className="group/tech relative px-4 py-2 rounded-full border border-cyan-400/30 
                               bg-gradient-to-r from-cyan-500/10 to-blue-500/10
                               hover:from-cyan-500/30 hover:to-blue-500/30
                               transition-all duration-300 hover:scale-110"
                    style={{ animationDelay: `${techIndex * 0.1}s` }}
                  >
                    <span className="text-cyan-400 text-sm font-medium">{tech}</span>
                    <div className="absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 group-hover/tech:opacity-100 animate-pulse" />
                  </div>
                ))}
              </div>

              {/* Interactive buttons */}
              <div className="flex gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 group/btn relative overflow-hidden py-4 px-6 rounded-xl
                             bg-gradient-to-r from-cyan-500 to-blue-500
                             hover:from-cyan-400 hover:to-blue-400
                             text-white font-bold text-center transition-all duration-300
                             hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  <span className="relative z-10">LAUNCH PROJECT →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </a>

                <button
                  className="px-6 py-4 rounded-xl border-2 border-cyan-400/50 text-cyan-400 
                                   hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300
                                   hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  <span className="text-xl">⭐</span>
                </button>
              </div>

              {/* Expanded details */}
              {selectedProject === index && (
                <div className="mt-6 pt-6 border-t border-cyan-400/30 animate-slideInUp">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-cyan-400 font-semibold">Status:</span>
                      <span className="text-green-400 ml-2">Production Ready</span>
                    </div>
                    <div>
                      <span className="text-cyan-400 font-semibold">Performance:</span>
                      <span className="text-yellow-400 ml-2">98% Lighthouse</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Holographic glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
