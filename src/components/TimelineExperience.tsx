"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { sections } from "./data"

/* ─── Experience Interface ─── */
interface ExperienceItem {
  role: string
  company: string
  duration: string
  description: string
  logo?: string
  color?: string
  category?: string
  achievements?: string[]
  technologies?: string[]
  type?: "current" | "past"
  companySize?: string
  location?: string
  website?: string
}

/* ─── Minimal Icons ─── */
function ArrowUpRight({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

function ChevronDown({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

/* ─── Category-specific visual accents (Restrained, Editorial) ─── */
function getCategoryMeta(category?: string) {
  switch (category) {
    case "Academic Education":
      return {
        tag: "Academic Education",
        accentText: "text-sky-300",
        borderAccent: "border-sky-500/20",
        bgAccent: "bg-sky-950/30",
        nodeDot: "border-sky-400 bg-sky-950",
        nodeCore: "bg-sky-400",
      }
    case "Technical Project":
      return {
        tag: "Technical Project",
        accentText: "text-cyan-300",
        borderAccent: "border-cyan-500/20",
        bgAccent: "bg-cyan-950/30",
        nodeDot: "border-cyan-400/60 bg-stone-950",
        nodeCore: "bg-cyan-400",
      }
    case "Community & Outreach":
      return {
        tag: "Community & Outreach",
        accentText: "text-slate-300",
        borderAccent: "border-white/10",
        bgAccent: "bg-white/[0.03]",
        nodeDot: "border-stone-500 bg-stone-950",
        nodeCore: "bg-stone-400",
      }
    case "Student Leadership":
      return {
        tag: "Student Leadership",
        accentText: "text-cyan-200",
        borderAccent: "border-cyan-500/20",
        bgAccent: "bg-cyan-950/30",
        nodeDot: "border-cyan-400/60 bg-stone-950",
        nodeCore: "bg-cyan-400",
      }
    default:
      return {
        tag: "Experience",
        accentText: "text-stone-300",
        borderAccent: "border-white/10",
        bgAccent: "bg-white/[0.03]",
        nodeDot: "border-stone-500 bg-stone-950",
        nodeCore: "bg-stone-400",
      }
  }
}

/* ─── Individual Timeline Entry Component ─── */
function TimelineEntry({
  item,
  index,
  isLast,
  isExpanded,
  onToggle,
}: {
  item: ExperienceItem
  index: number
  isLast: boolean
  isExpanded: boolean
  onToggle: () => void
}) {
  const meta = getCategoryMeta(item.category)
  const isOngoing = item.type === "current"
  const formattedDuration = item.duration.replace("–", "—")

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-4 sm:gap-6 group"
    >
      {/* ── Left Column: Slim Editorial Spine & Node ── */}
      <div className="flex flex-col items-center flex-shrink-0 select-none w-5">
        {/* Understated Node Marker */}
        <div
          className={`relative mt-5 w-2.5 h-2.5 rounded-full border transition-all duration-300 z-10 ${
            isOngoing
              ? "border-cyan-400 bg-cyan-950 shadow-[0_0_8px_rgba(34,211,238,0.4)]"
              : isExpanded
              ? "border-cyan-400 bg-stone-950"
              : "border-stone-600 bg-stone-900 group-hover:border-stone-400"
          }`}
        >
          {isOngoing && (
            <span className="absolute inset-0.5 rounded-full bg-cyan-400 animate-pulse" />
          )}
        </div>

        {/* Continuous Slim Connecting Rail */}
        {!isLast && (
          <div
            className="flex-1 w-[1px] my-1 transition-colors duration-300"
            style={{
              background: isExpanded
                ? "linear-gradient(to bottom, rgba(56, 189, 248, 0.3), rgba(255, 255, 255, 0.05))"
                : "linear-gradient(to bottom, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))",
            }}
          />
        )}
      </div>

      {/* ── Right Column: Editorial Record Card ── */}
      <article
        className="flex-1 mb-6 rounded-xl transition-all duration-300 overflow-hidden"
        style={{
          background: isExpanded
            ? "linear-gradient(150deg, rgba(20, 22, 34, 0.8), rgba(12, 14, 22, 0.9))"
            : "linear-gradient(150deg, rgba(16, 18, 26, 0.45), rgba(10, 12, 18, 0.55))",
          border: isExpanded
            ? "1px solid rgba(56, 189, 248, 0.22)"
            : "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: isExpanded
            ? "0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.05)"
            : "0 2px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Subtle Top Rim Highlight */}
        <div
          className="h-[1px] w-full transition-opacity duration-300"
          style={{
            background: isExpanded
              ? "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.5), transparent)"
              : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), transparent)",
          }}
        />

        <div className="p-5 sm:p-6 md:p-7 space-y-4">
          {/* ── Top Header Row: Category Eyebrow & Date Metadata ── */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-white/[0.04]">
            {/* Category tag */}
            <div className="flex items-center gap-2">
              <span
                className={`font-mono text-[10.5px] uppercase tracking-widest px-2 py-0.5 rounded border ${meta.bgAccent} ${meta.borderAccent} ${meta.accentText}`}
              >
                {meta.tag}
              </span>
              {isOngoing && (
                <span className="font-mono text-[10.5px] tracking-wide text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded">
                  Active Program
                </span>
              )}
            </div>

            {/* Date range & location */}
            <div className="flex items-center gap-2 font-mono text-xs text-stone-400">
              <span>{formattedDuration}</span>
              {item.location && (
                <>
                  <span className="text-stone-600">·</span>
                  <span className="text-stone-500 hidden sm:inline">{item.location}</span>
                </>
              )}
            </div>
          </div>

          {/* ── Primary Information Hierarchy: Role & Organization ── */}
          <div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-stone-100 tracking-tight leading-snug group-hover:text-white transition-colors">
              {item.role}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-sm sm:text-[15px] font-medium text-stone-300">
                {item.company}
              </span>
              {item.companySize && (
                <>
                  <span className="text-stone-600 text-xs">·</span>
                  <span className="text-xs font-mono text-stone-500">{item.companySize}</span>
                </>
              )}
            </div>
          </div>

          {/* ── Concise Scannable Description ── */}
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-3xl">
            {item.description}
          </p>

          {/* ── Expanded Content (Detailed Bullet Points, Highlights, Tech) ── */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                id={`experience-details-${index}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-2 space-y-4 border-t border-white/[0.05]">
                  {/* Key Highlights / Responsibilities */}
                  {item.achievements && item.achievements.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-widest text-stone-400">
                        Key Responsibilities & Deliverables
                      </div>
                      <ul className="space-y-2">
                        {item.achievements.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300 leading-relaxed">
                            <span className="text-cyan-400/80 mt-1 select-none text-xs">―</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills & Technologies */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="pt-1">
                      <div className="text-[11px] font-mono uppercase tracking-widest text-stone-400 mb-2">
                        Core Competencies & Tools
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] font-mono text-[11px] text-stone-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Optional External Website Link */}
                  {item.website && (
                    <div className="pt-2">
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded px-1 -ml-1"
                      >
                        <span>Visit Organization Portal</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Understated Accessible Disclosure Button ── */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={isExpanded}
              aria-controls={`experience-details-${index}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-400 hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/50 rounded py-1 px-2 -ml-2 hover:bg-white/[0.03]"
            >
              <span>{isExpanded ? "Collapse details" : "Explore highlights"}</span>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.span>
            </button>
          </div>
        </div>
      </article>
    </motion.div>
  )
}

/* ─── Main TimelineExperience Component ─── */
export default function TimelineExperience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const experienceData = sections.experience as ExperienceItem[]

  return (
    <div className="space-y-8 select-text">
      {/* ── Section Introduction Header ── */}
      <header className="space-y-4 pb-6 border-b border-white/[0.06]">
        {/* Technical Eyebrow */}
        <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-widest text-cyan-400 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
          <span>CHRONICLE_ARCHIVE // ROLES & ACADEMIA</span>
        </div>

        {/* Heading & Summary */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-stone-100 tracking-tight">
              Experience & Education
            </h1>
            <p className="mt-2 text-sm sm:text-base text-stone-400 max-w-xl leading-relaxed">
              A chronicle of hands-on engineering projects, open-source community outreach, departmental leadership, and academic grounding.
            </p>
          </div>

          {/* Record Count Badge */}
          <div className="flex items-center gap-2 font-mono text-xs select-none">
            <div className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.07] text-stone-300">
              <span className="text-cyan-400 font-semibold mr-1.5">{experienceData.length}</span>
              <span>Milestones Recorded</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Slim Editorial Timeline List ── */}
      <div className="pt-2">
        {experienceData.map((item, index) => (
          <TimelineEntry
            key={`${item.role}-${item.company}-${index}`}
            item={item}
            index={index}
            isLast={index === experienceData.length - 1}
            isExpanded={expandedIndex === index}
            onToggle={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          />
        ))}
      </div>

      {/* ── Refined Minimalist Section Footer ── */}
      <footer className="pt-6 pb-2 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono text-stone-400">
        <span>TIMELINE_END // VERIFIED RECORD ARCHIVE</span>
        <span className="text-stone-400">Chitkara University & Open Source</span>
      </footer>
    </div>
  )
}
