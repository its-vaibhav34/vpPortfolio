"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { sections } from "../data"

/* ─── Certificate Interface ─── */
interface Certificate {
  id: string
  title: string
  issuer: string
  issueDate?: string
  expiryDate?: string
  category?: string
  skills?: string[]
  credentialUrl?: string
  credentialId?: string
  imageUrl?: string
}

/* ─── SVG Icons ─── */
function ArrowUpRight({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

function CredentialSealIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  )
}

function ShieldCheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}

/* ─── Credential Card Component ─── */
function CredentialCard({ cert, index }: { cert: Certificate; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: "linear-gradient(150deg, rgba(16, 18, 26, 0.45), rgba(10, 12, 18, 0.6))",
        border: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      {/* Top Subtle Rim Line */}
      <div
        className="h-[1px] w-full transition-opacity duration-300 group-hover:opacity-100 opacity-40"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.5), transparent)",
        }}
      />

      <div className="p-5 sm:p-6 space-y-4">
        {/* Category & Date Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            {cert.category && (
              <span className="font-mono text-[10.5px] uppercase tracking-widest text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded">
                {cert.category}
              </span>
            )}
            {cert.credentialId && (
              <span className="font-mono text-[10.5px] text-stone-500">
                ID: {cert.credentialId}
              </span>
            )}
          </div>

          {cert.issueDate && (
            <div className="font-mono text-xs text-stone-400">
              Issued {cert.issueDate}
            </div>
          )}
        </div>

        {/* Title & Issuer */}
        <div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-stone-100 tracking-tight leading-snug group-hover:text-white transition-colors">
            {cert.title}
          </h3>
          <p className="text-sm font-medium text-stone-300 mt-1">
            {cert.issuer}
          </p>
        </div>

        {/* Skills Tag Strip */}
        {cert.skills && cert.skills.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-[11px] font-mono text-stone-300"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Verified Link Action */}
        {cert.credentialUrl && (
          <div className="pt-2">
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-stone-200 hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              <ShieldCheckIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Credential</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        )}
      </div>
    </motion.article>
  )
}

/* ─── Deliberate Dark Editorial Empty State ─── */
function EmptyCredentialsState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden p-8 sm:p-12 text-center"
      style={{
        background: "linear-gradient(150deg, rgba(16, 18, 26, 0.5), rgba(10, 12, 18, 0.7))",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Ambient Focal Lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 35%, rgba(56, 189, 248, 0.08), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto space-y-4">
        {/* Understated Seal Icon */}
        <div className="w-14 h-14 mx-auto rounded-full bg-cyan-950/40 border border-cyan-500/25 flex items-center justify-center text-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
          <CredentialSealIcon className="w-7 h-7" />
        </div>

        {/* Title */}
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-100 tracking-tight">
            Credential Registry in Standby
          </h2>
          <p className="mt-2 text-sm sm:text-[15px] text-stone-300 leading-relaxed">
            Professional certifications and verified industry accreditations will be documented here as they are conferred.
          </p>
        </div>

        {/* Honest Architecture Explanatory Note */}
        <div className="pt-2">
          <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] text-xs font-mono text-stone-400 leading-relaxed text-left space-y-1.5">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-[11px] uppercase tracking-wider">
              <span>✦</span>
              <span>Content Architecture Notice</span>
            </div>
            <p>
              National hackathon victories and competition distinctions are cataloged under <strong className="text-stone-200">Achievements</strong>, while live software architectures are showcased in <strong className="text-stone-200">Projects</strong>.
            </p>
          </div>
        </div>

        {/* Registry Status Telemetry */}
        <div className="pt-3 flex items-center justify-center gap-2 font-mono text-[11px] text-stone-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
          <span>INDEX_STATUS: AWAITING_ISSUANCE // 0 ACTIVE RECORDS</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main CertificatesSection Component ─── */
export default function CertificatesSection() {
  const [filter, setFilter] = useState<string>("All")

  const certificates = (sections.certificates || []) as Certificate[]

  // Derive genuine categories only from actual records
  const categories = useMemo(() => {
    const unique = Array.from(new Set(certificates.map((c) => c.category).filter(Boolean) as string[]))
    return unique.length > 1 ? ["All", ...unique] : []
  }, [certificates])

  const filteredCertificates = useMemo(() => {
    if (filter === "All") return certificates
    return certificates.filter((c) => c.category === filter)
  }, [certificates, filter])

  const hasCertificates = certificates.length > 0

  return (
    <div className="space-y-8 select-text">
      {/* ── Section Header ── */}
      <header className="space-y-4 pb-6 border-b border-white/[0.06]">
        {/* Technical Eyebrow */}
        <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-widest text-cyan-400 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
          <span>ACCREDITATION_REGISTRY // VERIFIED CREDENTIALS</span>
        </div>

        {/* Heading & Summary */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-stone-100 tracking-tight">
              Certifications
            </h1>
            <p className="mt-2 text-sm sm:text-base text-stone-400 max-w-xl leading-relaxed">
              Verified technical accreditations, specialized coursework, and professional engineering credentials.
            </p>
          </div>

          {/* Record Count / Status Badge */}
          <div className="flex items-center gap-2 font-mono text-xs select-none">
            <div className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.07] text-stone-300">
              <span className="text-cyan-400 font-semibold mr-1.5">{certificates.length}</span>
              <span>{hasCertificates ? "Verified Credentials" : "Records Active"}</span>
            </div>
          </div>
        </div>

        {/* ── Dynamic Category Filter Strip (Only visible when >1 real category exists) ── */}
        {hasCertificates && categories.length > 0 && (
          <div className="pt-2">
            <nav aria-label="Filter credentials" className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = filter === cat
                const count = cat === "All" ? certificates.length : certificates.filter((c) => c.category === cat).length
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1.5 rounded-md font-mono text-xs tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                      isActive
                        ? "text-cyan-200 bg-cyan-950/40 border border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.1)] font-medium"
                        : "text-stone-400 bg-white/[0.02] border border-white/[0.06] hover:text-stone-200 hover:border-white/[0.1] hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="ml-1.5 opacity-50">({count})</span>
                  </button>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      {/* ── Content Viewport: Render Credentials or Deliberate Empty State ── */}
      <AnimatePresence mode="wait">
        {hasCertificates ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {filteredCertificates.map((cert, index) => (
              <CredentialCard key={cert.id || `${cert.title}-${index}`} cert={cert} index={index} />
            ))}
          </motion.div>
        ) : (
          <EmptyCredentialsState key="empty" />
        )}
      </AnimatePresence>

      {/* ── Clean Section Footer ── */}
      <footer className="pt-6 pb-2 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono text-stone-400">
        <span>CREDENTIAL_INDEX // SYSTEM VERIFIED</span>
        <span className="text-stone-400">Vaibhav Pandey Portfolio</span>
      </footer>
    </div>
  )
}
