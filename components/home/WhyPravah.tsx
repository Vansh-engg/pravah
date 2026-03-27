"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, Navigation, Globe, Zap, Users } from "lucide-react";

const features = [
  { icon: Shield, title: "Unmatched Security", desc: "Your safety is our priority. Every journey is insured and vetted.", iconColor: "text-blue-500" },
  { icon: Sparkles, title: "Curated Excellence", desc: "No generic tours. We handpick every experience for maximum flow.", iconColor: "text-amber-500" },
  { icon: Navigation, title: "Local Navigation", desc: "Expert local guides who know the true soul of every destination.", iconColor: "text-emerald-500" },
];

const WhyPravah = () => {
  return (
    <section className="container mx-auto px-6 py-24 md:py-32 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Floating Cards Visual */}
        <div className="relative h-[600px] flex items-center justify-center">
           {/* Center Icon/Visual */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
           <motion.div 
             animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="relative z-10 w-48 h-48 bg-cyan-500/10 rounded-[3rem] p-8 border border-cyan-500/30 backdrop-blur-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/20"
           >
              <Globe className="h-20 w-20 text-cyan-400 opacity-80" />
           </motion.div>

           {/* Floating Floating Panels */}
           <motion.div 
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 0 }}
              className="absolute top-10 right-10 p-6 glass-dark rounded-3xl border border-white/10 shadow-2xl z-20 w-64 invisible sm:block"
           >
              <div className="flex items-center gap-4 mb-3">
                 <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400"><Zap className="h-5 w-5" /></div>
                 <span className="font-bold text-sm">Instant Sync</span>
              </div>
              <p className="text-xs text-slate-400">All bookings synced across your devices instantly.</p>
           </motion.div>

           <motion.div 
              animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-10 left-10 p-6 glass-dark rounded-3xl border border-white/10 shadow-2xl z-20 w-64 invisible sm:block"
           >
              <div className="flex items-center gap-4 mb-3">
                 <div className="p-2 bg-pink-500/20 rounded-xl text-pink-400"><Users className="h-5 w-5" /></div>
                 <span className="font-bold text-sm">Flow Community</span>
              </div>
              <p className="text-xs text-slate-400">Connect with fellow travelers and share your flow.</p>
           </motion.div>
        </div>

        {/* Right Side: Text Content */}
        <div className="space-y-12">
           <div className="space-y-4">
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs">Pravah Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-bold font-heading">Why Travel With Us?</h2>
              <p className="text-slate-400 text-lg leading-relaxed">Most travel is friction. We believe in flow. Our system is designed to remove the stress of planning and maximize the mystery of discovery.</p>
           </div>

           <div className="space-y-8">
              {features.map((feat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="flex items-start gap-6 group hover:translate-x-2 transition-transform"
                >
                   <div className={`p-4 bg-white/5 rounded-2xl group-hover:bg-cyan-500/10 transition-colors ${feat.iconColor}`}>
                      <feat.icon className="h-7 w-7" />
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-xl font-bold font-heading group-hover:text-white transition-colors">{feat.title}</h3>
                      <p className="text-slate-500 text-base leading-relaxed">{feat.desc}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPravah;
