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
  type LucideIcon,
} from "lucide-react"

interface Skill {
  name: string
  icon?: string
  logo?: string
  color?: string
  category: string
}

// Fallback category icons (clean SVGs, NO EMOJIS)
const categoryIcons: Record<string, LucideIcon> = {
  Frontend: Layers,
  Backend: Server,
  Database: Database,
  Language: Code2,
  "3D": Boxes,
  DevOps: Terminal,
  Cloud: Cloud,
  Tools: Cpu,
  Styling: Layers,
  Framework: Boxes,
}

export default function SkillsSection() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const [rotation, setRotation] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [radius, setRadius] = useState(560)

  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartRotationRef = useRef(0)
  const velocityRef = useRef(0)
  const lastXRef = useRef(0)
  const lastTimeRef = useRef(0)
  const animFrameRef = useRef<number | null>(null)
  const rotationRef = useRef(0)

  const skills = useMemo(() => (sections.skills as Skill[]) || [], [])

  // Keep rotationRef in sync
  useEffect(() => {
    rotationRef.current = rotation
  }, [rotation])

  // Responsive radius calculation
  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth
      if (width < 640) {
        setRadius(300)
      } else if (width < 1024) {
        setRadius(440)
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

  // Smooth 60fps auto-rotation and momentum physics loop
  useEffect(() => {
    let prevTimestamp = performance.now()

    const animateLoop = (timestamp: number) => {
      const delta = Math.min((timestamp - prevTimestamp) / 1000, 0.1)
      prevTimestamp = timestamp

      if (!isDraggingRef.current) {
        // Friction damping for fling velocity
        if (Math.abs(velocityRef.current) > 0.05) {
          setRotation((prev) => prev + velocityRef.current * delta)
          velocityRef.current *= 0.94
        } else if (!isHovered) {
          // Continuous smooth auto-rotation (~12 deg/sec)
          setRotation((prev) => (prev + 12 * delta) % 360)
        }
      }

      animFrameRef.current = requestAnimationFrame(animateLoop)
    }

    animFrameRef.current = requestAnimationFrame(animateLoop)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isHovered])

  // Mouse & Touch Drag Handlers
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
    const sensitivity = 0.32
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

  // Smooth wheel rotation
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    setRotation((prev) => prev + delta * 0.12)
  }

  // Click to rotate any card to the front center
  const rotateToIndex = useCallback(
    (index: number) => {
      if (skills.length === 0) return
      const anglePerItem = 360 / skills.length
      const targetRotation = -index * anglePerItem
      let diff = (targetRotation - (rotationRef.current % 360)) % 360
      if (diff > 180) diff -= 360
      if (diff < -180) diff += 360
      setRotation((prev) => prev + diff)
    },
    [skills.length]
  )

  const anglePerItem = skills.length > 0 ? 360 / skills.length : 0

  return (
    <div className="w-full flex flex-col justify-between">
      {/* Clean Minimal Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 pb-3 flex items-end justify-between border-b border-white/[0.05]"
      >
        <div>
          <p className="text-[11px] font-mono text-stone-400 tracking-[0.25em] uppercase mb-1">
            Technical Stack
          </p>
        </div>
        <span className="text-xs font-mono text-stone-500 bg-stone-900/60 px-3 py-1 rounded-md border border-stone-800">
          {skills.length} technologies
        </span>
      </motion.div>

      {/* Full-Screen 3D Circular Orbit Stage */}
      <div
        className="relative w-full h-[68vh] min-h-[540px] flex items-center justify-center overflow-hidden rounded-2xl select-none cursor-grab active:cursor-grabbing"
        style={{
          perspective: "1600px",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(245, 158, 11, 0.05) 0%, rgba(10, 10, 15, 0.4) 60%, transparent 100%)",
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
        {/* Subtle Ambient Depth Ring */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full border border-dashed border-amber-500/10 pointer-events-none"
          style={{
            transform: "rotateX(75deg) translateZ(-80px)",
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
            const opacity = Math.max(0.18, 1 - depthFactor * 0.85)
            const scale = Math.max(0.78, 1 - depthFactor * 0.25)
            const isFront = normalizedAngle < 16

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
                className="absolute w-[200px] h-[280px] sm:w-[220px] sm:h-[300px] flex flex-col items-center justify-between p-6 rounded-2xl transition-all duration-300 group"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  left: "50%",
                  top: "50%",
                  marginLeft: "-110px",
                  marginTop: "-150px",
                  opacity: opacity,
                  zIndex: Math.round((1 - depthFactor) * 100),
                  background: isFront
                    ? "linear-gradient(145deg, rgba(32, 32, 54, 0.95), rgba(16, 16, 26, 0.98))"
                    : "linear-gradient(145deg, rgba(22, 22, 36, 0.72), rgba(14, 14, 22, 0.82))",
                  border: isFront
                    ? "1px solid rgba(245, 158, 11, 0.45)"
                    : "1px solid rgba(255, 255, 255, 0.06)",
                  boxShadow: isFront
                    ? "0 18px 45px rgba(0, 0, 0, 0.65), 0 0 35px rgba(245, 158, 11, 0.18)"
                    : "0 8px 20px rgba(0, 0, 0, 0.35)",
                  backdropFilter: "blur(16px)",
                  backfaceVisibility: "hidden",
                  cursor: "pointer",
                }}
              >
                {/* Top header on card */}
                <div className="w-full flex items-center justify-between">
                  <span
                    className={`text-[11px] font-mono tracking-widest uppercase transition-colors duration-200 ${
                      isFront
                        ? "text-amber-400 font-semibold"
                        : "text-stone-500"
                    }`}
                  >
                    {skill.category}
                  </span>
                  <CategoryIcon
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isFront ? "text-amber-400" : "text-stone-600"
                    }`}
                  />
                </div>

                {/* Big Official SVG Logo */}
                <div className="relative w-24 h-24 my-auto flex items-center justify-center">
                  {skill.logo && !imageErrors.has(skill.name) ? (
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-115"
                      onError={() =>
                        setImageErrors((prev) => new Set([...prev, skill.name]))
                      }
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center font-mono text-base font-bold text-stone-200">
                      {skill.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Bottom title & accent */}
                <div className="w-full text-center">
                  <h4 className="font-display text-base sm:text-lg font-bold text-stone-100 group-hover:text-white transition-colors truncate">
                    {skill.name}
                  </h4>
                  <div
                    className="h-[2px] w-8 mx-auto mt-2 rounded-full transition-all duration-300"
                    style={{
                      background: isFront
                        ? "linear-gradient(90deg, #f59e0b, #ec4899)"
                        : "rgba(255, 255, 255, 0.08)",
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}