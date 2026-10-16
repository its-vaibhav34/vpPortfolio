"use client"

import { useState } from "react"
import { sections } from "../data"

interface Project {
  title: string
  description: string
  link: string
  liveDemo?: string
  technologies?: string[]
  status?: string
  category?: string
  featured?: boolean
  metrics?: { users?: string; performance?: string; uptime?: string }
}

export default function ProjectsSection() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const projects = sections.projects as Project[]

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div
          key={index}
          className="forge-card-indigo p-6 rounded-xl cursor-pointer group"
          onClick={() => setExpandedProject(expandedProject === index ? null : index)}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-display text-xl font-bold text-stone-100 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="forge-badge-amber text-[10px]">Featured</span>
                )}
              </div>
              {project.category && (
                <span className="forge-badge-indigo text-[10px]">{project.category}</span>
              )}
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-mono">{project.status || "Live"}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-stone-400 leading-relaxed mb-4">{project.description}</p>

          {/* Tech stack */}
          {project.technologies && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono text-stone-400 bg-stone-800/50 border border-stone-700/50
                             hover:border-indigo-500/30 hover:text-indigo-300 transition-all duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="forge-btn-primary px-4 py-2 text-xs flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Source Code
            </a>
          </div>

          {/* Expanded metrics */}
          {expandedProject === index && project.metrics && (
            <div className="mt-5 pt-5 border-t border-indigo-500/10 grid grid-cols-3 gap-4 animate-fade-up">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="font-display text-xl font-bold text-indigo-400">{value}</div>
                  <div className="text-xs text-stone-500 capitalize">{key}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
