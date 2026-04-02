"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  Github,
  Linkedin,
  Download,
  Mail,
  MapPin,
  Sparkles,
  Code,
  Palette,
  PenTool,
  Menu,
  X,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Portfolio() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-red-950 to-black overflow-x-hidden">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-red-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: cursorPosition.x - 12,
          y: cursorPosition.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Floating Navigation */}
      <FloatingNav
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Hero Section */}
      <HeroSection scrollToSection={scrollToSection} setIsHovering={setIsHovering} />

      {/* About Section */}
      <AboutSection setIsHovering={setIsHovering} />

      {/* Achievements Section */}
      <AchievementsSection setIsHovering={setIsHovering} />

      {/* Graphic Design Section */}
      <GraphicDesignSection setIsHovering={setIsHovering} />

      {/* Code Projects Section */}
      <CodeProjectsSection setIsHovering={setIsHovering} />

      {/* Writing Section */}
      <WritingSection setIsHovering={setIsHovering} />

      {/* Contact Section */}
      <ContactSection setIsHovering={setIsHovering} />
    </div>
  )
}

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="w-20 h-20 border-4 border-red-400 border-t-transparent rounded-full mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.h2
          className="text-2xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Loading Portfolio...
        </motion.h2>
        <motion.div
          className="flex space-x-1 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-red-400 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

function FloatingNav({ activeSection, scrollToSection, mobileMenuOpen, setMobileMenuOpen }: any) {
  const navItems = [
    { id: "home", icon: Sparkles, label: "Home" },
    { id: "about", icon: Sparkles, label: "About" },
    { id: "achievements", icon: Sparkles, label: "Awards" },
    { id: "design", icon: Palette, label: "Design" },
    { id: "code", icon: Code, label: "Code" },
    { id: "writing", icon: PenTool, label: "Writing" },
    { id: "contact", icon: Mail, label: "Contact" },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 hidden md:block"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-red-600 text-white" // Changed to red
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon size={16} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.button
        className="fixed top-6 right-6 z-50 md:hidden bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        {mobileMenuOpen ? <X className="text-white" size={20} /> : <Menu className="text-white" size={20} />}
      </motion.button>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute top-20 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
            >
              <div className="space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function HeroSection({ scrollToSection, setIsHovering }: any) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400/30 rounded-full" // Changed to red
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100, null],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.8 }}
        >
          <motion.h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-playfair">
            Hello, I'm{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-700" // Changed to red gradient
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Chhavi
            </motion.span>
            <motion.span
              className="inline-block ml-4"
              animate={{ rotate: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              👋
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.8 }}
        >
          A multi-talented Computer Science student passionate about{" "}
          <span className="text-red-400 font-semibold">design</span>,{" "}
          <span className="text-red-700 font-semibold">code</span>, and{" "}
          <span className="text-gray-400 font-semibold">storytelling</span> {/* Adjusted accent colors */}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.6, duration: 0.8 }}
        >
          <Button
            onClick={() => scrollToSection("about")}
            className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105" // Changed to red gradient
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Explore My Work
          </Button>

          <Button
            variant="outline"
            className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 bg-transparent"
            onClick={() => window.open("/chhavi-rana-resume.pdf", "_blank")} // Updated to PDF link
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Download className="mr-2" size={20} />
            Resume
          </Button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="text-white/50" size={32} />
        </motion.div>
      </div>
    </section>
  )
}

