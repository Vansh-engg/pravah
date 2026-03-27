"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Star, Clock, Users, MapPin, ArrowRight, ChevronDown, Compass } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const destinations = [
  {
     id: "1",
     title: "Manali, Himachal",
     tag: "Mountains",
     price: 35000,
     duration: "6 Days",
     rating: 4.8,
     reviews: 320,
     image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=90",
     desc: "Experience the majestic serenity of the Himalayas with a journey into the heart of Himachal's snow-capped peaks."
  },
  {
     id: "2",
     title: "Leh-Ladakh",
     tag: "Adventure",
     price: 65000,
     duration: "9 Days",
     rating: 5.0,
     reviews: 450,
     image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=1600&q=90",
     desc: "Traverse high altitude passes and ancient monasteries in the barren yet beautiful landscape of the northern frontier."
  },
  {
     id: "3",
     title: "Goa",
     tag: "Beach",
     price: 25000,
     duration: "4 Days",
     rating: 4.9,
     reviews: 890,
     image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=90",
     desc: "Golden sands, vibrant culture, and the endless rhythm of the Arabian Sea. The ultimate paradise for beach lovers."
  },
  {
     id: "4",
     title: "Konkan Coast",
     tag: "Beach",
     price: 20000,
     duration: "5 Days",
     rating: 4.7,
     reviews: 210,
     image: "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=1600&q=90",
     desc: "Discover hidden gems along Maharashtra's rugged coastline. Traditional living meets untouched natural beauty."
  },
  {
     id: "5",
     title: "Munnar, Kerala",
     tag: "Nature",
     price: 30000,
     duration: "5 Days",
     rating: 4.9,
     reviews: 560,
     image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1600&q=90",
     desc: "Endless rolling tea gardens and mist-covered hills. Munnar is a lush getaway for seekers of peace and greenery."
  },
  {
     id: "6",
     title: "Alleppey",
     tag: "Nature",
     price: 28000,
     duration: "4 Days",
     rating: 4.8,
     reviews: 430,
     image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=90",
     desc: "The famous Kerala backwaters. Glide through tranquil canals on premium houseboats and witness rural life in slow motion."
  },
  {
     id: "7",
     title: "Hampi, Karnataka",
     tag: "History",
     price: 22000,
     duration: "4 Days",
     rating: 4.9,
     reviews: 310,
     image: "https://images.unsplash.com/photo-1625244724123-1f6918146e9b?w=1600&q=90",
     desc: "Step into an ancient world of boulders and empires. Hampi offers a spiritual journey through UNESCO World Heritage ruins."
  },
  {
     id: "8",
     title: "Coorg",
     tag: "Nature",
     price: 24000,
     duration: "3 Days",
     rating: 4.7,
     reviews: 280,
     image: "https://images.unsplash.com/photo-1580228063777-6222b40552f8?w=1600&q=90",
     desc: "Known as the Scotland of India. Experience coffee plantations and vibrant Kodava hospitality in these misted highlands."
  },
  {
     id: "9",
     title: "Varanasi",
     tag: "Spiritual",
     price: 18000,
     duration: "3 Days",
     rating: 4.9,
     reviews: 670,
     image: "https://images.unsplash.com/photo-1545631853-90d5754f9448?w=1600&q=90",
     desc: "One of the oldest living cities in the world. Witness a profound spiritual flow on the banks of the mighty Ganges."
  },
  {
     id: "10",
     title: "Srinagar, Kashmir",
     tag: "Mountains",
     price: 45000,
     duration: "7 Days",
     rating: 5.0,
     reviews: 520,
     image: "https://images.unsplash.com/photo-1598330106281-0651790967a5?w=1600&q=90",
     desc: "A floating paradise. Staying on Dal Lake houseboats and visiting historic gardens makes for a truly ethereal experience."
  },
];

const categories = ["All", "Mountains", "Beach", "Nature", "Adventure", "History", "Spiritual"];

const DestinationsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredDestinations = selectedCategory === "All" 
    ? destinations 
    : destinations.filter(d => d.tag === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20">
      {/* Header Section */}
      <section className="container mx-auto px-6 mb-16">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-center"
         >
            <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold uppercase tracking-[0.3em] text-xs">
               <Compass className="h-4 w-4" /> Discover the World
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-heading text-white tracking-tighter">
               Top <span className="text-gradient">Destinations</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
               Carefully curated travel experiences across the most enchanting landscapes of India and beyond.
            </p>
         </motion.div>
      </section>

      {/* Filter and Search Section */}
      <section className="container mx-auto px-6 mb-12">
         <div className="glass-dark p-4 rounded-[2rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-cyan-500/5">
            <div className="flex flex-wrap items-center justify-center gap-2">
               {categories.map((cat) => (
                  <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={cn(
                        "px-6 py-2.5 rounded-2xl text-sm font-bold transition-all active:scale-95 border",
                        selectedCategory === cat 
                           ? "bg-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/20" 
                           : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white"
                     )}
                  >
                     {cat}
                  </button>
               ))}
            </div>
            <div className="relative w-full md:w-80">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
               <input 
                  type="text" 
                  placeholder="Search Destinations..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/50 transition-all focus:ring-4 focus:ring-cyan-500/10"
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
                     className="group/card relative flex flex-col rounded-[2.5rem] overflow-hidden glass-card border border-white/5 hover:border-cyan-500/30 transition-all shadow-2xl"
                  >
                     <div className="relative aspect-[4/5] overflow-hidden">
                        <img 
                           src={dest.image} 
                           alt={dest.title} 
                           className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent opacity-80" />
                        <div className="absolute top-6 left-6 flex flex-col gap-3">
                           <span className="bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
                              {dest.tag}
                           </span>
                        </div>
                        <div className="absolute top-6 right-6">
                           <div className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 transition-colors cursor-pointer group-hover/card:rotate-12">
                              <MapPin className="h-5 w-5" />
                           </div>
                        </div>
                     </div>

                     <div className="flex-1 p-8 space-y-6 flex flex-col">
                        <div className="flex justify-between items-start gap-4">
                           <div className="space-y-1">
                              <h3 className="text-3xl font-bold font-heading text-white tracking-tight group-hover/card:text-cyan-400 transition-colors">
                                 {dest.title}
                              </h3>
                              <div className="flex items-center gap-1.5">
                                 <Star className="h-3 w-3 fill-cyan-500 text-cyan-500" />
                                 <span className="text-[11px] font-bold text-white">{dest.rating} <span className="text-slate-500">({dest.reviews})</span></span>
                              </div>
                           </div>
                           <div className="text-right">
                              <span className="block text-[10px] text-cyan-400 font-bold uppercase tracking-widest mb-1">From</span>
                              <span className="text-3xl font-bold font-heading text-white tracking-tighter">₹{(dest.price / 1000).toFixed(0)}k</span>
                           </div>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                           {dest.desc}
                        </p>

                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.15em] text-white/40">
                           <span className="flex items-center gap-2 py-2 px-3 bg-white/5 rounded-xl border border-white/5"><Clock className="h-4 w-4 text-cyan-500" /> {dest.duration}</span>
                           <span className="flex items-center gap-2 py-2 px-3 bg-white/5 rounded-xl border border-white/5"><Users className="h-4 w-4 text-cyan-500" /> 16 Slots</span>
                        </div>

                        <div className="pt-4 mt-auto">
                           <Link
                              href={`/tour/${dest.id}`}
                              className="w-full py-5 rounded-[1.5rem] bg-white/5 hover:bg-cyan-500 border border-white/10 group-hover/card:border-cyan-500/50 flex items-center justify-center gap-3 text-sm font-bold text-white transition-all shadow-xl group-hover/card:shadow-cyan-500/20 active:scale-95"
                           >
                              Reserve My Experience <ArrowRight className="h-5 w-5 group-hover/card:translate-x-1 transition-transform" />
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
