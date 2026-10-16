// 🎯 PORTFOLIO DATA CONFIGURATION
// Update this file to customize all your portfolio content

export const personalInfo = {
  name: "Vaibhav", // Updated name
  title: "Full Stack Developer & 3D Artist",
  bio: "I craft intuitive user experiences and design elegant interfaces.", // Updated bio
  location: "Your City, Country",
  profileImage: "/placeholder.svg?height=400&width=400", // Add your profile image path here
  resume: "/resume.pdf", // Add your resume file path here
};

export const sections = {
  // 💼 PROJECTS SECTION
  projects: [
    {
      title: "NyayGPT",
      description: "Voice-first legal assistant for Bharat with AI-powered legal consultation and document analysis",
      link: "https://github.com/vaibhav/nyaygpt",
      liveDemo: "https://nyaygpt.vercel.app",
      technologies: ["React", "TypeScript", "OpenAI", "Firebase", "Tailwind CSS"],
      status: "Live",
      category: "AI/ML",
      featured: true,
      image: "/placeholder.svg?height=300&width=500",
      metrics: {
        users: "1000+",
        performance: "98%",
        uptime: "99.9%",
      },
    },
    {
      title: "Revoliq",
      description: "Smart retail cart system using Firebase + MongoDB with real-time inventory management",
      link: "https://github.com/vaibhav/revoliq",
      liveDemo: "https://revoliq.vercel.app",
      technologies: ["React", "Three.js", "Firebase", "MongoDB", "Node.js"],
      status: "Live",
      category: "E-commerce",
      featured: true,
      image: "/placeholder.svg?height=300&width=500",
      metrics: {
        users: "500+",
        performance: "95%",
        uptime: "99.5%",
      },
    },
    {
      title: "3D Portfolio",
      description: "Interactive 3D portfolio website with immersive user experience",
      link: "https://github.com/vaibhav/portfolio",
      liveDemo: "https://portfolio.vercel.app",
      technologies: ["React", "Three.js", "React Three Fiber", "Tailwind CSS"],
      status: "Live",
      category: "3D/WebGL",
      featured: false,
      image: "/placeholder.svg?height=300&width=500",
      metrics: {
        users: "200+",
        performance: "96%",
        uptime: "100%",
      },
    },
  ],

  // 🛠️ SKILLS SECTION
  skills: [
    {
      name: "React",
      icon: "⚛️", // Keep as fallback
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "from-blue-400 to-cyan-400",
      category: "Frontend",
    },
    {
      name: "TypeScript",
      icon: "📘",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "from-blue-500 to-blue-600",
      category: "Language",
    },
    {
      name: "Three.js",
      icon: "🎮",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
      color: "from-green-400 to-emerald-400",
      category: "3D",
    },
    {
      name: "Firebase",
      icon: "🔥",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      color: "from-orange-400 to-red-400",
      category: "Backend",
    },
    {
      name: "Tailwind CSS",
      icon: "🎨",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      color: "from-cyan-400 to-teal-400",
      category: "Styling",
    },
    {
      name: "Node.js",
      icon: "🟢",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "from-green-500 to-lime-500",
      category: "Backend",
    },
    {
      name: "MongoDB",
      icon: "🍃",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "from-green-600 to-green-700",
      category: "Database",
    },
    {
      name: "Next.js",
      icon: "▲",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: "from-gray-700 to-black",
      category: "Framework",
    },
    {
      name: "Python",
      icon: "🐍",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "from-yellow-400 to-yellow-600",
      category: "Language",
    },
    {
      name: "Docker",
      icon: "🐳",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      color: "from-blue-600 to-blue-800",
      category: "DevOps",
    },
    {
      name: "JavaScript",
      icon: "⚡",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "from-yellow-400 to-yellow-500",
      category: "Language",
    },
    {
      name: "Git",
      icon: "📝",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      color: "from-orange-500 to-red-500",
      category: "Tools",
    },
    {
      name: "VS Code",
      icon: "💻",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      color: "from-blue-500 to-blue-600",
      category: "Tools",
    },
    {
      name: "AWS",
      icon: "☁️",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      color: "from-orange-400 to-yellow-500",
      category: "Cloud",
    },
    {
      name: "PostgreSQL",
      icon: "🐘",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      color: "from-blue-600 to-blue-700",
      category: "Database",
    },
    {
      name: "Redis",
      icon: "🔴",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      color: "from-red-500 to-red-600",
      category: "Database",
    },
  ],

  // 📞 CONTACT SECTION
  contact: {
    email: "vaibhav13467@gmail.com",
    linkedin: "https://www.linkedin.com/in/vaibhav-pandey-02794932b/",
    github: "https://github.com/its-vaibhav34",
    twitter: "https://twitter.com/vaibhav",
    phone: "+91 6239887641",
    location: "Mohali, India",
    availability: "Available for freelance work",
  },

  // 🎓 CERTIFICATES SECTION
  certificates: [
    {
      title: "Full Stack Development",
      issuer: "Coursera",
      link: "https://coursera.org/certificate/123",
      date: "Dec 2023",
      image: "/placeholder.svg?height=200&width=300",
      skills: ["React", "Node.js", "MongoDB"],
      level: "Advanced",
      credentialId: "ABC123XYZ",
    },
    {
      title: "AI/ML Specialization",
      issuer: "Google",
      link: "https://google.com/certificate/456",
      date: "Jan 2024",
      image: "/placeholder.svg?height=200&width=300",
      skills: ["Python", "TensorFlow", "Machine Learning"],
      level: "Intermediate",
      credentialId: "DEF456UVW",
    },
    {
      title: "Hackathon Finalist",
      issuer: "HackIndia",
      link: "https://hackindia.com/certificate/789",
      date: "Mar 2024",
      image: "/placeholder.svg?height=200&width=300",
      skills: ["Innovation", "Problem Solving", "Team Leadership"],
      level: "Competition",
      credentialId: "GHI789RST",
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      link: "https://aws.amazon.com/certificate/101",
      date: "Feb 2024",
      image: "/placeholder.svg?height=200&width=300",
      skills: ["AWS", "Cloud Computing", "DevOps"],
      level: "Foundation",
      credentialId: "JKL101MNO",
    },
  ],

  // 💼 EXPERIENCE SECTION
  experience: [
    {
      role: "Frontend Intern",
      company: "Revoliq",
      duration: "May 2024 – Aug 2024",
      description:
        "Built a React + Three.js-based smart cart interface with Firebase and MongoDB. Led the frontend development team and implemented cutting-edge 3D visualizations.",
      logo: "🚀",
      color: "from-blue-400 to-cyan-400",
      achievements: [
        "Increased user engagement by 150%",
        "Reduced cart abandonment by 40%",
        "Implemented real-time 3D product visualization",
        "Mentored 3 junior developers",
      ],
      technologies: ["React", "Three.js", "Firebase", "MongoDB", "TypeScript"],
      type: "past" as const,
      companySize: "50-100 employees",
      location: "Remote",
      website: "https://revoliq.com",
    },
    {
      role: "Core Team Member",
      company: "Developer Student Club",
      duration: "Jan 2024 – Present",
      description:
        "Organized workshops and mentored juniors in web & IoT projects. Leading innovation initiatives and building the next generation of developers.",
      logo: "👥",
      color: "from-purple-400 to-pink-400",
      achievements: [
        "Organized 15+ technical workshops",
        "Mentored 50+ junior developers",
        "Led 5 successful hackathon teams",
        "Built community of 200+ active members",
      ],
      technologies: ["Leadership", "React", "Node.js", "IoT", "Arduino"],
      type: "current" as const,
      companySize: "200+ members",
      location: "Hybrid",
      website: "https://dsc.community.dev",
    },
    {
      role: "Freelance Developer",
      company: "Self-Employed",
      duration: "Sep 2023 – Present",
      description:
        "Providing web development services to small businesses and startups, specializing in modern React applications and 3D web experiences.",
      logo: "💻",
      color: "from-green-400 to-emerald-400",
      achievements: [
        "Completed 10+ client projects",
        "Maintained 100% client satisfaction rate",
        "Generated $15K+ in revenue",
        "Built long-term client relationships",
      ],
      technologies: ["React", "Next.js", "Three.js", "Tailwind CSS", "Firebase"],
      type: "current" as const,
      companySize: "Solo",
      location: "Remote",
      website: "https://yourportfolio.com",
    },
  ],

  // 🏆 ACHIEVEMENTS SECTION
  achievements: [
    {
      title: "Smart Cart IoT – Hackfest Winner",
      date: "Mar 2024",
      description:
        "Won 1st prize among 50+ teams in Smart Shopping cart category with innovative IoT solution that revolutionized retail experience.",
      impact: "Recognized by industry leaders",
      category: "Competition",
      organization: "TechFest 2024",
      prize: "₹50,000",
      teamSize: "4 members",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Best UI/UX Portfolio Award",
      date: "July 2024",
      description:
        "Recognized for innovative 3D portfolio interface using React Three Fiber, setting new standards for interactive web design.",
      impact: "Featured in design blogs",
      category: "Design",
      organization: "Design Awards 2024",
      prize: "Recognition + Trophy",
      teamSize: "Individual",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Open Source Contributor",
      date: "Ongoing",
      description:
        "Active contributor to popular open-source projects with 100+ contributions and 500+ GitHub stars across repositories.",
      impact: "Community recognition",
      category: "Open Source",
      organization: "GitHub Community",
      prize: "Community Badge",
      teamSize: "Individual",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Tech Speaker",
      date: "Nov 2024",
      description:
        "Delivered keynote speech on '3D Web Development' at regional tech conference, inspiring 200+ developers.",
      impact: "Industry speaking opportunity",
      category: "Speaking",
      organization: "DevCon 2024",
      prize: "Speaker Recognition",
      teamSize: "Individual",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],

  // 📊 STATISTICS
  stats: {
    totalProjects: "15+",
    experience: "2+ Years",
    technologies: "10+",
    clients: "8+",
    githubStars: "500+",
    contributions: "100+",
    workshops: "15+",
    mentees: "50+",
  },
};

// 🎨 THEME CONFIGURATION
export const theme = {
  colors: {
    primary: "cyan",
    secondary: "purple",
    accent: "blue",
    success: "green",
    warning: "yellow",
    error: "red",
  },
  animations: {
    duration: "300ms",
    easing: "ease-out",
  },
};

// 🔧 CONFIGURATION
export const config = {
  enableAnimations: true,
  enableParticles: true,
  enableSoundEffects: false,
  autoPlayAnimations: true,
  reducedMotion: false,
};