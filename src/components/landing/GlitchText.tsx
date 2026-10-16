"use client"

import { useEffect, useState } from "react"

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className }: GlitchTextProps) {
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 100) // Glitch duration
      },
      Math.random() * 3000 + 1000,
    ) // Random interval between 1-4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <h1
      className={`
        relative text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter
        text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400
        ${className}
      `}
    >
      <span className={glitchActive ? "animate-glitch" : ""}>{text}</span>
      <span
        className={`absolute inset-0 text-cyan-400/20 ${glitchActive ? "animate-glitch" : ""}`}
        style={{ clipPath: "inset(0 0 70% 0)" }}
      >
        {text}
      </span>
      <span
        className={`absolute inset-0 text-purple-400/20 ${glitchActive ? "animate-glitch" : ""}`}
        style={{ clipPath: "inset(70% 0 0 0)" }}
      >
        {text}
      </span>
    </h1>
  )
}
