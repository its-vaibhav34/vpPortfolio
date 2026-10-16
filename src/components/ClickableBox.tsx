"use client"

import { useState, useEffect } from "react"
import FloatingTooltip from "./FloatingTooltip"

interface Props {
  position: [number, number, number]
  label: string
  onSelect: (target: string) => void
  size?: [number, number, number]
  isAnySectonOpen?: boolean
  tooltipOffset?: [number, number, number]
  tooltipRotation?: [number, number, number]
  tooltipScale?: number // ✅ Added scale prop
}

const tooltipData: Record<string, { text: string; icon: string }> = {
  skills: { text: "EXPLORE MY SKILLS", icon: "📚" },
  projects: { text: "SEE MY PROJECTS", icon: "💻" },
  contact: { text: "GET IN TOUCH", icon: "📱" },
  about: { text: "ABOUT ME", icon: "🤖" },
  certificates: { text: "CERTIFICATES", icon: "🖼️" },
  achievements: { text: "MY ACHIEVEMENTS", icon: "🏆" },
  experience: { text: "EXPERIENCE", icon: "💼" },
  
}

export default function ClickableBox({
  position,
  label,
  onSelect,
  size = [0.3, 0.3, 0.3],
  isAnySectonOpen = false,
  tooltipOffset = [0, size[1] + 0.4, 0],
  tooltipRotation = [0, 0, 0],
  tooltipScale = 1, // ✅ Default scale
}: Props) {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto"
    return () => {
      document.body.style.cursor = "auto"
    }
  }, [hovered])

  const tooltipPosition: [number, number, number] = [
    position[0] + tooltipOffset[0],
    position[1] + tooltipOffset[1],
    position[2] + tooltipOffset[2],
  ]

  const tooltipInfo = tooltipData[label] || {
    text: `VIEW ${label.toUpperCase()}`,
    icon: "✨",
  }

  return (
    <>
      <mesh
        position={position}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(label)
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={size} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Tooltip - only visible when no section is open */}
      <FloatingTooltip
        position={tooltipPosition}
        text={tooltipInfo.text}
        icon={tooltipInfo.icon}
        visible={!isAnySectonOpen}
        rotation={tooltipRotation}
        scale={tooltipScale} // ✅ Fixed
      />
    </>
  )
}
