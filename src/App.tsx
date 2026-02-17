import { useState, useEffect } from 'react';
import {
  TrendingUp, Users, ArrowRight, Menu, X, ShieldCheck, Zap,
  Search, Target, BarChart3, Globe, CheckCircle2, DollarSign, Rocket, Award, Building2, PieChart
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Animation Variants (Apple-style) ---
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
};

// --- Animated Section Wrapper ---
const AnimatedSection = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: delay } }
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// --- Animated Card with Hover ---
const AnimatedCard = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Parallax Bubble Components ---
const ParallaxBubble = ({
  size, opacity, initialX, initialY, speed
}: {
  size: number; opacity: number; initialX: string; initialY: string; speed: number;
}) => {
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 10000], [0, 10000 * speed]);
  const y = useSpring(rawY, { stiffness: 50, damping: 25 });

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: initialX,
        top: initialY,
        opacity: opacity,
        y,
        background: `radial-gradient(circle at 35% 35%, 
          rgba(255, 255, 255, 0.15) 0%, 
          rgba(255, 255, 255, 0.05) 15%, 
          rgba(0, 0, 0, 0.4) 45%, 
          rgba(255, 255, 255, 0.1) 85%, 
          rgba(255, 255, 255, 0.2) 100%)`,
        boxShadow: `
          inset -10px -10px 40px rgba(0, 0, 0, 0.5),
          inset 10px 10px 30px rgba(255, 255, 255, 0.05),
          0 30px 60px rgba(0, 0, 0, 0.4)
        `,
        backdropFilter: 'blur(5px) brightness(0.6)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    />
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      <ParallaxBubble size={580} opacity={0.4} initialX="70%" initialY="10%" speed={0.06} />
      <ParallaxBubble size={240} opacity={0.3} initialX="10%" initialY="15%" speed={0.1} />
      <ParallaxBubble size={400} opacity={0.25} initialX="85%" initialY="50%" speed={0.08} />
      <ParallaxBubble size={310} opacity={0.35} initialX="-5%" initialY="75%" speed={0.12} />
      <ParallaxBubble size={700} opacity={0.2} initialX="20%" initialY="85%" speed={0.05} />
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
};

// --- CONTENT COMPONENTS ---

const SectionHeader = ({ badge, title, subtitle, delay = 0 }: { badge?: string; title: string; subtitle?: string; delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className="text-center mb-16"
  >
    {badge && (
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="inline-block py-1.5 px-4 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
      >
        {badge}
      </motion.span>
    )}
    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{title}</h2>
    {subtitle && <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">{subtitle}</p>}
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, benefits, delay = 0 }: { icon: any; title: string; description: string; benefits?: string[]; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6, transition: { duration: 0.3 } }}
    className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all cursor-default"
  >
    <motion.div 
      className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-500"
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <Icon size={28} />
    </motion.div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 mb-4">{description}</p>
    {benefits && benefits.length > 0 && (
      <ul className="space-y-2">
        {benefits.map((benefit, i) => (
          <motion.li 
            key={i} 
            className="flex items-start gap-2 text-sm text-gray-300"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + 0.1 * i }}
          >
            <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            {benefit}
          </motion.li>
        ))}
      </ul>
    )}
  </motion.div>
);

