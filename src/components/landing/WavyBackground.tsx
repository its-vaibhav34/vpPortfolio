"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface WavyBackgroundProps {
  mousePosition: { x: number; y: number }
}

function WavyGridPlane({ mousePosition }: WavyBackgroundProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
      u_color1: { value: new THREE.Color("#1a0033") }, // Darker Purple
      u_color2: { value: new THREE.Color("#0a001a") }, // Even Darker Purple/Blue
    }),
    [],
  )

  const vertexShader = `
    uniform float u_time;
    uniform vec2 u_mouse;
    varying vec2 vUv;
    varying float vDistortion;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Create a wavy distortion based on time and position
      float distortion1 = sin(pos.x * 3.0 + u_time * 0.5) * 0.1;
      float distortion2 = cos(pos.y * 3.0 + u_time * 0.7) * 0.1;
      float distortion3 = sin(pos.x * 5.0 + pos.y * 5.0 + u_time * 0.6) * 0.05;

      // Add subtle mouse interaction
      float mouseInfluence = distance(vUv, u_mouse * 0.5 + 0.5) * 0.5;
      float mouseDistortion = sin(u_time * 2.0 + mouseInfluence * 10.0) * 0.03;

      pos.z += distortion1 + distortion2 + distortion3 + mouseDistortion;
      vDistortion = pos.z; // Pass distortion value to fragment shader

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = `
    uniform float u_time;
    uniform vec3 u_color1;
    uniform vec3 u_color2;
    varying vec2 vUv;
    varying float vDistortion;

    void main() {
      // Base color interpolation
      vec3 color = mix(u_color1, u_color2, vUv.y);

      // Add subtle glow based on distortion height
      float glow = smoothstep(-0.1, 0.1, vDistortion);
      color += glow * 0.1; // Reduce glow intensity

      // Add a subtle pulsating effect
      float pulse = sin(u_time * 2.0) * 0.05 + 0.95; // More subtle pulse
      color *= pulse;

      gl_FragColor = vec4(color, 1.0);
    }
  `

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime
      materialRef.current.uniforms.u_mouse.value.set(mousePosition.x, mousePosition.y)
    }
  })

  return (
    <mesh ref={meshRef} rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
      <planeGeometry args={[100, 100, 128, 128]} /> {/* Higher subdivisions for detailed grid */}
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe={true} // Render as wireframe to create the grid
        transparent={true}
        opacity={0.3}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export default function WavyBackground({ mousePosition }: WavyBackgroundProps) {
  return (
    <Canvas camera={{ position: [0, 10, 0], fov: 75 }}>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <WavyGridPlane mousePosition={mousePosition} />
    </Canvas>
  )
}
