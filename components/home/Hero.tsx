"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, PlayCircle, Globe, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  return (
    <section 
      ref={targetRef}
      className="relative h-[110vh] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* 🌊 Cinematic Background Layer */}
      <motion.div 
        style={{ opacity, scale, filter: `blur(${blur}px)` }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-background z-10" />
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=100" 
          alt="Atmospheric Mountain Reflection" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* ✨ Floating Prisms / Brand Glow */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
         <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]"
         />
         <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-info/20 rounded-full blur-[200px]"
         />
      </div>

      {/* 🎬 Content Layer */}
      <div className="relative z-20 container mx-auto px-6 pt-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
          
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card border border-white/20 shadow-2xl"
          >
             <Compass className="h-4 w-4 text-primary" />
             <p className="text-white text-xs font-bold uppercase tracking-[0.3em]">Redefining the Pravah</p>
          </motion.div>

          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl"
            >
              Discover Your <br />
              <span className="text-gradient underline-offset-[1.5rem] underline decoration-primary/20">True Soul.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Experience curated journeys designed by experts. <br className="hidden md:block" />
              Harmonize your flow with the pulse of the world's most mysterious wonders.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6 pt-4"
          >
            <Link 
              href="/top-destinations" 
              className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white px-12 py-5 rounded-full text-xl font-bold transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 group/btn"
            >
               Begin Journey <ArrowRight className="h-6 w-6 group-hover/btn:translate-x-2 transition-transform" />
            </Link>
            <Link 
              href="/about" 
              className="w-full sm:w-auto glass-card hover:bg-white/10 text-white border border-white/20 px-12 py-5 rounded-full text-xl font-bold transition-all active:scale-95 flex items-center justify-center"
            >
               Our Collective Flow
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 🖱️ Navigation Scroll Hint */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 rotate-180 [writing-mode:vertical-rl]">Scroll</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-primary via-info to-transparent shadow-glow shadow-primary/50" />
      </motion.div>
    </section>
  );
};

export default Hero;
