"use client";

import { motion } from "framer-motion";
import { Compass, ShieldCheck, Heart, Zap, Globe, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: <Globe className="w-6 h-6 text-cyan-400" />,
    title: "Eco-Conscious Flow",
    description: "We preserve the natural rhythm of the destinations we touch, ensuring our footprints are light and our impact is deep."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
    title: "Uncompromising Quality",
    description: "Every journey is a masterpiece. We curate only the most exceptional stays, guides, and moments for our explorers."
  },
  {
    icon: <Heart className="w-6 h-6 text-cyan-400" />,
    title: "Deep Connection",
    description: "Travel isn't just about seeing; it's about feeling. We bridge the gap between travelers and local souls."
  },
  {
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
    title: "Dynamic Innovation",
    description: "The digital meets the physical. We use state-of-the-art tech to make your travel flow seamless and stress-free."
  }
];

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80" 
            alt="Mountain vision" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-transparent to-[#05070a]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-xs lg:text-sm">Our Vision</span>
            <h1 className="text-5xl md:text-7xl font-bold font-heading text-white tracking-tighter leading-tight">
              Crafting the <br /> <span className="text-gradient">Future of Flow</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed">
              Pravah isn't just a travel agency. It's a philosophy of movement, designed to align your spirit with the world's most breathtaking rhythms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex h-12 w-12 rounded-2xl bg-cyan-500/10 items-center justify-center border border-cyan-500/20">
                <Compass className="h-6 w-6 text-cyan-400" />
              </div>
              <h2 className="text-4xl font-bold font-heading text-white leading-tight">
                Beyond the Map, <br /> Into the Soul.
              </h2>
              <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
                <p>
                  Founded in 2024, Pravah was born from a simple realization: modern travel has become too fragmented, too cluttered. We wanted to restore the "Pravah" — the flow.
                </p>
                <p>
                  Our mission is to eliminate the friction between your dream and your destination. By blending local heritage with luxury service and modern technology, we create journeys that feel like they were written just for you.
                </p>
              </div>
              <div className="pt-4">
                 <div className="flex items-center gap-6">
                    <div className="flex -space-x-3">
                       {[1, 2, 3, 4].map(idx => (
                          <div key={idx} className="h-12 w-12 rounded-full border-2 border-[#05070a] bg-slate-800 overflow-hidden">
                             <img src={`https://i.pravatar.cc/150?u=${idx}`} alt="Team" />
                          </div>
                       ))}
                    </div>
                    <p className="text-sm font-bold text-white tracking-wide">
                       Guided by <span className="text-cyan-400">120+</span> Local Curators
                    </p>
                 </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] overflow-hidden group shadow-2xl shadow-cyan-500/10 aspect-square"
            >
              <img 
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80" 
                alt="Vision landscape" 
                className="w-full h-full object-cover grayscale opacity-50 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-80 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent mix-blend-overlay" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="h-24 w-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <motion.div
                       animate={{ rotate: 360 }}
                       transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                       <Compass className="h-10 w-10 text-white opacity-40" />
                    </motion.div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold font-heading text-white">Our Core Pillars</h2>
            <p className="text-slate-400">The steady currents that guide every decision we make.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group"
              >
                <div className="mb-6 h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
           <div className="glass-dark rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden border border-white/10 shadow-3xl">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
              <div className="relative z-10 space-y-8">
                 <h2 className="text-4xl md:text-5xl font-bold font-heading text-white max-w-3xl mx-auto">
                    Ready to find your <span className="text-gradient">True Flow?</span>
                 </h2>
                 <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
                    Join us in redefining what it means to travel. We are ready when you are.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link 
                      href="/top-destinations" 
                      className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-full text-lg font-bold text-white shadow-xl shadow-cyan-500/20 flex items-center gap-2 transition-all active:scale-95"
                    >
                       Explore Destinations <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link 
                      href="/auth/signup" 
                      className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-full text-lg font-bold text-white transition-all active:scale-95"
                    >
                       Join the Community
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
