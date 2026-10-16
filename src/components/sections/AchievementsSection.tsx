"use client"

import { useState } from "react"
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
}

export default function AchievementsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("All")

  const achievements = sections.achievements as Achievement[]
  const categories = ["All", ...Array.from(new Set(achievements.map((a) => a.category)))]
  const filtered = filter === "All" ? achievements : achievements.filter((a) => a.category === filter)

  return (
    <div className="space-y-8">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-display font-medium tracking-wide transition-all duration-200 ${
              filter === cat
                ? "bg-amber-500/15 border border-amber-500/40 text-amber-400"
                : "bg-transparent border border-stone-700/50 text-stone-500 hover:border-stone-600 hover:text-stone-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Achievements list */}
      <div className="space-y-4">
        {filtered.map((achievement, index) => (
          <div
            key={index}
            className="forge-card-amber p-6 rounded-xl cursor-pointer group"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-display text-xs font-bold text-amber-500/60">#{index + 1}</span>
                  <h3 className="font-display text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {achievement.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <span>{achievement.date}</span>
                  <span>·</span>
                  <span>{achievement.organization}</span>
                </div>
              </div>
              <span className="forge-badge-amber text-[10px]">{achievement.category}</span>
            </div>

            {/* Description */}
            <p className="text-stone-400 text-sm leading-relaxed mb-4">{achievement.description}</p>

            {/* Metrics row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Prize", value: achievement.prize },
                { label: "Team", value: achievement.teamSize },
                { label: "Impact", value: achievement.impact },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="text-center p-2.5 rounded-lg bg-stone-800/30 border border-stone-700/20"
                >
                  <div className="text-xs font-display font-semibold text-amber-400 mb-0.5">{metric.value}</div>
                  <div className="text-[10px] text-stone-600">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Expanded details */}
            {expandedIndex === index && (
              <div className="mt-4 pt-4 border-t border-amber-500/10 animate-fade-up">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-stone-500 text-xs">Organization</span>
                    <p className="text-stone-300">{achievement.organization}</p>
                  </div>
                  <div>
                    <span className="text-stone-500 text-xs">Team Size</span>
                    <p className="text-stone-300">{achievement.teamSize}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
