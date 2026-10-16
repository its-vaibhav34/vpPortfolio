"use client"

import { useEffect, useState } from "react"
import AnimatedLoader from "./AnimatedLoader"

interface NeuroverseLoaderProps {
  onComplete: () => void
  duration?: number // in seconds
}

export default function NeuroverseLoader({ onComplete, duration = 3 }: NeuroverseLoaderProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onComplete()
    }, duration * 1000)

    return () => clearTimeout(timer)
  }, [onComplete, duration])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[999] bg-black flex items-center justify-center transition-opacity duration-500 opacity-100">
      <div className="w-full h-full">
        <AnimatedLoader />
      </div>
    </div>
  )
}
