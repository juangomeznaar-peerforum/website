import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X, Users, BookOpen, Building, MessageSquare, Network, Layers, ShieldCheck, CheckCircle2, BarChart3, Quote, ChevronDown } from 'lucide-react';

// --- STYLES & FONTS ---
const injectStyles = () => {
  if (!document.getElementById('peerforum-refined-styles')) {
    const style = document.createElement('style');
    style.id = 'peerforum-refined-styles';
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
      
      :root {
        --bg-base: #F6F8F6;
        --bg-alt: #EBF0EC;
        --text-main: #0A1C12;
        --text-muted: #526656;
        --accent-sage: #225430;
        --accent-sage-light: #326B42;
        --border-soft: #D3DCD4;
      }
      
      body {
        background-color: var(--bg-base);
        color: var(--text-main);
        font-family: 'DM Sans', sans-serif;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }

      .font-serif {
        font-family: 'Lora', serif;
      }

      /* Base Animation Classes */
      .reveal-up { transform: translateY(40px); opacity: 0; }
      .reveal-down { transform: translateY(-40px); opacity: 0; }
      .reveal-left { transform: translateX(-40px); opacity: 0; }
      .reveal-right { transform: translateX(40px); opacity: 0; }
      .reveal-scale { transform: scale(0.95); opacity: 0; }
      
      .reveal-visible { 
        transform: translate(0) scale(1); 
        opacity: 1; 
        transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .fade-in {
        animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Floating & Shimmer Effects */
      .float-slow { animation: float 6s ease-in-out infinite; }
      .float-fast { animation: float 4s ease-in-out infinite; }
      
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
      }

      .shimmer {
        position: relative;
        overflow: hidden;
      }
      .shimmer::after {
        content: '';
        position: absolute;
        top: 0; left: -100%; width: 50%; height: 100%;
        background: linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent);
        transform: skewX(-20deg);
        animation: shimmer 4s infinite;
      }
      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 200%; }
      }

      /* Refined interactions */
      .elegant-hover {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      .elegant-hover:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 32px -12px rgba(10, 28, 18, 0.12);
        border-color: var(--text-muted);
      }
    `;
    document.head.appendChild(style);
  }
};

// --- SEO & LLM OPTIMIZATION COMPONENT ---
const SEO = ({ title, description, path, keywords }) => {
  useEffect(() => {
    document.title = `${title} | Peerforum`;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // JSON-LD Structured Data - Crucial for LLM & Search Engine understanding
    let scriptSchema = document.getElementById('json-ld-schema');
    if (!scriptSchema) {
      scriptSchema = document.createElement('script');
      scriptSchema.type = 'application/ld+json';
      scriptSchema.id = 'json-ld-schema';
      document.head.appendChild(scriptSchema);
    }
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": `https://peerforum.com/${path}`,
      "publisher": {
        "@type": "Organization",
        "name": "Peerforum",
        "logo": "https://peerforum.com/logo.png",
        "description": "Full-service provider of peer coaching groups at scale for enterprise, education, and premium communities."
      },
      "keywords": keywords || "peer coaching, leadership development, facilitated forums, executive coaching, group dynamics"
    };
    scriptSchema.textContent = JSON.stringify(schema);
    
  }, [title, description, path, keywords]);
  return null;
};

// --- ANIMATION COMPONENTS ---
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
};

