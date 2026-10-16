"use client"

import { useState, useEffect, useRef } from "react"
import { sections } from "./data"

interface ExperienceItem {
  role: string
  company: string
  duration: string
  description: string
  logo: string
  color: string
  achievements: string[]
  technologies: string[]
  type: "current" | "past"
  companySize: string
  location: string
  website?: string
}

export default function TimelineExperience() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const experienceData = sections.experience as ExperienceItem[]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index])
            }, index * 300)
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Optimized timeline background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-purple-500/10" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-8 bg-cyan-400 animate-pulse opacity-30"
            style={{
              left: `${10 + i * 4}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Timeline container */}
      <div className="relative">
        {/* Central timeline spine */}
        <div className="absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 rounded-full">
          <div className="absolute inset-0 w-1 bg-gradient-to-b from-transparent via-white to-transparent animate-scan opacity-60" />
        </div>

        {/* Experience items */}
        <div className="space-y-16">
          {experienceData.map((item, index) => (
            <div
              key={index}
             ref={(el) => {
  itemRefs.current[index] = el
}}

              data-index={index}
              className={`relative transition-all duration-1000 ${
                visibleItems.includes(index)
                  ? "opacity-100 translate-x-0 rotate-0"
                  : `opacity-0 ${index % 2 === 0 ? "translate-x-20 rotate-3" : "-translate-x-20 -rotate-3"}`
              }`}
            >
              {/* Timeline node */}
              <div className="absolute left-8 top-8 z-20">
                <div className="relative">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-r ${item.color} 
                               flex items-center justify-center border-4 border-black 
                               shadow-2xl shadow-cyan-500/50 cursor-pointer
                               hover:scale-110 transition-all duration-500`}
                    onClick={() => setSelectedExperience(selectedExperience === index ? null : index)}
                  >
                    <span className="text-3xl animate-bounce">{item.logo}</span>
                  </div>

                  {/* Status indicator */}
                  {item.type === "current" && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50">
                      <div className="absolute inset-1 bg-green-300 rounded-full animate-ping" />
                    </div>
                  )}

                  {/* Orbital rings */}
                  <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-cyan-400/30 animate-spin-slow" />
                  <div className="absolute inset-2 w-16 h-16 rounded-full border border-purple-400/30 animate-spin-reverse" />
                </div>
              </div>

              {/* Experience card */}
              <div className="ml-32 group">
                <div
                  className="relative p-8 rounded-2xl border border-cyan-400/30 backdrop-blur-xl
                             bg-gradient-to-br from-black/70 via-cyan-900/20 to-black/70
                             hover:from-black/90 hover:via-cyan-900/40 hover:to-black/90
                             transition-all duration-500 hover:scale-[1.02] cursor-pointer
                             hover:shadow-xl hover:shadow-cyan-500/25"
                  onClick={() => setSelectedExperience(selectedExperience === index ? null : index)}
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <h3
                          className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color} mb-2`}
                        >
                          {item.role}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4 mb-2">
                        <p className="text-cyan-400 font-bold text-xl">{item.company}</p>
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-semibold">
                          {item.companySize}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-gray-400">
                        <span className="flex items-center gap-2">
                          <span className="text-lg">📅</span>
                          {item.duration}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="text-lg">📍</span>
                          {item.location}
                        </span>
                      </div>

                      {item.website && (
                        <div className="mt-2">
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1"
                          >
                            <span>🌐</span>
                            Visit Company
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Status badge */}
                    <div
                      className={`px-4 py-2 rounded-full border ${
                        item.type === "current"
                          ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 text-green-400"
                          : "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/50 text-blue-400"
                      }`}
                    >
                      <span className="text-xs font-bold tracking-wider">
                        {item.type === "current" ? "● ACTIVE" : "✓ COMPLETED"}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">{item.description}</p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                      <span className="text-lg">⚡</span>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {item.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="px-4 py-2 rounded-full border border-cyan-400/30 
                                     bg-gradient-to-r from-cyan-500/10 to-blue-500/10
                                     hover:from-cyan-500/30 hover:to-blue-500/30
                                     transition-all duration-300 hover:scale-110 cursor-pointer"
                          onMouseEnter={() => setHoveredTech(tech)}
                          onMouseLeave={() => setHoveredTech(null)}
                        >
                          <span className="text-cyan-400 text-sm font-medium">{tech}</span>
                          {hoveredTech === tech && (
                            <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-pulse" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key achievements preview */}
                  <div className="mb-6">
                    <h4 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
                      <span className="text-lg">🏆</span>
                      Key Achievements
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.achievements.slice(0, 2).map((achievement, achIndex) => (
                        <div
                          key={achIndex}
                          className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20"
                        >
                          <span className="text-yellow-400 text-lg">⭐</span>
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expanded details */}
                  {selectedExperience === index && (
                    <div className="mt-8 pt-8 border-t border-cyan-400/30 animate-slideInUp">
                      <div className="mb-6">
                        <h4 className="text-yellow-400 font-semibold mb-4 flex items-center gap-2">
                          <span className="text-lg">🎯</span>
                          All Achievements
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {item.achievements.map((achievement, achIndex) => (
                            <div
                              key={achIndex}
                              className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/20
                                         hover:from-yellow-500/20 hover:to-orange-500/20 transition-all duration-300"
                            >
                              <span className="text-yellow-400 text-xl mt-1">🏅</span>
                              <span className="text-gray-300 leading-relaxed">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Performance metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { label: "Impact Level", value: "High", icon: "📈", color: "text-green-400" },
                          {
                            label: "Team Size",
                            value: item.type === "current" ? "5-10" : "3-5",
                            icon: "👥",
                            color: "text-blue-400",
                          },
                          {
                            label: "Duration",
                            value: item.type === "current" ? "11+ months" : "4 months",
                            icon: "⏱️",
                            color: "text-purple-400",
                          },
                        ].map((metric, i) => (
                          <div
                            key={i}
                            className="text-center p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20"
                          >
                            <div className="text-2xl mb-2">{metric.icon}</div>
                            <div className={`text-lg font-bold ${metric.color}`}>{metric.value}</div>
                            <div className="text-gray-400 text-sm">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline end marker */}
        <div className="absolute left-8 bottom-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-500/50">
          <div className="absolute inset-1 rounded-full bg-purple-300 animate-ping" />
        </div>
      </div>

      {/* Timeline stats from data */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Experience",
            value: sections.stats.experience,
            icon: "⏱️",
            color: "from-cyan-400 to-blue-400",
          },
          {
            label: "Projects Led",
            value: sections.stats.totalProjects,
            icon: "🚀",
            color: "from-purple-400 to-pink-400",
          },
          {
            label: "Technologies",
            value: sections.stats.technologies,
            icon: "⚡",
            color: "from-green-400 to-emerald-400",
          },
          {
            label: "Team Members",
            value: sections.stats.mentees,
            icon: "👥",
            color: "from-yellow-400 to-orange-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="group relative p-6 rounded-xl border border-cyan-400/30 backdrop-blur-xl
                       bg-gradient-to-br from-black/60 to-cyan-900/20
                       hover:from-black/80 hover:to-cyan-900/40
                       transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <div className="text-center">
              <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{stat.icon}</div>
              <div className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-400 font-semibold">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
