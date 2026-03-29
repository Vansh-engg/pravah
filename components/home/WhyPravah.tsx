"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, Navigation, Globe, Zap, Users } from "lucide-react";

const features = [
  { 
    icon: Sparkles, 
    title: "Curated by Experts", 
    desc: "Our journeys managed by seasoned travelers who know the hidden gems.", 
    bgColor: "bg-primary/10",
    iconColor: "text-primary"
  },
  { 
    icon: Zap, 
    title: "Seamless Booking", 
    desc: "A friction-free experience from the first click to the final boarding pass.", 
    bgColor: "bg-secondary/20",
    iconColor: "text-primary"
  },
  { 
    icon: Shield, 
    title: "Verified Partners", 
    desc: "We only work with top-tier hotels and travel operators for your safety.", 
    bgColor: "bg-accent/20",
    iconColor: "text-accent"
  },
  { 
    icon: Globe, 
    title: "24/7 Support", 
    desc: "Secure payments and a dedicated concierge team available anytime.", 
    bgColor: "bg-info/10",
    iconColor: "text-info"
  },
];

const WhyPravah = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">
          Why Choose Pravah?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`${feat.bgColor} p-8 rounded-[2rem] flex flex-col items-start text-left space-y-4`}
            >
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <feat.icon className={`h-6 w-6 ${feat.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{feat.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPravah;