const Reveal = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div 
      ref={ref} 
      className={`reveal-${direction} ${isVisible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const AnimatedCounter = ({ value, delay = 0 }) => {
  const [count, setCount] = useState("0");
  const [ref, isVisible] = useIntersectionObserver();
  
  useEffect(() => {
    if (!isVisible) return;
    
    const numMatch = String(value).match(/[\d.]+/);
    if (!numMatch) {
      setCount(value);
      return;
    }
    
    const targetNum = parseFloat(numMatch[0]);
    const isFloat = String(value).includes('.');
    const prefix = String(value).substring(0, numMatch.index);
    const suffix = String(value).substring(numMatch.index + numMatch[0].length);
    
    let start = 0;
    let startTime;
    let animationFrame;
    const duration = 2000; // 2 seconds
    
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4); // Quartic ease out
      
      const currentNum = start + (targetNum - start) * easeProgress;
      setCount(`${prefix}${isFloat ? currentNum.toFixed(1) : Math.floor(currentNum)}${suffix}`);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };
    
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(updateCount);
    }, delay);
    
    return () => {
      clearTimeout(timeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, value, delay]);
  
  return <span ref={ref}>{count}</span>;
};

// --- UI COMPONENTS ---
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 ease-out text-sm tracking-wide";
  const variants = {
    primary: "bg-[#0A1C12] text-[#F6F8F6] hover:bg-[#225430] hover:scale-[1.02] shimmer border border-[#0A1C12]",
    secondary: "bg-transparent border border-[#0A1C12] text-[#0A1C12] hover:bg-[#0A1C12] hover:text-[#F6F8F6]",
    tertiary: "bg-[#F6F8F6] text-[#0A1C12] hover:bg-[#D3DCD4] hover:scale-[1.02] border border-[#F6F8F6]"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} aria-label={typeof children === 'string' ? children : 'Button'} {...props}>
      {children}
    </button>
  );
};

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryLinks = [
    { id: 'community', label: 'Community' },
    { id: 'education', label: 'Education' },
    { id: 'enterprise', label: 'Enterprise' },
  ];

  const handleNavClick = (id, anchor = null) => {
    setCurrentPage(id);
    setIsMobileMenuOpen(false);
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav aria-label="Main Navigation" className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#F6F8F6]/90 backdrop-blur-md border-b border-[#D3DCD4] py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div 
          className="font-serif text-2xl font-medium tracking-tight cursor-pointer text-[#0A1C12]"
          onClick={() => handleNavClick('home')}
          aria-label="Peerforum Home"
        >
          Peerforum.
        </div>

        <div className="hidden md:flex items-center space-x-10 text-[15px] font-medium text-[#526656]">
          {primaryLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`transition-colors hover:text-[#0A1C12] ${currentPage === link.id ? 'text-[#225430]' : ''}`}
            >
              {link.label}
            </button>
          ))}
          
          <div className="relative group py-2">
            <button className={`flex items-center gap-1 transition-colors hover:text-[#0A1C12] ${['about', 'facilitators', 'case-studies'].includes(currentPage) ? 'text-[#225430]' : ''}`}>
              About <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-48 bg-[#F6F8F6] border border-[#D3DCD4] shadow-xl rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button onClick={() => handleNavClick('about')} className="block w-full text-left px-4 py-2 text-sm text-[#526656] hover:text-[#0A1C12] hover:bg-[#EBF0EC] rounded-xl transition-colors">About Us</button>
              <button onClick={() => handleNavClick('facilitators')} className="block w-full text-left px-4 py-2 text-sm text-[#526656] hover:text-[#0A1C12] hover:bg-[#EBF0EC] rounded-xl transition-colors">Our Facilitators</button>
              <button onClick={() => handleNavClick('case-studies')} className="block w-full text-left px-4 py-2 text-sm text-[#526656] hover:text-[#0A1C12] hover:bg-[#EBF0EC] rounded-xl transition-colors">Case Studies</button>
            </div>
          </div>

          <Button variant="primary" className="px-5 py-2.5">
            Talk to Us
          </Button>
        </div>

        <button aria-label="Toggle Menu" className="md:hidden text-[#0A1C12]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#F6F8F6] border-b border-[#D3DCD4] py-4 px-6 shadow-xl flex flex-col space-y-2 fade-in max-h-[80vh] overflow-y-auto">
          {primaryLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-left text-lg font-medium text-[#0A1C12] py-3 border-b border-[#D3DCD4]"
            >
              {link.label}
            </button>
          ))}
          
          <div className="py-3 border-b border-[#D3DCD4] flex flex-col">
            <span className="text-lg font-medium text-[#0A1C12] mb-3">About</span>
            <div className="flex flex-col space-y-3 pl-4 border-l-2 border-[#D3DCD4]">
              <button onClick={() => handleNavClick('about')} className="text-left text-base text-[#526656]">About Us</button>
              <button onClick={() => handleNavClick('facilitators')} className="text-left text-base text-[#526656]">Our Facilitators</button>
              <button onClick={() => handleNavClick('case-studies')} className="text-left text-base text-[#526656]">Case Studies</button>
            </div>
          </div>

          <Button variant="primary" className="w-full mt-6">
            Talk to Us
          </Button>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ setCurrentPage }) => (
  <footer className="bg-[#0A1C12] text-[#F6F8F6] py-24 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#526656]/30 pb-16 mb-16 gap-12">
      <div className="max-w-2xl">
        <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-tight mb-6 text-[#F6F8F6]">
          Scale your peer groups.
        </h2>
        <p className="text-[#526656] text-lg font-light mb-10 max-w-md">
          Full-service peer coaching groups at scale. We design, operate, and facilitate.
        </p>
        <Button variant="tertiary" className="text-base px-8 py-4">
          Talk to Us
        </Button>
      </div>
      
      <div className="flex gap-16 text-[15px] font-light text-[#526656]">
        <div className="flex flex-col space-y-4">
          <span className="text-[#F6F8F6] font-medium mb-2 tracking-wide text-sm">Solutions</span>
          <button onClick={() => { setCurrentPage('community'); window.scrollTo(0,0); }} className="hover:text-[#F6F8F6] text-left transition-colors">For Communities</button>
          <button onClick={() => { setCurrentPage('education'); window.scrollTo(0,0); }} className="hover:text-[#F6F8F6] text-left transition-colors">For Education</button>
          <button onClick={() => { setCurrentPage('enterprise'); window.scrollTo(0,0); }} className="hover:text-[#F6F8F6] text-left transition-colors">For Enterprise</button>
        </div>
        <div className="flex flex-col space-y-4">
          <span className="text-[#F6F8F6] font-medium mb-2 tracking-wide text-sm">Company</span>
          <button onClick={() => { setCurrentPage('about'); window.scrollTo(0,0); }} className="hover:text-[#F6F8F6] text-left transition-colors">About Us</button>
          <button onClick={() => { setCurrentPage('facilitators'); window.scrollTo(0,0); }} className="hover:text-[#F6F8F6] text-left transition-colors">Our Facilitators</button>
          <button onClick={() => { setCurrentPage('case-studies'); window.scrollTo(0,0); }} className="hover:text-[#F6F8F6] text-left transition-colors">Case Studies</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-[#526656] font-light">
      <p>© {new Date().getFullYear()} Peerforum. All rights reserved.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-[#F6F8F6] transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-[#F6F8F6] transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

// --- REUSABLE SECTIONS ---
const StatBar = ({ stats }) => (
  <section aria-label="Key Statistics" className="border-y border-[#D3DCD4] bg-[#F6F8F6]">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#D3DCD4]">
      {stats.map((stat, idx) => (
        <Reveal key={idx} delay={idx * 150} direction="scale" className="p-10 text-center">
          <div className="font-serif text-4xl md:text-5xl font-medium text-[#225430] mb-2">
            <AnimatedCounter value={stat.value} delay={idx * 150} />
          </div>
          <div className="text-sm text-[#526656] font-medium uppercase tracking-wider">{stat.label}</div>
        </Reveal>
      ))}
    </div>
  </section>
);

const CaseStudyBox = ({ delay, value, suffix, label, sublabel, theme = 'light' }) => {
  const isDark = theme === 'dark';
  return (
    <Reveal delay={delay} direction="up" className={`p-6 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center min-h-[140px] elegant-hover transition-colors ${isDark ? 'bg-[#225430] border border-[#326B42] hover:bg-[#0A1C12]' : 'bg-[#FAFAFA] border border-[#D3DCD4] hover:bg-[#EBF0EC]'}`}>
      <div className={`font-serif text-3xl md:text-4xl mb-2 flex items-baseline justify-center ${isDark ? 'text-[#F6F8F6]' : 'text-[#225430]'}`}>
        {typeof value === 'string' || typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
        {suffix && <span className={`text-sm ml-1 opacity-80 ${isDark ? 'text-[#D3DCD4]' : 'text-[#526656]'}`}>{suffix}</span>}
      </div>
      <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-[#D3DCD4]' : 'text-[#0A1C12]'}`}>
        {label}
      </div>
      {sublabel && (
        <div className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${isDark ? 'text-[#D3DCD4]/70' : 'text-[#526656]'}`}>
          {sublabel}
        </div>
      )}
    </Reveal>
  );
};

// --- PAGE VIEWS ---

const Home = ({ setCurrentPage }) => (
  <main className="fade-in pt-32 md:pt-48 pb-0">
    <SEO 
      title="Scale Peer Coaching Groups" 
      description="Peerforum designs, operates, and runs high-end peer coaching groups for enterprise, education, and premium communities."
      path=""
    />
    
    {/* Hero */}
    <header className="px-6 md:px-12 max-w-5xl mx-auto text-center mb-32 md:mb-40">
      <Reveal direction="up">
        <h2 className="text-[#225430] font-semibold tracking-widest text-xs uppercase mb-6 flex items-center justify-center gap-3">
          <span className="w-6 h-[1px] bg-[#225430]"></span> Peer Coaching Groups at Scale <span className="w-6 h-[1px] bg-[#225430]"></span>
        </h2>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[84px] font-medium tracking-tight leading-[1.05] mb-8 text-[#0A1C12]">
          Scale peer groups.<br />
          <span className="italic text-[#526656]">Without the pain.</span>
        </h1>
        <p className="text-lg md:text-[22px] text-[#526656] font-light max-w-3xl mx-auto leading-relaxed mb-12 float-slow">
          Powered by the top 1% of facilitators. We design, operate, and run peer coaching groups for the world's most ambitious organizations.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" className="w-full sm:w-auto text-base px-8 py-4">Talk to Us</Button>
          <Button variant="secondary" className="w-full sm:w-auto text-base px-8 py-4 border-[#D3DCD4]">See How It Works</Button>
        </div>
      </Reveal>
    </header>

    <StatBar stats={[
      { value: "50K+", label: "Leaders in forums" },
      { value: "500+", label: "Organizations served" },
      { value: "94%", label: "Participant Satisfaction" },
      { value: "12x", label: "More cost-effective than 1:1" }
    ]} />

    {/* The Problem / Solution Split */}
    <section aria-labelledby="challenge-heading" className="px-6 md:px-12 py-32 bg-[#F6F8F6]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <Reveal direction="left">
            <h2 id="challenge-heading" className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">The Challenge</h2>
            <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
              Peer groups work.<br/>Scaling them doesn't.
            </h3>
            <p className="text-[#526656] text-lg font-light leading-relaxed mb-10">
              You know peer coaching groups create transformative outcomes. But running them at scale — the design, the matching, the facilitation, the operations — is a different challenge entirely.
            </p>
          </Reveal>
          <div className="space-y-8">
            {[
              { title: "Finding great facilitators is hard", desc: "Peer group facilitation is a specialized skill. Building a bench of qualified coaches takes years." },
              { title: "Program design is complex", desc: "Group composition, session structure, cadence — getting the design right requires deep experience." },
              { title: "Operations become overwhelming", desc: "Matching, scheduling, onboarding, tracking engagement — the logistics multiply exponentially." },
              { title: "Quality drops as you grow", desc: "What works for 5 groups falls apart at 50. Without a proven system, the personal touch disappears." }
            ].map((pain, idx) => (
              <Reveal key={idx} direction="left" delay={idx * 150} className="border-l-[3px] border-[#225430] pl-6">
                <h4 className="font-serif text-xl font-medium mb-2 text-[#0A1C12]">{pain.title}</h4>
                <p className="text-[#526656] font-light text-base leading-relaxed">{pain.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal direction="right" delay={200}>
          <div className="bg-[#0A1C12] text-[#F6F8F6] p-12 md:p-16 rounded-[2rem] shadow-xl elegant-hover">
            <h2 className="text-[#225430] font-semibold tracking-widest text-xs uppercase mb-6">The Peerforum Way</h2>
            <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-8 leading-tight">
              We don't give you a tool. We run your peer groups for you.
            </h3>
            <p className="text-[#D3DCD4] font-light text-lg leading-relaxed mb-6">
              Peerforum is a full-service provider of peer coaching groups at scale. We design the program, manage the operations, and facilitate every session with our own network of expert coaches.
            </p>
            <p className="text-[#D3DCD4] font-light text-lg leading-relaxed border-t border-[#526656]/30 pt-6">
              The result: a turnkey peer coaching program that scales from 5 groups to 500, with the same intimacy and impact in every room.
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* How It Works */}
    <section aria-labelledby="methodology-heading" className="px-6 md:px-12 py-32 bg-[#EBF0EC] border-y border-[#D3DCD4]">
      <div className="max-w-7xl mx-auto">
        <Reveal direction="down" className="text-center mb-20 max-w-3xl mx-auto">
          <h2 id="methodology-heading" className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">How It Works</h2>
          <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
            We design it. We run it. We facilitate it.
          </h3>
          <p className="text-[#526656] text-lg font-light leading-relaxed">
            From program architecture to facilitation, our team handles every layer of your peer coaching program.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { num: "01", title: "We design the program", desc: "Our team architects your peer group model — group composition, session structure, facilitation methodology, and success metrics." },
            { num: "02", title: "We run the operations", desc: "Matching, scheduling, onboarding, and engagement tracking — our operations team manages the logistics so you don't have to." },
            { num: "03", title: "We facilitate every session", desc: "Our network of expert facilitators leads every group with a proven methodology. Consistent quality, every session, at any scale." }
          ].map((step, idx) => (
            <Reveal key={idx} delay={idx * 150} direction="up">
              <div className="bg-[#F6F8F6] border border-[#D3DCD4] p-10 rounded-[2rem] h-full elegant-hover">
                <div className="font-serif text-5xl text-[#225430] opacity-20 mb-6 float-slow">{step.num}</div>
                <h4 className="font-serif text-2xl font-medium mb-4 text-[#0A1C12]">{step.title}</h4>
                <p className="text-[#526656] font-light leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Our Facilitators Summary */}
    <section aria-labelledby="facilitators-heading" className="px-6 md:px-12 py-32 bg-[#0A1C12] text-[#F6F8F6]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5">
          <Reveal direction="left">
            <h2 id="facilitators-heading" className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">Our Facilitators</h2>
            <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#F6F8F6] leading-tight">
              Experts in group dynamics and coaching.
            </h3>
            <p className="text-[#D3DCD4] text-lg font-light leading-relaxed mb-8">
              We don't just provide moderators. Our global network consists of heavily vetted executive coaches and behavioral experts, trained specifically in the Peerforum methodology to extract maximum value from every session.
            </p>
            <Button variant="tertiary" className="px-8 py-4" onClick={() => { setCurrentPage('facilitators'); window.scrollTo(0,0); }}>
              Meet the Network
            </Button>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Executive Pedigree", desc: "Former founders, C-suite leaders, and ICF-certified coaches who understand the weight of leadership." },
              { title: "Masters of Friction", desc: "Trained to bypass small talk, manage dominant voices, and engineer productive vulnerability." },
              { title: "Top 1% Acceptance", desc: "Our rigorous vetting process ensures only elite practitioners lead our client forums." },
              { title: "Continuous Calibration", desc: "Facilitators receive ongoing supervision and quantitative feedback on group health." }
            ].map((feat, idx) => (
              <Reveal key={idx} delay={idx * 150} direction="right" className="bg-[#0A1C12] border border-[#526656]/30 p-8 rounded-2xl elegant-hover hover:border-[#D3DCD4]/30 transition-colors">
                <h4 className="font-serif text-xl font-medium mb-3 text-[#F6F8F6]">{feat.title}</h4>
                <p className="text-[#D3DCD4] font-light text-sm leading-relaxed">{feat.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Audiences */}
    <section aria-labelledby="audiences-heading" className="px-6 md:px-12 py-32 bg-[#F6F8F6]">
      <div className="max-w-7xl mx-auto">
        <Reveal direction="down" className="text-center mb-20">
          <h2 id="audiences-heading" className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">Who We Serve</h2>
          <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
            Built for organizations that invest in people.
          </h3>
        </Reveal>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Premium Communities', desc: 'Transform passive member networks into vibrant, engaged communities through facilitated forums.', route: 'community', icon: <Users size={24}/> },
            { title: 'Executive Education', desc: 'Sustain the momentum of your programs with a 1-year continuity forum that keeps alumni connected to their intellectual home.', route: 'education', icon: <BookOpen size={24}/> },
            { title: 'Enterprise Leadership', desc: 'Embed peer coaching into your leadership programs to democratize coaching, teach coaching skills, and build community.', route: 'enterprise', icon: <Building size={24}/> }
          ].map((card, idx) => (
            <Reveal key={idx} delay={idx * 150} direction="scale">
              <div 
                className="group cursor-pointer flex flex-col justify-between p-10 bg-[#F6F8F6] border border-[#D3DCD4] rounded-2xl elegant-hover h-full"
                onClick={() => { setCurrentPage(card.route); window.scrollTo(0,0); }}
              >
                <div>
                  <div className="w-12 h-12 bg-[#EBF0EC] rounded-full flex items-center justify-center text-[#225430] mb-8 float-slow">
                    {card.icon}
                  </div>
                  <h4 className="font-serif text-2xl font-medium mb-4 text-[#0A1C12]">{card.title}</h4>
                  <p className="text-[#526656] font-light leading-relaxed mb-8">{card.desc}</p>
                </div>
                <div className="flex items-center text-sm font-medium text-[#225430] group-hover:text-[#0A1C12] transition-colors mt-auto">
                  Explore Solutions <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </main>
);

const Community = () => (
  <main className="fade-in pt-32 md:pt-48 pb-0 bg-[#F6F8F6]">
    <SEO 
      title="For Premium Communities" 
      description="Turn passive networks into high-value ecosystems using facilitated peer forums."
      path="community"
      keywords="community building, SHRM, YPO, Vistage, forum model, member retention"
    />
    <header className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-32">
      <Reveal direction="down">
        <h2 className="text-[#225430] font-semibold tracking-widest text-xs uppercase mb-6">For Premium Communities</h2>
        <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-8 text-[#0A1C12]">
          Forums are the key to <span className="italic text-[#526656]">high-value</span> communities.
        </h1>
        <p className="text-xl md:text-[22px] text-[#526656] font-light leading-relaxed mb-10">
          We design, operate, and facilitate peer forums that turn your casual members into a deeply bonded, thriving community.
        </p>
        <Button variant="primary" className="text-base px-8 py-4">Build Your Community</Button>
      </Reveal>
    </header>

    {/* Top Networks Banner */}
    <section aria-label="Partner Networks" className="px-6 md:px-12 py-12 bg-[#EBF0EC] border-y border-[#D3DCD4] overflow-hidden">
      <Reveal direction="up" className="max-w-7xl mx-auto text-center">
        <p className="text-sm font-semibold tracking-widest text-[#526656] uppercase mb-8">Every top-tier network uses forums as their core value proposition</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale float-slow">
          <span className="font-serif text-2xl font-bold text-[#0A1C12]">YPO</span>
          <span className="font-serif text-2xl font-bold text-[#0A1C12]">Chief</span>
          <span className="font-serif text-2xl font-bold text-[#0A1C12]">Vistage</span>
          <span className="font-serif text-2xl font-bold text-[#0A1C12]">Hampton</span>
          <span className="font-serif text-2xl font-bold text-[#0A1C12]">Tiger 21</span>
          <span className="font-serif text-2xl font-bold text-[#0A1C12]">SHRM</span>
        </div>
      </Reveal>
    </section>

    {/* Before / After Contrast */}
    <section aria-label="Before and After Forums" className="px-6 md:px-12 py-24 bg-[#F6F8F6]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2">
        <Reveal direction="left" className="bg-[#F6F8F6] p-12 md:p-16 border border-[#D3DCD4] rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-sm">
          <h2 className="text-[#526656] font-medium tracking-widest text-xs uppercase mb-4">Without Forums</h2>
          <h3 className="font-serif text-3xl font-medium text-[#0A1C12] mb-10">The typical community problem.</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-medium text-[#0A1C12] mb-2 flex items-center gap-2"><X size={18} className="text-red-800/60"/> Low engagement after launch</h4>
              <p className="text-[#526656] font-light text-sm leading-relaxed">Members sign up, attend the first event, then quietly disappear. The community becomes a ghost town.</p>
            </div>
            <div>
              <h4 className="font-medium text-[#0A1C12] mb-2 flex items-center gap-2"><X size={18} className="text-red-800/60"/> Low willingness to pay</h4>
              <p className="text-[#526656] font-light text-sm leading-relaxed">Members resist price increases because the exact ROI of the community is unquantifiable.</p>
            </div>
            <div>
              <h4 className="font-medium text-[#0A1C12] mb-2 flex items-center gap-2"><X size={18} className="text-red-800/60"/> Commodity perceived value</h4>
              <p className="text-[#526656] font-light text-sm leading-relaxed">Viewed as just another Slack channel, newsletter, or event schedule competing for their time.</p>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={200} className="bg-[#0A1C12] p-12 md:p-16 border border-[#0A1C12] rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none shadow-xl">
          <h2 className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">With Peerforum</h2>
          <h3 className="font-serif text-3xl font-medium text-[#F6F8F6] mb-10">The forum-driven community.</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-medium text-[#F6F8F6] mb-2 flex items-center gap-2"><CheckCircle2 size={18} className="text-[#225430]"/> Monthly commitment</h4>
              <p className="text-[#D3DCD4] font-light text-sm leading-relaxed">Our facilitators lead small groups regularly. It's a recurring rhythm that builds habit and belonging.</p>
            </div>
            <div>
              <h4 className="font-medium text-[#F6F8F6] mb-2 flex items-center gap-2"><CheckCircle2 size={18} className="text-[#225430]"/> High willingness to pay</h4>
              <p className="text-[#D3DCD4] font-light text-sm leading-relaxed">Members gladly pay premium tier pricing for access to a confidential, facilitated forum.</p>
            </div>
            <div>
              <h4 className="font-medium text-[#F6F8F6] mb-2 flex items-center gap-2"><CheckCircle2 size={18} className="text-[#225430]"/> Indispensable perceived value</h4>
              <p className="text-[#D3DCD4] font-light text-sm leading-relaxed">The forum isn't a channel; it acts as their personal Board of Advisors for their career and life.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    <StatBar stats={[
      { value: "3.2x", label: "Higher retention" },
      { value: "91%", label: "Find it most valuable" },
      { value: "78%", label: "NPS Increase" },
      { value: "$0", label: "Operational burden" }
    ]} />

    <section aria-labelledby="why-forums-work" className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
      <Reveal direction="down" className="mb-20">
        <h2 id="why-forums-work" className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">Why Forums Work</h2>
        <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
          The forum model changes everything.
        </h3>
        <p className="text-[#526656] text-lg font-light leading-relaxed max-w-2xl">
          Forums aren't just another engagement tactic. They're a fundamentally different way to build community — one that creates real value for members.
        </p>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-8">
        {[
          { title: "Intimacy at scale", desc: "We design and facilitate hundreds of forums simultaneously while maintaining the small-group experience that makes each one transformative." },
          { title: "Revenue engine", desc: "Forums become a premium tier of your community — a high-value offering members are willing to pay for. Create sustainable revenue." },
          { title: "Engagement flywheel", desc: "Forum members engage more with the broader community too. They attend more events, contribute more content, and bring referrals." },
          { title: "Data you can act on", desc: "See which topics resonate, which members are most engaged, and where your community is growing based on aggregate forum insights." }
        ].map((val, idx) => (
          <Reveal key={idx} delay={idx * 150} direction="up" className="p-10 border border-[#D3DCD4] bg-[#F6F8F6] rounded-[2rem] elegant-hover">
            <h4 className="font-serif text-2xl font-medium mb-4 text-[#0A1C12]">{val.title}</h4>
            <p className="text-[#526656] font-light leading-relaxed">{val.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  </main>
);

const Education = () => (
  <main className="fade-in pt-32 md:pt-48 pb-0 bg-[#F6F8F6]">
    <SEO 
      title="For Executive Education" 
      description="Extend the lifecycle of executive education programs with 1-year continuity forums."
      path="education"
      keywords="executive education, alumni continuity, peer learning, post-program engagement"
    />
    <header className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-32">
      <Reveal direction="down">
        <h2 className="text-[#225430] font-semibold tracking-widest text-xs uppercase mb-6">For Executive Education</h2>
        <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-8 text-[#0A1C12]">
          Sustain the momentum of <span className="italic text-[#526656]">transformative growth.</span>
        </h1>
        <p className="text-xl md:text-[22px] text-[#526656] font-light leading-relaxed mb-10">
          A 1-year continuity program that begins the moment your core program ends. Prevent post-program isolation and keep the university as their lifelong intellectual home.
        </p>
        <Button variant="primary" className="text-base px-8 py-4">Explore Continuity</Button>
      </Reveal>
    </header>

    {/* The Cliff Timeline */}
    <section aria-labelledby="education-challenge" className="px-6 md:px-12 py-32 bg-[#EBF0EC] border-y border-[#D3DCD4]">
      <div className="max-w-7xl mx-auto">
        <Reveal direction="down" className="text-center mb-24">
          <h2 id="education-challenge" className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">The Challenge</h2>
          <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
            The abrupt return to leadership.
          </h3>
          <p className="text-[#526656] text-lg font-light leading-relaxed max-w-3xl mx-auto">
            Executive education ignites transformative growth through deep learning and powerful connections. But the abrupt return to the demands of leadership often breaks this momentum, leaving a void where isolation can erode the program's full potential.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-6 left-12 right-12 h-[2px] bg-gradient-to-r from-[#0A1C12] via-[#D3DCD4] to-[#225430] z-0 shimmer"></div>
          
          <Reveal direction="up" delay={100} className="relative z-10 pt-10 text-center">
            <div className="w-4 h-4 bg-[#0A1C12] rounded-full mx-auto mb-6 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[7px]"></div>
            <h4 className="font-serif text-xl font-medium mb-3 text-[#0A1C12]">Program Active</h4>
            <p className="text-[#526656] font-light text-sm leading-relaxed px-4">Ignited growth. Participants are immersed, deeply connected, and driven by dynamic peer learning.</p>
          </Reveal>
          
          <Reveal direction="up" delay={300} className="relative z-10 pt-10 text-center">
            <div className="w-4 h-4 bg-[#D3DCD4] border-2 border-[#0A1C12] rounded-full mx-auto mb-6 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[7px]"></div>
            <h4 className="font-serif text-xl font-medium mb-3 text-[#526656]">Abrupt Isolation</h4>
            <p className="text-[#526656] font-light text-sm leading-relaxed px-4">Back to the grind. Drowning in urgent tasks with no room to think. The vanishing cohort effect takes over.</p>
          </Reveal>

          <Reveal direction="up" delay={500} className="relative z-10 pt-10 text-center">
            <div className="w-6 h-6 bg-[#225430] rounded-full mx-auto mb-6 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[11px] ring-4 ring-[#225430]/20"></div>
            <h4 className="font-serif text-xl font-medium mb-3 text-[#225430]">1-Year Continuity Forum</h4>
            <p className="text-[#0A1C12] font-light text-sm leading-relaxed px-4">Sustained momentum. A structured 1-year program keeps the bond alive and provides a dedicated space for reflection.</p>
          </Reveal>
        </div>
      </div>
    </section>

    {/* Comparison Table / Grid */}
    <section aria-labelledby="network-decay" className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
      <Reveal direction="down" className="mb-16">
        <h2 id="network-decay" className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">The Difference</h2>
        <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
          Don't let the network decay.
        </h3>
      </Reveal>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Reveal direction="left" delay={100} className="bg-[#F6F8F6] border border-[#D3DCD4] p-10 rounded-2xl">
          <h4 className="font-serif text-2xl text-[#526656] mb-8">Without Continuity</h4>
          <div className="space-y-6">
            <div className="flex justify-between border-b border-[#D3DCD4] pb-4"><span className="text-[#526656] font-light">Rapid network decay</span> <span className="font-medium text-[#0A1C12]"><X size={18} className="text-red-800/60"/></span></div>
            <div className="flex justify-between border-b border-[#D3DCD4] pb-4"><span className="text-[#526656] font-light">Lonely reality of driving change solo</span> <span className="font-medium text-[#0A1C12]"><X size={18} className="text-red-800/60"/></span></div>
            <div className="flex justify-between border-b border-[#D3DCD4] pb-4"><span className="text-[#526656] font-light">Diminishing bond with the university</span> <span className="font-medium text-[#0A1C12]"><X size={18} className="text-red-800/60"/></span></div>
            <div className="flex justify-between border-b border-[#D3DCD4] pb-4"><span className="text-[#526656] font-light">Missed opportunity for lasting impact</span> <span className="font-medium text-[#0A1C12]"><X size={18} className="text-red-800/60"/></span></div>
          </div>
        </Reveal>
        <Reveal direction="right" delay={200} className="bg-[#0A1C12] border border-[#0A1C12] p-10 rounded-2xl shadow-xl">
          <h4 className="font-serif text-2xl text-[#F6F8F6] mb-8">With 1-Year Continuity Forum</h4>
          <div className="space-y-6">
            <div className="flex justify-between border-b border-[#526656]/30 pb-4"><span className="text-[#D3DCD4] font-light">Structured, regular touchpoints</span> <span className="font-medium text-[#225430]"><CheckCircle2 size={18}/></span></div>
            <div className="flex justify-between border-b border-[#526656]/30 pb-4"><span className="text-[#D3DCD4] font-light">Dynamic, ongoing peer collaboration</span> <span className="font-medium text-[#225430]"><CheckCircle2 size={18}/></span></div>
            <div className="flex justify-between border-b border-[#526656]/30 pb-4"><span className="text-[#D3DCD4] font-light">University remains their intellectual home</span> <span className="font-medium text-[#225430]"><CheckCircle2 size={18}/></span></div>
            <div className="flex justify-between border-b border-[#526656]/30 pb-4"><span className="text-[#D3DCD4] font-light">Sustained ROI and continuous growth</span> <span className="font-medium text-[#225430]"><CheckCircle2 size={18}/></span></div>
          </div>
        </Reveal>
      </div>
    </section>
  </main>
);

const Enterprise = () => (
  <main className="fade-in pt-32 md:pt-48 pb-0 bg-[#F6F8F6]">
    <SEO 
      title="Enterprise Peer Coaching" 
      description="Embed facilitated peer coaching groups directly into enterprise leadership programs."
      path="enterprise"
      keywords="enterprise peer coaching, leadership development at scale, democratize coaching, cross-functional empathy"
    />
    <header className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-32">
      <Reveal direction="down">
        <h2 className="text-[#225430] font-semibold tracking-widest text-xs uppercase mb-6">For Enterprise</h2>
        <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-8 text-[#0A1C12]">
          Democratize coaching. <span className="italic text-[#526656]">Build community.</span>
        </h1>
        <p className="text-xl md:text-[22px] text-[#526656] font-light leading-relaxed mb-10">
          Embed facilitated peer coaching groups directly into your leadership programs. Transform leadership from an isolated challenge into a continuous, supported journey.
        </p>
        <Button variant="primary" className="text-base px-8 py-4">Talk to Us</Button>
      </Reveal>
    </header>

    {/* Strong Claim */}
    <section aria-labelledby="strong-claim" className="px-6 md:px-12 py-24 bg-[#EBF0EC] border-y border-[#D3DCD4] text-center">
       <Reveal direction="scale">
         <h2 id="strong-claim" className="font-serif text-3xl md:text-5xl text-[#0A1C12] max-w-4xl mx-auto leading-tight float-slow">
            Unlock collective wisdom:<br/>
            <span className="italic text-[#225430]">Peer coaching turns shared challenges into accelerated leadership growth.</span>
         </h2>
       </Reveal>
    </section>

    {/* 1:1 vs Peer Coaching Comparison */}
    <section aria-labelledby="comparison-heading" className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
      <Reveal direction="down" className="mb-16">
        <h2 id="comparison-heading" className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">The Comparison</h2>
        <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
          1:1 Coaching vs. Peer Coaching
        </h3>
      </Reveal>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Reveal direction="left" delay={100} className="bg-[#F6F8F6] border border-[#D3DCD4] p-10 rounded-2xl">
          <h4 className="font-serif text-2xl text-[#526656] mb-8">Traditional 1:1 Coaching</h4>
          <div className="space-y-6">
            <div className="flex flex-col border-b border-[#D3DCD4] pb-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#526656] mb-1">Context</span>
              <span className="font-medium text-[#0A1C12]">Isolated and highly individual. Reinforces the lonely reality of driving change.</span>
            </div>
            <div className="flex flex-col border-b border-[#D3DCD4] pb-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#526656] mb-1">Skill Building</span>
              <span className="font-medium text-[#0A1C12]">Theoretical discussion about how to lead others.</span>
            </div>
            <div className="flex flex-col border-b border-[#D3DCD4] pb-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#526656] mb-1">Organizational Impact</span>
              <span className="font-medium text-[#0A1C12]">Individual growth only. Zero cross-functional visibility.</span>
            </div>
            <div className="flex flex-col border-b border-[#D3DCD4] pb-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#526656] mb-1">Scalability</span>
              <span className="font-medium text-[#0A1C12]">Prohibitively expensive. Reserved strictly for the top 1% (C-Suite).</span>
            </div>
          </div>
        </Reveal>
        <Reveal direction="right" delay={200} className="bg-[#0A1C12] border border-[#0A1C12] p-10 rounded-2xl shadow-xl">
          <h4 className="font-serif text-2xl text-[#F6F8F6] mb-8">Peerforum Peer Coaching</h4>
          <div className="space-y-6">
            <div className="flex flex-col border-b border-[#526656]/30 pb-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#225430] mb-1">Context</span>
              <span className="font-medium text-[#D3DCD4]">Togetherness. A shared journey with peers facing the exact same organizational fires.</span>
            </div>
            <div className="flex flex-col border-b border-[#526656]/30 pb-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#225430] mb-1">Skill Building</span>
              <span className="font-medium text-[#D3DCD4]">Active practice. Leaders learn how to coach by actively coaching their peers.</span>
            </div>
            <div className="flex flex-col border-b border-[#526656]/30 pb-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#225430] mb-1">Organizational Impact</span>
              <span className="font-medium text-[#D3DCD4]">Organically dissolves silos and builds deep, cross-functional empathy.</span>
            </div>
            <div className="flex flex-col border-b border-[#526656]/30 pb-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#225430] mb-1">Scalability</span>
              <span className="font-medium text-[#D3DCD4]">Democratized. Highly scalable across thousands of middle managers and rising leaders.</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Outcomes & Journey */}
    <section aria-labelledby="continuous-support-heading" className="px-6 md:px-12 py-32 bg-[#EBF0EC] border-y border-[#D3DCD4]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <Reveal direction="left">
              <h2 id="continuous-support-heading" className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">Continuous Support</h2>
              <h3 className="font-serif text-3xl md:text-[36px] font-medium tracking-tight mb-8 text-[#0A1C12] leading-tight">
                Embed a 12-touchpoint rhythm.
              </h3>
              <p className="text-[#526656] text-lg font-light leading-relaxed mb-10">
                Drop peer coaching directly into your existing leadership tracks. Instead of episodic seminars, leaders get a continuous rhythm of shared problem-solving and mutual accountability.
              </p>
            </Reveal>
            <div className="grid grid-cols-2 gap-8">
              <Reveal direction="up" delay={100}>
                <div className="font-serif text-4xl text-[#225430] mb-2"><AnimatedCounter value="12" /></div>
                <p className="text-sm text-[#526656] font-medium leading-relaxed">Continuous monthly touchpoints</p>
              </Reveal>
              <Reveal direction="up" delay={200}>
                <div className="font-serif text-4xl text-[#225430] mb-2">Deep</div>
                <p className="text-sm text-[#526656] font-medium leading-relaxed">Community and cultural glue built</p>
              </Reveal>
              <Reveal direction="up" delay={300}>
                <div className="font-serif text-4xl text-[#225430] mb-2">Active</div>
                <p className="text-sm text-[#526656] font-medium leading-relaxed">Coaching skills learned through practice</p>
              </Reveal>
              <Reveal direction="up" delay={400}>
                <div className="font-serif text-4xl text-[#225430] mb-2">Cross</div>
                <p className="text-sm text-[#526656] font-medium leading-relaxed">Functional silos organically dissolved</p>
              </Reveal>
            </div>
          </div>
          
          <div className="bg-[#F6F8F6] border border-[#D3DCD4] p-10 rounded-3xl">
            <Reveal direction="right">
              <h3 className="font-serif text-2xl font-medium mb-8 text-[#0A1C12]">How we integrate with your programs.</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#EBF0EC] flex items-center justify-center text-sm font-serif text-[#526656] shrink-0">1</div>
                  <div>
                    <h4 className="font-medium text-[#0A1C12] mb-1">Align with Curriculum</h4>
                    <p className="text-sm text-[#526656] font-light leading-relaxed">We map our peer forum architecture directly to the themes and milestones of your existing L&D tracks.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#EBF0EC] flex items-center justify-center text-sm font-serif text-[#526656] shrink-0">2</div>
                  <div>
                    <h4 className="font-medium text-[#0A1C12] mb-1">Expert Facilitation</h4>
                    <p className="text-sm text-[#526656] font-light leading-relaxed">Our elite coaches step in to run the 12 touchpoints, ensuring high-quality, vulnerability-driven dialogue.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#0A1C12] flex items-center justify-center text-sm font-serif text-[#F6F8F6] shrink-0 shadow-sm">3</div>
                  <div>
                    <h4 className="font-medium text-[#0A1C12] mb-1">Skill Transfer</h4>
                    <p className="text-sm text-[#526656] font-light leading-relaxed">Through guided observation and practice, your leaders actively learn how to coach their own teams.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  </main>
);

const Facilitators = () => (
  <main className="fade-in pt-32 md:pt-48 pb-0 bg-[#F6F8F6]">
    <SEO 
      title="Top 1% Facilitators" 
      description="Peerforum curates the top 1% of executive coaches and behavioral experts in the world to guide your peer groups."
      path="facilitators"
      keywords="executive coaches, peer group facilitators, group dynamics, Peerforum facilitators"
    />
    {/* Hero Section */}
    <header className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-32">
      <Reveal direction="down">
        <h2 className="text-[#225430] font-semibold tracking-widest text-xs uppercase mb-6">Our Facilitators</h2>
        <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-8 text-[#0A1C12]">
          Masters of <span className="italic text-[#526656]">group dynamics.</span>
        </h1>
        <p className="text-xl md:text-[22px] text-[#526656] font-light leading-relaxed mb-10 float-slow">
          We don't hire event moderators. We curate the top 1% of executive coaches and behavioral experts in the world to architect profound breakthroughs.
        </p>
        <Button variant="primary" className="text-base px-8 py-4">Meet the Network</Button>
      </Reveal>
    </header>

    {/* The 1% Standard */}
    <section aria-labelledby="acceptance-rate-heading" className="px-6 md:px-12 py-32 bg-[#0A1C12] text-[#F6F8F6]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <Reveal direction="left">
          <div className="font-serif text-[120px] leading-none text-[#225430] mb-6"><AnimatedCounter value="1" />%</div>
          <h3 id="acceptance-rate-heading" className="font-serif text-3xl md:text-[36px] font-medium tracking-tight mb-6 text-[#F6F8F6] leading-tight">
            The acceptance rate for<br/>Peerforum facilitators.
          </h3>
          <p className="text-[#D3DCD4] text-lg font-light leading-relaxed">
            Our vetting process is grueling by design. We look beyond ICF certifications and impressive resumes. We test for presence, the ability to manage conflict, and the courage to ask the uncomfortable questions that unlock true growth.
          </p>
        </Reveal>
        
        <div className="space-y-6">
          {[
            { step: "01", title: "Clinical & Executive Background", desc: "Our candidates must possess deep experience in executive coaching, organizational psychology, or as former C-Suite operators." },
            { step: "02", title: "Live Behavioral Auditions", desc: "Candidates facilitate simulated, high-friction peer groups where we intentionally introduce difficult personalities and dominant voices." },
            { step: "03", title: "Methodology Certification", desc: "Accepted facilitators undergo rigorous training in the proprietary Peerforum framework for bypassing small talk and engineering vulnerability." },
            { step: "04", title: "Continuous Calibration", desc: "Every session is evaluated. Facilitators receive ongoing supervision, peer reviews, and quantitative feedback on group health." }
          ].map((item, idx) => (
            <Reveal key={idx} delay={idx * 150} direction="right" className="bg-[#0A1C12] border border-[#526656]/30 p-8 rounded-2xl flex gap-6">
              <div className="text-[#225430] font-serif text-xl font-medium mt-1">{item.step}</div>
              <div>
                <h4 className="font-medium text-[#F6F8F6] mb-2">{item.title}</h4>
                <p className="text-sm text-[#D3DCD4] font-light leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Facilitator Archetypes */}
    <section aria-labelledby="facilitator-profile" className="px-6 md:px-12 py-32 bg-[#F6F8F6]">
      <div className="max-w-7xl mx-auto">
        <Reveal direction="down" className="text-center mb-20">
          <h2 id="facilitator-profile" className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">The Profile</h2>
          <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
            What makes a Peerforum coach?
          </h3>
          <p className="text-[#526656] text-lg font-light leading-relaxed max-w-2xl mx-auto">
            The power of a peer group relies entirely on the person guiding it. Our network is defined by three non-negotiable traits.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Executive Pedigree", desc: "They have sat in the seat. Our network includes former founders, SVPs, and leaders who understand the weight of executive decision-making. They don't just speak the language; they have lived the isolating reality of leadership." },
            { title: "Masters of Friction", desc: "A good moderator avoids conflict; a Peerforum coach leans into it. They are specifically trained to manage dominant personalities, draw out quiet members, and engineer the productive friction necessary for breakthroughs." },
            { title: "Unflinching Candor", desc: "They bypass superficial networking and small talk immediately. They ask the questions peers are often too polite to ask each other, forcing groups into states of extreme vulnerability and high-signal problem solving." }
          ].map((trait, idx) => (
            <Reveal key={idx} delay={idx * 150} direction="up" className="p-10 border border-[#D3DCD4] bg-[#EBF0EC] rounded-[2rem] elegant-hover">
              <h4 className="font-serif text-2xl font-medium mb-4 text-[#0A1C12]">{trait.title}</h4>
              <p className="text-[#526656] font-light leading-relaxed">{trait.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Facilitator Roster Grid */}
    <section aria-labelledby="roster-heading" className="px-6 md:px-12 py-32 bg-[#EBF0EC] border-y border-[#D3DCD4]">
      <div className="max-w-7xl mx-auto">
        <Reveal direction="down" className="mb-16 text-center">
          <h2 id="roster-heading" className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">Our Roster</h2>
          <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
            The faces behind the breakthroughs.
          </h3>
          <p className="text-[#526656] text-lg font-light leading-relaxed max-w-2xl mx-auto">
            A diverse, global bench of elite coaches, former executives, and behavioral experts.
          </p>
        </Reveal>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {Array.from({ length: 16 }).map((_, i) => (
            <Reveal key={i} delay={(i % 4) * 100} direction="scale" className="aspect-square relative rounded-xl overflow-hidden group border border-[#D3DCD4] shadow-sm">
              <img 
                src={`https://i.pravatar.cc/300?img=${(i * 3) + 10}`} 
                alt="Facilitator Portrait" 
                loading="lazy"
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-[#225430] mix-blend-multiply opacity-40 group-hover:opacity-10 transition-opacity duration-700"></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </main>
);

const About = () => (
  <main className="fade-in pt-32 md:pt-48 pb-32 bg-[#F6F8F6]">
    <SEO 
      title="About Peerforum" 
      description="Peerforum was built to solve the profound isolation of leadership by delivering collective intelligence and togetherness at scale."
      path="about"
      keywords="leadership isolation, founder story, peerforum history, collective intelligence"
    />
    <article className="px-6 md:px-12 max-w-3xl mx-auto">
      <Reveal direction="up">
        <div className="bg-[#FAFAFA] border border-[#D3DCD4] p-12 md:p-20 rounded-sm shadow-sm relative elegant-hover">
          
          <header className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-[#0A1C12] mb-4">A letter on isolation.</h1>
            <div className="w-16 h-[2px] bg-[#225430]"></div>
          </header>

          <div className="space-y-6 font-serif text-[19px] text-[#0A1C12] leading-relaxed">
            <p>Dear Leader,</p>
            
            <p>The world of leadership has fundamentally changed.</p>

            <p>Accelerated by the pandemic and the permanent shift to distributed work, the natural collisions and organic mentorship that used to define executive growth have vanished.</p>

            <p>Today, leaders are operating in unprecedented isolation. You are expected to navigate complex, structural challenges—shifting market dynamics, team burnout, strategic pivots—with less visibility and less human support than ever before. The higher you climb, the harder it is to find objective, unfiltered feedback from people who genuinely understand the weight of your decisions.</p>

            <p>You cannot always share your deepest doubts with your board without triggering panic. You cannot workshop sensitive changes with your subordinates. And friends outside your industry rarely grasp the nuance of the fires you are fighting.</p>

            <p>But when you remove that isolation—when you put a leader in a room with true peers who understand the exact burden of their seat, guided by an expert who knows how to bypass small talk—the transformation is profound.</p>

            <p>We built Peerforum because standard networking has become superficial, and 1-on-1 coaching often reinforces the lonely reality of driving change. We engineered a system to deliver collective intelligence and togetherness at scale.</p>

            <p>It is the community we wished we had. And we are honored to build it for you.</p>

            <footer className="pt-8">
              <span className="font-sans font-bold text-sm tracking-widest text-[#225430] uppercase">The Founders, Peerforum</span>
            </footer>
          </div>

        </div>
      </Reveal>
    </article>
  </main>
);

const CaseStudies = () => (
  <main className="fade-in pt-32 md:pt-48 pb-0 bg-[#F6F8F6]">
    <SEO 
      title="SHRM Executive Network Case Study" 
      description="Learn how the SHRM Executive Network built the largest, most engaged HR peer coaching community in the world using Peerforum."
      path="case-studies"
      keywords="SHRM Case Study, CHRO peer groups, HR executive network, Peerforum results"
    />
    
    {/* Featured Case Study: SHRM */}
    <section aria-labelledby="shrm-heading" className="px-6 md:px-12 pb-32">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <Reveal direction="down">
            <h2 className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">Featured Case Study</h2>
            <h3 id="shrm-heading" className="font-serif text-4xl md:text-[56px] font-medium tracking-tight text-[#0A1C12] leading-tight mb-6">
              Unlocking the #1 CHRO community in the world.
            </h3>
          </Reveal>
        </header>

        <div className="max-w-4xl mx-auto mb-16">
          <Reveal direction="up" delay={100}>
            <p className="text-lg text-[#526656] font-light leading-relaxed mb-6">
              When the <strong>SHRM Executive Network</strong> set out to create the ultimate destination for the world's top HR leaders, they recognized a fundamental truth: CHROs are profoundly isolated. They needed a confidential, high-trust environment to solve complex organizational challenges with true peers.
            </p>
            <p className="text-lg text-[#526656] font-light leading-relaxed">
              They partnered with Peerforum to architect and scale a solution. Peerforum became the operational engine and facilitation backbone for the entire initiative. By combining SHRM's unparalleled reach with Peerforum's proprietary matching taxonomy and top 1% executive coaches, they successfully launched a massive, highly curated peer coaching program.
            </p>
            <p className="text-lg text-[#0A1C12] font-medium leading-relaxed mt-8 border-l-[3px] border-[#225430] pl-6">
              Today, Peerforum acts as a key partner in managing a 1,000+ community of top HR executives across 70+ concurrent groups, cementing the program as the #1 most valued component of the SHRM Executive Network.
            </p>
          </Reveal>
        </div>

        {/* Wide Quote Banner */}
        <Reveal direction="scale" delay={200} className="mb-24 flex justify-center">
          <div className="w-full max-w-5xl bg-[#225430] border border-[#326B42] rounded-[2rem] flex items-center justify-center p-12 md:p-16 text-center shadow-xl relative overflow-hidden float-slow">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#326B42] rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-[#0A1C12] rounded-full blur-3xl opacity-50"></div>
            <Quote size={48} className="absolute top-8 left-8 text-[#326B42] opacity-30" aria-hidden="true" />
            <p className="font-serif text-2xl md:text-4xl text-[#F6F8F6] leading-tight relative z-10 max-w-3xl mx-auto">
              "Each month, hundreds of HR executives join their peer group to support one another."
            </p>
          </div>
        </Reveal>

        {/* 3 Columns Grid: Scale, Engagement, Impact */}
        <div className="grid lg:grid-cols-3 gap-10 md:gap-12 max-w-6xl mx-auto">
          
          {/* Column 1: Scale */}
          <div>
            <Reveal direction="left" delay={300}>
              <div className="flex items-center gap-3 mb-6 border-b border-[#D3DCD4] pb-4">
                <div className="w-2 h-2 bg-[#225430] rounded-full"></div>
                <h4 className="text-xs font-semibold tracking-widest text-[#526656] uppercase">Scale</h4>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              <CaseStudyBox delay={350} value="800+" label="Participants" />
              <CaseStudyBox delay={400} value="70+" label="Groups" />
              <CaseStudyBox delay={450} value="30+" label="Facilitators" />
              <CaseStudyBox delay={500} value="1000+" label="Sessions" sublabel="Run to Date" />
            </div>
          </div>

          {/* Column 2: Engagement */}
          <div>
            <Reveal direction="up" delay={400}>
              <div className="flex items-center gap-3 mb-6 border-b border-[#D3DCD4] pb-4">
                <div className="w-2 h-2 bg-[#225430] rounded-full"></div>
                <h4 className="text-xs font-semibold tracking-widest text-[#526656] uppercase">Engagement</h4>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              <CaseStudyBox delay={450} value="94%" label="Active" sublabel="Members" />
              <CaseStudyBox delay={500} value="4.6" suffix="/5" label="Facilitation" sublabel="Score" />
              <CaseStudyBox delay={550} value="70+" label="Monthly" sublabel="Sessions" />
              <CaseStudyBox delay={600} value="4.4" suffix="/5" label="Session" sublabel="Score" />
            </div>
          </div>

          {/* Column 3: Impact */}
          <div>
            <Reveal direction="right" delay={500}>
              <div className="flex items-center gap-3 mb-6 border-b border-[#D3DCD4] pb-4">
                <div className="w-2 h-2 bg-[#225430] rounded-full"></div>
                <h4 className="text-xs font-semibold tracking-widest text-[#526656] uppercase">Program Impact</h4>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              <CaseStudyBox delay={550} value="#1" label="Most Valued" sublabel="Component" theme="dark" />
              <CaseStudyBox delay={600} value="#1" label="Most Adopted" sublabel="Component" theme="dark" />
              <CaseStudyBox delay={650} value="#1" label="Most Active" sublabel="Participants" theme="dark" />
              <CaseStudyBox delay={700} value="#1" label="Driver Of" sublabel="Retention" theme="dark" />
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* SHRM Quotes Section */}
    <section aria-label="Testimonials" className="px-6 md:px-12 py-32 bg-[#0A1C12] text-[#F6F8F6]">
      <div className="max-w-7xl mx-auto">
        <Reveal direction="down" className="mb-16 text-center">
          <h2 className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">The Partnership</h2>
          <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight text-[#F6F8F6] leading-tight">
            In their own words.
          </h3>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8">
          <Reveal direction="up" delay={100} className="p-10 bg-[#F6F8F6]/5 border border-[#526656]/30 rounded-2xl flex flex-col justify-between elegant-hover hover:border-[#D3DCD4]/30">
            <div>
              <Quote size={32} className="text-[#225430] mb-6" aria-hidden="true" />
              <p className="text-[#D3DCD4] font-light leading-relaxed mb-8">
                "To build the world's most exclusive network for HR leaders, we needed a secure environment for vulnerable problem-solving. Peerforum provided the elite facilitators and operational backbone to scale this vision seamlessly. They are a critical partner in our community's success."
              </p>
            </div>
            <div>
              <div className="font-medium text-[#F6F8F6]">VP of Executive Network</div>
              <div className="text-xs tracking-widest text-[#526656] uppercase mt-1">SHRM Leadership</div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={200} className="p-10 bg-[#F6F8F6]/5 border border-[#526656]/30 rounded-2xl flex flex-col justify-between elegant-hover hover:border-[#D3DCD4]/30">
            <div>
              <Quote size={32} className="text-[#225430] mb-6" aria-hidden="true" />
              <p className="text-[#D3DCD4] font-light leading-relaxed mb-8">
                "My monthly forum is the one meeting I never cancel. Having a dedicated, expert facilitator completely changes the dynamic—we bypass small talk and get straight to the hardest issues without the usual corporate posturing."
              </p>
            </div>
            <div>
              <div className="font-medium text-[#F6F8F6]">Chief Human Resources Officer</div>
              <div className="text-xs tracking-widest text-[#526656] uppercase mt-1">SHRM Forum Participant</div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={300} className="p-10 bg-[#F6F8F6]/5 border border-[#526656]/30 rounded-2xl flex flex-col justify-between elegant-hover hover:border-[#D3DCD4]/30">
            <div>
              <Quote size={32} className="text-[#225430] mb-6" aria-hidden="true" />
              <p className="text-[#D3DCD4] font-light leading-relaxed mb-8">
                "The matching by Peerforum is incredibly precise. I am in a room with true peers who understand the exact scale and complexity of my challenges. It makes the isolating reality of executive leadership profoundly less lonely."
              </p>
            </div>
            <div>
              <div className="font-medium text-[#F6F8F6]">EVP of HR, Fortune 500</div>
              <div className="text-xs tracking-widest text-[#526656] uppercase mt-1">SHRM Forum Participant</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  </main>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    injectStyles();
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home setCurrentPage={setCurrentPage} />;
      case 'about': return <About />;
      case 'case-studies': return <CaseStudies />;
      case 'community': return <Community />;
      case 'education': return <Education />;
      case 'enterprise': return <Enterprise />;
      case 'facilitators': return <Facilitators />;
      default: return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#225430] selection:text-[#F6F8F6]">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
