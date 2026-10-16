"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Line } from "@react-three/drei"
import * as THREE from "three"

interface NeuralNetworkBackgroundProps {
  mousePosition: { x: number; y: number }
}

export default function NeuralNetworkBackground({ mousePosition }: NeuralNetworkBackgroundProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.Line[]>(null)

  // Generate random points for particles and neural connections
  const { positions, lineConnections } = useMemo(() => {
    const numPoints = 2000
    const radius = 50
    const positions = new Float32Array(numPoints * 3)
    const tempPoints: THREE.Vector3[] = []

    for (let i = 0; i < numPoints; i++) {
      const x = (Math.random() - 0.5) * radius * 2
      const y = (Math.random() - 0.5) * radius * 2
      const z = (Math.random() - 0.5) * radius * 2
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      tempPoints.push(new THREE.Vector3(x, y, z))
    }

    // Generate random connections for neural lines
    const lineConnections: [THREE.Vector3, THREE.Vector3][] = []
    const numConnections = 100
    for (let i = 0; i < numConnections; i++) {
      const idx1 = Math.floor(Math.random() * numPoints)
      let idx2 = Math.floor(Math.random() * numPoints)
      // Ensure different points
      while (idx1 === idx2) {
        idx2 = Math.floor(Math.random() * numPoints)
      }
      lineConnections.push([tempPoints[idx1], tempPoints[idx2]])
    }

    return { positions, lineConnections }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0001
      pointsRef.current.rotation.y += 0.0002
      // Parallax effect based on mouse position
      pointsRef.current.position.x = mousePosition.x * 0.05
      pointsRef.current.position.y = -mousePosition.y * 0.05
    }

    // Animate line opacity to simulate data flow
    if (linesRef.current) {
      linesRef.current.forEach((line, i) => {
        if (line.material instanceof THREE.LineBasicMaterial) {
          line.material.opacity = Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.5 + 0.5 // Pulsating opacity
        }
      })
    }
  })

  return (
    <>
      {/* Holographic Particles */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#06b6d4" // Cyan glow
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>

      {/* Neural Circuits / Data Streams */}
      <group ref={linesRef as any}>
        {lineConnections.map((connection, i) => (
          <Line
            key={i}
            points={connection}
            color="#3b82f6" // Blue glow
            lineWidth={0.5}
            transparent
            opacity={0.5}
            dashed={false}
          />
        ))}
      </group>
    </>
  )
}
