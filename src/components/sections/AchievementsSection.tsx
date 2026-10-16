"use client"

import { useState, useEffect, useRef } from "react"
import { sections } from "../data"

interface Achievement {
  title: string
  date: string
  description: string
  impact: string
  category: string
  organization: string
  prize: string
  teamSize: string
  image?: string
}

export default function AchievementsSection() {
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null)
  const [visibleAchievements, setVisibleAchievements] = useState<number[]>([])
  const [filter, setFilter] = useState<string>("All")
  const achievementRefs = useRef<(HTMLDivElement | null)[]>([])

  const achievements = sections.achievements as Achievement[]
  const categories = ["All", ...Array.from(new Set(achievements.map((ach) => ach.category)))]
  const filteredAchievements = filter === "All" ? achievements : achievements.filter((ach) => ach.category === filter)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleAchievements((prev) => [...prev, index])
            }, index * 300)
          }
        })
      },
      { threshold: 0.3 },
    )

    achievementRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [filteredAchievements])

  return (
    <div className="relative">
      {/* Optimized celebration background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {["🏆", "🥇", "⭐", "🎉", "🚀"][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              filter === category
                ? "border-yellow-400 bg-yellow-400/20 text-yellow-400"
                : "border-yellow-400/30 text-gray-400 hover:border-yellow-400/60"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Achievements showcase */}
      <div className="space-y-12 relative z-10">
        {filteredAchievements.map((achievement, index) => (
          <div
            key={index}
          ref={(el) => {
  achievementRefs.current[index] = el
}}

            data-index={index}
            className={`group relative transition-all duration-1000 ${
              visibleAchievements.includes(index)
                ? "opacity-100 translate-x-0"
                : `opacity-0 ${index % 2 === 0 ? "translate-x-20" : "-translate-x-20"}`
            }`}
            onClick={() => setSelectedAchievement(selectedAchievement === index ? null : index)}
          >
            <div
              className="relative p-8 rounded-2xl border border-yellow-400/30 backdrop-blur-xl
                         bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-black/60
                         hover:from-yellow-900/40 hover:via-orange-900/40 hover:to-black/80
                         transition-all duration-500 hover:scale-[1.02] cursor-pointer
                         hover:shadow-xl hover:shadow-yellow-500/25"
            >
              {/* Achievement rank */}
              <div
                className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 
                              rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50
                              group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
              >
                <span className="text-2xl font-bold text-white">#{index + 1}</span>
              </div>

              <div className="flex items-start gap-8">
                {/* Trophy icon */}
                <div className="flex-shrink-0 relative">
                  <div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 
                                  flex items-center justify-center shadow-lg shadow-yellow-500/50
                                  group-hover:scale-125 group-hover:rotate-12 transition-all duration-500"
                  >
                    <span className="text-4xl">🏆</span>
                  </div>

                  {/* Pulse rings */}
                  <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-yellow-400/30 animate-ping" />
                </div>

                {/* Achievement content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-cyan-400 font-semibold text-lg">{achievement.date}</p>
                      <p className="text-gray-400 text-sm">{achievement.organization}</p>
                    </div>

                    {/* Category badge */}
                    <div
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 
                                    border border-yellow-400/50"
                    >
                      <span className="text-yellow-400 text-sm font-bold">{achievement.category}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-lg mb-6">{achievement.description}</p>

                  {/* Achievement metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Prize", value: achievement.prize, icon: "💰" },
                      { label: "Team Size", value: achievement.teamSize, icon: "👥" },
                      { label: "Impact", value: achievement.impact, icon: "📈" },
                      { label: "Category", value: achievement.category, icon: "🎯" },
                    ].map((metric, i) => (
                      <div
                        key={i}
                        className="text-center p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 
                                              border border-yellow-400/20"
                      >
                        <div className="text-2xl mb-1">{metric.icon}</div>
                        <div className="text-yellow-400 font-semibold text-sm">{metric.value}</div>
                        <div className="text-gray-400 text-xs">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Expanded details */}
                  {selectedAchievement === index && (
                    <div className="mt-6 pt-6 border-t border-yellow-400/30 animate-slideInUp">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-yellow-400 font-semibold mb-3">Achievement Details:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Organization:</span>
                              <span className="text-gray-300">{achievement.organization}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Team Size:</span>
                              <span className="text-gray-300">{achievement.teamSize}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Prize:</span>
                              <span className="text-green-400">{achievement.prize}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-yellow-400 font-semibold mb-3">Impact & Recognition:</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">{achievement.impact}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Hover effect */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/5 to-orange-500/5 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
