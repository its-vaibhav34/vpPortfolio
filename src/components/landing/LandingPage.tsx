"use client"

import { PrismaHero } from "@/components/ui/prisma-hero"
import { personalInfo } from "../data"
import { Github, Linkedin, Mail } from "lucide-react"

interface LandingPageProps {
  onEnterPortfolio: () => void
}

export default function LandingPage({ onEnterPortfolio }: LandingPageProps) {
  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/its-vaibhav34",
      icon: <Github className="w-4 h-4" />,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/vaibhav-pandey-17v/",
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      label: "Email",
      href: "mailto:vaibhav13467@gmail.com",
      icon: <Mail className="w-4 h-4" />,
    },
  ]

  return (
    <PrismaHero
      title="VAIBHAV PANDEY"
      nameLines={["VAIBHAV", "PANDEY"]}
      bio={personalInfo.bio}
      ctaText="Enter Portfolio"
      onCtaClick={onEnterPortfolio}
      socials={socials}
    />
  )
}
