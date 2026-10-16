"use client"

import { useState, useEffect } from "react"
import { personalInfo } from "../data"

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
        setTimeout(() => setShowStats(true), 400)
      }
    }, 25)
    return () => clearInterval(timer)
  }, [fullText])

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Profile header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-32 h-32 rounded-2xl overflow-hidden border border-rose-500/20 bg-graphite flex items-center justify-center">
            <div className="text-5xl">👨‍💻</div>
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-obsidian animate-pulse" />
        </div>

        {/* Info */}
        <div className="text-center md:text-left flex-1">
          <h3 className="font-display text-3xl font-bold text-stone-100 mb-1">
            {personalInfo.name}
          </h3>
          <p className="text-rose-400 font-display font-medium mb-2">{personalInfo.title}</p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-stone-500 text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>{personalInfo.location}</span>
          </div>
        </div>
      </div>

      {/* Bio typewriter */}
      <div className="forge-card-rose p-6 rounded-xl">
        <div className="font-mono text-lg text-stone-300 leading-relaxed">
          {typedText}
          <span className="blink-cursor" />
        </div>
      </div>

      {/* Education */}
      <div className="forge-card p-6 rounded-xl border border-stone-800">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🎓</span>
              <h4 className="font-display text-lg font-bold text-stone-100">Chitkara University Punjab</h4>
            </div>
            <p className="text-stone-400 text-sm">Bachelor of Engineering in Computer Science</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="forge-badge-amber text-xs font-mono">CGPA: 8.72 / 10</span>
            <span className="text-stone-500 text-xs font-mono">Aug 2024 – May 2028</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      {showStats && (
        <div className="grid grid-cols-3 gap-4 animate-fade-up">
          {[
            { label: "Projects", value: "4", accent: "text-indigo-400" },
            { label: "CGPA", value: "8.72", accent: "text-rose-400" },
            { label: "Hackathon Wins", value: "3×", accent: "text-amber-400" },
          ].map((stat, i) => (
            <div
              key={i}
              className="forge-card p-5 rounded-xl text-center group cursor-default"
            >
              <div className={`font-display text-2xl font-bold ${stat.accent} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs text-stone-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <a
          href={personalInfo.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="forge-btn-primary px-6 py-3 text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download CV
        </a>
      </div>
    </div>
  )
}
