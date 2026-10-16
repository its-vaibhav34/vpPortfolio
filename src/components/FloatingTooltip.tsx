"use client"

import { Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group, Euler } from "three"

interface FloatingTooltipProps {
  position: [number, number, number]
  text: string
  icon: string
  visible: boolean
  rotation?: [number, number, number]
  scale?: number
}

export default function FloatingTooltip({
  position,
  text,
  icon,
  visible,
  rotation = [0, 0, 0],
  scale = 1,
}: FloatingTooltipProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  if (!visible) return null

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={new Euler(...rotation)}
      scale={[scale, scale, scale]}
    >
      <Html transform center distanceFactor={5} style={{ pointerEvents: "none" }}>
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md scale-110 animate-pulse" />

          {/* Tooltip box */}
          <div
            className="relative px-3 py-1.5 rounded-full border border-cyan-400/40
                       bg-white/10 text-white shadow-md backdrop-blur-md
                       flex items-center gap-1"
            style={{
              fontSize: "10px",
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "visible",
              textOverflow: "unset",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span style={{ minWidth: "16px", textAlign: "center" }}>{icon}</span>
            <span>{text}</span>

            {/* 🔽 Tooltip arrow */}
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "0",
                height: "0",
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid rgba(6, 182, 212, 0.6)", // cyan color
                filter: "drop-shadow(0 0 4px rgba(6, 182, 212, 0.5))", // glow
              }}
            />
          </div>
        </div>
      </Html>
    </group>
  )
}
