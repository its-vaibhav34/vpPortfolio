"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { sections } from "../data"

interface Project {
  title: string
  subtitle?: string
  description: string
  link: string
  liveDemo?: string
  technologies?: string[]
  status?: string
  category?: string
  featured?: boolean
  metrics?: Record<string, string>
}

function ProjectCard({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: Project
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
    >
      {/* Main card */}
      <div
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onToggle()
          }
        }}
        className="relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300"
        style={{
          background: isExpanded
            ? "linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(26, 26, 46, 0.9))"
            : "linear-gradient(135deg, rgba(26, 26, 46, 0.5), rgba(18, 18, 26, 0.7))",
          border: isExpanded
            ? "1px solid rgba(99, 102, 241, 0.25)"
            : "1px solid rgba(255, 255, 255, 0.04)",
        }}
      >
        {/* Hover shimmer effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(99, 102, 241, 0.03) 45%, rgba(99, 102, 241, 0.06) 50%, rgba(99, 102, 241, 0.03) 55%, transparent 60%)",
          }}
        />

        <div className="relative p-6 sm:p-7">
          {/* Top row: Index + Category + Featured */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* Large index number */}
              <span
                className="font-display text-3xl font-bold leading-none transition-colors duration-300"
                style={{
                  color: isExpanded ? "rgba(99, 102, 241, 0.6)" : "rgba(255, 255, 255, 0.1)",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Category tag */}
              {project.category && (
                <span
                  className="text-[11px] font-mono tracking-widest uppercase transition-colors duration-300"
                  style={{
                    color: isExpanded ? "rgba(99, 102, 241, 0.8)" : "rgba(168, 162, 158, 0.6)",
                  }}
                >
                  {project.category}
                </span>
              )}
            </div>

            {/* Featured badge in header if present */}
            {project.featured && (
              <span
                className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-md"
                style={{
                  color: "rgba(245, 158, 11, 0.85)",
                  background: "rgba(245, 158, 11, 0.08)",
                  border: "1px solid rgba(245, 158, 11, 0.18)",
                }}
              >
                Featured
              </span>
            )}
          </div>

          {/* Title + Subtitle */}
          <div className="mb-3">
            <h3 className="font-display text-xl font-semibold text-stone-100 group-hover:text-white transition-colors duration-200 leading-tight">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-sm text-stone-400 mt-1 font-mono">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Description — truncated when collapsed, full on expand */}
          <p
            className="text-sm text-stone-400 leading-relaxed transition-all duration-300"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: isExpanded ? 99 : 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description}
          </p>

          {/* Tech stack — compact horizontal flow */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded text-[11px] font-mono tracking-wide transition-colors duration-200"
                  style={{
                    color: isExpanded ? "rgba(199, 199, 255, 0.85)" : "rgba(168, 162, 158, 0.65)",
                    background: isExpanded
                      ? "rgba(99, 102, 241, 0.08)"
                      : "rgba(255, 255, 255, 0.03)",
                    border: isExpanded
                      ? "1px solid rgba(99, 102, 241, 0.15)"
                      : "1px solid rgba(255, 255, 255, 0.04)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                {/* Action row */}
                <div
                  className="mt-5 pt-4 flex items-center gap-3"
                  style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-md text-xs font-mono tracking-wide transition-all duration-200 hover:translate-y-[-1px]"
                    style={{
                      background: "rgba(99, 102, 241, 0.12)",
                      border: "1px solid rgba(99, 102, 241, 0.25)",
                      color: "rgba(195, 195, 255, 0.95)",
                    }}
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Source
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand / Collapse indicator */}
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/[0.03]">
            <span className="text-[11px] font-mono text-stone-500 group-hover:text-stone-400 transition-colors">
              {isExpanded ? "Click to collapse" : "Click to view full description"}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="text-stone-500 group-hover:text-stone-300 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="h-[1px] transition-all duration-500"
          style={{
            background: isExpanded
              ? "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.35), transparent)"
              : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent)",
          }}
        />
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const projects = sections.projects as unknown as Project[]

  return (
    <div className="space-y-3">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-end justify-between mb-6 pb-4"
        style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}
      >
        <div>
          <p className="text-[11px] font-mono text-stone-400 tracking-[0.2em] uppercase mb-1.5">
            Selected Work
          </p>
          <p className="text-sm text-stone-400 max-w-md leading-relaxed">
            A curated selection of projects spanning AI, developer tooling, 3D simulation, and full-stack platforms.
          </p>
        </div>
        <span className="text-[11px] font-mono text-stone-500 bg-stone-900/60 px-2.5 py-1 rounded-md border border-stone-800">
          {projects.length} projects
        </span>
      </motion.div>

      {/* Project list */}
      <div className="space-y-2.5">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            isExpanded={expandedProject === index}
            onToggle={() =>
              setExpandedProject(expandedProject === index ? null : index)
            }
          />
        ))}
      </div>
    </div>
  )
}
