"use client"

import { useState, useEffect, type ReactNode } from "react"
import LoadingShimmer from "./LoadingShimmer"
import ProjectsSection from "./sections/ProjectsSection"
import SkillsSection from "./sections/SkillsSection"
import AboutSection from "./sections/AboutSection"
import ContactSection from "./sections/ContactSection"
import CertificatesSection from "./sections/CertificatesSection"
import AchievementsSection from "./sections/AchievementsSection"
import TimelineExperience from "./TimelineExperience"

interface Props {
  section: string
  onClose: () => void
}

// Section metadata for consistent theming
const sectionMeta: Record<string, { title: string; accent: string; icon: ReactNode }> = {
  projects: {
    title: "Projects",
    accent: "text-indigo-400",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  skills: {
    title: "Skills",
    accent: "text-amber-400",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  about: {
    title: "About",
    accent: "text-rose-400",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  contact: {
    title: "Contact",
    accent: "text-emerald-400",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  certificates: {
    title: "Certificates",
    accent: "text-violet-400",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
  },
  achievements: {
    title: "Achievements",
    accent: "text-amber-400",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228M18.75 4.236V2.721" />
      </svg>
    ),
  },
  experience: {
    title: "Experience",
    accent: "text-cyan-400",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
}

export default function Overlay({ section, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (section) {
      setIsLoading(true)
      setIsVisible(false)

      const loadTimer = setTimeout(() => {
        setIsLoading(false)
        setTimeout(() => setIsVisible(true), 50)
      }, 500)

      return () => clearTimeout(loadTimer)
    }
  }, [section])

  if (!section) return null

  const meta = sectionMeta[section] || {
    title: section,
    accent: "text-amber-400",
    icon: <span className="text-xl">✦</span>,
  }

  const renderSection = () => {
    switch (section) {
      case "projects":
        return <ProjectsSection />
      case "skills":
        return <SkillsSection />
      case "about":
        return <AboutSection />
      case "contact":
        return <ContactSection />
      case "certificates":
        return <CertificatesSection />
      case "achievements":
        return <AchievementsSection />
      case "experience":
        return <TimelineExperience />
      default:
        return <div className="text-stone-400">Section not found</div>
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end pointer-events-none">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 pointer-events-auto transition-all duration-500 ${
          isVisible ? "bg-black/60 backdrop-blur-sm" : "bg-transparent"
        }`}
        onClick={onClose}
      />

      {/* Panel — slides in from right */}
      <div
        className={`pointer-events-auto relative w-full max-w-5xl h-full overflow-y-auto overlay-scroll
          transition-all duration-500 ease-out
          ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}
        `}
        style={{
          background: "linear-gradient(180deg, rgba(10,10,15,0.97), rgba(18,18,26,0.98))",
          borderLeft: "1px solid rgba(245, 158, 11, 0.1)",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 px-8 py-6 flex items-center justify-between"
          style={{
            background: "linear-gradient(180deg, rgba(10,10,15,0.98) 60%, transparent)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className={meta.accent}>{meta.icon}</span>
            <h2 className="font-display text-2xl font-bold text-stone-100 tracking-tight">
              {meta.title}
            </h2>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center
                       text-stone-500 hover:text-stone-200 hover:bg-stone-800/50
                       transition-all duration-200"
            aria-label="Close panel"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pb-12">
          {isLoading ? (
            <LoadingShimmer />
          ) : (
            <div className={`transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
              {renderSection()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
