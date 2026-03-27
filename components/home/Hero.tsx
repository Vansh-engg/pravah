"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, PlayCircle, Globe, Droplets } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section 
      ref={targetRef}
      className="relative h-[110vh] flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic Background Layer */}
      <motion.div 
        style={{ opacity, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#05070a] z-10" />
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=100" 
          alt="Majestic Mountain Range" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Floating Elements / Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
         <motion.div 
            animate={{ 
              y: [0, -40, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"
         />
      </div>

      {/* Content Layer */}
      <motion.div 
        style={{ y }}
        className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center space-y-12"
      >
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium text-cyan-400 shadow-xl shadow-cyan-500/5 ring-1 ring-white/10 mb-2"
        >
          <div className="relative">
            <Globe className="h-4 w-4 animate-spin-slow" />
            <div className="absolute inset-0 bg-cyan-400 blur-sm rounded-full opacity-50" />
          </div>
          <span className="tracking-widest uppercase text-[10px] font-bold text-white/80">Experience the Flow of Discovery</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-heading leading-[0.85] tracking-tighter text-center"
        >
          <span className="block text-white uppercase opacity-90 text-[clamp(2rem,10vw,6rem)] font-bold">JOURNEY</span>
          <span className="block text-gradient uppercase text-[clamp(2.5rem,14vw,10rem)] font-black">UNBORN</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-[700px] text-body text-center mt-12 drop-shadow-lg"
        >
          Welcome to <span className="text-white font-medium">Pravah Holidays</span>. We craft seamless, premium travel experiences that let you flow into the world&apos;s most hidden beauties.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-10 mt-10"
        >
          <Link 
            href="#destinations" 
            className="group relative bg-white text-black px-12 py-6 rounded-2xl font-bold text-xl flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.15)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 group-hover:text-white transition-colors">Start Your Flow</span>
            <ChevronRight className="h-6 w-6 relative z-10 group-hover:translate-x-1 group-hover:text-white transition-all" />
          </Link>
          
          <button className="flex items-center gap-4 text-white group px-8 py-3 transition-all rounded-2xl hover:bg-white/5 active:scale-95 border border-white/5 hover:border-white/20">
             <div className="p-3 bg-white/10 rounded-full group-hover:bg-cyan-500 transition-colors shadow-lg">
                <PlayCircle className="h-7 w-7 text-white" />
             </div>
             <span className="font-semibold tracking-wide text-lg">Watch the Film</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Hero Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
