"use client"

import { useEffect, useRef } from "react"

interface ShineTextProps {
  text: string
  className?: string
  baseGradient?: string // e.g., "from-pink-500 via-purple-500 to-blue-500"
}

export default function ShineText({ text, className, baseGradient }: ShineTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (textRef.current && baseGradient) {
      // Apply the base gradient directly as a class
      textRef.current.className = `${textRef.current.className} bg-gradient-to-r ${baseGradient} bg-clip-text text-transparent relative overflow-hidden`
    }
  }, [text, baseGradient])

  return (
    <h1
      ref={textRef}
      className={`inline-block text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter ${className} shine-text`}
    >
      {text}
    </h1>
  )
}
