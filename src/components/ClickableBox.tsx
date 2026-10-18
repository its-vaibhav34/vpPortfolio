"use client"

import { useState, useEffect, useMemo } from "react"
import * as THREE from "three"
import FloatingTooltip, { type TooltipConfig } from "./FloatingTooltip"
import {
  FolderGit2,
  Cpu,
  Mail,
  Terminal,
  BadgeCheck,
  Trophy,
  Briefcase,
  Sparkles,
} from "lucide-react"

interface Props {
  position: [number, number, number]
  label: string
  onSelect: (target: string) => void
  size?: [number, number, number]
  isAnySectonOpen?: boolean
  tooltipOffset?: [number, number, number]
  tooltipRotation?: [number, number, number]
  tooltipScale?: number
}

const tooltipConfigs: Record<string, TooltipConfig> = {
  projects: {
    tag: "",
    title: "Featured Projects",
    action: "",
    color: "#00f0ff",
    Icon: FolderGit2,
  },
  skills: {
    tag: "",
    title: "Technical Skills",
    action: "",
    color: "#a855f7",
    Icon: Cpu,
  },
  experience: {
    tag: "",
    title: "Work Experience",
    action: "",
    color: "#6366f1",
    Icon: Briefcase,
  },
  certificates: {
    tag: "",
    title: "Certifications",
    action: "",
    color: "#f59e0b",
    Icon: BadgeCheck,
  },
  achievements: {
    tag: "",
    title: "Key Achievements",
    action: "",
    color: "#f43f5e",
    Icon: Trophy,
  },
  about: {
    tag: "",
    title: "About Vaibhav",
    action: "",
    color: "#38bdf8",
    Icon: Terminal,
  },
  contact: {
    tag: "",
    title: "Get In Touch",
    action: "",
    color: "#10b981",
    Icon: Mail,
  },
}

export default function ClickableBox({
  position,
  label,
  onSelect,
  size = [0.3, 0.3, 0.3],
  isAnySectonOpen = false,
  tooltipOffset = [0, size[1] + 0.4, 0],
  tooltipRotation = [0, 0, 0],
  tooltipScale = 1,
}: Props) {
  const [hovered, setHovered] = useState(false)

  // Memoize geometries for hover highlight
  const boxGeo = useMemo(
    () => new THREE.BoxGeometry(size[0], size[1], size[2]),
    [size[0], size[1], size[2]]
  )
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(boxGeo), [boxGeo])

  useEffect(() => {
    document.body.style.cursor = hovered && !isAnySectonOpen ? "pointer" : "auto"
    return () => {
      document.body.style.cursor = "auto"
    }
  }, [hovered, isAnySectonOpen])

  const tooltipPosition: [number, number, number] = [
    position[0] + tooltipOffset[0],
    position[1] + tooltipOffset[1],
    position[2] + tooltipOffset[2],
  ]

  const config = tooltipConfigs[label] || {
    tag: "",
    title: label.toUpperCase(),
    action: "",
    color: "#00f0ff",
    Icon: Sparkles,
  }

  return (
    <>
      {/* Interactive Hitbox Mesh */}
      <mesh
        position={position}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(label)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
        }}
      >
        <primitive object={boxGeo} attach="geometry" />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* 3D Holographic CAD Highlight Box on Hover */}
      {hovered && !isAnySectonOpen && (
        <group position={position}>
          {/* Translucent volume fill */}
          <mesh geometry={boxGeo}>
            <meshBasicMaterial
              color={config.color}
              transparent
              opacity={0.06}
              depthWrite={false}
            />
          </mesh>
          {/* Glowing wireframe edge brackets */}
          <lineSegments geometry={edgesGeo}>
            <lineBasicMaterial
              color={config.color}
              transparent
              opacity={0.8}
            />
          </lineSegments>
        </group>
      )}

      {/* Floating Redesigned Tooltip - ONLY visible on hover when no section is open */}
      <FloatingTooltip
        position={tooltipPosition}
        config={config}
        visible={hovered && !isAnySectonOpen}
        rotation={tooltipRotation}
        scale={tooltipScale}
      />
    </>
  )
}
