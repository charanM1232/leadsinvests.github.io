import React, { useState, useEffect } from 'react';
import {
  TrendingUp, Users, ArrowRight, Cpu, Menu, X, ShieldCheck, Zap,
  Search, Activity, Target, BarChart3, Globe, AlertTriangle, FileText, Lock
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Darker Cinematic Bubble Components ---

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

const SignalTerminal = () => {
  const signals = [
    { pair: "BTC/USDT", type: "LONG", price: "48,230", target: "52,000", acc: "92%" },
    { pair: "ETH/USDT", type: "SHORT", price: "2,450", target: "2,100", acc: "88%" },
    { pair: "NVDA", type: "LONG", price: "720.45", target: "800", acc: "95%" },
  ];

  return (
    <div className="bg-[#020617]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-4 font-mono text-xs shadow-2xl relative overflow-hidden group">
      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        </div>
        <span className="text-gray-500 ml-2">PRO_SIGNAL_FEED_V4.0</span>
      </div>
      <div className="space-y-3">
        {signals.map((s, i) => (
          <div key={i} className="flex justify-between items-center group-hover:bg-white/5 p-2 rounded-lg transition-colors">
            <div className="flex flex-col">
              <span className="text-gray-400">{s.pair}</span>
              <span className={s.type === 'LONG' ? 'text-emerald-400' : 'text-rose-400'}>{s.type} @ {s.price}</span>
            </div>
            <div className="text-right">
              <div className="text-blue-400">Target: {s.target}</div>
              <div className="text-[10px] text-gray-600">Accuracy: {s.acc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
        <span className="text-emerald-500 flex items-center gap-1">
          <Activity size={10} /> LIVE_CONNECTION_STABLE
        </span>
        <span className="animate-pulse">_</span>
      </div>
    </div>
  );
};

const BentoCard = ({ children, className, title, desc, icon: Icon, span = false }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={cn(
      "relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden group hover:border-blue-500/30 transition-all",
      span ? "md:col-span-2" : "col-span-1",
      className
    )}
  >
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={120} strokeWidth={1} />
    </div>
    <div className="relative z-10">
      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-500">
        <Icon size={24} />
      </div>
      <h3 className="text-2xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm lg:text-base max-w-[280px]">{desc}</p>
      {children}
    </div>
  </motion.div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [modalContent, setModalContent] = useState<'risk' | 'privacy' | 'terms' | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <AnimatedBackground />

      <nav className={cn(
        "fixed w-full z-50 transition-all duration-500 px-6",
        scrolled ? "bg-black/60 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-8"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-2 bg-blue-600 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <TrendingUp size={20} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase transition-opacity hover:opacity-80">Leads</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => setIsCommunityOpen(true)} className="px-6 py-2.5 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-blue-500 transition-all">Community</button>
            <button onClick={() => setIsWaitlistOpen(true)} className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-gray-200 transition-all">Interest Form</button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-400 transition-colors hover:text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-40 md:hidden bg-black flex flex-col p-8 pt-24 text-center">
            <button onClick={() => {setIsCommunityOpen(true); setIsMenuOpen(false)}} className="mb-8 px-8 py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all">Community</button>
            <button onClick={() => {setIsWaitlistOpen(true); setIsMenuOpen(false)}} className="mt-8 px-8 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all">Interest Form</button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-44 lg:pt-60 pb-32 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Verified Signal Network</span>
            <h1 className="text-5xl md:text-8xl font-black tracking-[-0.04em] leading-[0.95] mb-8">
              TRADING IS BETTER <br />
              <span className="text-gray-500">WITHOUT THE NOISE.</span>
            </h1>
            <p className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12 font-medium">
              Join a collective of verified traders sharing high-alpha signals, threaded thesis, and real-time community engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => setIsWaitlistOpen(true)} className="group w-full sm:w-auto px-8 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-3">
                Interest Form
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          <div className="mt-32 border-y border-white/5 py-10 opacity-30">
            <div className="max-w-7xl mx-auto px-6 overflow-hidden flex flex-wrap justify-center gap-12 lg:gap-24 grayscale">
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter uppercase italic">Stocks</div>
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter uppercase">Options</div>
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter uppercase italic">Crypto</div>
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter uppercase">Future</div>
            </div>
          </div>
        </section>

        {/* BENTO SECTION */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoCard span icon={Target} title="Proof of Accuracy" desc="Every trade is logged, tracked and verified. We measure performance, not followers.">
              <div className="mt-8 pointer-events-none">
                <SignalTerminal />
              </div>
            </BentoCard>
            <BentoCard icon={Users} title="Build Your Community" desc=" Join or create a community that is personalized and dedicated hubs for all markets." />
            <BentoCard icon={BarChart3} title="Earn Merits" desc="Your reputation is built on your performance. More merit equals more trust." />
            <BentoCard span icon={Cpu} title="Automated Analytics" desc="Deep stats on your historical edge. Understand your drawdown, profit factor, and accuracy metrics automatically." className="bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
              <div className="mt-8 flex gap-2 overflow-hidden h-24 items-end">
                {[12, 45, 23, 67, 23, 45, 89, 67, 45, 34, 56, 87].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-500/20 rounded-t-md relative group">
                    <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.05, duration: 1 }} className="absolute bottom-0 w-full bg-blue-500 rounded-t-md" />
                  </div>
                ))}
              </div>
            </BentoCard>
            <BentoCard icon={Search} title="Signal Filtering" desc="Cut the fluff. Use intelligent filters to find the specific setups and assets you care about most." />
            <BentoCard span icon={ShieldCheck} title="Private Networking" desc="Your edge is your property. We built top-tier security into the core to keep your signals and strategies private." className="bg-gradient-to-bl from-[#0F172A] to-[#020617]" />
            <BentoCard span icon={Zap} title="Real-Time Sync" desc="Speed is everything in the pit. Experience a zero-lag environment where every signal hits your screen instantly." className="bg-gradient-to-tr from-[#0F172A] to-[#1E3A8A]" />
            <BentoCard icon={Globe} title="Domestic Core" desc="Purpose-built for the US Markets. Connect with a focused hive of traders across all major exchanges." />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-24 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-blue-500" />
              <span className="font-black tracking-tighter text-xl">LEADS</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8">The first meritocratic social network for traders. We don't care about your clout, we care about your performance.</p>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-4">Contact Us</h4>
              <a href="mailto:lead.invests.co@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">lead.invests.co@gmail.com</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6">Protocol</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>Signals</li><li>Verification</li><li>Hubs</li><li>Merit API</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setModalContent('risk')}>Risk Disclosure</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setModalContent('privacy')}>Privacy</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setModalContent('terms')}>Terms</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-gray-700 text-[10px] font-black tracking-[0.3em] uppercase">
          © 2026 Lead Protocol. Deployment Beta_v2.0.4
        </div>
      </footer>

      {/* DYNAMIC LEGAL MODAL */}
      <AnimatePresence>
        {modalContent && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-3xl max-h-[85vh] bg-[#0F172A] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col relative shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  {modalContent === 'risk' && <AlertTriangle className="text-amber-500" size={24} />}
                  {modalContent === 'privacy' && <Lock className="text-blue-500" size={24} />}
                  {modalContent === 'terms' && <FileText className="text-emerald-500" size={24} />}
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    {modalContent === 'risk' && 'Beta Risk Disclosure'}
                    {modalContent === 'privacy' && 'Beta Privacy Policy'}
                    {modalContent === 'terms' && 'Beta Terms & Conditions'}
                  </h2>
                </div>
                <button onClick={() => setModalContent(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
                  <X size={24}/>
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto custom-scrollbar text-sm leading-relaxed text-gray-400 space-y-8 prose prose-invert max-w-none">
                {modalContent === 'risk' && (
                  <>
                    <p className="font-bold text-white italic">Effective Date: February 2026</p>
                    <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl text-amber-200/80">
                      <strong>IMPORTANT NOTICE:</strong> This platform is currently in a beta testing phase. Features may change, malfunction, or be removed at any time. By joining the beta waitlist, Discord community, early access program, interest forms, or using the beta version of the App, you acknowledge that you have read, understood, and agreed to the risks and conditions described below.
                    </div>
                    <div>
                      <h3 className="text-white uppercase text-xs font-black tracking-widest mb-4">1. Beta Software Status</h3>
                      <p>This App is a pre release product intended for testing, feedback, and evaluation. It may contain bugs, inaccuracies, incomplete features, data inconsistencies, or unexpected system behavior. The platform makes no guarantees regarding stability, reliability, or feature availability during the beta phase.</p>
                    </div>
                    <div>
                      <h3 className="text-white uppercase text-xs font-black tracking-widest mb-4">2. No Financial or Professional Advice</h3>
                      <p>The App is not a broker dealer, investment adviser, financial planner, legal adviser, or tax professional. All analytics, trade ideas, rankings, educational materials, and community content are provided strictly for informational and educational purposes only.</p>
                    </div>
                    <div>
                      <h3 className="text-white uppercase text-xs font-black tracking-widest mb-4">3. Elevated Risk Due to Beta Environment</h3>
                      <p>Because this is a beta environment, data, analytics, scoring systems, performance statistics, and social trading features may be inaccurate, incomplete, delayed, or experimental. Users should not rely on beta information for real financial decisions.</p>
                    </div>
                    <div>
                      <h3 className="text-white uppercase text-xs font-black tracking-widest mb-4">4. High Risk Nature of Trading</h3>
                      <p>Trading securities, cryptocurrencies, derivatives, foreign exchange, commodities, or other financial instruments involves significant risk. Users may lose part or all of their capital. Market conditions are volatile and unpredictable.</p>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                      <p className="text-[10px] font-bold text-gray-600 uppercase">Aknowledgment: I understand this platform is currently in beta testing. I acknowledge that features, analytics, and data may be experimental or inaccurate. I accept the risks associated with using a beta financial platform.</p>
                    </div>
                  </>
                )}

                {modalContent === 'privacy' && (
                  <>
                    <p className="font-bold text-white italic">Effective Date: February 2026</p>
                    <p>This Privacy Policy explains how information may be collected, used, stored, and protected during the beta phase. By joining our community or using the App, you acknowledge this policy.</p>
                    <div>
                      <h3 className="text-white uppercase text-xs font-black tracking-widest mb-4">1. Information We May Collect</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Name, email address, or contact details</li>
                        <li>Feedback, survey responses, and feature requests</li>
                        <li>Device information and usage analytics</li>
                        <li>Community interactions (Discord participation)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-white uppercase text-xs font-black tracking-widest mb-4">2. How Information Is Used</h3>
                      <p>Information is used to provide beta access, improve functionality, analyze usage trends, and communicate updates. Information will not be sold during the beta phase.</p>
                    </div>
                    <div>
                      <h3 className="text-white uppercase text-xs font-black tracking-widest mb-4">3. Data Security</h3>
                      <p>Reasonable safeguards are used to protect information. However, beta environments may carry elevated risk compared to fully released platforms.</p>
                    </div>
                  </>
                )}

                {modalContent === 'terms' && (
                  <>
                    <p className="font-bold text-white italic">Effective Date: February 2026</p>
                    <p>These Terms govern access to and use of this platform during its beta phase. By accessing beta features, you agree to these Terms.</p>
                    <div>
                      <h3 className="text-white uppercase text-xs font-black tracking-widest mb-4">1. Eligibility</h3>
                      <p>You must be at least 18 years old to use the platform. By accessing the App, you confirm you meet this requirement.</p>
                    </div>
                    <div>
                      <h3 className="text-white uppercase text-xs font-black tracking-widest mb-4">2. Prohibited Conduct</h3>
                      <p>You agree not to manipulate rankings, misrepresent performance, attempt unauthorized access, or use the platform for illegal trading activity.</p>
                    </div>
                    <div>
                      <h3 className="text-white uppercase text-xs font-black tracking-widest mb-4">3. Limitation of Liability</h3>
                      <p>To the fullest extent permitted by law, the platform shall not be liable for any financial losses, damages, or data loss arising from use of the beta platform.</p>
                    </div>
                  </>
                )}
              </div>

              <div className="p-6 bg-white/[0.02] border-t border-white/5">
                <button 
                  onClick={() => setModalContent(null)}
                  className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all text-sm"
                >
                  I Understand & Accept
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ORIGINAL MODALS */}
      <AnimatePresence>
        {(isWaitlistOpen || isCommunityOpen) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg bg-[#0F172A] border border-white/10 rounded-[2.5rem] p-12 relative shadow-2xl overflow-hidden">
               <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />
              <button onClick={() => {setIsWaitlistOpen(false); setIsCommunityOpen(false)}} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors z-20"><X /></button>
              <div className="text-center relative z-10">
                <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)]"><Globe size={40} /></div>
                <h2 className="text-4xl font-black mb-4 uppercase">{isWaitlistOpen ? 'Join Us' : 'Join our Discord'}</h2>
                <p className="text-gray-400 mb-10 font-medium">{isWaitlistOpen ? 'Join our Private Beta Launch' : 'Connect with our developers'}</p>
                <button onClick={() => window.open(isWaitlistOpen ? 'https://docs.google.com/forms/d/e/1FAIpQLSeBvIwjEm6FUCQY0Q7qP6LtXajMW2Ck1P3o5Eiey9n-2UNo-w/viewform?usp=sharing&ouid=118404071316243259979' : 'https://discord.gg/vQ2HZ8e56F', '_blank')} className="w-full py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all">
                  {isWaitlistOpen ? 'Go to Form' : 'Go to Discord'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
