"use client"

import { Html } from "@react-three/drei"
import { useState, useEffect } from "react"

interface HoverHintProps {
  position: [number, number, number]
  text: string
  visible: boolean
}

export default function HoverHint({ position, text, visible }: HoverHintProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (visible) {
      setMounted(true)
    } else {
      const timer = setTimeout(() => setMounted(false), 300)
      return () => clearTimeout(timer)
    }
  }, [visible])

  if (!mounted) return null

  return (
    <Html position={position} center distanceFactor={10} style={{ pointerEvents: "none" }}>
      <div
        className={`
          px-4 py-2 rounded-full backdrop-blur-md bg-white/20 text-white text-sm font-medium
          border border-white/30 shadow-lg transition-all duration-300 ease-out
          ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-2"}
        `}
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          {text}
        </div>
      </div>
    </Html>
  )
}
