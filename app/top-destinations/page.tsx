"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Star, Clock, Users, MapPin, ArrowRight, ChevronDown, Compass } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const destinations = [
  {
    id: "himachal-01",
    title: "Heavenly Himachal",
    tag: "Mountains",
    price: 16999,
    duration: "6 Days",
    rating: 4.9,
    reviews: 124,
    image: "/destinations/himachal.png",
    desc: "Experience the majestic serenity of the Himalayas with a journey into the heart of Himachal's snow-capped peaks. Explore Solang, Manali, and Kasol like never before."
  },
  {
    id: "nivati-01",
    title: "Nivati Beach",
    tag: "Beach",
    price: 4999,
    duration: "3 Days",
    rating: 4.7,
    reviews: 86,
    image: "/destinations/nivati.png",
    desc: "Discover the hidden azure blue waters of the Konkan coast. Pristine white sands, historic forts, and traditional coastal hospitality await."
  },
  {
    id: "leh-01",
    title: "Leh Ladakh",
    tag: "Adventure",
    price: 29999,
    duration: "12 Days",
    rating: 5.0,
    reviews: 215,
    image: "/destinations/leh_ladakh.png",
    desc: "The ultimate high-altitude road trip. Traverse winding asphalt roads through stark brown mountains leading to the crystal clear Pangong Tso."
  },
  {
    id: "amarnath-01",
    title: "Amarnath Yatra",
    tag: "Spiritual",
    price: 18000,
    duration: "8 Days",
    rating: 4.8,
    reviews: 340,
    image: "/destinations/amarnath.png",
    desc: "A sacred journey via Pahalgam through snowy Himalayan paths. Witness the spiritual atmosphere of the holy cave and the beauty of the valley."
  }
];

const categories = ["All", "Mountains", "Beach", "Nature", "Adventure", "History", "Spiritual"];

const DestinationsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredDestinations = selectedCategory === "All" 
    ? destinations 
    : destinations.filter(d => d.tag === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[50vh] flex flex-col justify-center overflow-hidden pt-40 pb-24">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000" 
          alt="Travel Background" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] scale-110 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center max-w-4xl mx-auto flex flex-col items-center"
          >
            <div className="flex items-center justify-center gap-2 text-primary font-bold uppercase tracking-[0.3em] text-xs">
               <Compass className="h-4 w-4" /> Discover the World
            </div>
            <h1 className="text-6xl md:text-8xl font-bold font-heading text-white tracking-tighter drop-shadow-2xl">
               Top <span className="text-gradient">Destinations</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl leading-relaxed font-medium">
               Carefully curated travel experiences across the most enchanting landscapes of India and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="container mx-auto px-6 mb-8 -mt-10 relative z-20">
         <div className="glass-dark p-4 rounded-[2rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => (
                  <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={cn(
                        "px-6 py-2.5 rounded-2xl text-sm font-bold transition-all active:scale-95 border",
                        selectedCategory === cat 
                           ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                           : "bg-background text-muted border-glass-border hover:bg-primary/10 hover:text-primary"
                     )}
                  >
                     {cat}
                  </button>
               ))}
            </div>
            <div className="relative w-full md:w-80">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted h-4 w-4" />
               <input 
                  type="text" 
                  placeholder="Search Destinations..." 
                  className="w-full bg-background border border-glass-border rounded-2xl py-3 pl-12 pr-4 text-sm text-foreground placeholder:text-muted outline-none focus:border-primary/50 transition-all focus:ring-4 focus:ring-primary/10"
               />
            </div>
         </div>
      </section>

      {/* Main Grid Section */}
      <section className="container mx-auto px-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            <AnimatePresence mode="popLayout">
               {filteredDestinations.map((dest, idx) => (
                  <motion.div
                     key={dest.id}
                     layout
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     transition={{ duration: 0.4, delay: idx * 0.05 }}
                     className="group/card relative flex flex-col rounded-[2.5rem] overflow-hidden glass-card border border-glass-border hover:border-primary transition-all shadow-xl"
                  >
                     <div className="relative h-48 sm:h-56 w-full overflow-hidden shrink-0">
                        <img 
                           src={dest.image} 
                           alt={dest.title} 
                           className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                        <div className="absolute top-6 left-6 flex flex-col gap-3">
                           <span className="bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
                              {dest.tag}
                           </span>
                        </div>
                        <div className="absolute top-6 right-6">
                           <div className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-orange-400 transition-colors cursor-pointer group-hover/card:rotate-12">
                              <MapPin className="h-5 w-5" />
                           </div>
                        </div>
                     </div>

                     <div className="flex-1 p-5 space-y-3 flex flex-col">
                        <div className="flex justify-between items-start gap-4">
                           <div className="space-y-1">
                              <h3 className="text-xl font-bold font-heading text-slate-900 group-hover/card:text-primary transition-colors">
                                 {dest.title}
                              </h3>
                              <div className="flex items-center gap-1.5">
                                 <Star className="h-3 w-3 fill-primary text-primary" />
                                 <span className="text-[10px] font-bold text-slate-900">{dest.rating} <span className="text-muted">({dest.reviews})</span></span>
                              </div>
                           </div>
                           <div className="text-right">
                              <span className="block text-[9px] text-primary font-bold uppercase tracking-widest">From</span>
                              <span className="text-2xl font-bold font-heading text-slate-900 tracking-tighter">₹{(dest.price / 1000).toFixed(0)}k</span>
                           </div>
                        </div>

                        <p className="text-muted text-xs leading-relaxed line-clamp-2">
                           {dest.desc}
                        </p>

                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
                           <span className="flex items-center gap-1.5 py-1.5 px-2.5 bg-background rounded-lg border border-glass-border"><Clock className="h-3 w-3 text-primary" /> {dest.duration}</span>
                           <span className="flex items-center gap-1.5 py-1.5 px-2.5 bg-background rounded-lg border border-glass-border"><Users className="h-3 w-3 text-primary" /> 16 Slots</span>
                        </div>

                        <div className="pt-2 mt-auto">
                           <Link
                              href={`/tour/${dest.id}`}
                              className="w-full py-3 rounded-2xl bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 text-xs font-bold text-white transition-all shadow-lg hover:shadow-primary/20 active:scale-95"
                           >
                              Reserve My Experience <ArrowRight className="h-4 w-4 group-hover/card:translate-x-1 transition-transform" />
                           </Link>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>
         
         {filteredDestinations.length === 0 && (
            <div className="py-40 text-center space-y-4">
               <h3 className="text-2xl font-bold text-white">No flows found in this category.</h3>
               <p className="text-slate-500">Try selecting another filter or searching for a specific place.</p>
               <button onClick={() => setSelectedCategory("All")} className="text-cyan-400 font-bold hover:underline">Clear all filters</button>
            </div>
         )}
      </section>

      {/* Featured Video Section */}
      <section className="container mx-auto px-6 py-32">
         <div className="relative h-[60vh] rounded-[4rem] overflow-hidden group shadow-3xl">
            <img 
               src="https://images.unsplash.com/photo-1544735049-717afb643282?auto=format&fit=crop&w=2000&q=80" 
               alt="Adventure awaits" 
               className="w-full h-full object-cover grayscale opacity-40 transition-all duration-2000 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-8">
               <div className="h-24 w-24 rounded-full bg-cyan-500/20 backdrop-blur-3xl border border-cyan-500/40 flex items-center justify-center text-white/80 group-hover:scale-125 transition-transform duration-700 cursor-pointer shadow-2xl">
                  <ChevronDown className="h-10 w-10 -rotate-90" />
               </div>
               <div className="space-y-4 max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-bold font-heading text-white">Witness the Journey</h2>
                  <p className="text-slate-300 text-lg">Every destination has a song. Every moment has a rhythm. Feel the Pravah flow before you even take flight.</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default DestinationsPage;
