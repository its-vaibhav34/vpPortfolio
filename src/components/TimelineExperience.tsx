"use client"

import { useState } from "react"
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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const experienceData = sections.experience as ExperienceItem[]

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/30 via-rose-500/20 to-indigo-500/20" />

        <div className="space-y-8">
          {experienceData.map((item, index) => (
            <div
              key={index}
              className="relative pl-16 cursor-pointer"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              {/* Timeline node */}
              <div className="absolute left-3.5 top-2 w-5 h-5 rounded-full border-2 border-obsidian flex items-center justify-center z-10"
                style={{
                  background: item.type === "current"
                    ? "linear-gradient(135deg, #10b981, #06b6d4)"
                    : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                {item.type === "current" && (
                  <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
                )}
              </div>

              {/* Experience card */}
              <div className="forge-card-cyan p-6 rounded-xl group">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-stone-100 group-hover:text-cyan-300 transition-colors mb-0.5">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-cyan-400 font-display font-medium text-sm">{item.company}</span>
                      <span className="forge-badge-indigo text-[9px]">{item.companySize}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span>{item.duration}</span>
                      <span>·</span>
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-medium ${
                    item.type === "current"
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
                  }`}>
                    {item.type === "current" ? "Active" : "Completed"}
                  </div>
                </div>

                {/* Description */}
                <p className="text-stone-400 text-sm leading-relaxed mb-4">{item.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-800/50 border border-stone-700/30 text-stone-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Key achievements preview */}
                <div className="space-y-1.5">
                  {item.achievements.slice(0, 2).map((ach, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-400">
                      <svg className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Expanded details */}
                {expandedIndex === index && (
                  <div className="mt-4 pt-4 border-t border-cyan-500/10 space-y-4 animate-fade-up">
                    <h4 className="text-xs font-display font-semibold text-amber-400">All Achievements</h4>
                    <div className="space-y-2">
                      {item.achievements.map((ach, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-stone-300">
                          <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    {item.website && (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        Visit Company
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Academic CGPA", value: "8.72", accent: "text-cyan-400" },
          { label: "Featured Projects", value: "4", accent: "text-indigo-400" },
          { label: "Hackathon Wins", value: "3×", accent: "text-amber-400" },
          { label: "National Standing", value: "Top 4", accent: "text-rose-400" },
        ].map((stat, i) => (
          <div key={i} className="forge-card p-4 rounded-xl text-center">
            <div className={`font-display text-xl font-bold ${stat.accent} mb-0.5`}>{stat.value}</div>
            <div className="text-[10px] text-stone-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
