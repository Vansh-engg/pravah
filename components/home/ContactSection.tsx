"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-slate-950">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=2000" 
          alt="Contact Background" 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Centered Info */}
          <div className="flex-1 w-full max-w-4xl mx-auto space-y-16 text-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold font-heading text-white tracking-tighter drop-shadow-2xl">
                Get in <span className="text-gradient">Touch</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                We're here to help you plan the perfect escape.
                Reach out for custom itineraries and group bookings.
              </p>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div 
                whileHover={{ y: -10 }}
                className="flex flex-col items-center gap-6 p-8 glass-card border-white/10 rounded-[2.5rem]"
              >
                <div className="p-5 bg-primary/20 backdrop-blur-3xl rounded-3xl border border-primary/30">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Email Us</p>
                  <p className="text-white font-bold text-xl">hello@pravahholiday.com</p>
                </div>
              </motion.div>
 
              <motion.div 
                whileHover={{ y: -10 }}
                className="flex flex-col items-center gap-6 p-8 glass-card border-white/10 rounded-[2.5rem]"
              >
                <div className="p-5 bg-primary/20 backdrop-blur-3xl rounded-3xl border border-primary/30">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Call Us</p>
                  <p className="text-white font-bold text-xl">+91 98765 43210</p>
                </div>
              </motion.div>
 
              <motion.div 
                whileHover={{ y: -10 }}
                className="flex flex-col items-center gap-6 p-8 glass-card border-white/10 rounded-[2.5rem]"
              >
                <div className="p-5 bg-primary/20 backdrop-blur-3xl rounded-3xl border border-primary/30">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Location</p>
                  <p className="text-white font-bold text-xl">123, Ethereal Plaza, Mumbai</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
