import {motion, useScroll, useTransform, AnimatePresence} from 'motion/react';
import {
  ArrowUpRight,
  Code2,
  Cpu,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Layout,
  Globe,
  Sun,
  Moon,
  ChevronRight,
  GraduationCap,
  Briefcase,
  House,
  Flower,
  Dumbbell,
  Radical,
  Turtle,
  Lightbulb
} from 'lucide-react';
import {useRef, useState, useEffect} from 'react';
import Background from './components/Background';
import Section from './components/Section';
import SmoothScroll from './components/SmoothScroll';
import LegalModal from './components/LegalModal';
import {cn} from '@/src/lib/utils';

const projects = [
  {
    title: "York Return",
    category: "React, TypeScript, Firebase, Google OAuth",
    description: "York's most secure Lost & Found app made with React and Firebase, featuring Google login, real-time updates, and synchronized data across multiple users.",
    icon: <Globe className="w-5 h-5" />,
    color: "from-blue-500/20 to-cyan-500/20",
    link: "https://github.com/vansht04/York-Return"
  },
  {
    title: "MyAI",
    category: "Node.js, React, TypeScript",
    description: "An AI-powered workflow automation platform that integrates conversational intelligence, personalized recommendations, and real-time productivity tools to streamline user interactions.",
    icon: <Cpu className="w-5 h-5" />,
    color: "from-purple-500/20 to-pink-500/20",
    link: "https://github.com/vansht04/MyAI---Personal-AI-Chatbot"
  },
  {
    title: "Relocate Right",
    category: "Java, SQL, React, OpenStreetMap API",
    description: "A location recommendation system for 300+ entries using a weighted scoring model and SQL database to support ranked search results and filtering logic.",
    icon: <House className="w-5 h-5" />,
    color: "from-orange-500/20 to-red-500/20",
    link: "https://github.com/vansht04/Relocate-Right---Full-Stack-Location-Recommendation-App"
  },
  {
    title: "BloomLoop",
    category: "React, Firebase, TypeScript",
    description: "BloomLoop is a habit tracking app with dashboards, streak tracking, and progress visualization.",
    icon: <Flower className="w-5 h-5" />,
    color: "from-orange-500/20 to-red-500/20",
    link: "https://github.com/vansht04/BloomLoop---Social-Habit-Tracking-App"
  },
  {
    title: "Active+",
    category: "JavaScript, React, HTML, Node.js, WebStorage API",
    description: "Active+ is a local-first fitness app to manage exercises, build workouts, track strength and cardio performance, and personalize profiles with themes.",
    icon: <Dumbbell className="w-5 h-5" />,
    color: "from-orange-500/20 to-red-500/20",
    link: "https://github.com/vansht04/Active-Plus"
  },
  {
    title: "Quadratic Nerds",
    category: "Python, Processing",
    description: "Interactive math game designed for Grade 10 students to learn and practice factoring and quadratics.",
    icon: <Radical className="w-5 h-5" />,
    color: "from-orange-500/20 to-red-500/20",
    link: "https://github.com/vansht04/Quadratic-Nerds"
  },
  {
    title: "Turtle Race",
    category: "Python, Turtle.py",
    description: "A real-time race simulation featuring turtles made in Python's Turtle graphics library, showcasing object-oriented programming and dynamic animations.",
    icon: <Turtle className="w-5 h-5" />,
    color: "from-orange-500/20 to-red-500/20",
    link: "https://github.com/vansht04/Real-Time-Turtle-Race-Simulation"
  },
  {
    title: "Animated Party Lights",
    category: "Python",
    description: "A colorful animated light show built with Python, featuring dynamic patterns and smooth transitions to create a cool visual experience.",
    icon: <Lightbulb className="w-5 h-5" />,
    color: "from-orange-500/20 to-red-500/20",
    link: "https://github.com/vansht04/Animated-Party-Lights-Visualization"
  },
];

