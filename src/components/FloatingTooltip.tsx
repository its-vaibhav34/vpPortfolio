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
        position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.04
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
          {/* Tooltip pill */}
          <div
            className="relative px-3 py-1.5 rounded-full flex items-center gap-1.5"
            style={{
              background: "rgba(10, 10, 15, 0.85)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
              backdropFilter: "blur(8px)",
              fontSize: "10px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.05em",
              color: "#f5f5f4",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4), 0 0 20px rgba(245,158,11,0.08)",
            }}
          >
            <span style={{ minWidth: "14px", textAlign: "center", fontSize: "11px" }}>
              {icon}
            </span>
            <span>{text}</span>

            {/* Arrow */}
            <div
              style={{
                position: "absolute",
                bottom: "-4px",
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: "8px",
                height: "8px",
                background: "rgba(10, 10, 15, 0.85)",
                borderRight: "1px solid rgba(245, 158, 11, 0.25)",
                borderBottom: "1px solid rgba(245, 158, 11, 0.25)",
              }}
            />
          </div>
        </div>
      </Html>
    </group>
  )
}
