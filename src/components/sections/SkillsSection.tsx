"use client"

import { useState } from "react"
import { sections } from "../data"

interface Skill {
  name: string
  icon: string
  logo?: string
  color: string
  category: string
}

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  const skills = sections.skills as Skill[]
  const categories = ["All", ...Array.from(new Set(skills.map((s) => s.category)))]
  const filtered = selectedCategory === "All" ? skills : skills.filter((s) => s.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-display font-medium tracking-wide transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-amber-500/15 border border-amber-500/40 text-amber-400"
                : "bg-transparent border border-stone-700/50 text-stone-500 hover:border-stone-600 hover:text-stone-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((skill, index) => (
          <div
            key={skill.name}
            className="forge-card-amber p-4 rounded-xl text-center group cursor-default"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Icon */}
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              {skill.logo && !imageErrors.has(index) ? (
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300 brightness-90 group-hover:brightness-110"
                  onError={() => setImageErrors((prev) => new Set([...prev, index]))}
                />
              ) : (
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="font-display text-sm font-semibold text-stone-200 mb-1">
              {skill.name}
            </h3>

            {/* Category badge */}
            <span className="text-[10px] font-mono text-stone-500">
              {skill.category}
            </span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-center gap-6 pt-4">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold text-amber-400">{skills.length}</span>
          <span className="text-xs text-stone-500">Technologies</span>
        </div>
        <div className="w-px h-4 bg-stone-700" />
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold text-amber-400">{categories.length - 1}</span>
          <span className="text-xs text-stone-500">Categories</span>
        </div>
      </div>
    </div>
  )
}