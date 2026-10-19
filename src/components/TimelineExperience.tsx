"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

const typeConfig: Record<string, { label: string; dotColor: string; glowColor: string; borderAccent: string }> = {
  current: {
    label: "Active",
    dotColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    borderAccent: "rgba(16, 185, 129, 0.2)",
  },
  past: {
    label: "Completed",
    dotColor: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.4)",
    borderAccent: "rgba(99, 102, 241, 0.2)",
  },
}

function ExperienceCard({
  item,
  index,
  total,
  isExpanded,
  onToggle,
}: {
  item: ExperienceItem
  index: number
  total: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const cfg = typeConfig[item.type] ?? typeConfig.past

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex gap-5 sm:gap-6"
    >
      {/* Left column: timeline spine */}
      <div className="flex flex-col items-center select-none" style={{ minWidth: "20px" }}>
        {/* Dot */}
        <div
          className="relative mt-5 w-3.5 h-3.5 rounded-full flex-shrink-0 z-10 transition-transform duration-300"
          style={{
            backgroundColor: cfg.dotColor,
            boxShadow: `0 0 10px ${cfg.glowColor}`,
            transform: isExpanded ? "scale(1.2)" : "scale(1)",
          }}
        >
          {item.type === "current" && (
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ backgroundColor: cfg.dotColor, opacity: 0.35 }}
            />
          )}
        </div>
        {/* Connector line — hidden for last item */}
        {index < total - 1 && (
          <div
            className="flex-1 w-px mt-1.5"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
              minHeight: "32px",
            }}
          />
        )}
      </div>

      {/* Right column: card */}
      <div
        className="flex-1 mb-5 cursor-pointer group overflow-hidden rounded-xl transition-all duration-300"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onToggle()
          }
        }}
        style={{
          background: isExpanded
            ? "linear-gradient(135deg, rgba(30, 30, 52, 0.85), rgba(18, 18, 28, 0.95))"
            : "linear-gradient(135deg, rgba(24, 24, 38, 0.5), rgba(15, 15, 22, 0.6))",
          border: isExpanded
            ? `1px solid ${cfg.borderAccent}`
            : "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: isExpanded ? `0 8px 30px rgba(0, 0, 0, 0.35), 0 0 15px ${cfg.glowColor}` : "none",
        }}
      >
        {/* Top subtle highlight */}
        <div
          className="h-[1px] transition-all duration-500"
          style={{
            background: isExpanded
              ? `linear-gradient(90deg, transparent, ${cfg.dotColor}88, transparent)`
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
          }}
        />

        <div className="p-5 sm:p-6">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3
                  className="font-display text-base sm:text-lg font-semibold text-stone-100 leading-snug group-hover:text-white transition-colors duration-200"
                >
                  {item.role}
                </h3>
                <span
                  className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full"
                  style={{
                    color: cfg.dotColor,
                    background: `${cfg.dotColor}15`,
                    border: `1px solid ${cfg.dotColor}30`,
                  }}
                >
                  {cfg.label}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <span className="font-medium text-stone-300">
                  {item.company}
                </span>
                <span className="text-stone-600 text-xs">·</span>
                <span className="text-xs font-mono text-stone-400">{item.location}</span>
                {item.companySize && (
                  <>
                    <span className="text-stone-600 text-xs">·</span>
                    <span className="text-[11px] font-mono text-stone-500">{item.companySize}</span>
                  </>
                )}
              </div>
            </div>

            {/* Duration */}
            <div className="flex-shrink-0 text-right">
              <span className="text-xs font-mono font-medium text-stone-400 bg-stone-900/60 px-2.5 py-1 rounded-md border border-stone-800">
                {item.duration}
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-sm text-stone-400 leading-relaxed transition-all duration-300"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: isExpanded ? 99 : 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item.description}
          </p>

          {/* Skills / Tech */}
          {item.technologies && item.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {item.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-md transition-colors duration-200"
                  style={{
                    color: isExpanded ? "rgba(220, 220, 240, 0.85)" : "rgba(160, 155, 150, 0.75)",
                    background: isExpanded ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.03)",
                    border: isExpanded ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(255, 255, 255, 0.04)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Expanded: achievements */}
          <AnimatePresence>
            {isExpanded && item.achievements && item.achievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div
                  className="mt-5 pt-4 space-y-2.5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-2">
                    Key Highlights & Responsibilities
                  </p>
                  {item.achievements.map((ach, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.05 + i * 0.04 }}
                      className="flex items-start gap-2.5"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: cfg.dotColor }}
                      />
                      <span className="text-sm text-stone-300 leading-relaxed">
                        {ach}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {item.website && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="mt-4"
                  >
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                    >
                      Visit Organization
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand/Collapse Chevron indicator */}
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/[0.03]">
            <span className="text-[11px] font-mono text-stone-500 group-hover:text-stone-400 transition-colors">
              {isExpanded ? "Click to collapse" : "Click to view details"}
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
      </div>
    </motion.div>
  )
}

export default function TimelineExperience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const experienceData = sections.experience as ExperienceItem[]

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-end justify-between mb-6 pb-4"
        style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}
      >
        <div>
          <p className="text-[11px] font-mono text-stone-400 tracking-[0.2em] uppercase mb-1.5">
            Experience & Education
          </p>
          <p className="text-sm text-stone-400 max-w-lg leading-relaxed">
            Roles, leadership responsibilities, and academic milestones that have shaped my technical and engineering foundation.
          </p>
        </div>
        <span className="text-[11px] font-mono text-stone-500 bg-stone-900/60 px-2.5 py-1 rounded-md border border-stone-800">
          {experienceData.length} records
        </span>
      </motion.div>

      {/* Timeline List */}
      <div>
        {experienceData.map((item, index) => (
          <ExperienceCard
            key={`${item.role}-${item.company}-${index}`}
            item={item}
            index={index}
            total={experienceData.length}
            isExpanded={expandedIndex === index}
            onToggle={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          />
        ))}
      </div>
    </div>
  )
}
