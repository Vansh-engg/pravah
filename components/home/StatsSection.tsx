"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "450+", label: "Total Tours", color: "text-cyan-400" },
  { value: "12k+", label: "Happy Travelers", color: "text-purple-400" },
  { value: "32", label: "Countries Covered", color: "text-pink-400" },
  { value: "4.9", label: "Avg Rating", color: "text-amber-400" },
];

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="container mx-auto px-6 py-24 md:py-32 relative z-10"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="flex flex-col items-center space-y-3 p-10 glass rounded-3xl group hover:bg-white/5 transition-colors"
          >
            <span className={`text-4xl md:text-6xl font-bold font-heading ${stat.color} group-hover:scale-110 transition-transform`}>
              {stat.value}
            </span>
            <span className="text-slate-400 text-sm font-semibold uppercase tracking-[0.2em]">
              {stat.label}
            </span>
            <div className={`w-12 h-[2px] ${stat.color.replace('text', 'bg')} opacity-30 mt-4 group-hover:w-full transition-all duration-700`} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
