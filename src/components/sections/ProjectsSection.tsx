"use client"

import { useState, useRef, useEffect, useCallback, type MouseEvent } from "react"
import { motion } from "framer-motion"
import { sections } from "../data"

/* ─── Project Interface ─── */
interface Project {
  title: string
  subtitle?: string
  description: string
  link: string
  repositoryUrl?: string
  demoUrl?: string
  packageUrl?: string
  technologies?: string[]
  status?: string
  category?: string
  featured?: boolean
}

/* ─── SVG Icons ─── */
function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function ArrowUpRight({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

function NpmIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
    </svg>
  )
}

function PlayIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function GlobeIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0a8.949 8.949 0 004.95-1.484M12 21a8.949 8.949 0 01-4.95-1.484m9.9 0A8.966 8.966 0 0012 18a8.966 8.966 0 00-4.95 1.516m9.9 0c.928-1.42 1.485-3.13 1.485-4.984 0-4.97-4.03-9-9-9s-9 4.03-9 9c0 1.854.557 3.564 1.485 4.984m14.03 0a8.962 8.962 0 01-7.03 3.516m-7-3.516a8.962 8.962 0 007 3.516" />
    </svg>
  )
}

function TerminalIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 17l6-6-6-6m8 14h8" />
    </svg>
  )
}

function LayersIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 4.5-9 4.5-9-4.5 9-4.5zm0 9l9 4.5-9 4.5-9-4.5 9-4.5zm0 9l9 4.5-9 4.5-9-4.5 9-4.5z" />
    </svg>
  )
}

/* ─── Scroll-reveal Hook ─── */
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const scrollParent = el.closest(".overlay-scroll, .overlay-scroll-cyan, [class*='overlay-scroll']")
    const root = scrollParent instanceof HTMLElement ? scrollParent : null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, root }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

/* ─── Card 3D Tilt & Interactive Pointer Hook ─── */
function useCardTilt(maxRotation = 6) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, px: 50, py: 50, active: false })

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rx = ((y - centerY) / centerY) * -maxRotation
    const ry = ((x - centerX) / centerX) * maxRotation
    const px = (x / rect.width) * 100
    const py = (y / rect.height) * 100

    setTilt({ rx, ry, px, py, active: true })
  }, [maxRotation])

  const onMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, px: 50, py: 50, active: false })
  }, [])

  return { cardRef, tilt, onMouseMove, onMouseLeave }
}

/* ═════════════════════════════════════════════════════════════════════════
   FEATURED HERO PROJECT (MechVerse) — Photo-free, High-Precision Editorial
   ═════════════════════════════════════════════════════════════════════════ */
