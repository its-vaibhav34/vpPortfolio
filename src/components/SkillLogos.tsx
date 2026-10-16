"use client"

interface SkillLogoProps {
  name: string
  logo: string
  color: string
}

const skillsData: SkillLogoProps[] = [
  { name: "React", logo: "⚛️", color: "from-blue-400 to-cyan-400" },
  { name: "TypeScript", logo: "📘", color: "from-blue-500 to-blue-600" },
  { name: "Three.js", logo: "🎮", color: "from-green-400 to-emerald-400" },
  { name: "Firebase", logo: "🔥", color: "from-orange-400 to-red-400" },
  { name: "Tailwind", logo: "🎨", color: "from-cyan-400 to-teal-400" },
  { name: "Node.js", logo: "🟢", color: "from-green-500 to-lime-500" },
  { name: "MongoDB", logo: "🍃", color: "from-green-600 to-green-700" },
  { name: "Next.js", logo: "▲", color: "from-gray-700 to-black" },
]

export default function SkillLogos() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {skillsData.map((skill, index) => (
        <div key={skill.name} className="group relative" style={{ animationDelay: `${index * 0.1}s` }}>
          {/* Glow effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl blur-xl scale-110"
            style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
          />

          {/* Main card */}
          <div
            className={`relative p-6 rounded-xl border border-white/20 backdrop-blur-md
                       bg-gradient-to-br from-white/10 to-white/5
                       hover:from-white/20 hover:to-white/10
                       transition-all duration-500 hover:scale-110 hover:-translate-y-2
                       cursor-pointer group-hover:shadow-2xl animate-slideInUp`}
          >
            {/* Skill logo */}
            <div className="text-4xl mb-3 text-center group-hover:scale-125 transition-transform duration-300">
              {skill.logo}
            </div>

            {/* Skill name */}
            <h3 className={`text-center font-bold text-transparent bg-clip-text bg-gradient-to-r ${skill.color}`}>
              {skill.name}
            </h3>

            {/* Animated border */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-cyan-400/50 transition-colors duration-300" />

            {/* Scanning effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan" />
          </div>
        </div>
      ))}
    </div>
  )
}