function AboutSection({ setIsHovering }: any) {
  return (
    <section id="about" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-playfair">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-700 mx-auto"></div>{" "}
          {/* Changed to red gradient */}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-red-400 to-red-700 rounded-full p-1">
                {" "}
                {/* Changed to red gradient */}
                <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center">
                  <img
                    src="/images/chhavi-profile.jpg"
                    alt="Chhavi Rana"
                    className="w-72 h-72 rounded-full object-cover border-4 border-red-400"
                  />
                </div>
              </div>
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-red-400 rounded-full flex items-center justify-center" // Changed to red
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="text-white" size={24} />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              CSE Student at <span className="text-red-400">BITS Pilani Dubai Campus</span> {/* Changed to red */}
            </h3>

            <p className="text-lg text-white/80 leading-relaxed">
              I'm a passionate creator who bridges the gap between technology and art. With experience in visual design,
              social media marketing, and content writing, I bring a unique perspective to every project.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <Palette className="text-red-400 mx-auto mb-2" size={32} /> {/* Changed to red */}
                  <h4 className="text-white font-semibold">Design</h4>
                  <p className="text-white/70 text-sm">Visual & Social Media</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <Code className="text-red-700 mx-auto mb-2" size={32} /> {/* Changed to red */}
                  <h4 className="text-white font-semibold">Code</h4>
                  <p className="text-white/70 text-sm">Python, JS, Web Dev</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-white">Experience & Interests</h4>
              <ul className="space-y-2 text-white/80">
                <li>• Student Coordinator, Career Services - BITS Dubai (Sep 2025 - Present)</li>
                <li>• Treasurer, Microsoft Tech Club (Jun 2025 - Present)</li>
                <li>• Creative Head, SUPERNOVA - The Astronomy Club (Jul 2025 - Present)</li>
                <li>• Member, Rewriting the Code (Jul 2024 - Present)</li>
                <li>• Passionate about feminist storytelling & murder mysteries</li>
                <li>• AI projects and space exploration enthusiast</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AchievementsSection({ setIsHovering }: any) {
  const achievements = [
    {
      type: "Award",
      title: "BTF Best Pitch Award",
      organization: "BITS Pilani Dubai",
      date: "May 2025",
      icon: "🏆",
      color: "from-yellow-400 to-orange-500",
    },
    {
      type: "Award",
      title: "Money Building Hackathon 1st Prize",
      organization: "OrbitX",
      date: "Mar 2025",
      icon: "🥇",
      color: "from-green-400 to-emerald-500",
    },
    {
      type: "Award",
      title: "3+ Hackathon Winner",
      organization: "Various Competitions",
      date: "2024 - 2025",
      icon: "🎯",
      color: "from-red-400 to-red-700",
    },
    {
      type: "Certification",
      title: "Prompt Design in Vertex AI",
      organization: "Google Cloud",
      date: "Jun 2024",
      icon: "🤖",
      color: "from-blue-400 to-cyan-500",
    },
    {
      type: "Certification",
      title: "Cybersecurity Job Simulation",
      organization: "JPMorgan Chase & Co.",
      date: "Jul 2024",
      icon: "🔒",
      color: "from-red-400 to-pink-500",
    },
    {
      type: "Certification",
      title: "Cybersecurity Job Simulation",
      organization: "Mastercard",
      date: "Jul 2024",
      icon: "💳",
      color: "from-red-500 to-red-700",
    },
    {
      type: "Program",
      title: "Girls Who Code Apprentice",
      organization: "Girls Who Code",
      date: "Aug 2023",
      icon: "👩‍💻",
      color: "from-red-400 to-red-600",
    },
  ]

  const leadership = [
    {
      role: "Student Coordinator",
      organization: "Career Services, BITS Dubai",
      period: "Sep 2025 - Present",
      description: "Coordinating career development initiatives and student engagement",
    },
    {
      role: "Treasurer",
      organization: "Microsoft Tech Club",
      period: "Jun 2025 - Present",
      description: "Leading financial operations and strategic planning",
    },
    {
      role: "Creative Head",
      organization: "SUPERNOVA - The Astronomy Club",
      period: "Jul 2025 - Present",
      description: "Directing creative initiatives and visual content",
    },
    {
      role: "3+ Hackathon Winner",
      organization: "Various Competitions",
      period: "2024 - 2025",
      description: "Multiple first-place wins in innovation and tech competitions",
    },
  ]

  return (
    <section
      id="achievements"
      className="min-h-screen py-20 px-4 bg-gradient-to-br from-red-950/20 via-black/20 to-red-900/20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-playfair">Achievements</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Recognition for excellence in technology, innovation, and leadership
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-700 mx-auto mt-6"></div>
        </motion.div>

        {/* Awards & Certifications */}
        <div className="mb-16">
          <motion.h3
            className="text-3xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Awards & Certifications
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-full flex items-center justify-center text-2xl mb-4 mx-auto`}
                >
                  {achievement.icon}
                </div>

                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-red-500/20 text-red-300 text-sm rounded-full mb-3">
                    {achievement.type}
                  </span>

                  <h4 className="text-lg font-bold text-white mb-2">{achievement.title}</h4>
                  <p className="text-white/70 text-sm mb-2">{achievement.organization}</p>
                  <p className="text-white/50 text-xs">{achievement.date}</p>
                </div>

                {/* Sparkle effect */}
                <motion.div
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <span className="text-yellow-400">✨</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership Experience */}
        <div>
          <motion.h3
            className="text-3xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Leadership Experience
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((role, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-red-700/20 to-red-900/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:from-red-700/30 hover:to-red-900/30 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white mb-2">{role.role}</h4>
                  <p className="text-red-300 font-semibold mb-2">{role.organization}</p>
                  <p className="text-white/60 text-sm mb-3">{role.period}</p>
                  <p className="text-white/70 text-sm italic">{role.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recognition Quote */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-red-700/20 to-red-900/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <blockquote className="text-lg text-white/80 italic mb-4">
              "Chhavi's eagerness to learn new concepts and openness to embrace constructive feedback was evident... She
              demonstrated perseverance through her consistently positive attitude when problem-solving and debugging
              her code."
            </blockquote>
            <cite className="text-red-300 font-semibold">— Emily Pondaven, Girls Who Code Instructor</cite>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function GraphicDesignSection({ setIsHovering }: any) {
  const projects = [
    {
      title: "Squid Game Salesman Poster",
      category: "TV Series Design",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2%203-4duoBJd75bwMYHvrSft1v5G4g5qzBf.png",
      description: "Bold typography with character-focused layout",
    },
    {
      title: "Friends Monica Chef Poster",
      category: "Character Analysis",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2%202-RgwbZvcceWQdpaAFpUq43fFAAUyQnn.png",
      description: "Creative personality breakdown with retro aesthetics",
    },
    {
      title: "Squid Game Player 456",
      category: "TV Series Design",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1%203-H0NRDF3UzEy1feujbmChrRx0uBitgT.png",
      description: "Minimalist design with impactful messaging",
    },
    {
      title: "Deadpool Dark Aesthetic",
      category: "Movie Poster",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Neon%20Pink%20Dark%20and%20Edgy%20General%20Fandom%20Binder%20Cover-BOg1lrF10g0B4ICGf1ftdjjb9u5VtI.png",
      description: "Edgy design with dramatic visual storytelling",
    },
    {
      title: "Halloween Gothic Website",
      category: "Website Design",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HALLOWEEN.gif-MqXkd8pX1oJom1GShCPKOmvTy4ccil.jpeg",
      description: "Atmospheric web design with haunting visual elements",
    },
    {
      title: "Lunar Crater Observatory",
      category: "Educational Design",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CRATER-IWNTfDUwdytEJXOMPT7FyIgcBheGHC.png",
      description: "Scientific poster with clean, informative layout",
    },
  ]

  return (
    <section
      id="design"
      className="min-h-screen py-20 px-4 bg-gradient-to-br from-red-900/20 via-black/20 to-red-950/20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-playfair">Graphic Design</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Where creativity meets purpose - bringing ideas to life through visual storytelling
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-700 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-700/20 to-red-900/20 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              >
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm rounded-full mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/80 text-sm">{project.description}</p>
                </div>
              </motion.div>

              {/* Flying paper plane easter egg */}
              <motion.div
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                initial={{ x: 20, y: -20 }}
                whileHover={{ x: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-6 h-6 text-white">✈️</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CodeProjectsSection({ setIsHovering }: any) {
  const projects = [
    {
      title: "OSCAR - Financial AI Assistant",
      tech: ["Python", "AI/ML", "FinTech"],
      description:
        "AI-powered financial advisor that provides personalized investment suggestions and financial reminders",
      github: "https://github.com/chhaavii/Oscar-MkII",
      demo: "#",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wX7PDJ0HXaYliRQTBR9L8LSFpwryVE.png",
    },
    {
      title: "Emotion Detection System",
      tech: ["Python", "OpenCV", "Machine Learning"],
      description: "Real-time facial emotion recognition system using computer vision and ML algorithms",
      github: "https://github.com/chhaavii/emotion-detection",
      demo: "#",
      image: "/images/emotion-detection-new.png",
    },
    {
      title: "Red Bull Racing Website",
      tech: ["HTML", "CSS", "JavaScript"],
      description: "Dynamic F1-themed website featuring Red Bull Racing branding and interactive elements",
      github: "https://github.com/chhaavii/redbull",
      demo: "#",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D6gBESqKcAnvCy71TCZOqqwhfXMPoY.png",
    },
    {
      title: "Murder Mystery Game",
      tech: ["JavaScript", "HTML5", "CSS3"],
      description: "Interactive web-based detective game inspired by Clue with immersive storytelling",
      github: "https://github.com/chhaavii",
      demo: "#",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gLl2liNBWX6Xl42UVPplYnPP2NaPsn.png",
    },
    {
      title: "ASCII Art Converter",
      tech: ["Python", "Image Processing"],
      description: "Tool that converts images into ASCII art with customizable character sets and scaling",
      github: "https://github.com/chhaavii/ASCII-converter",
      demo: "#",
      image: "/images/ascii-converter.png",
    },
    {
      title: "Face Detection System (C++)",
      tech: ["C++", "OpenCV", "Computer Vision"],
      description: "Advanced face detection and recognition system with real-time processing capabilities",
      github: "https://github.com/chhaavii/Face-detection-2",
      image: "/images/face-detection-new.png", // Updated image source
    },
  ]

  return (
    <section id="code" className="min-h-screen py-20 px-4 bg-gradient-to-br from-black via-red-900/20 to-gray-950/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-mono">{"<Code Projects />"}</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Building the future, one line of code at a time</p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-700 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative bg-slate-800/50 backdrop-blur-sm border border-red-500/20 rounded-2xl overflow-hidden hover:border-red-400/50 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-red-500/20 text-red-300 text-sm rounded-full border border-red-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 font-mono">{project.title}</h3>

                <p className="text-white/70 mb-6 text-sm">{project.description}</p>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white bg-transparent"
                    onClick={() => window.open(project.github, "_blank")}
                  >
                    <Github className="mr-2" size={16} />
                    Code
                  </Button>
                  {project.demo !== "#" && (
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>

              {/* Inspect element easter egg */}
              <motion.div
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 bg-slate-900/80 px-2 py-1 rounded text-xs text-green-400 font-mono"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
              >
                {"<inspect>"}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Profile Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            className="border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 bg-transparent"
            onClick={() => window.open("https://github.com/chhaavii", "_blank")}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Github className="mr-2" size={20} />
            View All Projects on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function WritingSection({ setIsHovering }: any) {
  const writings = [
    {
      type: "Poetry",
      title: "Poems Collection",
      excerpt: "A collection of heartfelt poems exploring life, emotions, and the human experience.",
      date: "2023",
      category: "Personal",
      link: "https://docs.google.com/document/d/10FVW9hUgrvGw1lMxuEhsHHCoViKCU0HpOQzCys0d09s/edit?usp=sharing",
    },
    {
      type: "Novel",
      title: "One Murder",
      excerpt: "A gripping mystery novel that delves into the complexities of crime and human nature.",
      date: "Jan 2024",
      category: "Mystery",
      link: "https://www.amazon.in/One-murder-Chhavi-Rana-ebook/dp/B0CYSNMGLX/",
    },
    {
      type: "Research Paper",
      title: "3rd Sivas International Conference Report",
      excerpt: "A comprehensive report on scientific and innovation research presented at the conference.",
      date: "May 2024",
      category: "Published Work",
      link: "https://docs.google.com/document/d/1TngurII-cJgERxnj6tcjd0fxyz_dSflVzZzGvrsj4T0/edit?usp=sharing",
    },
  ]

  return (
    <section
      id="writing"
      className="min-h-screen py-20 px-4 bg-gradient-to-br from-red-900/20 via-black/10 to-red-950/10"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-playfair"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 2, delay: 0.8 }}
              className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-red-400"
            >
              Written Words
            </motion.span>
          </motion.h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Stories that inspire, poems that heal, and words that change the world
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-700 mx-auto mt-6"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-400 to-red-700 rounded-full"></div>
          <div className="space-y-12">
            {writings.map((writing, index) => (
              <motion.div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                  <motion.a
                    href={writing.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-red-700/20 text-red-300 text-sm rounded-full">{writing.type}</span>
                      <span className="text-white/50 text-sm">{writing.date}</span>
                    </div>

                    <h3
                      className="text-2xl font-bold text-white mb-3"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {writing.title}
                    </h3>

                    <p className="text-white/70 italic mb-4">"{writing.excerpt}"</p>

                    <span className="inline-block px-3 py-1 bg-red-600/20 text-red-300 text-sm rounded-full">
                      {writing.category}
                    </span>

                    {/* Harry Potter spell easter egg */}
                    {writing.category === "Mystery" && (
                      <motion.div
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-yellow-400">⚡</span>
                      </motion.div>
                    )}
                  </motion.a>
                </div>

                {/* Timeline dot */}
                <div className="relative z-10">
                  <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-red-700 rounded-full border-4 border-slate-900"></div>
                </div>

                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection({ setIsHovering }: any) {
  return (
    <section
      id="contact"
      className="min-h-screen py-20 px-4 bg-gradient-to-br from-black via-red-900/30 to-gray-950/20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-playfair">Let's Connect</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Ready to collaborate on something amazing? Let's bring your ideas to life!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-700 mx-auto mt-6"></div>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-700/20 rounded-full flex items-center justify-center">
                    <Mail className="text-red-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p className="text-white/70">f20240193@dubai.bits-pilani.ac.in</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-700/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="text-red-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">WhatsApp</p>
                    <a
                      href="https://wa.me/971503956422"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-red-400 transition-colors"
                    >
                      +971 50 395 6422
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-700/20 rounded-full flex items-center justify-center">
                    <MapPin className="text-red-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Location</p>
                    <p className="text-white/70">Dubai, UAE</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>

              <div className="flex space-x-4">
                <motion.a
                  href="https://www.linkedin.com/in/fnu-chhavi-094b6b286/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Linkedin className="text-white" size={20} />
                </motion.a>

                <motion.a
                  href="https://github.com/chhaavii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Github className="text-white" size={20} />
                </motion.a>
              </div>
            </div>

            {/* Resume Download */}
            <motion.div
              className="bg-gradient-to-r from-red-600/20 to-red-800/20 border border-red-400/30 rounded-2xl p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Download CVs</h3>
              <div className="flex flex-col gap-3">
                <Button
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 w-full"
                  onClick={() => window.open("/chhavi-coding-resume.pdf", "_blank")}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Download className="mr-2" size={20} />
                  Portfolio
                </Button>
                <Button
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 w-full"
                  onClick={() => window.open("/chhavi-graphic-designer-cv.pdf", "_blank")}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Download className="mr-2" size={20} />
                  Graphic Designer CV
                </Button>
                <Button
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 w-full"
                  onClick={() => window.open("https://chhaavii.github.io/dyportfolio.io/", "_blank")}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Sparkles className="mr-2" size={20} />
                  Dynamic UI/UX Portfolio
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
    </section>
  )
}