function FeaturedHeroProject({ project }: { project: Project }) {
  const { ref, visible } = useScrollReveal(0.08)
  const { cardRef, tilt, onMouseMove, onMouseLeave } = useCardTilt(5)
  const [isExpanded, setIsExpanded] = useState(false)

  const repoUrl = project.repositoryUrl || project.link
  const demoUrl = project.demoUrl

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-12"
      aria-labelledby="featured-project-title"
    >
      {/* Editorial Eyebrow Ribbon */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-cyan-400 uppercase">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)] animate-pulse" />
          <span>PRIMARY FEATURED SHOWCASE // CINEMATIC 3D ENGINE</span>
        </div>
        <span className="hidden sm:inline font-mono text-[10px] text-stone-400">
          SYSTEM_ID: MECHVERSE-01
        </span>
      </div>

      {/* Main Interactive Showcase Card */}
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="group relative rounded-xl overflow-hidden transition-all duration-300"
        style={{
          background: "linear-gradient(155deg, rgba(16, 20, 30, 0.95), rgba(10, 12, 18, 0.98))",
          border: "1px solid rgba(56, 189, 248, 0.22)",
          boxShadow: tilt.active
            ? "0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(6, 182, 212, 0.15)"
            : "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
          transform: tilt.active
            ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        }}
      >
        {/* Pointer-following ambient spotlight */}
        {tilt.active && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(550px circle at ${tilt.px}% ${tilt.py}%, rgba(56, 189, 248, 0.12), transparent 70%)`,
            }}
          />
        )}

        {/* Top Rim Illumination line */}
        <div
          className="h-[1px] w-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.6), transparent)",
          }}
        />

        {/* Card Body */}
        <div className="p-6 sm:p-8 md:p-10 space-y-6">
          {/* Integrated High-Precision Technical Status Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-0.5 rounded">
                {project.category || "3D Simulation"}
              </span>
              <span className="text-stone-400 text-xs">·</span>
              <span className="font-mono text-xs text-stone-300">
                Browser-Native WebGL 2.0
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2.5 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>MULTIPLAYER SYNC (SOCKET.IO)</span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h2
              id="featured-project-title"
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-cyan-50 transition-colors"
            >
              {project.title}
            </h2>
            {project.subtitle && (
              <p className="font-display text-base sm:text-lg text-stone-300 mt-1 font-medium">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Concise Technical Description with Expansion */}
          <div className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-4xl">
            <p
              style={{
                display: "-webkit-box",
                WebkitLineClamp: isExpanded ? 999 : 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.description}
            </p>
            {project.description.length > 200 && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/50 rounded px-1 -ml-1"
              >
                <span>{isExpanded ? "Show less" : "Read full engineering breakdown"}</span>
                <span className={`inline-block transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                  ↓
                </span>
              </button>
            )}
          </div>

          {/* Dynamic Telemetry Metric Chips (Data-Driven, Clean Typography) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs select-none">
            <div className="px-3 py-2 rounded-lg bg-black/40 border border-white/[0.07] text-stone-300">
              <span className="text-[10px] text-stone-400 block uppercase">Physics Solver</span>
              <span className="text-cyan-300 font-medium">Rapier 3D (60Hz)</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-black/40 border border-white/[0.07] text-stone-300">
              <span className="text-[10px] text-stone-400 block uppercase">Suspension Tuning</span>
              <span className="text-cyan-300 font-medium">32 kN/m [Tuned]</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-black/40 border border-white/[0.07] text-stone-300">
              <span className="text-[10px] text-stone-400 block uppercase">Tire Friction Coeff</span>
              <span className="text-cyan-300 font-medium">μ 1.12 Dynamic</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-black/40 border border-white/[0.07] text-stone-300">
              <span className="text-[10px] text-stone-400 block uppercase">Input Protocol</span>
              <span className="text-cyan-300 font-medium">Monect Steering</span>
            </div>
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="pt-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-2">
                Engineered With:
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-stone-300 hover:border-cyan-500/40 hover:text-cyan-200 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions: Play Demo & View Source */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/demo inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 hover:from-cyan-400 hover:to-sky-500 shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <PlayIcon className="w-3.5 h-3.5 fill-current" />
                <span>Play Demo</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5" />
              </a>
            )}

            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/src inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-white/[0.04] border border-white/[0.1] text-stone-200 hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              <GitHubIcon className="w-4 h-4 text-stone-400 group-hover/src:text-white transition-colors" />
              <span>View Source</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 transition-transform duration-200 group-hover/src:translate-x-0.5 group-hover/src:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   SUPPORTING PROJECTS — Photo-free, Full-Width Editorial Layout
   ═════════════════════════════════════════════════════════════════════════ */
