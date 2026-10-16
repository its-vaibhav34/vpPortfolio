"use client"

import { useState, useEffect, useCallback } from "react"
import { personalInfo } from "../data"

interface LandingPageProps {
  onEnterPortfolio: () => void
}

// Ambient particles for the background
function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-drift"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background:
              p.id % 4 === 0
                ? `rgba(245, 158, 11, ${p.opacity})`
                : p.id % 4 === 1
                ? `rgba(244, 63, 94, ${p.opacity * 0.7})`
                : p.id % 4 === 2
                ? `rgba(99, 102, 241, ${p.opacity * 0.6})`
                : `rgba(245, 245, 244, ${p.opacity * 0.3})`,
            animationDelay: `${p.delay}s`,
            "--drift-x": `${(Math.random() - 0.5) * 100}px`,
            "--drift-y": `${(Math.random() - 0.5) * 100 - 30}px`,
            "--drift-duration": `${p.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

// Typewriter component
function TypewriterText({ phrases }: { phrases: string[] }) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fullText = phrases[currentPhraseIndex]
    let timer: ReturnType<typeof setTimeout>

    if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false)
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        timer = setTimeout(() => {}, 200)
      } else {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length - 1))
        }, 35)
      }
    } else {
      if (currentText.length === fullText.length) {
        timer = setTimeout(() => setIsDeleting(true), 2000)
      } else {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length + 1))
        }, 65)
      }
    }

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentPhraseIndex, phrases])

  return (
    <span className="font-mono text-base md:text-lg text-stone-400">
      <span className="text-amber-400">{currentText}</span>
      <span className="blink-cursor" />
    </span>
  )
}

export default function LandingPage({ onEnterPortfolio }: LandingPageProps) {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Stagger the mount animation
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    })
  }, [])

  const roles = [
    "Full Stack Developer",
    "AI/ML Engineer",
    "IoT Developer",
    "DevOps Engineer",
  ]

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-obsidian flex flex-col items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-right warm glow */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #f59e0b, transparent 70%)",
            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        {/* Bottom-left rose glow */}
        <div
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #f43f5e, transparent 70%)",
            transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        {/* Center indigo glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #6366f1, transparent 60%)",
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <ParticleField />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Small greeting */}
        <div
          className={`transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="forge-badge-amber text-xs tracking-[0.2em] uppercase mb-8 inline-block">
            Welcome to my portfolio
          </span>
        </div>

        {/* Main heading */}
        <h1
          className={`transition-all duration-700 delay-150 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block font-display text-5xl md:text-7xl lg:text-8xl font-bold text-stone-200 tracking-tight leading-[0.95] mb-2">
            Hi, I'm
          </span>
          <span
            className="block font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.95] text-gradient-amber"
            style={{
              transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`,
              transition: "transform 0.4s ease-out",
            }}
          >
            {personalInfo.name}
          </span>
        </h1>

        {/* Bio line */}
        <p
          className={`text-lg md:text-xl text-stone-400 max-w-2xl mx-auto mt-6 mb-4 leading-relaxed font-light transition-all duration-700 delay-300 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {personalInfo.bio}
        </p>

        {/* Typewriter roles */}
        <div
          className={`h-8 mb-10 transition-all duration-700 delay-[450ms] ease-out ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <TypewriterText phrases={roles} />
        </div>

        {/* CTA Button */}
        <div
          className={`transition-all duration-700 delay-[600ms] ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            onClick={onEnterPortfolio}
            className="group forge-btn-primary px-10 py-4 text-base tracking-[0.15em] uppercase"
          >
            <span>Enter Portfolio</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Social links */}
        <div
          className={`flex items-center gap-6 mt-14 transition-all duration-700 delay-[750ms] ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {[
            {
              label: "GitHub",
              href: "https://github.com/its-vaibhav34",
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              ),
            },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/vaibhav-pandey-17v/",
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              ),
            },
            {
              label: "Email",
              href: "mailto:vaibhav13467@gmail.com",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              ),
            },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-stone-600 hover:text-amber-400 transition-colors duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll hint at bottom */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-[900ms] ease-out ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[10px] font-mono text-stone-600 tracking-[0.3em] uppercase">
          Click to explore
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-stone-600 to-transparent animate-pulse-glow" />
      </div>
    </div>
  )
}
