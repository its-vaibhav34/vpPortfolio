"use client"

import { personalInfo } from "../data"
import ShineText from "./ShineText" // Import the new ShineText component

export default function HeroSection() {
  return (
    <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
      {/* Reverted "HI, I'M" to plain white, bold, no extra animations/shadows */}
      <h1 className="text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter leading-none mb-4 text-white">
        HI, I'M
      </h1>
      <ShineText
        text={personalInfo.name.toUpperCase()}
        className="mb-4"
        baseGradient="from-pink-500 via-purple-500 to-blue-500" // Ensure multicolor gradient is here
      />
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
        {personalInfo.bio}
      </p>
    </div>
  )
}
