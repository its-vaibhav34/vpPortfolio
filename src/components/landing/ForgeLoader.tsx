"use client"

import { RoomAssemblyLoader } from "./RoomAssemblyLoader"

interface ForgeLoaderProps {
  onComplete: () => void
}

export default function ForgeLoader({ onComplete }: ForgeLoaderProps) {
  return <RoomAssemblyLoader onComplete={onComplete} autoLoop={false} />
}
