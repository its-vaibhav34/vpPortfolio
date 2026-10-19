"use client"

import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { personalInfo, sections } from "../data"
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  FileText,
  Copy,
  Check,
} from "lucide-react"

type Highlight = {
  title: string
  description: string
}

const highlights: Highlight[] = [
  {
    title: "EDUCATION & CGPA",
    description:
      "Bachelor of Engineering in Computer Science · Chitkara University Punjab (Aug 2024 – May 2028). Academic Standing: CGPA 8.72 / 10.0.",
  },
  {
    title: "CORE TECHNICAL STACK",
    description:
      "Java, C++, JavaScript, Python, SQL · React.js, Node.js, Express.js, MongoDB (MERN Stack) · Fundamentals: DSA, OOP, DBMS, OS, Computer Networks.",
  },
  {
    title: "HACKATHONS & RECOGNITION",
    description:
      "3× National Hackathon Winner (FormulaHacks 2025, Hacknexus 1.0, Bharat Techx 2.0). Top 4 Finalist out of 1000+ teams nationwide at NIT Jalandhar National Hackathon.",
  },
  {
    title: "FEATURED SYSTEMS & IOT",
    description:
      "Offbyt (AST-based backend generator npm package), Chanakya AI (Multilingual RAG legal assistant), MechVerse 3D simulator, and embedded IoT Arduino systems.",
  },
]

const socialLinks = [
  {
    label: "LinkedIn",
    handle: "Vaibhav Pandey",
    href: "https://linkedin.com/in/vaibhav-pandey-17v/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    handle: "@its-vaibhav34",
    href: "https://github.com/its-vaibhav34",
    icon: Github,
  },
  {
    label: "Email",
    handle: "vaibhav13467@gmail.com",
    href: "mailto:vaibhav13467@gmail.com",
    icon: Mail,
    action: "copy",
  },
  {
    label: "Phone",
    handle: "+91 6239887641",
    href: "tel:+916239887641",
    icon: Phone,
  },
]

const listVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
}

export default function AboutSection() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const contact = sections.contact

  const copyEmailToClipboard = () => {
    const email = contact?.email || "vaibhav13467@gmail.com"
    navigator.clipboard.writeText(email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto py-4">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0d12]/85 p-6 sm:p-8 md:p-12 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.7)]"
      >
        {/* Glass gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />

        <div className="relative grid gap-10 lg:grid-cols-2 items-start">
          {/* Left column - Main content */}
          <div className="space-y-7">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 rounded-full border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur"
            >
              Portfolio Insight
            </Badge>

            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-tight"
              >
                Full-Stack Developer ,AI-ML & IoT Engineer
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-xl text-sm sm:text-base leading-relaxed text-white/70 font-normal"
              >
                {personalInfo.bio}
              </motion.p>
            </div>

            {/* Highlights grid */}
            <div className="grid gap-3.5 sm:grid-cols-1">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 * index }}
                  whileHover={{ y: -3 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur transition-all hover:border-white/20 hover:bg-white/[0.05] hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />
                  <div className="relative space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40 group-hover:text-amber-400/90 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-sm leading-relaxed text-white/70 group-hover:text-white/90 transition-colors">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-2"
            >
              <Button
                size="lg"
                onClick={() => window.open(personalInfo.resume, "_blank")}
                className="h-12 w-full sm:w-auto gap-2 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.25em] bg-white text-stone-950 hover:bg-stone-200 transition-all hover:shadow-lg shadow-white/10"
              >
                <FileText className="h-4 w-4" />
                Download Resume
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          {/* Right column - Profile card */}
          <div className="relative">
            {/* Reddish / coral glow matching Casper reference */}
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-red-600/20 via-orange-500/10 to-transparent blur-3xl pointer-events-none" />

            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/45 p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex flex-col items-center text-center">
                {/* Avatar with glow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative mb-6"
                >
                  {/* Vibrant red/coral background circle halo */}
                  <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-red-600/50 via-rose-500/30 to-amber-500/20 blur-2xl" />

                  {/* Profile photo with perfect fit and framing */}
                  <div className="relative h-32 w-32 rounded-full p-[2px] bg-gradient-to-b from-white/30 via-white/10 to-transparent shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
                    <img
                      src="/profile.jpg"
                      alt={personalInfo.name}
                      className="relative h-full w-full rounded-full object-cover object-[center_15%]"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-1"
                >
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {personalInfo.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
                    Computer Science Undergrad · CGPA 8.72
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-4 max-w-sm text-sm leading-relaxed text-white/70"
                >
                  Building high-performance software, AST tools, and intelligent IoT systems that convert curiosity into impact.
                </motion.p>
              </div>

              {/* Social & Contact links */}
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="mt-8 flex flex-col gap-3"
              >
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  const isCopy = social.action === "copy"

                  if (isCopy) {
                    return (
                      <motion.button
                        key={social.label}
                        type="button"
                        variants={itemVariants}
                        onClick={copyEmailToClipboard}
                        className="group flex w-full items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-md cursor-pointer"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all group-hover:bg-white/10 group-hover:text-white">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white">
                              {social.label}
                            </p>
                            <p className="text-xs text-white/60 truncate">
                              {social.handle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-white/40 group-hover:text-white transition-colors flex-shrink-0 ml-2">
                          {copiedEmail ? (
                            <span className="text-emerald-400 flex items-center gap-1 text-xs font-mono font-medium">
                              <Check className="h-3.5 w-3.5" /> Copied
                            </span>
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </div>
                      </motion.button>
                    )
                  }

                  return (
                    <motion.a
                      key={social.label}
                      variants={itemVariants}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-md"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.985 }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all group-hover:bg-white/10 group-hover:text-white">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">
                            {social.label}
                          </p>
                          <p className="text-xs text-white/60 truncate">
                            {social.handle}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-white/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white flex-shrink-0 ml-2" />
                    </motion.a>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
