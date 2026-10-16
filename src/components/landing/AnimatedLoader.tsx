"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Rotating Core - shader mesh
function RotatingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_color1: { value: new THREE.Color("#06b6d4") }, // Cyan
      u_color2: { value: new THREE.Color("#3b82f6") }, // Blue
      u_color3: { value: new THREE.Color("#9333ea") }, // Purple
    }),
    []
  );

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float u_time;
    uniform vec3 u_color1;
    uniform vec3 u_color2;
    uniform vec3 u_color3;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vec3 normal = vNormal;
      float intensity = dot(normal, vec3(0.0, 0.0, 1.0)) + 0.5;
      intensity = pow(intensity, 2.0);

      float noise = fract(sin(dot(vUv.xy, vec2(12.9898, 78.233))) * 43758.5453);
      noise = mix(noise, 0.5, 0.2);

      float glow = sin(u_time * 5.0 + vUv.x * 10.0) * 0.5 + 0.5;
      glow *= sin(u_time * 3.0 + vUv.y * 10.0) * 0.5 + 0.5;
      glow = pow(glow, 3.0);

      vec3 finalColor = mix(u_color1, u_color2, vUv.x);
      finalColor = mix(finalColor, u_color3, vUv.y);
      finalColor *= (intensity + noise * 0.2 + glow * 0.5);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Particle Field - animated points
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const numPoints = 1000;
    const radius = 5;
    const arr = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
      const r = radius * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      arr[i * 3] = r * Math.cos(theta);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2; // Spread vertically
      arr[i * 3 + 2] = r * Math.sin(theta);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Points positions={positions} stride={3} frustumCulled={false} ref={pointsRef}>
      <PointMaterial
        transparent
        color="#06b6d4"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

// Loader component combining everything
export default function AnimatedLoader() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
      <Environment preset="warehouse" />
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <RotatingCore />
      <ParticleField />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}