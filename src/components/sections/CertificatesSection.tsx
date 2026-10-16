"use client"

import { useState } from "react"
import { sections } from "../data"

interface Certificate {
  title: string
  issuer: string
  link: string
  date: string
  skills: string[]
  level: string
  credentialId: string
}

export default function CertificatesSection() {
  const [expandedCert, setExpandedCert] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("All")

  const certificates = sections.certificates as Certificate[]
  const levels = ["All", ...Array.from(new Set(certificates.map((c) => c.level)))]
  const filtered = filter === "All" ? certificates : certificates.filter((c) => c.level === filter)

  return (
    <div className="space-y-8">
      {/* Level filters */}
      <div className="flex flex-wrap gap-2">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-4 py-1.5 rounded-full text-xs font-display font-medium tracking-wide transition-all duration-200 ${
              filter === level
                ? "bg-violet-500/15 border border-violet-500/40 text-violet-400"
                : "bg-transparent border border-stone-700/50 text-stone-500 hover:border-stone-600 hover:text-stone-300"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Certificates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((cert, index) => (
          <div
            key={index}
            className="forge-card-violet p-6 rounded-xl cursor-pointer group"
            onClick={() => setExpandedCert(expandedCert === index ? null : index)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display text-lg font-bold text-stone-100 group-hover:text-violet-300 transition-colors mb-1">
                  {cert.title}
                </h3>
                <p className="text-violet-400 text-sm font-medium">{cert.issuer}</p>
              </div>
              <span className="forge-badge-violet text-[10px]">{cert.level}</span>
            </div>

            {/* Date & credential */}
            <div className="flex items-center gap-4 text-xs text-stone-500 mb-4">
              <span>{cert.date}</span>
              <span className="font-mono text-stone-600">{cert.credentialId}</span>
            </div>

            {/* Skills preview */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {cert.skills.slice(0, 3).map((skill) => (
                <span key={skill} className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-800/50 border border-stone-700/30 text-stone-400">
                  {skill}
                </span>
              ))}
              {cert.skills.length > 3 && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono text-stone-600">
                  +{cert.skills.length - 3}
                </span>
              )}
            </div>

            {/* View link */}
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              View Certificate
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>

            {/* Expanded skills */}
            {expandedCert === index && (
              <div className="mt-4 pt-4 border-t border-violet-500/10 animate-fade-up">
                <h4 className="text-xs font-display font-semibold text-violet-400 mb-2">All Skills Covered</h4>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="forge-badge-violet text-[10px]">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
