"use client"

import { useState, useRef } from "react"
import LandingPage from "./components/landing/LandingPage"
import NeuroverseLoader from "./components/landing/NeuroverseLoader"
import ThreeDRoomExperience from "./components/ThreeDRoomExperience"

export default function App() {
  const [section, setSection] = useState("")
  const [hasEnteredNeuroverse, setHasEnteredNeuroverse] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleEnterNeuroverse = () => {
    setShowLoader(true)
  }

  const handleLoaderComplete = () => {
    setShowLoader(false)
    setHasEnteredNeuroverse(true)
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      {!hasEnteredNeuroverse ? (
        <LandingPage onEnterNeuroverse={handleEnterNeuroverse} />
      ) : (
        <ThreeDRoomExperience section={section} setSection={setSection} contentRef={contentRef} />
      )}

      {showLoader && <NeuroverseLoader onComplete={handleLoaderComplete} />}
    </div>
  )
}
