"use client"

import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"
import type { Group } from "three"
import ClickableBox from "./ClickableBox"


interface Props {
  onSelect: (target: string) => void
  isAnySectonOpen?: boolean
}

export default function Room({ onSelect, isAnySectonOpen = false }: Props) {
  const { scene } = useGLTF("/3droom2.glb") as { scene: Group }

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <group>
      {/* 🏠 3D Room Model */}
      <primitive object={scene} scale={1.5} position={[0, -1, 0]} />

      {/* 🖥️ Terminal screen fixed like tooltip */}
      

      {/* 🔵 Tooltip Zones */}
      <ClickableBox
        position={[-2.1, 1.5, -1.3]}
        label="certificates"
        onSelect={onSelect}
        size={[0.7, 0.8, 0.05]}
        isAnySectonOpen={isAnySectonOpen}
        tooltipScale={0.7}
        tooltipOffset={[0, 0.6, 0]}
      />
      <ClickableBox
        position={[-0.0, 1.39, -1.1]}
        label="about"
        onSelect={onSelect}
        isAnySectonOpen={isAnySectonOpen}
        tooltipScale={0.8}
        tooltipOffset={[0, 0.4, 0]}
      />
      <ClickableBox
        position={[1.1, 1.6, -1.3]}
        label="contact"
        onSelect={onSelect}
        size={[0.6, 0.6, 0.05]}
        isAnySectonOpen={isAnySectonOpen}
        tooltipScale={0.8}
        tooltipOffset={[0.1, 0.4, 0]}
      />
      <ClickableBox
        position={[2, 0.4, 2.4]}
        label="projects"
        onSelect={onSelect}
        size={[0.6, 0.7, 0.6]}
        isAnySectonOpen={isAnySectonOpen}
        tooltipOffset={[0, 0.5, 0]}
        tooltipRotation={[0, -Math.PI / 2, 0]}
        tooltipScale={0.7}
      />
      <ClickableBox
        position={[-2.6, 0.5, -1.0]}
        label="skills"
        onSelect={onSelect}
        size={[1.7, 0.8, 0.05]}
        isAnySectonOpen={isAnySectonOpen}
        tooltipScale={0.8}
        tooltipOffset={[0, 0.4, 0]}
      />
      <ClickableBox
        position={[2.3, 1.5, 1.4]}
        label="achievements"
        onSelect={onSelect}
        size={[0.5, 1.1, 1.05]}
        isAnySectonOpen={isAnySectonOpen}
        tooltipOffset={[0, 0.8, 0]}
        tooltipRotation={[0, -Math.PI / 2, 0]}
        tooltipScale={0.7}
      />
      <ClickableBox
        position={[-0.6, -0.3, -0.7]}
        label="experience"
        onSelect={onSelect}
        size={[1, 0.6, 1.0]}
        isAnySectonOpen={isAnySectonOpen}
        tooltipScale={0.8}
        tooltipOffset={[0, 0.6, 0]}
      />
      
    </group>
  )
}
