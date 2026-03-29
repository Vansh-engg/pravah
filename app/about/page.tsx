"use client";

import { motion } from "framer-motion";
import { Compass, ShieldCheck, Heart, Zap, Globe, Users, ArrowRight, Quote, Map, Award, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Destinations Covered", value: "250+", icon: <Map className="w-5 h-5 text-info" /> },
  { label: "Happy Explorers", value: "15k+", icon: <Users className="w-5 h-5 text-primary" /> },
  { label: "Travel Awards", value: "12", icon: <Award className="w-5 h-5 text-info" /> },
  { label: "Local Curators", value: "120+", icon: <Sparkles className="w-5 h-5 text-primary" /> },
];

const pillars = [
  {
    icon: <Globe className="w-8 h-8 text-info" />,
    title: "Conscious Exploration",
    description: "We don't just visit; we co-exist. Pravah is dedicated to sustainable travel that empowers local communities and protects the pulse of Mother Nature.",
    color: "bg-info/10"
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "The Gold Standard",
    description: "Quality isn't an option; it's our heritage. From hand-picked stays to elite local guides, every detail is engineered for perfection.",
    color: "bg-primary/10"
  },
  {
    icon: <Heart className="w-8 h-8 text-info" />,
    title: "Soulful Connections",
    description: "Beyond coordinates lie stories. We bridge the distance between your curiosity and the authentic souls of each destination.",
    color: "bg-info/10"
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Next-Gen Journeying",
    description: "Seamless movement powered by cutting-edge technology. Experience a travel flow where digital simplicity meets physical wonder.",
    color: "bg-primary/10"
  }
];

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* 🎬 HD Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=90" 
          alt="HD Travel Backdrop" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 flex flex-col">
        {/* 🚀 Cinematic Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden pt-40 pb-20">
        <div className="absolute inset-0 z-0 scale-110">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2400&q=80" 
            alt="Traveling Background" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-5xl mx-auto text-center space-y-8"
          >
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-card border border-primary/20 mb-4 shadow-xl"
            >
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
               </span>
               <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">Redefining the Flow</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-9xl font-bold font-heading text-white tracking-tighter leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              Crafting <span className="text-gradient underline decoration-primary/30 underline-offset-8">True Flow</span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-white/90 text-lg md:text-2xl leading-relaxed font-medium drop-shadow-lg">
              Pravah isn't just an agency; it's a movement. We harmonize the rhythm of your spirit with the world's most enchanting destinations.
            </p>
          </motion.div>
        </div>

        {/* Floating Stats Bar */}
        <div className="container mx-auto px-6 mt-16 relative z-20">
          <div className="glass-dark border border-glass-border rounded-[3rem] p-8 md:p-12 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {stats.map((stat, idx) => (
              <div key={stat.label} className={cn(
                "flex flex-col items-center justify-center text-center space-y-2",
                idx !== stats.length - 1 && "md:border-r border-glass-border"
              )}>
                <div className="p-3 bg-white/5 rounded-2xl mb-2">
                  {stat.icon}
                </div>
                <span className="text-3xl md:text-4xl font-bold text-white tracking-tighter">{stat.value}</span>
                <span className="text-white/50 text-[10px] uppercase font-bold tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📜 The Story Section */}
      <section className="py-32 relative overflow-hidden text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <span className="text-info font-bold uppercase tracking-[0.2em] text-sm">Founded 2024</span>
                <h2 className="text-5xl font-bold font-heading text-white tracking-tight leading-none">
                  Where Your Story meets <br/> <span className="text-info">the Open Road.</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                <p>
                  We realized that modern travel had lost its pulse. It became a checklist, a blur of transit and static sights. We founded Pravah to restore the "Flow" — the effortless, soulful transition between one wonder and the next.
                </p>
                <div className="p-8 bg-white/5 border-l-4 border-primary rounded-2xl relative">
                  <Quote className="absolute top-4 right-4 h-12 w-12 text-primary/10" />
                  <p className="italic text-white font-medium">
                    "Flow is the state where time vanishes and curiosity takes the wheel. That is the only way we travel."
                  </p>
                  <p className="mt-4 text-sm font-bold text-white/40">— Vansh, Founder</p>
                </div>
                <p>
                  Our Curators aren't just agents; they are artists of adventure. They weave local heritage, high-end comfort, and cutting-edge tech into a tapestry of memories that lasts a lifetime.
                </p>
              </div>

               <Link href="/top-destinations" className="group inline-flex items-center gap-4 text-white font-bold text-lg hover:text-primary transition-all">
                  Discover Our Curated Paths <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all"><ArrowRight className="h-5 w-5" /></div>
               </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80" 
                  alt="Vision landscape" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 flex items-center gap-6">
                   <div className="h-20 w-20 rounded-3xl glass-card backdrop-blur-3xl border border-white/20 flex items-center justify-center">
                      <Compass className="h-10 w-10 text-primary" />
                   </div>
                   <div className="text-white space-y-1">
                      <p className="text-sm font-bold uppercase tracking-widest text-primary">Uncharted</p>
                      <p className="text-xl font-bold">New Frontiers Daily</p>
                   </div>
                </div>
              </div>
              {/* Decorative blobs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-info/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🏛️ The Pillars Section */}
      <section className="py-32 bg-slate-950 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[150px] animate-pulse" />
           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-info rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center mb-24 space-y-4">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm">Deep Foundations</span>
          <h2 className="text-5xl md:text-7xl font-bold font-heading text-white tracking-tighter leading-tight">
            Built on <span className="text-gradient">Pure Intent.</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">The currents that steer every decision, from the first spark of a dream to the final sunset over a new horizon.</p>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-10 rounded-[3rem] glass-dark border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all text-left flex flex-col h-full"
              >
                <div className={cn("mb-8 h-16 w-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-xl", pillar.color)}>
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight leading-tight">{pillar.title}</h3>
                <p className="text-white/50 text-base leading-relaxed mb-8 flex-grow">{pillar.description}</p>
                 <div className="w-8 h-1 bg-white/10 rounded-full group-hover:w-full group-hover:bg-primary transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🤝 Final CTA Section */}
      <section className="py-24 relative lg:py-40">
        <div className="container mx-auto px-6">
           <div className="relative rounded-[5rem] overflow-hidden group min-h-[60vh] flex items-center">
              {/* Background with animation */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000" 
                  alt="Adventure waits" 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-[20000ms] group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="relative z-10 p-12 lg:p-32 space-y-10 max-w-4xl text-left">
                 <h2 className="text-5xl md:text-8xl font-bold font-heading text-white tracking-tighter leading-none">
                    Your True Flow <br/> <span className="text-gradient">Starts Here.</span>
                 </h2>
                 <p className="text-white/80 max-w-xl text-xl md:text-2xl leading-relaxed">
                    Don't just travel. Find the rhythm of the world with us. One soul, one story, one flow at a time.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-start gap-8 pt-4">
                    <Link 
                      href="/top-destinations" 
                      className="w-full sm:w-auto bg-primary hover:bg-primary/90 px-10 py-5 rounded-full text-xl font-bold text-white shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 transition-all active:scale-95 group/btn"
                    >
                       Find Your Path <ArrowRight className="h-6 w-6 group-hover/btn:translate-x-2 transition-transform" />
                    </Link>
                    <Link 
                      href="/contact" 
                      className="w-full sm:w-auto glass-card hover:bg-white/10 border border-white/20 px-10 py-5 rounded-full text-xl font-bold text-white transition-all active:scale-95 flex items-center justify-center"
                    >
                       Speak to a Curator
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default AboutPage;