const experience = [
  {
    role: "Software Developer",
    company: "The Royal Canadian Legion · Internship",
    period: "2026 - Present",
    location: "Ottawa, ON · Remote",
    desc: "Incoming Summer 26'."
  },
  {
    role: "Software Engineer",
    company: "Learncapes Consulting Inc · Internship",
    period: "2026 - Present",
    location: "Markham, ON · Remote",
    desc: "Building an Augmented Reality app for interactive product visualization with 3D models."
  },
  {
    role: "Technical Lead",
    company: "Riipen · Internship",
    period: "2026",
    location: "Toronto, ON · Remote",
    desc: "Built analytics pipelines and event tracking systems across 10+ event types to improve product insights and user behavior analysis."
  },
  {
    role: "Project Lead",
    company: "Riipen · Internship",
    period: "2026",
    location: "Ottawa, ON · Remote",
    desc: "Optimized React performance and user flows, boosting engagement by 25% and conversion rates by 10%."
  },
  {
    role: "Judge & Mentor",
    company: "Ctrl Hack Del 2.0",
    period: "2026",
    location: "Markham, ON",
    desc: "Evaluated and mentored 20+ projects based on system design, scalability, and implementation quality."
  },
  {
    role: "Youth In Policing Student",
    company: "Peel Regional Police · Internship",
    period: "2023",
    location: "Brampton, ON",
    desc: "Collaborated across multiple law enforcement units, delivering accurate, compliant reports under strict deadlines."
  },
];

const education = [
  {
    degree: "Hons. B.S.c. in Computer Science",
    school: "York University",
    location: "Toronto, ON",
    period: "2024 - 2028",
    desc: "Focused on Full-Stack Development, Artificial Intelligence, and Machine Learning."
  }
];

const skills = [
  "React / Next.js", "TypeScript", "Node.js", "Python", "Java", "AWS", "Three.js", "SQL", "HTML/CSS", "Docker", "Firebase", "Supabase", "C++", 
  "R", "MongoDB", "Tailwind CSS", "Framer Motion", "Git"
];

