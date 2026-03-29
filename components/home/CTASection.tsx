"use client";

import { motion } from "framer-motion";
import { ChevronRight, Droplet } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="container mx-auto px-6 py-24 md:py-32 relative z-10">
         <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full overflow-hidden rounded-[3rem] glass-card border border-glass-border shadow-2xl p-12 md:p-24 flex flex-col items-center text-center space-y-12"
         >
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6 flex flex-col items-center">
           <motion.div 
             animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center p-4 shadow-2xl shadow-orange-500/40"
           >
              <Droplet className="h-8 w-8 text-white fill-current" />
           </motion.div>
           <h2 className="text-4xl md:text-6xl font-bold font-heading max-w-3xl leading-tight text-foreground">
              Ready to find your <span className="text-gradient">Travel Flow</span>?
           </h2>
           <p className="text-muted text-lg md:text-xl max-w-xl mx-auto">
              Join thousands of travelers who have found the perfect balance of adventure and peace with Pravah Holidays.
           </p>
        </div>

        <motion.div 
           initial={{ y: 20, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4, duration: 0.6 }}
           className="relative z-10 flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
           <Link 
             href="/auth/signup" 
             className="bg-orange-500 hover:bg-orange-600 px-12 py-5 rounded-2xl text-lg font-bold text-white shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 group transform hover:scale-105 active:scale-95 transition-all text-center"
           >
              <span>Get Started Now</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
           </Link>
           <Link 
             href="/top-destinations" 
             className="px-12 py-5 rounded-2xl text-lg font-bold text-foreground border border-glass-border glass hover:bg-orange-500/10 transition-all text-center flex items-center justify-center"
           >
              Browse Destinations
           </Link>
        </motion.div>
        
        {/* Subtle Decorative Elements */}
        <div className="absolute -bottom-10 right-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -top-10 left-20 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
      </motion.div>
    </section>
  );
};

export default CTASection;