import React from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <AnimatedBackground />

      {/* Navbar - Apple-style transform */}
      <motion.nav 
        className={cn(
          "fixed w-full z-50 px-6",
          scrolled ? "bg-black/80 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-8"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="p-2 bg-blue-600 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp size={20} />
            </motion.div>
            <span className="text-xl font-black tracking-tighter uppercase transition-opacity hover:opacity-80">Leads</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-2">
            <motion.button 
              onClick={() => setIsCommunityOpen(true)} 
              className="px-6 py-2.5 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-blue-500 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Community
            </motion.button>
            <motion.button 
              onClick={() => setIsWaitlistOpen(true)} 
              className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-gray-200 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Waitlist
            </motion.button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-400 transition-colors hover:text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: -20 }} 
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 md:hidden bg-black flex flex-col p-8 pt-24 text-center"
          >
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => {setIsCommunityOpen(true); setIsMenuOpen(false)}} 
              className="mb-8 px-8 py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all"
            >
              Community
            </motion.button>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => {setIsWaitlistOpen(true); setIsMenuOpen(false)}} 
              className="mt-8 px-8 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              Join Waitlist
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* OPENING SECTION - Hero with staggered animation */}
        <section className="relative pt-44 lg:pt-52 pb-20 text-center px-6 overflow-hidden">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10"
          >
            <motion.h1 
              variants={staggerItem}
              className="text-5xl md:text-7xl font-black tracking-[-0.03em] leading-[0.95] mb-8"
            >
              Trading is Better <br />
              <span className="text-gray-500">Without the Noise.</span>
            </motion.h1>
            <motion.p 
              variants={staggerItem}
              className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12 font-medium"
            >
              Investors chase FOMO, copy trades without context, and pay for communities with no clear performance benchmarks. We're building a better way.
            </motion.p>
            <motion.div 
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button 
                onClick={() => setIsWaitlistOpen(true)} 
                className="group w-full sm:w-auto px-8 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Join the Waitlist
                <motion.span 
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </motion.button>
            </motion.div>
            
            {/* Asset Classes - Crypto, Futures, Stocks */}
            <motion.div 
              variants={staggerItem}
              className="mt-16 flex flex-wrap justify-center gap-4"
            >
              {['Crypto', 'Futures', 'Stocks', 'Options'].map((asset, i) => (
                <motion.span
                  key={asset}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-base text-gray-300 font-medium"
                >
                  {asset}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Subtle gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </section>

        {/* PROBLEM SECTION */}
        <AnimatedSection className="max-w-7xl mx-auto px-6 py-24">
          <SectionHeader 
            badge="The Problem" 
            title="Too Much Hype. Not Enough Proof."
            subtitle="Investors chase FOMO, copy trades without context, and pay for communities with no clear performance benchmarks."
            delay={0.1}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Selective Transparency", desc: "Wins are highlighted. Losses disappear. Investors rarely see the full picture..." },
              { title: "Inconsistent Track Records", desc: "Many trade ideas look good but lack consistent verifiable results." },
              { title: "Credibility is Hard to Measure", desc: "Follower counts and engagement often replace actual performance as trust signals." },
              { title: "FOMO-Driven Decisions", desc: "Hype cycles push investors toward reactive trades instead of informed strategies." },
              { title: "Unclear Value From Paid Communities", desc: "Subscription fees are common, but clear performance benchmarks are often missing." },
              { title: "Visibility Over Performance", desc: "Algorithms reward engagement and activity, not necessarily consistent investing outcomes." }
            ].map((item, i) => (
              <AnimatedCard key={i} delay={0.1 * i} className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
                <h3 className="font-bold mb-2 text-red-400">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedSection>

        {/* SOLUTION SECTION */}
        <AnimatedSection className="max-w-7xl mx-auto px-6 py-24 bg-white/[0.02]">
          <SectionHeader 
            badge="Our Mission" 
            title="Performance-Driven Social Investing"
            subtitle="No hype. No disappearing losses. Just trackable performance and smarter investing decisions."
            delay={0.1}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard 
              icon={Target} 
              title="Structured Trade Posts"
              description="Investors share trades with defined entry, exit, and risk parameters so performance can be evaluated objectively."
              benefits={["Clear benchmarks for every trade", "Full trade lifecycle tracking", "Consistent performance records"]}
              delay={0.1}
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Verified Performance Tracking"
              description="Every trade is tracked consistently, creating transparent performance histories readily available to you."
              benefits={["Wins and losses recorded consistently", "Reliable track records over time", "Data-driven credibility"]}
              delay={0.2}
            />
            <FeatureCard 
              icon={Award} 
              title="Reputation Built on Results"
              description="Credibility grows from consistent performance, not engagement or follower counts."
              benefits={["Reputation built on results", "Visibility tied to performance", "Incentives aligned with accuracy"]}
              delay={0.3}
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Actionable Performance Insights"
              description="Turn completed trades into actionable insights — tracking accuracy, risk patterns, and real performance over time."
              benefits={["Learn from real outcomes", "Identify consistent performers", "Make informed decisions"]}
              delay={0.4}
            />
          </div>
        </AnimatedSection>

        {/* MARKET OPPORTUNITY */}
        <AnimatedSection className="max-w-7xl mx-auto px-6 py-24 bg-white/[0.02]">
          <SectionHeader 
            badge="Market Opportunity" 
            title="A Rapidly Growing Space"
            subtitle="Social investing is exploding — and the need for transparency has never been greater."
            delay={0.1}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "100M+", desc: "Retail trading accounts in the US alone (FINRA 2024)" },
              { icon: Rocket, title: "$4.2T", desc: "Projected social trading market size by 2030 (Grand View Research)" },
              { icon: Search, title: "87%", desc: "Of retail traders use social media for investment ideas (SEC Study)" },
              { icon: PieChart, title: "72%", desc: "Of Gen Z investors trust social influencers over financial advisors (CNBC)" }
            ].map((item, i) => (
              <AnimatedCard key={i} delay={0.1 * i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                <motion.div 
                  className="text-4xl font-black text-blue-400 mb-2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i + 0.2, type: "spring" }}
                >
                  {item.title}
                </motion.div>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedSection>

        {/* BUSINESS MODEL */}
        <AnimatedSection className="max-w-7xl mx-auto px-6 py-24">
          <SectionHeader 
            badge="Business Model" 
            title="Built Around Transparency"
            subtitle="Our revenue model aligns success with performance, not hype."
            delay={0.1}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: DollarSign, title: "Creator Revenue Share", desc: "Top performers earn more. No inflated follower counts, just real results." },
              { icon: BarChart3, title: "Premium Insights", desc: "Advanced analytics for serious investors who want deeper data." },
              { icon: Users, title: "Education That Works", desc: "Creators monetize through verified performance, not empty promises." },
              { icon: Zap, title: "Targeted Discovery", desc: "Relevant financial products, not noisy ads. Because context matters." }
            ].map((item, i) => (
              <AnimatedCard key={i} delay={0.1 * i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <motion.div 
                  className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-500"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <item.icon size={24} />
                </motion.div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedSection>

        {/* TRACTION & PROGRESS */}
        <AnimatedSection className="max-w-7xl mx-auto px-6 py-24 bg-white/[0.02]">
          <SectionHeader 
            badge="Traction & Progress" 
            title="Where We Are Today"
            delay={0.1}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "MVP", desc: "Core platform under development", color: "text-blue-400" },
              { title: "Beta", desc: "Coming soon, join the waitlist", color: "text-amber-400" },
              { title: "Growing", desc: "Early interest & feedback phase", color: "text-emerald-400" }
            ].map((item, i) => (
              <AnimatedCard key={i} delay={0.1 * i} className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                <motion.div 
                  className={`text-4xl font-black ${item.color} mb-2`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i + 0.2, type: "spring" }}
                >
                  {item.title}
                </motion.div>
                <p className="text-gray-400">{item.desc}</p>
              </AnimatedCard>
            ))}
          </div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4">Next Steps</h3>
            <ul className="text-gray-400 space-y-2 inline-block text-left">
              {[
                "Expand beta access",
                "Strengthen analytics & reputation features",
                "Build community foundation"
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + 0.1 * i }}
                >
                  <CheckCircle2 size={16} className="text-emerald-500" /> {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatedSection>

        {/* TEAM SECTION */}
        <AnimatedSection className="max-w-7xl mx-auto px-6 py-24 bg-white/[0.02]">
          <SectionHeader 
            badge="Team" 
            title="Built by Investors, For Investors"
            delay={0.1}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { role: "CEO", name: "Team Lead", desc: "Vision & product direction. Ensuring transparency stays at the core of everything we build." },
              { role: "CTO", name: "Technical Lead", desc: "Building the credibility infrastructure, reputation systems, and backend architecture." },
              { role: "Backend Dev", name: "Engineering", desc: "Community features, database architecture, and creator progression systems." },
              { role: "Frontend Dev", name: "Design Lead", desc: "UI/UX design and platform usability for an intuitive experience." }
            ].map((member, i) => (
              <AnimatedCard key={i} delay={0.1 * i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                <motion.div 
                  className="w-16 h-16 bg-blue-500/20 rounded-full mx-auto mb-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Building2 className="text-blue-400" size={24} />
                </motion.div>
                <div className="text-blue-400 text-xs font-black uppercase tracking-wider mb-1">{member.role}</div>
                <h3 className="font-bold mb-2">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedSection>

        {/* CLOSING PITCH */}
        <AnimatedSection className="max-w-5xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-400/5 to-blue-500/10 rounded-3xl blur-3xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <div className="relative p-12 md:p-16 rounded-3xl bg-white/[0.02] border border-white/10">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">
                Join Us in Building the Future of <motion.span 
                  className="text-blue-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Transparent Investing
                </motion.span>
              </h2>
              <motion.p 
                className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Social investing has grown rapidly, but transparency hasn't kept pace. We're changing that, one verified track record at a time.
              </motion.p>
              <motion.button 
                onClick={() => setIsWaitlistOpen(true)} 
                className="px-12 py-6 bg-blue-600 text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Join the Waitlist →
              </motion.button>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* FAQ SECTION */}
        <AnimatedSection className="max-w-4xl mx-auto px-6 py-24">
          <SectionHeader 
            badge="FAQ" 
            title="Frequently Asked Questions"
            delay={0.1}
          />
          <div className="space-y-4">
            {[
              { q: "How is Leads different from existing social investing platforms?", a: "We standardize trade publishing and tracking with defined entry, take-profit, and stop-loss benchmarks. Credibility builds from verified results, not follower counts." },
              { q: "Why will investors use this instead of social media?", a: "We provide reliable performance visibility, reduced speculation and hype, clearer learning from real outcomes, and a stronger accountability framework." },
              { q: "How does Leads make money?", a: "Tiered creator monetization (revenue share), premium analytics subscriptions, education ecosystem opportunities, and targeted ads in the FYP feed (supplemental only)." },
              { q: "Are ads the primary revenue driver?", a: "No — ads are supplemental. Our focus remains on building credibility infrastructure first." },
              { q: "Where are you today?", a: "MVP actively being built (~1.5 months), landing page recently launched, early interest and feedback phase underway." },
              { q: "How do you ensure trade credibility?", a: "Structured entry, take-profit, stop-loss benchmarks; trades tracked until completion; consistent performance recording." },
              { q: "What prevents manipulation or hype trading?", a: "Merit-based reputation system, long-term performance visibility, incentives aligned with transparency." },
              { q: "What's your competitive moat?", a: "Compounding performance data, credibility infrastructure, incentive-aligned reputation system, community built around verified results." },
              { q: "Are you a brokerage or advisor?", a: "No — we're a platform for transparency and discussion, not providing investment advice." },
              { q: "Where do you see Leads long term?", a: "Becoming the transparency standard for social investing, expanding analytics and education ecosystem, building a global investor credibility network." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
              >
                <details className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 cursor-pointer">
                  <summary className="flex items-center justify-between font-bold list-none">
                    <span>{item.q}</span>
                    <motion.span
                      animate={{ rotate: 0 }}
                      className="text-gray-500"
                    >
                      <ArrowRight className="transition-transform group-open:rotate-90" size={18} />
                    </motion.span>
                  </summary>
                  <motion.p 
                    className="mt-4 text-gray-400"
                    initial={{ opacity: 0, height: 0 }}
                    whileInView={{ opacity: 1, height: "auto" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.a}
                  </motion.p>
                </details>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </main>

      {/* FOOTER */}
      <motion.footer 
        className="py-24 border-t border-white/5 bg-black/40"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-blue-500" />
              <span className="font-black tracking-tighter text-xl">LEADS</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8">
              Building the most transparent investing community in finance. No hype. No fake gurus. Just performance and data.
            </p>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-4">Contact</h4>
              <a href="mailto:lead.invests.co@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">lead.invests.co@gmail.com</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6">Platform</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>Features</li>
              <li>Pricing</li>
              <li>About</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Risk Disclosure</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-gray-700 text-[10px] font-black tracking-[0.3em] uppercase text-center">
          © 2026 Leads. All rights reserved.
        </div>
      </motion.footer>

      {/* MODALS */}
      <AnimatePresence>
        {(isWaitlistOpen || isCommunityOpen) && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg bg-[#0F172A] border border-white/10 rounded-[2.5rem] p-12 relative shadow-2xl overflow-hidden"
            >
              <motion.div 
                className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <button 
                onClick={() => {setIsWaitlistOpen(false); setIsCommunityOpen(false)}} 
                className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors z-20"
              >
                <X />
              </button>
              <div className="text-center relative z-10">
                <motion.div 
                  className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Globe size={40} />
                </motion.div>
                <h2 className="text-4xl font-black mb-4 uppercase">{isWaitlistOpen ? 'Join the Waitlist' : 'Join our Discord'}</h2>
                <p className="text-gray-400 mb-10 font-medium">{isWaitlistOpen ? 'Be first to know when we launch' : 'Connect with our community'}</p>
                <motion.button 
                  onClick={() => window.open(isWaitlistOpen ? 'https://docs.google.com/forms/d/e/1FAIpQLSeBvIwjEm6FUCQY0Q7qP6LtXajMW2Ck1P3o5Eiey9n-2UNo-w/viewform?usp=sharing&ouid=118404071316243259979' : 'https://discord.gg/vQ2HZ8e56F', '_blank')} 
                  className="w-full py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isWaitlistOpen ? 'Join Now' : 'Join Discord'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
