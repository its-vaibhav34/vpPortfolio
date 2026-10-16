"use client"

import { useState, useEffect } from "react"

interface TypewriterTextProps {
  prefix: string
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseTime?: number
}

export default function TypewriterText({
  prefix,
  phrases,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseTime = 1500,
}: TypewriterTextProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentTypedText, setCurrentTypedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
   let timer: ReturnType<typeof setTimeout>


    const handleTyping = () => {
      const fullText = phrases[currentPhraseIndex]
      if (isDeleting) {
        // Ensure we don't go below 0 length
        setCurrentTypedText(fullText.substring(0, Math.max(0, currentTypedText.length - 1)))
        if (currentTypedText.length === 0) {
          setIsDeleting(false)
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
          timer = setTimeout(handleTyping, typingSpeed) // Start typing next phrase
        } else {
          timer = setTimeout(handleTyping, deletingSpeed)
        }
      } else {
        setCurrentTypedText(fullText.substring(0, currentTypedText.length + 1))
        if (currentTypedText.length === fullText.length) {
          timer = setTimeout(() => setIsDeleting(true), pauseTime) // Pause before deleting
        } else {
          timer = setTimeout(handleTyping, typingSpeed)
        }
      }
    }

    // Initial call or when phrase index changes
    timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timer)
  }, [currentTypedText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime])

  return (
    <span className="font-mono text-lg md:text-xl text-gray-300">
      {prefix}
      <span className="text-cyan-400 text-shadow-soft-glow">{currentTypedText}</span>
      <span className="blink-cursor"></span>
    </span>
  )
}
