// 🎯 PORTFOLIO DATA CONFIGURATION
// Update this file to customize all your portfolio content

export const personalInfo = {
  name: "Vaibhav Pandey",
  title: "Computer Science Undergraduate | Full-Stack & IoT Developer",
  bio: "Computer Science undergraduate with hands-on experience in Java, full-stack web development, and IoT, focused on building practical solutions through real-world projects, hackathons, and continuous problem-solving.",
  location: "Chitkara University Punjab, India",
  profileImage: "/profile.jpg",
  resume: "/resume.pdf",
};

export const sections = {
  // 💼 PROJECTS SECTION
  projects: [
    {
      title: "MechVerse",
      subtitle: "Interactive 3D Vehicle Sandbox & Multiplayer Simulation",
      description:
        "MechVerse is a browser-based 3D automotive sandbox featuring vehicle customization, interactive test-driving, and real-time multiplayer racing. It combines React Three Fiber and Three.js with Rapier physics, Zustand, Socket.IO, and a Node.js backend. Vehicle modifications affect driving behavior, making the relationship between visual customization and physical simulation a key engineering challenge.",
      link: "https://github.com/its-vaibhav34/mechverses",
      repositoryUrl: "https://github.com/its-vaibhav34/mechverses",
      demoUrl: "https://mechverses.vercel.app/",
      technologies: ["React", "Three.js", "React Three Fiber", "Rapier", "Zustand", "Socket.IO", "Node.js"],
      status: "Production Demo",
      category: "3D Simulation",
      featured: true,
    },
    {
      title: "Offbyt",
      subtitle: "Deterministic AST-Driven Backend Generator",
      description:
        "Offbyt is a CLI developer tool designed to reduce repetitive frontend-to-backend integration work. It analyzes frontend source code using AST parsing, converts extracted information into an intermediate representation, and uses a rule engine and code generator to produce structured backend components. Its design emphasizes deterministic output and more predictable integration workflows instead of relying on heuristic regex matching or generic AI-generated code.",
      link: "https://github.com/its-vaibhav34/offbyte",
      repositoryUrl: "https://github.com/its-vaibhav34/offbyte",
      packageUrl: "https://www.npmjs.com/package/offbyt",
      technologies: ["Node.js", "TypeScript", "Babel AST", "Commander.js", "Inquirer.js", "Express.js"],
      status: "Published CLI",
      category: "Developer Tooling",
      featured: true,
    },
    {
      title: "ChanakyaAI",
      subtitle: "Voice-First Multilingual Legal Information Assistant",
      description:
        "ChanakyaAI aims to make basic legal information more accessible through multilingual voice and text interactions. Its retrieval-augmented generation pipeline uses LangChain and FAISS to retrieve relevant legal-document context before generating simplified explanations with a Llama model. Firebase provides authentication.",
      link: "https://github.com/its-vaibhav34/Nyay-GPT",
      repositoryUrl: "https://github.com/its-vaibhav34/Nyay-GPT",
      technologies: ["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "Llama 3", "LangChain", "FAISS", "Firebase"],
      status: "Research Prototype",
      category: "AI / Legal Tech",
      featured: true,
    },
    {
      title: "FahRide",
      subtitle: "Student Carpooling Platform",
      description:
        "FahRide is a student-focused carpooling platform for Chitkara University. It uses university email verification to establish a student-oriented experience and allows drivers to publish rides with routes, departure times, available seats, and contribution costs. Its Fah Coins reward system includes controlled earning and referral rules, with administrative handling for payout requests.",
      link: "https://github.com/its-vaibhav34/chitride",
      repositoryUrl: "https://github.com/its-vaibhav34/chitride",
      demoUrl: "https://fahride.app/",
      technologies: ["React", "Node.js", "Express.js", "MongoDB"],
      status: "Campus Deployment",
      category: "Campus Mobility",
      featured: true,
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
    linkedin: "https://linkedin.com/in/vaibhav-pandey-17v/",
    github: "https://github.com/its-vaibhav34",
    phone: "+91 6239887641",
    location: "Punjab, India",
    availability: "Open to opportunities",
  },

  // 🎓 CERTIFICATES & RECOGNITIONS
  certificates: [
    {
      title: "FormulaHacks 2025 Winner",
      issuer: "FormulaHacks",
      link: "https://github.com/its-vaibhav34",
      date: "2025",
      skills: ["Automotive Simulation", "Interactive 3D", "Physics"],
      level: "1st Place",
      credentialId: "FH2025-WINNER",
    },
    {
      title: "Hacknexus 1.0 Winner",
      issuer: "Hacknexus",
      link: "https://github.com/its-vaibhav34",
      date: "2025",
      skills: ["RAG Pipelines", "Gemini API", "Pinecone", "LangChain"],
      level: "1st Place",
      credentialId: "HN1.0-WINNER",
    },
    {
      title: "Bharat Techx 2.0 Winner",
      issuer: "Bharat Techx",
      link: "https://github.com/its-vaibhav34",
      date: "2025",
      skills: ["Full Stack", "Education Tech", "React.js", "Node.js"],
      level: "1st Place",
      credentialId: "BT2.0-WINNER",
    },
    {
      title: "NIT Jalandhar National Hackathon",
      issuer: "NIT Jalandhar",
      link: "https://github.com/its-vaibhav34",
      date: "2025",
      skills: ["Top 4 Nationwide", "Problem Solving", "System Architecture"],
      level: "Top 4 / 1000+",
      credentialId: "NITJ-TOP4",
    },
  ],

  // 💼 EXPERIENCE & EDUCATION SECTION
  experience: [
    {
      role: "IoT Development",
      company: "Live Learning Project",
      duration: "Jul 2025 – Apr 2026",
      description:
        "Developed Arduino and IoT-based projects for academic learning and technical competitions, working on hardware integration, circuit design, and embedded programming for real-world implementations.",
      logo: "⚡",
      color: "from-amber-400 to-orange-400",
      achievements: [
        "Developed Arduino and IoT-based projects for academic learning and technical competitions.",
        "Worked on hardware integration, circuit design, and embedded programming for real-world implementations.",
        "Completed end-to-end project development, including requirement analysis, testing, and deployment.",
      ],
      technologies: ["Arduino", "IoT Development", "Circuit Design", "Embedded Programming", "Hardware Integration"],
      type: "current" as const,
      companySize: "Live Project",
      location: "Punjab, India",
    },
    {
      role: "Promotions Team Member",
      company: "Open Source Chandigarh",
      duration: "Oct 2025 – Oct 2026",
      description:
        "Contributing to the promotions and outreach team at Open Source Chandigarh, a community driving open-source culture across the region. Responsible for creating content, coordinating event promotion, and expanding community reach across platforms.",
      logo: "🌐",
      color: "from-violet-400 to-purple-400",
      achievements: [
        "Promoted open-source events and workshops to a growing developer community across Chandigarh and Punjab.",
        "Assisted in managing social media presence and digital outreach campaigns for community events.",
        "Collaborated with organizers to onboard contributors and increase event participation.",
      ],
      technologies: ["Community Building", "Content Creation", "Social Media", "Open Source", "Event Coordination"],
      type: "current" as const,
      companySize: "Community Org",
      location: "Chandigarh, India",
    },
    {
      role: "Class Representative",
      company: "Chitkara University Punjab",
      duration: "Aug 2024 – Jul 2026",
      description:
        "Elected as Class Representative for the Computer Science batch, serving as the primary liaison between students and faculty. Responsible for communicating academic updates, coordinating class activities, and representing student concerns at the departmental level.",
      logo: "🎓",
      color: "from-cyan-400 to-blue-400",
      achievements: [
        "Acted as the official point of contact between the CS batch and the academic department.",
        "Coordinated scheduling, announcements, and logistical support for academic activities.",
        "Facilitated resolution of student queries and concerns with faculty and administration.",
        "Maintained consistent communication to ensure smooth academic operations across the batch.",
      ],
      technologies: ["Leadership", "Communication", "Coordination", "Academic Management"],
      type: "current" as const,
      companySize: "Chitkara University",
      location: "Punjab, India",
    },
    {
      role: "B.E. in Computer Science (CGPA: 8.72/10)",
      company: "Chitkara University Punjab",
      duration: "Aug 2024 – May 2028",
      description:
        "Pursuing Bachelor of Engineering in Computer Science. Focused on core computer science fundamentals, full-stack software development, and technical competitions.",
      logo: "🎓",
      color: "from-blue-400 to-indigo-400",
      achievements: [
        "Academic Standing: CGPA 8.72 / 10.0",
        "Core Concepts: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), DBMS, Operating Systems, Computer Networks.",
        "Winner in 3 national hackathons (FormulaHacks 2025, Hacknexus 1.0, Bharat Techx 2.0).",
        "Top 4 finalist out of 1000+ teams nationwide at NIT Jalandhar National Hackathon.",
      ],
      technologies: ["Java", "C++", "DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
      type: "current" as const,
      companySize: "Chitkara University",
      location: "Punjab, India",
    },
  ],

  // 🏆 ACHIEVEMENTS SECTION
  achievements: [
    {
      title: "FormulaHacks 2025 – Winner",
      date: "2025",
      description:
        "Built a customizable car engine interactive simulation.",
      impact: "Hackathon Win (1st Place)",
      category: "Hackathon Winner",
      organization: "FormulaHacks",
      prize: "Winner (3× Champion)",
      teamSize: "Competitive Team",
    },
    {
      title: "Hacknexus 1.0 – Winner",
      date: "2025",
      description:
        "Built an AI-powered multilingual legal assistant using RAG pipelines.",
      impact: "Hackathon Win (1st Place)",
      category: "Hackathon Winner",
      organization: "Hacknexus",
      prize: "Winner (3× Champion)",
      teamSize: "Competitive Team",
    },
    {
      title: "Bharat Techx 2.0 – Winner",
      date: "2025",
      description:
        "Built an interactive education platform.",
      impact: "Hackathon Win (1st Place)",
      category: "Hackathon Winner",
      organization: "Bharat Techx",
      prize: "Winner (3× Champion)",
      teamSize: "Competitive Team",
    },
    {
      title: "NIT Jalandhar National Hackathon – Top 4",
      date: "2025",
      description:
        "Ranked Top 4 out of 1000+ teams nationwide in the prestigious national hackathon.",
      impact: "Top 4 out of 1000+ Teams Nationwide",
      category: "National Finalist",
      organization: "NIT Jalandhar",
      prize: "Top 4 Nationwide",
      teamSize: "Finalist Team",
    },
    {
      title: "Hack n Win 2.0 – Semifinalist",
      date: "2025",
      description:
        "Semifinalist; won $300 MongoDB credits for outstanding database architecture.",
      impact: "Won $300 MongoDB Credits",
      category: "Semifinalist",
      organization: "Hack n Win",
      prize: "$300 MongoDB Credits",
      teamSize: "Team",
    },
    {
      title: "Hack the Vault 2.0 – Finalist",
      date: "2025",
      description:
        "Selected as finalist in competitive software hackathon.",
      impact: "Hackathon Finalist",
      category: "Finalist",
      organization: "Hack the Vault",
      prize: "Finalist Recognition",
      teamSize: "Team",
    },
    {
      title: "Build With AI (Google) – Semifinalist",
      date: "2025",
      description:
        "Semifinalist in Google's Build With AI competition with innovative AI solution.",
      impact: "Google Hackathon Semifinalist",
      category: "Semifinalist",
      organization: "Build With AI (Google)",
      prize: "Semifinalist Recognition",
      teamSize: "Team",
    },
  ],

  // 📊 STATISTICS
  stats: {
    totalProjects: "4",
    experience: "8.72 CGPA",
    technologies: "3× Winner",
    clients: "Top 4",
    githubStars: "1000+ Teams",
    contributions: "3× Wins",
    workshops: "IoT & Web",
    mentees: "8.72 CGPA",
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