"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface ForgeLoaderProps {
  onComplete: () => void
}

// Ambient floating particles
function AmbientParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 6 + 5,
    delay: Math.random() * 4,
    driftX: (Math.random() - 0.5) * 80,
    driftY: (Math.random() - 0.5) * 80 - 40,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-drift"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.id % 3 === 0
              ? "rgba(245, 158, 11, 0.6)"
              : p.id % 3 === 1
              ? "rgba(244, 63, 94, 0.4)"
              : "rgba(99, 102, 241, 0.4)",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--drift-x": `${p.driftX}px`,
            "--drift-y": `${p.driftY}px`,
            "--drift-duration": `${p.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

// Forge monogram logo
function ForgeLogo({ progress }: { progress: number }) {
  const dashOffset = 280 - (280 * progress) / 100

  return (
    <div className="relative w-28 h-28 mb-10">
      {/* Rotating ring */}
      <svg
        className="absolute inset-0 w-full h-full animate-spin-slow"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50" cy="50" r="45"
          fill="none"
          stroke="rgba(245, 158, 11, 0.08)"
          strokeWidth="1"
        />
        <circle
          cx="50" cy="50" r="45"
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth="1.5"
          strokeDasharray="280"
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center monogram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-3xl font-display font-bold text-gradient-amber select-none"
          style={{ lineHeight: 1 }}
        >
          VP
        </span>
      </div>

      {/* Orbiting dot */}
      <div
        className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1"
        style={{
          animation: "orbit 3s linear infinite",
          transformOrigin: "0 0",
        }}
      >
        <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
      </div>
    </div>
  )
}

export default function ForgeLoader({ onComplete }: ForgeLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("Initializing")
  const [isExiting, setIsExiting] = useState(false)
  const hasCompletedRef = useRef(false)

  const statuses = [
    { threshold: 0, text: "Initializing forge" },
    { threshold: 15, text: "Loading 3D assets" },
    { threshold: 35, text: "Compiling shaders" },
    { threshold: 55, text: "Building environment" },
    { threshold: 75, text: "Preparing room" },
    { threshold: 90, text: "Almost ready" },
    { threshold: 100, text: "Welcome" },
  ]

  // Simulate progress (matches model preload timing)
  useEffect(() => {
    let frame: number
    let start: number | null = null
    const duration = 3200 // ~3.2s total loading

    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const rawProgress = Math.min((elapsed / duration) * 100, 100)

      // Ease-out curve for more natural feel
      const eased = 100 * (1 - Math.pow(1 - rawProgress / 100, 3))
      setProgress(Math.round(eased))

      if (rawProgress < 100) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  // Update status text based on progress
  useEffect(() => {
    const currentStatus = [...statuses].reverse().find((s) => progress >= s.threshold)
    if (currentStatus) setStatusText(currentStatus.text)
  }, [progress])

  // Trigger exit when complete
  const handleComplete = useCallback(() => {
    if (hasCompletedRef.current) return
    hasCompletedRef.current = true
    setIsExiting(true)
    setTimeout(onComplete, 800)
  }, [onComplete])

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(handleComplete, 600)
      return () => clearTimeout(timer)
    }
  }, [progress, handleComplete])

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-obsidian transition-opacity duration-700 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0">
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(245,158,11,0.15), transparent 70%)",
          }}
        />
        <AmbientParticles />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <ForgeLogo progress={progress} />

        {/* Status text */}
        <p className="font-mono text-sm text-stone-500 tracking-widest uppercase mb-6 h-5">
          {statusText}
          <span className="animate-pulse">...</span>
        </p>

        {/* Progress bar */}
        <div className="w-64 h-[2px] bg-stone-800 rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #f59e0b, #f43f5e, #6366f1)",
            }}
          />
        </div>

        {/* Progress number */}
        <span className="font-mono text-xs text-stone-600 tabular-nums">
          {progress}%
        </span>
      </div>
    </div>
  )
}
