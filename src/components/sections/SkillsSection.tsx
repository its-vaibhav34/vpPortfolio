"use client"

import { useState, useEffect, useRef } from "react"
import { sections } from "../data"
// import Image from "next/image" // REMOVE this line

interface Skill {
  name: string
  icon: string
  logo?: string
  color: string
  category: string
}

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [visibleSkills, setVisibleSkills] = useState<number[]>([])
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  const skillRefs = useRef<(HTMLDivElement | null)[]>([])

  const skills = sections.skills as Skill[]
  const categories = ["All", ...Array.from(new Set(skills.map((skill) => skill.category)))]
  const filteredSkills =
    selectedCategory === "All" ? skills : skills.filter((skill) => skill.category === selectedCategory)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          if (entry.isIntersecting) {
            setVisibleSkills((prev) => (prev.includes(index) ? prev : [...prev, index]))
          }
        })
      },
      { threshold: 0.1 },
    )

    skillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [filteredSkills])

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set([...prev, index]))
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full border transition-colors duration-200 ${
              selectedCategory === category
                ? "border-cyan-400 bg-cyan-400/20 text-cyan-400"
                : "border-cyan-400/30 text-gray-400 hover:border-cyan-400/60"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredSkills.map((skill, index) => (
          <div
            key={skill.name}
            ref={(el) => {
  skillRefs.current[index] = el
}}

            data-index={index}
            className={`group relative transition-opacity duration-200 ${
              visibleSkills.includes(index) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="relative p-6 rounded-xl border border-cyan-400/30 backdrop-blur-sm
                         bg-gradient-to-br from-black/60 to-cyan-900/20
                         hover:from-black/80 hover:to-cyan-900/30
                         transition-all duration-300 hover:scale-105 cursor-pointer
                         hover:shadow-lg hover:shadow-cyan-500/25 group"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 relative flex items-center justify-center">
                  {skill.logo && !imageErrors.has(index) ? (
                    <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={skill.logo || "/placeholder.svg"}
                        alt={`${skill.name} logo`}
                        className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 w-full h-full"
                        onError={() => handleImageError(index)}
                        style={{ width: "64px", height: "64px" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    </div>
                  ) : (
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300 relative">
                      {skill.icon}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                    </div>
                  )}
                </div>

                <h3 className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${skill.color} mb-2`}>
                  {skill.name}
                </h3>

                <span className="inline-block px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs border border-cyan-400/30">
                  {skill.category}
                </span>

                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-cyan-400/50 transition-colors duration-300" />

                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan" />
              </div>
            </div>

            <div className="mt-2 flex justify-center">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      i < Math.floor(Math.random() * 3) + 3
                        ? "bg-cyan-400 group-hover:bg-cyan-300"
                        : "bg-gray-600 group-hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30">
          <span className="text-cyan-400 font-semibold">Total Skills:</span>
          <span className="text-white font-bold text-lg">{skills.length}</span>
          <span className="text-gray-400">|</span>
          <span className="text-purple-400 font-semibold">Categories:</span>
          <span className="text-white font-bold text-lg">{categories.length - 1}</span>
        </div>
      </div>
    </div>
  )
}