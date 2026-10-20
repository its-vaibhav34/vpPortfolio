"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { sections } from "../data"
import {
  Code2,
  Database,
  Layers,
  Server,
  Cloud,
  Terminal,
  Cpu,
  Boxes,
  Palette,
  type LucideIcon,
} from "lucide-react"

interface Skill {
  name: string
  icon?: string
  logo?: string
  color?: string
  category: string
}

// Fallback category icons (clean SVGs, no emojis)
const categoryIcons: Record<string, LucideIcon> = {
  Frontend: Layers,
  Backend: Server,
  Database: Database,
  Language: Code2,
  "3D": Boxes,
  DevOps: Terminal,
  Cloud: Cloud,
  Tools: Cpu,
  Styling: Palette,
  Framework: Boxes,
}

export default function SkillsSection() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const [rotation, setRotation] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [radius, setRadius] = useState(540)

  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartRotationRef = useRef(0)
  const velocityRef = useRef(0)
  const lastXRef = useRef(0)
  const lastTimeRef = useRef(0)
  const animFrameRef = useRef<number | null>(null)
  const rotationRef = useRef(0)

  const skills = useMemo(() => (sections.skills as Skill[]) || [], [])
  const categories = useMemo(
    () => Array.from(new Set(skills.map((s) => s.category).filter(Boolean))),
    [skills]
  )

  // Keep rotationRef in sync
  useEffect(() => {
    rotationRef.current = rotation
  }, [rotation])

  // Responsive radius calculation
  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth
      if (width < 640) {
        setRadius(290)
      } else if (width < 1024) {
        setRadius(420)
      } else if (width < 1440) {
        setRadius(540)
      } else {
        setRadius(620)
      }
    }
    updateRadius()
    window.addEventListener("resize", updateRadius)
    return () => window.removeEventListener("resize", updateRadius)
  }, [])

  // Smooth momentum physics & auto-rotation loop
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let prevTimestamp = performance.now()

    const animateLoop = (timestamp: number) => {
      const delta = Math.min((timestamp - prevTimestamp) / 1000, 0.1)
      prevTimestamp = timestamp

      if (!isDraggingRef.current) {
        // Friction damping for fling velocity
        if (Math.abs(velocityRef.current) > 0.04) {
          setRotation((prev) => prev + velocityRef.current * delta)
          velocityRef.current *= 0.93
        } else if (!isHovered && !prefersReducedMotion) {
          // Continuous gentle auto-rotation (~10 deg/sec)
          setRotation((prev) => (prev + 10 * delta) % 360)
        }
      }

      animFrameRef.current = requestAnimationFrame(animateLoop)
    }

    animFrameRef.current = requestAnimationFrame(animateLoop)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isHovered])

  // Pointer drag interactions
  const handlePointerDown = (clientX: number) => {
    isDraggingRef.current = true
    dragStartXRef.current = clientX
    dragStartRotationRef.current = rotationRef.current
    lastXRef.current = clientX
    lastTimeRef.current = performance.now()
    velocityRef.current = 0
  }

  const handlePointerMove = (clientX: number) => {
    if (!isDraggingRef.current) return
    const now = performance.now()
    const dx = clientX - dragStartXRef.current
    const sensitivity = 0.3
    setRotation(dragStartRotationRef.current - dx * sensitivity)

    const dt = Math.max((now - lastTimeRef.current) / 1000, 0.001)
    const instantVelocity = ((lastXRef.current - clientX) * sensitivity) / dt
    velocityRef.current = velocityRef.current * 0.7 + instantVelocity * 0.3

    lastXRef.current = clientX
    lastTimeRef.current = now
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
  }

  // Smooth wheel rotation via momentum impulse
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    velocityRef.current += delta * 0.35
  }

  // Rotate to specific card index
  const rotateToIndex = useCallback(
    (index: number) => {
      if (skills.length === 0) return
      const anglePerItem = 360 / skills.length
      const targetRotation = -index * anglePerItem
      let diff = (targetRotation - (rotationRef.current % 360)) % 360
      if (diff > 180) diff -= 360
      if (diff < -180) diff += 360
      setRotation((prev) => prev + diff)
      velocityRef.current = 0
    },
    [skills.length]
  )

  // Jump to first skill matching category
  const jumpToCategory = (cat: string) => {
    const idx = skills.findIndex((s) => s.category === cat)
    if (idx !== -1) {
      rotateToIndex(idx)
    }
  }

  // Active front card index
  const activeIndex = useMemo(() => {
    if (skills.length === 0) return 0
    const anglePerItem = 360 / skills.length
    const normalized = ((-rotation % 360) + 360) % 360
    return Math.round(normalized / anglePerItem) % skills.length
  }, [rotation, skills.length])

  const activeSkill = skills[activeIndex]

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        rotateToIndex((activeIndex - 1 + skills.length) % skills.length)
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        rotateToIndex((activeIndex + 1) % skills.length)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeIndex, skills.length, rotateToIndex])

  const anglePerItem = skills.length > 0 ? 360 / skills.length : 0

  return (
    <div className="w-full flex flex-col justify-between select-text">
      {/* ── Section Technical Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-4 pb-4 border-b border-white/[0.06] flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-sky-400/90 uppercase mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse" />
            <span>CORE_COMPETENCIES // ARSENAL</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-100 tracking-tight">
            Technical Stack & Capabilities
          </h2>
        </div>

        {/* Derived Module & Domain Counts */}
        <div className="flex items-center gap-2.5 font-mono text-xs select-none">
          <div className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.06] text-stone-300">
            <span className="text-sky-400 font-semibold mr-1.5">{skills.length}</span>
            <span>Technologies</span>
          </div>
          <div className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.06] text-stone-300">
            <span className="text-sky-400 font-semibold mr-1.5">{categories.length}</span>
            <span>Domains</span>
          </div>
        </div>
      </motion.header>

      {/* ── Category Quick-Jump Strip ── */}
      <nav
        aria-label="Filter skill categories"
        className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((cat) => {
          const isSelected = activeSkill?.category === cat
          return (
            <button
              key={cat}
              onClick={() => jumpToCategory(cat)}
              className={`px-3 py-1 rounded-md font-mono text-xs tracking-wide whitespace-nowrap flex-shrink-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400/50 ${
                isSelected
                  ? "text-sky-300 bg-sky-950/40 border border-sky-500/35 shadow-[0_0_12px_rgba(56,189,248,0.08)] font-medium"
                  : "text-stone-400 bg-white/[0.02] border border-white/[0.05] hover:text-stone-200 hover:border-white/[0.09]"
              }`}
            >
              {cat}
            </button>
          )
        })}
      </nav>

      {/* ── 3D Cylindrical Orbit Stage ── */}
      <div
        className="relative w-full h-[64vh] min-h-[500px] sm:min-h-[540px] flex items-center justify-center overflow-hidden rounded-2xl select-none cursor-grab active:cursor-grabbing border border-white/[0.04]"
        style={{
          perspective: "1600px",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(56, 189, 248, 0.03) 0%, rgba(10, 10, 15, 0.7) 65%, rgba(8, 8, 12, 0.95) 100%)",
        }}
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onMouseLeave={() => {
          handlePointerUp()
          setIsHovered(false)
        }}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={handlePointerUp}
        onWheel={handleWheel}
      >
        {/* Dark Industrial Orbit Horizon Lines */}
        <div
          aria-hidden="true"
          className="absolute w-[820px] h-[820px] rounded-full border border-sky-500/10 pointer-events-none"
          style={{
            transform: "rotateX(75deg) translateZ(-90px)",
            boxShadow: "inset 0 0 60px rgba(56, 189, 248, 0.02)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute w-[560px] h-[560px] rounded-full border border-dashed border-white/[0.04] pointer-events-none"
          style={{
            transform: "rotateX(75deg) translateZ(-90px)",
          }}
        />

        {/* 3D Revolving Cylinder Container */}
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {skills.map((skill, i) => {
            const itemAngle = i * anglePerItem
            const totalRotation = rotation % 360
            const relativeAngle = (itemAngle + totalRotation + 360) % 360
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle
            )
            // Normalized depth: 0 is front-most, 1 is back-most
            const depthFactor = normalizedAngle / 180
            const opacity = Math.max(0.18, 1 - Math.pow(depthFactor, 1.15) * 0.85)
            const scale = Math.max(0.76, 1 - depthFactor * 0.24)
            const isFront = normalizedAngle < 14

            const CategoryIcon = categoryIcons[skill.category] || Code2

            return (
              <div
                key={skill.name}
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation()
                  rotateToIndex(i)
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`absolute w-[190px] h-[270px] sm:w-[220px] sm:h-[300px] flex flex-col items-center justify-between p-5 sm:p-6 rounded-2xl transition-all duration-300 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400/50 ${
                  isFront ? "border-t border-t-white/[0.12]" : ""
                }`}
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  left: "50%",
                  top: "50%",
                  marginLeft: "-110px",
                  marginTop: "-150px",
                  opacity: opacity,
                  zIndex: Math.round((1 - depthFactor) * 100),
                  background: isFront
                    ? "linear-gradient(165deg, #171b26 0%, #0f121a 100%)"
                    : "linear-gradient(165deg, rgba(18, 21, 29, 0.75) 0%, rgba(12, 14, 20, 0.85) 100%)",
                  border: isFront
                    ? "1px solid rgba(56, 189, 248, 0.3)"
                    : "1px solid rgba(255, 255, 255, 0.05)",
                  boxShadow: isFront
                    ? "0 22px 50px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
                    : "0 10px 25px rgba(0, 0, 0, 0.4)",
                  backfaceVisibility: "hidden",
                  cursor: "pointer",
                }}
              >
                {/* Card Top: Category label & Module Index */}
                <div className="w-full flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-200 ${
                      isFront
                        ? "text-sky-300 font-medium"
                        : "text-stone-400"
                    }`}
                  >
                    {skill.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-mono transition-colors duration-200 ${
                        isFront ? "text-sky-400/90 font-medium" : "text-stone-400"
                      }`}
                    >
                      #{String(i + 1).padStart(2, "0")}
                    </span>
                    <CategoryIcon
                      className={`w-3.5 h-3.5 transition-colors duration-200 ${
                        isFront ? "text-sky-400" : "text-stone-400"
                      }`}
                    />
                  </div>
                </div>

                {/* Card Center: Official SVG Technology Logo */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 my-auto flex items-center justify-center">
                  {skill.logo && !imageErrors.has(skill.name) ? (
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-105"
                      onError={() =>
                        setImageErrors((prev) => new Set([...prev, skill.name]))
                      }
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-center justify-center font-mono text-base font-bold text-stone-200">
                      {skill.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Card Bottom: Skill Name & Category */}
                <div className="w-full text-center">
                  <h4 className="font-sans text-base sm:text-lg font-medium text-stone-100 group-hover:text-white transition-colors truncate">
                    {skill.name}
                  </h4>
                  <span className="block font-mono text-[10px] text-stone-400 tracking-wider uppercase mt-1.5">
                    {skill.category}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}