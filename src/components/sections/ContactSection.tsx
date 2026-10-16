"use client"

import type React from "react"
import { useState } from "react"
import { sections } from "../data"

interface ContactData {
  email: string
  linkedin: string
  github: string
  twitter?: string
  phone?: string
  location?: string
  availability?: string
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPhone, setShowPhone] = useState(false)

  const contact = sections.contact as ContactData

  const contactLinks = [
    {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      description: "Drop me a line",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "Connect with me",
      href: contact.linkedin,
      description: "Let's network",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "View my repos",
      href: contact.github,
      description: "Open source work",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  ]

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmissionStatus(null)
    setStatusMessage(null)

    const form = event.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      })

      if (response.ok) {
        setSubmissionStatus("success")
        setStatusMessage("Message sent! I'll get back to you soon.")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmissionStatus("error")
        setStatusMessage("Failed to send. Please try again.")
      }
    } catch {
      setSubmissionStatus("error")
      setStatusMessage("Network error. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Contact methods */}
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="font-display text-xl font-bold text-stone-100 mb-2">Let's Connect</h3>
            <p className="text-stone-400 text-sm">Ready to bring your ideas to life? Let's talk.</p>
            {contact.availability && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs font-mono">{contact.availability}</span>
              </div>
            )}
          </div>

          {contactLinks.map((method, index) => (
            <a
              key={index}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="forge-card-emerald p-5 rounded-xl flex items-center gap-4 group block"
            >
              <div className="text-emerald-400 group-hover:scale-110 transition-transform duration-200">
                {method.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display text-sm font-semibold text-stone-200">{method.label}</h4>
                <p className="text-stone-500 text-xs">{method.description}</p>
              </div>
              <svg className="w-4 h-4 text-stone-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          ))}

          {/* Phone button */}
          {contact.phone && (
            <button
              onClick={() => setShowPhone(!showPhone)}
              className="forge-card-emerald p-5 rounded-xl flex items-center gap-4 group w-full text-left"
            >
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <div className="flex-1">
                <h4 className="font-display text-sm font-semibold text-stone-200">Phone</h4>
                {showPhone ? (
                  <p className="text-emerald-400 font-mono text-sm">{contact.phone}</p>
                ) : (
                  <p className="text-stone-500 text-xs">Click to reveal</p>
                )}
              </div>
            </button>
          )}

          {/* Location */}
          {contact.location && (
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-stone-800/30 border border-stone-700/30">
              <svg className="w-4 h-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="text-stone-400 text-sm">{contact.location}</span>
            </div>
          )}
        </div>

        {/* Right: Contact form */}
        <div className="forge-card p-6 rounded-xl">
          <h3 className="font-display text-lg font-bold text-stone-100 mb-6">Send a Message</h3>

          <form
            className="space-y-4"
            action="https://formsubmit.co/ajax/vaibhav13467@gmail.com"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New Portfolio Contact!" />

            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-stone-800/50 border border-stone-700/50 text-stone-200 placeholder-stone-600
                         focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/25 transition-all duration-200 text-sm"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-stone-800/50 border border-stone-700/50 text-stone-200 placeholder-stone-600
                         focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/25 transition-all duration-200 text-sm"
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-stone-800/50 border border-stone-700/50 text-stone-200 placeholder-stone-600
                         focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/25 transition-all duration-200 resize-none text-sm"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full forge-btn-primary py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submissionStatus && statusMessage && (
              <div
                className={`p-3 rounded-lg text-center text-sm font-medium ${
                  submissionStatus === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    : "bg-red-500/10 border border-red-500/20 text-red-400"
                }`}
              >
                {statusMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