function SupportingProjectCard({
  project,
  index,
  specs,
}: {
  project: Project
  index: number
  specs: { label: string; value: string }[]
}) {
  const { ref, visible } = useScrollReveal(0.08)
  const { cardRef, tilt, onMouseMove, onMouseLeave } = useCardTilt(4)
  const [isExpanded, setIsExpanded] = useState(false)

  const repoUrl = project.repositoryUrl || project.link

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      aria-labelledby={`supporting-project-${index}`}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative rounded-xl overflow-hidden transition-all duration-300"
        style={{
          background: "linear-gradient(150deg, rgba(14, 16, 24, 0.95), rgba(9, 10, 16, 0.98))",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          boxShadow: tilt.active
            ? "0 15px 35px -5px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.08)"
            : "0 4px 20px rgba(0, 0, 0, 0.5)",
          transform: tilt.active
            ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        }}
      >
        {/* Pointer-following ambient spotlight */}
        {tilt.active && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(450px circle at ${tilt.px}% ${tilt.py}%, rgba(56, 189, 248, 0.08), transparent 70%)`,
            }}
          />
        )}

        <div className="p-6 sm:p-7 md:p-8 space-y-4">
          {/* Top Row: Category, Status & Architecture Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.05]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-medium tracking-widest uppercase text-stone-300 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded">
                {project.category}
              </span>
              {project.status && (
                <>
                  <span className="text-stone-400">·</span>
                  <span className="font-mono text-[11px] text-stone-400">
                    {project.status}
                  </span>
                </>
              )}
            </div>

            {/* Project-specific technical capability indicator */}
            <div className="font-mono text-[11px] text-cyan-400/90 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>
                {project.title === "Offbyt" && "Deterministic AST Traversal"}
                {project.title === "ChanakyaAI" && "FAISS Vector Grounding"}
                {project.title === "FahRide" && "Verified Campus Network"}
              </span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h3
              id={`supporting-project-${index}`}
              className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-100 transition-colors"
            >
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="font-display text-sm sm:text-[15px] text-stone-300 mt-0.5 font-medium">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
            <p
              style={{
                display: "-webkit-box",
                WebkitLineClamp: isExpanded ? 999 : 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.description}
            </p>
            {project.description.length > 170 && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1.5 text-xs font-mono text-cyan-400/90 hover:text-cyan-300 flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/50 rounded px-1 -ml-1"
              >
                <span>{isExpanded ? "Show less" : "More details"}</span>
                <span className={`inline-block transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                  ↓
                </span>
              </button>
            )}
          </div>

          {/* Key Engineering Architecture Specs (Typography / Data Badges) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs pt-1 select-none">
            {specs.map((item) => (
              <div key={item.label} className="p-2 rounded bg-black/40 border border-white/[0.06]">
                <span className="text-[10px] text-stone-400 block uppercase">{item.label}</span>
                <span className="text-stone-200 font-medium text-[11px]">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-stone-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Project Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-stone-200 hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              <GitHubIcon className="w-3.5 h-3.5 text-stone-400 group-hover/btn:text-white transition-colors" />
              <span>View Source</span>
              <ArrowUpRight className="w-3 h-3 text-stone-400 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>

            {/* Verified Secondary Action */}
            {project.packageUrl && (
              <a
                href={project.packageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-rose-950/30 border border-rose-500/30 text-rose-300 hover:bg-rose-950/50 hover:border-rose-500/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-400"
              >
                <NpmIcon className="w-3.5 h-3.5 fill-current" />
                <span>View on npm</span>
                <ArrowUpRight className="w-3 h-3 text-rose-400 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            )}

            {project.title === "FahRide" && project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/50 hover:border-emerald-500/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
              >
                <GlobeIcon className="w-3.5 h-3.5" />
                <span>Visit FahRide</span>
                <ArrowUpRight className="w-3 h-3 text-emerald-400 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   MAIN PROJECTS SECTION COMPONENT
   ═════════════════════════════════════════════════════════════════════════ */
export default function ProjectsSection() {
  const projects = sections.projects as unknown as Project[]

  // Primary featured project: MechVerse
  const mechverse = projects.find((p) => p.title === "MechVerse") || projects[0]

  // Supporting projects: Offbyt, ChanakyaAI, FahRide
  const supportingProjects = projects.filter((p) => p.title !== "MechVerse")

  return (
    <div className="space-y-12 select-text">
      {/* ── Section Introduction ── */}
      <header className="space-y-4 pb-6 border-b border-white/[0.06]">
        {/* Technical Eyebrow */}
        <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-widest text-cyan-400 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
          <span>PORTFOLIO_SYSTEM // SELECTED WORK 2025—2026</span>
        </div>

        {/* Heading & Summary */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-stone-100 tracking-tight">
              Selected Works
            </h1>
            <p className="mt-2 text-sm sm:text-base text-stone-400 max-w-xl leading-relaxed">
              Bespoke digital systems spanning real-time 3D simulation, AST compiler tooling, and domain-grounded intelligence.
            </p>
          </div>

          {/* Project Release Metrics */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs select-none">
            <div className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.07] text-stone-300">
              <span className="text-cyan-400 font-semibold mr-1.5">{projects.length}</span>
              <span>Engineering Releases</span>
            </div>
            <div className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.07] text-stone-300 hidden md:block">
              <span className="text-cyan-400 font-semibold mr-1.5">100%</span>
              <span>Open Source / Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── A. Cinematic Featured Showcase (MechVerse) ── */}
      {mechverse && <FeaturedHeroProject project={mechverse} />}

      {/* ── Section Subheader for Supporting Works ── */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-stone-400 uppercase">
          <LayersIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>SPECIALIZED DOMAIN PLATFORMS & COMPILER TOOLING</span>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent" />
      </div>

      {/* ── B. Supporting Showcases ── */}
      <div className="space-y-8">
        {supportingProjects.map((project, index) => {
          let specs: { label: string; value: string }[] = []

          if (project.title === "Offbyt") {
            specs = [
              { label: "Core Parser", value: "Babel AST Engine" },
              { label: "Output Mode", value: "100% Deterministic" },
              { label: "Target Sync", value: "Incremental Diff" },
              { label: "Distribution", value: "npm CLI Package" },
            ]
          } else if (project.title === "ChanakyaAI") {
            specs = [
              { label: "Knowledge Base", value: "FAISS Vector Store" },
              { label: "LLM Backend", value: "Llama 3 Grounded" },
              { label: "Voice Engine", value: "40+ Languages" },
              { label: "Auth Layer", value: "Firebase Guard" },
            ]
          } else if (project.title === "FahRide") {
            specs = [
              { label: "Institution Gate", value: "@chitkara.edu.in" },
              { label: "Reward System", value: "Fah Coins Escrow" },
              { label: "Ride Routing", value: "Scheduled Corridor" },
              { label: "Database", value: "MongoDB Schemas" },
            ]
          }

          return (
            <SupportingProjectCard
              key={project.title}
              project={project}
              index={index}
              specs={specs}
            />
          )
        })}
      </div>

      {/* ── Closing Signature / Clean Transition ── */}
      <footer className="pt-8 pb-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-stone-400">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>INDEX_END // ALL REPOSITORIES VERIFIED & ACTIVE</span>
        </div>
        <a
          href="https://github.com/its-vaibhav34"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded px-1"
        >
          <span>github.com/its-vaibhav34</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </footer>
    </div>
  )
}
