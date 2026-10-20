"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { sections } from "../data"

interface Achievement {
  title: string
  date: string
  description: string
  impact?: string
  category?: string
  organization?: string
  prize?: string
  teamSize?: string
  link?: string
}

function getAchievementMeta(achievement: Achievement) {
  let resultText = ""
  let distinctionNote: string | null = null

  const impact = achievement.impact || ""
  const prize = achievement.prize || ""

  if (impact.includes("1st Place") || prize.toLowerCase().includes("winner")) {
    resultText = "1st Place Winner"
  } else if (impact.includes("1000+") || prize.toLowerCase().includes("top 4")) {
    resultText = "Top 4 · 1,000+ Teams"
  } else if (impact.includes("$300") || prize.includes("$300")) {
    resultText = "$300 MongoDB Award"
  } else if (impact.toLowerCase().includes("semifinalist")) {
    resultText = "Semifinalist"
  } else if (impact.toLowerCase().includes("finalist")) {
    resultText = "Finalist"
  } else if (prize) {
    resultText = prize
  } else if (achievement.category) {
    resultText = achievement.category
  }

  // Highlight verifiable distinctions that add genuine context
  if (prize && prize.includes("3× Champion")) {
    distinctionNote = "Recognized 3× Hackathon Champion"
  } else if (impact && impact.includes("1000+") && resultText !== impact) {
    distinctionNote = "Selected from 1,000+ participating engineering teams nationwide"
  }

  return { resultText, distinctionNote }
}

