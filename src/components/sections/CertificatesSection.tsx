"use client"

import { useState, useEffect, useRef } from "react"
import { sections } from "../data"

interface Certificate {
  title: string
  issuer: string
  link: string
  date: string
  image?: string
  skills: string[]
  level: string
  credentialId: string
}

export default function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null)
  const [visibleCerts, setVisibleCerts] = useState<number[]>([])
  const [filter, setFilter] = useState<string>("All")
  const certRefs = useRef<(HTMLDivElement | null)[]>([])

  const certificates = sections.certificates as Certificate[]
  const levels = ["All", ...Array.from(new Set(certificates.map((cert) => cert.level)))]
  const filteredCerts = filter === "All" ? certificates : certificates.filter((cert) => cert.level === filter)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCerts((prev) => [...prev, index])
            }, index * 200)
          }
        })
      },
      { threshold: 0.3 },
    )

    certRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [filteredCerts])

  return (
    <div className="relative">
      {/* Optimized background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 animate-pulse" />
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Level filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              filter === level
                ? "border-yellow-400 bg-yellow-400/20 text-yellow-400"
                : "border-yellow-400/30 text-gray-400 hover:border-yellow-400/60"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Certificates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredCerts.map((cert, index) => (
          <div
            key={index}
           ref={(el) => {
  certRefs.current[index] = el
}}

            data-index={index}
            className={`group relative transition-all duration-700 ${
              visibleCerts.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            onClick={() => setSelectedCert(selectedCert === index ? null : index)}
          >
            <div
              className="relative p-8 rounded-2xl border-2 border-yellow-400/30 backdrop-blur-xl
                         bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-black/60
                         hover:from-yellow-900/40 hover:via-orange-900/40 hover:to-black/80
                         transition-all duration-500 hover:scale-105 cursor-pointer
                         hover:shadow-xl hover:shadow-yellow-500/25"
            >
              {/* Certificate ribbon */}
              <div
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 
                              rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50
                              group-hover:scale-110 transition-transform duration-300"
              >
                <span className="text-2xl animate-bounce">🏅</span>
              </div>

              {/* Verification badge */}
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 
                              border border-green-400/50"
              >
                <span className="text-green-400 text-xs font-bold">✓ VERIFIED</span>
              </div>

              {/* Certificate content */}
              <div className="mt-8 mb-6">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-4">
                  {cert.title}
                </h3>
                <p className="text-gray-300 text-lg mb-2">Issued by</p>
                <p className="text-cyan-400 font-semibold text-xl">{cert.issuer}</p>
                <p className="text-gray-400 text-sm mt-2">{cert.date}</p>
              </div>

              {/* Certificate details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Level:</span>
                  <span className="text-yellow-400 font-semibold">{cert.level}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Credential ID:</span>
                  <span className="text-cyan-400 font-mono text-xs">{cert.credentialId}</span>
                </div>
              </div>

              {/* Skills preview */}
              <div className="mt-4">
                <h4 className="text-yellow-400 font-semibold mb-2 text-sm">Skills Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs border border-yellow-400/30"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2 py-1 rounded bg-gray-500/20 text-gray-400 text-xs">
                      +{cert.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action button */}
              <div className="mt-6">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full group/btn relative overflow-hidden py-3 px-6 rounded-xl
                             bg-gradient-to-r from-yellow-500 to-orange-500
                             hover:from-yellow-400 hover:to-orange-400
                             text-white font-bold text-center transition-all duration-300
                             hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50
                             flex items-center justify-center gap-2"
                >
                  <span className="relative z-10">View Certificate</span>
                  <span className="text-xl">🔗</span>
                </a>
              </div>

              {/* Expanded details */}
              {selectedCert === index && (
                <div className="mt-6 pt-6 border-t border-yellow-400/30 animate-slideInUp">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-yellow-400 font-semibold mb-2">All Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm border border-yellow-400/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Hover effect */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/5 to-orange-500/5 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
