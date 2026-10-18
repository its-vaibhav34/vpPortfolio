"use client"

import { Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
import { Group, Euler } from "three"
import { ArrowUpRight, Sparkles } from "lucide-react"

export interface TooltipConfig {
  tag: string
  title: string
  action: string
  color: string
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
}

interface FloatingTooltipProps {
  position: [number, number, number]
  config?: TooltipConfig
  text?: string
  icon?: string
  visible: boolean
  rotation?: [number, number, number]
  scale?: number
}

const defaultConfig: TooltipConfig = {
  tag: "",
  title: "",
  action: "",
  color: "#00f0ff",
  Icon: Sparkles,
}

export default function FloatingTooltip({
  position,
  config: incomingConfig,
  text,
  visible,
  rotation = [0, 0, 0],
  scale = 1,
}: FloatingTooltipProps) {
  const groupRef = useRef<Group>(null)
  const [mounted, setMounted] = useState(false)

  // Floating bobbing effect
  useFrame((state) => {
    if (groupRef.current && visible) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2.2) * 0.035
    }
  })

  // Smooth unmount transition
  useEffect(() => {
    if (visible) {
      setMounted(true)
    } else {
      const timer = setTimeout(() => setMounted(false), 260)
      return () => clearTimeout(timer)
    }
  }, [visible])

  if (!mounted) return null

  const config = incomingConfig || (text ? {
    tag: "",
    title: text,
    action: "",
    color: "#00f0ff",
    Icon: Sparkles,
  } : defaultConfig)

  const color = config.color || "#00f0ff"
  const Icon = config.Icon || Sparkles
  const tag = config.tag || ""
  const title = config.title || "Explore"
  const action = config.action || ""

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={new Euler(...rotation)}
      scale={[scale, scale, scale]}
    >
      <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <div
          className={`
            relative flex flex-col items-center select-none cursor-pointer
            transition-all duration-250 ease-out transform
            ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-2"}
          `}
        >
          {/* Main Card */}
          <div
            className="relative px-3.5 py-2.5 rounded-xl flex flex-col gap-1.5"
            style={{
              background: "linear-gradient(145deg, rgba(13, 16, 27, 0.95), rgba(7, 9, 16, 0.98))",
              border: `1px solid ${color}45`,
              boxShadow: `0 12px 36px rgba(0,0,0,0.85), 0 0 24px ${color}20, inset 0 1px 0 rgba(255,255,255,0.12)`,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              minWidth: "165px",
            }}
          >
            {/* Top row: Pulse Beacon + Tag + Arrow */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-ping"
                  style={{ background: color }}
                />
                <span
                  className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: `${color}dd` }}
                >
                  {tag}
                </span>
              </div>
              <ArrowUpRight
                className="w-3.5 h-3.5"
                style={{ color: `${color}bb` }}
              />
            </div>

            {/* Content row: Icon + Title + Action */}
            <div className="flex items-center gap-2.5 pt-0.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}40`,
                  boxShadow: `0 0 12px ${color}25`,
                }}
              >
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-display font-bold text-xs tracking-wide text-stone-100 whitespace-nowrap"
                  style={{ letterSpacing: "0.02em" }}
                >
                  {title}
                </span>
                <span className="font-mono text-[9px] text-stone-400 tracking-wider">
                  {action}
                </span>
              </div>
            </div>

            {/* Top Corner Cyber Accent Line */}
            <div
              style={{
                position: "absolute",
                top: -1,
                left: 14,
                width: 22,
                height: 2,
                background: color,
                boxShadow: `0 0 8px ${color}`,
              }}
            />

            {/* Bottom Arrow Pointer */}
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: "9px",
                height: "9px",
                background: "rgba(7, 9, 16, 0.98)",
                borderRight: `1px solid ${color}45`,
                borderBottom: `1px solid ${color}45`,
              }}
            />
          </div>
        </div>
      </Html>
    </group>
  )
}