function Navbar({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-display font-bold tracking-tighter"
        >
          Vansh Tejnani
        </motion.div>
        
        <div className={cn(
          "flex items-center gap-8 px-6 py-2 rounded-full text-xs font-semibold border transition-all duration-500",
          isDark ? "glass-dark border-white/10" : "glass-light border-black/5"
        )}>
          <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
          <a href="#projects" className="hover:opacity-60 transition-opacity">Projects</a>
          <a href="#experience" className="hover:opacity-60 transition-opacity">Experience</a>
          <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-full border transition-all duration-500",
              isDark ? "border-white/10 hover:bg-white/5" : "border-black/5 hover:bg-black/5"
            )}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a href="https://github.com/vansht04" target="_blank" rel="noreferrer">
            <Github className="w-4 h-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://www.linkedin.com/in/vansht/" target="_blank" rel="noreferrer">
            <Linkedin className="w-4 h-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero({ isDark }: { isDark: boolean }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
  <div ref={containerRef} className="relative h-[110vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">

    {/* 👇 ADD THIS HERE */}
    <h1 style={{ position: "absolute", left: "-9999px" }}>
      Vansh Tejnani
    </h1>

    <p style={{ position: "absolute", left: "-9999px" }}>
      Software Engineer specializing in Full-Stack Development, AI systems, and modern web applications.
    </p>

    <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <span className={cn(
            "px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold border transition-all duration-500",
            isDark ? "border-white/10 bg-white/5" : "border-black/5 bg-black/5"
          )}>
            ⌘ FLOW STATE ⌘
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[12vw] md:text-[10vw] font-bold leading-[0.85] tracking-tighter mb-12 text-balance"
        >
          BUILDING <br />
          <span className={isDark ? "text-white/50" : "text-black/40"}>THE</span><br />
          FUTURE
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20"
        >
          <div className="text-center">
            <span className="section-label">Specialization</span>
            <p className="text-lg font-medium opacity-80">Full-Stack Developer</p>
            <p className="text-md opacity-40">Machine Learning • Artificial Intelligence <br />
              Frontend Development • Backend Development <br />
              Cloud Infrastructure • Distributed Systems <br />
              Systems Optimization • System Design <br />
              Anything Cool
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-5 h-5 opacity-20" />
      </motion.div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | 'cookie' | null>(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const openLegal = (type: 'privacy' | 'terms' | 'cookie') => setLegalType(type);

  return (
    <SmoothScroll>
      <div className={cn(
        "relative min-h-screen transition-all duration-500",
        theme === 'dark' ? "" : ""
      )}>
        <LegalModal 
          isOpen={!!legalType} 
          type={legalType} 
          onClose={() => setLegalType(null)} 
        />
        <Background isDark={theme === 'dark'} />
        <Navbar isDark={theme === 'dark'} toggleTheme={toggleTheme} />
        
        <main>
          <Hero isDark={theme === 'dark'} />

          <Section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7">
              <span className="section-label">The Vision</span>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-10 leading-tight text-balance">
                Designing The Future Of Computing
              </h2>
              <p className="opacity-60 text-xl leading-relaxed mb-10 text-balance">
                Ideas should be brought to life in ways that create real impact. The goal is to build with clarity and structure — where things are fast, predictable, and hold up as they grow. Progress matters more than perfection, so the focus stays on shipping, learning, and improving through real work in production.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-bold border transition-colors",
                    theme === 'dark' ? "glass-dark border-white/5 opacity-60 hover:opacity-100" : "glass-light border-black/5 opacity-60 hover:opacity-100"
                  )}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-5 w-full">
              <div className={cn(
                "p-10 rounded-[2.5rem] border relative overflow-hidden group transition-all duration-500",
                theme === 'dark' ? "glass-dark border-white/10" : "glass-light border-black/5"
              )}>
                <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                  <Code2 className="w-60 h-60" />
                </div>
                <h3 className="text-2xl font-bold mb-6">Foundations</h3>
                <ul className="space-y-6">
                  {[
                    { t: "Keep It Simple", d: "Simple ideas are always the strongest." },
                    { t: "Build For Real Use", d: "Work that solves real problems real people have." },
                    { t: "Keep Shipping", d: "Learn by building, not by planning." }
                  ].map((item, i) => (
                     <li key={i} className="flex gap-4">
                       <div className="w-1 h-1 rounded-full bg-[#0071E3] mt-2.5 shrink-0" />
                       <div>
                         <p className="font-bold text-sm tracking-tight">{item.t}</p>
                         <p className="text-xs opacity-40">{item.d}</p>
                       </div>
                     </li>
                  ))}
                </ul>
                <div className="mt-12 pt-10 border-t border-white/5 flex items-center justify-between">
                  {/* Stats or subtle details */}
                  <div className="text-[10px] uppercase font-bold opacity-70">Status: Active 🟢</div>
                  <div className="text-[10px] uppercase font-bold opacity-70">Loc: Toronto, ON</div>
                </div>
              </div>
            </div>
          </Section>

          <Section id="projects" className="py-40">
            <div className="flex flex-col md:flex-row items-baseline justify-between mb-24 gap-4">
              <div>
                <span className="section-label">Selected Works</span>
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">PROJECTS</h2>
              </div>
              <div className="text-xs font-bold opacity-30 tracking-[0.2em]">01 — 08</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <motion.a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -15, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "group relative p-10 rounded-[3rem] border flex flex-col h-[500px] transition-all duration-500 cursor-pointer block",
                    theme === 'dark' ? "glass-dark border-white/10" : "glass-light border-black/5 shadow-sm"
                  )}
                >
                  <div className={cn(
                     "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity rounded-[3rem]",
                     project.color
                  )} />
                  <div className={cn(
                     "p-4 w-fit rounded-2xl border mb-10 transition-transform duration-500 group-hover:scale-110",
                     theme === 'dark' ? "glass-dark border-white/10" : "glass-light border-black/5"
                  )}>
                    {project.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-3 tracking-tighter">{project.title}</h3>
                  <div className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-6">{project.category}</div>
                  <p className="opacity-50 text-sm leading-relaxed mb-auto text-balance">
                    {project.description}
                  </p>
                  <div className="absolute bottom-10 left-10 flex items-center gap-2 text-xs font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    Learn More <ArrowUpRight className="w-4 h-4" />
                  </div>
                </motion.a>
              ))}
            </div>
          </Section>

          <Section id="experience" className="grid grid-cols-1 md:grid-cols-2 gap-20 py-40 overflow-hidden">
             <div>
               <span className="section-label">Journey</span>
               <h2 className="text-6xl font-bold tracking-tighter mb-10">EXPERIENCE</h2>
               <div className="space-y-12">
                 {experience.map((exp, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="group relative pl-8 border-l border-white/10"
                   >
                     <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-[#0071E3] opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="flex items-center gap-3 mb-2">
                       <Briefcase className="w-4 h-4 opacity-30" />
                       <span className="text-xs font-bold opacity-30 uppercase tracking-widest">{exp.period}</span>
                     </div>
                     <h4 className="text-2xl font-bold mb-1 tracking-tight">{exp.role}</h4>
                     <p className="text-md font-bold mb-1">{exp.company}</p>
                     <p className="text-sm opacity-60 mb-3">{exp.location}</p>
                     <p className="text-sm opacity-40 max-w-sm leading-relaxed">{exp.desc}</p>
                   </motion.div>
                 ))}
               </div>
             </div>

             <div>
               <span className="section-label">Academic</span>
               <h2 className="text-6xl font-bold tracking-tighter mb-10">EDUCATION</h2>
               <div className="space-y-12">
                 {education.map((edu, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="group relative pr-8 border-r border-white/10 text-right md:text-left md:pr-0 md:pl-8 md:border-r-0 md:border-l"
                   >
                     <div className="hidden md:block absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-[#0071E3] opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="flex items-center justify-end md:justify-start gap-3 mb-2">
                       <GraduationCap className="w-4 h-4 opacity-30" />
                       <span className="text-xs font-bold opacity-30 uppercase tracking-widest">{edu.period}</span>
                     </div>
                     <h4 className="text-2xl font-bold mb-1 tracking-tight">{edu.degree}</h4>
                     <p className="text-sm opacity-60 mb-1">{edu.school}</p>
                     <p className="text-sm opacity-60 mb-3">{edu.location}</p>
                     <p className="text-sm opacity-40 max-w-sm ml-auto md:ml-0 leading-relaxed">{edu.desc}</p>
                   </motion.div>
                 ))}
               </div>
             </div>
          </Section>

          <Section id="contact" className="py-40">
            <div className="flex flex-col md:flex-row items-baseline justify-between mb-24 gap-4">
              <div>
                <span className="section-label">Connect</span>
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">CONTACT</h2>
              </div>
              <div className="text-xs font-bold opacity-30 tracking-[0.2em]">SAY HELLO —</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { label: "Direct", title: "Email", href: "mailto:vanshbt@gmail.com", icon: <Mail className="w-4 h-4" /> },
                { label: "Global", title: "LinkedIn", href: "https://www.linkedin.com/in/vansht/", icon: <Linkedin className="w-4 h-4" /> },
                { label: "Source", title: "GitHub", href: "https://github.com/vansht04", icon: <Github className="w-4 h-4" /> }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <span className="section-label">{item.label}</span>
                  <a 
                    href={item.href} 
                    target={item.href.startsWith('mailto') ? undefined : "_blank"}
                    rel="noreferrer"
                    className="flex items-center gap-3 text-2xl md:text-3xl font-display font-semibold hover:text-[#0071E3] transition-colors group-hover:translate-x-2 transition-transform duration-500"
                  >
                    {item.title} <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.div>
              ))}
            </div>
          </Section>
        </main>

        <footer className={cn(
          "py-12 border-t transition-colors duration-500 px-6",
          theme === 'dark' ? "border-white/5" : "border-black/5"
        )}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold opacity-30">
            <div>© 2026 Vansh Tejnani. All Rights Reserved.</div>
            <div className="flex gap-8">
              <button onClick={() => openLegal('cookie')} className="cursor-pointer hover:opacity-100 transition-opacity">COOKIE POLICY</button>
              <button onClick={() => openLegal('privacy')} className="cursor-pointer hover:opacity-100 transition-opacity">PRIVACY POLICY</button>
              <button onClick={() => openLegal('terms')} className="cursor-pointer hover:opacity-100 transition-opacity">TERMS OF SERVICE</button>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