export default function AchievementsSection() {
  const [filter, setFilter] = useState<string>("All")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null)

  const sectionRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])

  const achievements = (sections.achievements || []) as Achievement[]
  const categories = ["All", ...Array.from(new Set(achievements.map((a) => a.category).filter(Boolean) as string[]))]
  const filtered = filter === "All" ? achievements : achievements.filter((a) => a.category === filter)

  // Derive verified milestones from existing data
  const winCount = achievements.filter(
    (a) =>
      a.category?.toLowerCase().includes("winner") ||
      a.title?.toLowerCase().includes("winner") ||
      a.impact?.toLowerCase().includes("1st place")
  ).length

  // Find scroll container (Overlay modal scroll container)
  useEffect(() => {
    if (sectionRef.current) {
      const parent = sectionRef.current.closest(".overlay-scroll, .overlay-scroll-cyan") as HTMLElement | null
      if (parent) {
        setScrollContainer(parent)
      }
    }
  }, [])

  // Scroll-driven progress line calculation (Passive & zero React re-renders)
  useEffect(() => {
    if (!scrollContainer) return

    let ticking = false
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer
      const maxScroll = scrollHeight - clientHeight
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0
      if (sectionRef.current) {
        sectionRef.current.style.setProperty("--timeline-progress", `${progress * 100}%`)
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress)
        ticking = true
      }
    }

    scrollContainer.addEventListener("scroll", onScroll, { passive: true })
    updateProgress()

    return () => {
      scrollContainer.removeEventListener("scroll", onScroll)
    }
  }, [scrollContainer])

  // Active item tracking with IntersectionObserver
  useEffect(() => {
    if (!scrollContainer) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"))
            if (!isNaN(idx)) {
              setActiveIndex(idx)
            }
          }
        })
      },
      {
        root: scrollContainer,
        rootMargin: "-12% 0px -45% 0px",
        threshold: [0, 0.2, 0.5],
      }
    )

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [scrollContainer, filtered])

  return (
    <div ref={sectionRef} className="space-y-8 select-text">
      {/* ── Section Editorial Header ── */}
      <header className="space-y-5 pb-6 border-b border-white/[0.06]">
        {/* Technical Section Identifier */}
        <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-widest text-cyan-400/90 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
          <span>RECORD_ARCHIVE // VERIFIED HONORS</span>
        </div>

        {/* Heading & Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-stone-100 tracking-tight">
              Competitive Distinctions
            </h1>
            <p className="mt-2 text-sm sm:text-base text-stone-400 max-w-xl leading-relaxed">
              A curated chronicle of national hackathon victories, technical architecture distinctions, and algorithmic honors.
            </p>
          </div>

          {/* Genuine Verified Metrics (Directly calculated from source data) */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs select-none">
            {winCount > 0 && (
              <div className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.07] text-stone-300">
                <span className="text-cyan-400 font-semibold mr-1.5">{winCount}×</span>
                <span>Champion</span>
              </div>
            )}
            <div className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.07] text-stone-300">
              <span className="text-cyan-400 font-semibold mr-1.5">Top 4</span>
              <span>Nationwide</span>
            </div>
            <div className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.07] text-stone-300">
              <span className="text-cyan-400 font-semibold mr-1.5">{achievements.length}</span>
              <span>Verified Records</span>
            </div>
          </div>
        </div>

        {/* ── Filter Strip ── */}
        <div className="pt-1">
          <nav
            aria-label="Filter achievements"
            className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((cat) => {
              const isActive = filter === cat
              const count = cat === "All" ? achievements.length : achievements.filter((a) => a.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-md font-mono text-xs tracking-wide whitespace-nowrap flex-shrink-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/50 ${
                    isActive
                      ? "text-cyan-300 bg-cyan-950/40 border border-cyan-500/35 shadow-[0_0_15px_rgba(34,211,238,0.08)] font-medium"
                      : "text-stone-400 bg-white/[0.02] border border-white/[0.05] hover:text-stone-200 hover:border-white/[0.09] hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                  )}
                  <span>{cat}</span>
                  <span className={`text-[10px] ${isActive ? "text-cyan-400/80" : "text-stone-600 group-hover:text-stone-500"}`}>
                    ({count})
                  </span>
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      {/* ── Editorial Timeline & Achievement Rows ── */}
      <div className="relative mt-6 sm:mt-8">
        {/* Continuous vertical timeline connector (Background guide track) */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute left-[88px] -translate-x-1/2 top-5 bottom-8 w-[1px] bg-gradient-to-b from-stone-800/80 via-stone-800/40 to-transparent pointer-events-none"
        />

        {/* Dynamic active progress line linked to modal scroll */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute left-[88px] -translate-x-1/2 top-5 w-[2px] bg-gradient-to-b from-cyan-400 via-cyan-400/80 to-transparent pointer-events-none shadow-[0_0_10px_rgba(34,211,238,0.45)]"
          style={{
            height: "var(--timeline-progress, 0%)",
            maxHeight: "calc(100% - 32px)",
            transition: "height 0.1s ease-out",
          }}
        />

        {/* List of achievements */}
        <div className="space-y-4 sm:space-y-5">
          {filtered.map((achievement, index) => {
            const isHighlighted = activeIndex === index || hoveredIndex === index
            const { resultText, distinctionNote } = getAchievementMeta(achievement)

            return (
              <motion.article
                key={achievement.title}
                data-index={index}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                tabIndex={0}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.04, 0.25),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative flex flex-col sm:flex-row items-start p-5 sm:p-6 rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/50 ${
                  isHighlighted
                    ? "bg-gradient-to-r from-cyan-950/25 via-[#101420]/80 to-[#0c0e15]/70 border border-cyan-500/25 shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(34,211,238,0.05)] sm:translate-x-1"
                    : "bg-[#0c0e15]/60 border border-white/[0.04] hover:bg-[#111420]/75 hover:border-white/[0.09]"
                }`}
              >
                {/* Left accent hairline on highlighted row */}
                <div
                  aria-hidden="true"
                  className={`absolute left-0 top-3 bottom-3 w-[2px] rounded-full transition-all duration-300 ${
                    isHighlighted
                      ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)] opacity-100"
                      : "bg-stone-700 opacity-0 group-hover:opacity-40"
                  }`}
                />

                {/* Mobile Header: Index, Date & Result */}
                <div className="flex sm:hidden flex-wrap items-center justify-between gap-2 w-full pb-3 mb-2 border-b border-white/[0.05]">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-stone-500">
                    <span className={isHighlighted ? "text-cyan-400 font-semibold" : ""}>
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                    <span>·</span>
                    <span>{achievement.date}</span>
                    {achievement.organization && (
                      <>
                        <span>·</span>
                        <span className="text-stone-300 font-medium">{achievement.organization}</span>
                      </>
                    )}
                  </div>
                  {resultText && (
                    <span className="font-mono text-[11px] text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded font-medium flex-shrink-0">
                      {resultText}
                    </span>
                  )}
                </div>

                {/* Desktop Left Column: Narrow Index & Year */}
                <div className="hidden sm:flex flex-col items-end w-[72px] flex-shrink-0 text-right pr-4 select-none pt-0.5">
                  <span
                    className={`font-mono text-xs tracking-wider transition-colors duration-200 ${
                      isHighlighted ? "text-cyan-300 font-semibold" : "text-stone-500 group-hover:text-stone-300"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] text-stone-600 mt-1">
                    {achievement.date}
                  </span>
                </div>

                {/* Desktop Timeline Node Marker (Centered on spine) */}
                <div className="hidden sm:flex items-center justify-center w-6 flex-shrink-0 self-start mt-1 z-10 select-none">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                      isHighlighted
                        ? "border-cyan-400 bg-[#090d16] shadow-[0_0_12px_rgba(34,211,238,0.7)] scale-110"
                        : "border-stone-700/80 bg-[#0a0c14] group-hover:border-stone-500"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isHighlighted ? "bg-cyan-300 scale-100" : "bg-stone-600 group-hover:bg-stone-400"
                      }`}
                    />
                  </div>
                </div>

                {/* Dominant Content Column */}
                <div className="flex-1 min-w-0 sm:pl-3 w-full">
                  {/* Top Metadata Row: Organization, Category & Result Callout */}
                  <div className="hidden sm:flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 font-mono text-xs tracking-wide text-stone-400">
                      {achievement.organization && (
                        <span className="font-semibold text-stone-300 uppercase tracking-wider">
                          {achievement.organization}
                        </span>
                      )}
                      {achievement.organization && achievement.category && (
                        <span className="text-stone-600">/</span>
                      )}
                      {achievement.category && (
                        <span className="text-stone-400/90">{achievement.category}</span>
                      )}
                    </div>

                    {resultText && (
                      <div className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-300 bg-cyan-950/50 border border-cyan-500/25 px-2.5 py-0.5 rounded shadow-[0_0_12px_rgba(34,211,238,0.06)] font-medium flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{resultText}</span>
                      </div>
                    )}
                  </div>

                  {/* Main Achievement Title */}
                  <h3 className="text-lg sm:text-xl font-display font-medium text-stone-100 group-hover:text-white transition-colors tracking-tight leading-snug sm:mt-2">
                    {achievement.title}
                  </h3>

                  {/* Editorial Description */}
                  {achievement.description && (
                    <p className="mt-2 text-sm text-stone-400 leading-relaxed max-w-3xl group-hover:text-stone-300 transition-colors">
                      {achievement.description}
                    </p>
                  )}

                  {/* Contextual Distinction Footnote (Rendered only when offering verified value) */}
                  {distinctionNote && (
                    <div className="mt-3.5 pt-2.5 border-t border-white/[0.04] flex items-center gap-2 font-mono text-xs text-stone-400">
                      <span className="text-cyan-400/80 font-medium">HONOR //</span>
                      <span className="text-stone-300">{distinctionNote}</span>
                    </div>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="py-16 text-center text-stone-500 font-mono text-sm">
            No achievements found for category "{filter}".
          </div>
        )}
      </div>
    </div>
  )
}
