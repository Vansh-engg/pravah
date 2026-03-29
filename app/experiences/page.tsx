"use client";

import { motion } from "framer-motion";
import { Zap, Heart, Sparkles, Globe, ArrowRight, ShieldCheck, Compass, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const experienceTiers = [
  {
    title: "The Pulse (Adventure)",
    tag: "High Energy",
    description: "For those who hunt for adrenaline. From skydiving over the Himalayas to trekking the remote frontiers of Ladakh.",
    features: ["Expert Mountain Guides", "Premium Gear Support", "Helicopter Extraction Ready", "Off-beat Basecamps"],
    image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad0?auto=format&fit=crop&w=1200&q=80",
    color: "orange"
  },
  {
    title: "The Stillness (Wellness)",
    tag: "Pure Serenity",
    description: "Reconnect with your essence. Ayurvedic retreats in Kerala, mountain-side meditation, and detox journeys.",
    features: ["Personalized Sattvic Diet", "Global Yoga Masters", "Private Spa Suites", "Nature-connected Stays"],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    color: "amber"
  },
  {
    title: "The Legacy (Culture)",
    tag: "Time Travel",
    description: "Witness history in slow motion. Private temple entries, royal lineage stays, and heritage craft immersions.",
    features: ["Private Concierge Service", "Authentic Culinary Routes", "Historical Storytellers", "VVIP Site Access"],
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    color: "yellow"
  }
];

const ExperiencesPage = () => {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20 overflow-hidden">
      {/* Hero Header */}
      <section className="container mx-auto px-6 mb-20">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-8"
            >
               <div className="inline-flex h-12 w-12 rounded-2xl bg-orange-500/10 items-center justify-center border border-orange-500/20">
                  <Sparkles className="h-6 w-6 text-orange-400" />
               </div>
                <h1 className="text-5xl md:text-7xl font-bold font-heading text-foreground tracking-tighter leading-tight">
                   Immersive <span className="text-gradient">Experiences</span> <br /> Defined.
                </h1>
                <p className="max-w-xl text-muted text-lg md:text-xl leading-relaxed">
                  We don't just plan trips; we curate moments that stay in your memory long after the dust has settled. Discover the flow that matches your soul.
               </p>
               <div className="flex flex-wrap gap-4 pt-4">
                   <div className="flex items-center gap-2 bg-background border border-glass-border px-5 py-3 rounded-2xl text-sm font-bold text-foreground tracking-wide">
                      <ShieldCheck className="h-5 w-5 text-orange-500" /> Verified Stays
                   </div>
                   <div className="flex items-center gap-2 bg-background border border-glass-border px-5 py-3 rounded-2xl text-sm font-bold text-foreground tracking-wide">
                      <Users className="h-5 w-5 text-orange-500" /> Private Groups
                   </div>
                   <div className="flex items-center gap-2 bg-background border border-glass-border px-5 py-3 rounded-2xl text-sm font-bold text-foreground tracking-wide">
                      <Globe className="h-5 w-5 text-orange-500" /> Local Impact
                   </div>
               </div>
            </motion.div>

             <div className="relative h-[50vh] lg:h-[70vh] rounded-[3.5rem] overflow-hidden shadow-2xl shadow-orange-500/10">
                <img 
                   src="https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?auto=format&fit=crop&w=1600&q=90" 
                   alt="Experience hero" 
                   className="w-full h-full object-cover transition-all duration-[5000ms] scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-10 left-10 p-4 lg:p-10 text-white space-y-4">
                  <h3 className="text-2xl font-bold font-heading">The Explorer’s Path</h3>
                  <p className="text-sm opacity-60 max-w-sm">Every moment is a destination of its own. We guide you to see more, feel more, and flow deeper into the unknown.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Experience Tiers Section */}
      <section className="container mx-auto px-6 py-12 md:py-20 space-y-24 md:space-y-32">
         {experienceTiers.map((tier, idx) => (
            <motion.div
               key={tier.title}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className={cn(
                  "flex flex-col lg:flex-row gap-8 lg:gap-24 items-center",
                  idx % 2 === 1 && "lg:flex-row-reverse"
               )}
            >
               <div className="flex-1 space-y-10">
                   <div className="space-y-4">
                      <span className="text-orange-400 font-bold uppercase tracking-[0.2em] text-xs px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">{tier.tag}</span>
                      <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground">{tier.title}</h2>
                      <p className="max-w-xl text-muted text-lg leading-relaxed whitespace-pre-wrap">{tier.description}</p>
                   </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {tier.features.map(feat => (
                         <div key={feat} className="flex items-center gap-3 group">
                            <div className="h-8 w-8 rounded-lg bg-background border border-glass-border flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                               <Zap className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-bold text-muted">{feat}</span>
                         </div>
                      ))}
                   </div>

                   <div className="pt-6">
                      <Link 
                         href="/auth/login" 
                         className="inline-flex items-center gap-4 py-4 px-10 rounded-2xl bg-background border border-glass-border hover:border-orange-500/30 text-foreground font-bold transition-all hover:bg-orange-500/10 active:scale-95 group"
                      >
                         Personalize this Flow <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                   </div>
               </div>

                <div className="flex-1 w-full relative">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
                   <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-[4rem] overflow-hidden shadow-2xl glass-card p-6 border border-glass-border group shadow-orange-500/5">
                     <img 
                        src={tier.image} 
                        alt={tier.title} 
                        className="w-full h-full object-cover rounded-[3rem] grayscale opacity-60 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                     />
                     <div className="absolute top-12 left-12 flex flex-col gap-3">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl group-hover:scale-110 transition-transform">
                           <Compass className="h-8 w-8 text-white" />
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
         ))}
      </section>

      {/* Floating Panel / Vision CTA Integration */}
      <section className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-orange-500/5 to-transparent pointer-events-none" />
          <div className="container mx-auto px-6 text-center space-y-12">
             <h2 className="text-5xl font-bold font-heading text-foreground max-w-3xl mx-auto tracking-tight">
                Every destination has a flow. <br /> <span className="text-gradient">Find Yours.</span>
             </h2>
             <div className="flex justify-center gap-10 opacity-40">
                {[1, 2, 3, 4, 5].map(idx => (
                   <Sparkles key={idx} className="h-8 w-8 text-orange-500 scale-75 animate-pulse" style={{ animationDelay: `${idx * 1.5}s` }} />
                ))}
             </div>
             <Link 
                href="/top-destinations" 
                className="bg-orange-500 hover:bg-orange-600 px-12 py-5 rounded-full text-xl font-bold text-white shadow-2xl shadow-orange-500/30 flex items-center gap-3 transition-all active:scale-95 w-fit mx-auto group"
             >
                Unlock Full Catalog <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
      </section>
    </div>
  );
};

export default ExperiencesPage;
