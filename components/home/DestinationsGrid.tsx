"use client";

import { motion, useAnimationControls } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Star, Users, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const destinations = [
   {
      id: "1",
      title: "Manali, Himachal",
      tag: "Snow Adventure",
      price: 35000,
      duration: "6 Days",
      rating: 4.8,
      reviews: 320,
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=90",
   },
   {
      id: "2",
      title: "Leh-Ladakh",
      tag: "High Altitude",
      price: 65000,
      duration: "9 Days",
      rating: 5.0,
      reviews: 450,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=1600&q=90",
   },
   {
      id: "3",
      title: "Goa",
      tag: "Beach Paradise",
      price: 25000,
      duration: "4 Days",
      rating: 4.9,
      reviews: 890,
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=90",
   },
   {
      id: "4",
      title: "Konkan Coast",
      tag: "Hidden Gem",
      price: 20000,
      duration: "5 Days",
      rating: 4.7,
      reviews: 210,
      image: "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=1600&q=90",
   },
   {
      id: "5",
      title: "Munnar, Kerala",
      tag: "Tea Gardens",
      price: 30000,
      duration: "5 Days",
      rating: 4.9,
      reviews: 560,
      image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1600&q=90",
   },
   {
      id: "6",
      title: "Alleppey",
      tag: "Backwaters",
      price: 28000,
      duration: "4 Days",
      rating: 4.8,
      reviews: 430,
      image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=90",
   },
   {
      id: "7",
      title: "Hampi, Karnataka",
      tag: "Ancient Ruins",
      price: 22000,
      duration: "4 Days",
      rating: 4.9,
      reviews: 310,
      image: "https://images.unsplash.com/photo-1625244724123-1f6918146e9b?w=1600&q=90",
   },
   {
      id: "8",
      title: "Coorg",
      tag: "Coffee Capital",
      price: 24000,
      duration: "3 Days",
      rating: 4.7,
      reviews: 280,
      image: "https://images.unsplash.com/photo-1580228063777-6222b40552f8?w=1600&q=90",
   },
   {
      id: "9",
      title: "Varanasi",
      tag: "Spiritual Flow",
      price: 18000,
      duration: "3 Days",
      rating: 4.9,
      reviews: 670,
      image: "https://images.unsplash.com/photo-1545631853-90d5754f9448?w=1600&q=90",
   },
   {
      id: "10",
      title: "Srinagar, Kashmir",
      tag: "Heaven on Earth",
      price: 45000,
      duration: "7 Days",
      rating: 5.0,
      reviews: 520,
      image: "https://images.unsplash.com/photo-1598330106281-0651790967a5?w=1600&q=90",
   },
];

const duplicatedItems = [...destinations, ...destinations, ...destinations];

const DestinationsGrid = () => {
   const containerRef = useRef<HTMLDivElement>(null);
   const [containerWidth, setContainerWidth] = useState(0);
   const [currentIndex, setCurrentIndex] = useState(destinations.length);
   const [cardWidth, setCardWidth] = useState(0);
   const [isPaused, setIsPaused] = useState(false);
   const router = useRouter();
   const controls = useAnimationControls();
    const [gap, setGap] = useState(24);

    const updateLayout = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
      
      let visibleCards = 3;
      let currentGap = 24;
      
      if (width < 640) {
        visibleCards = 1.25; // More visibility for next card
        currentGap = 16;     // Tighter spacing for mobile
      } else if (width < 1024) {
        visibleCards = 2.1;
        currentGap = 20;
      }
      
      setGap(currentGap);
      const newCardWidth = (width - currentGap * (Math.floor(visibleCards))) / visibleCards;
      setCardWidth(newCardWidth);
    };

   useEffect(() => {
      updateLayout();
      window.addEventListener("resize", updateLayout);
      return () => window.removeEventListener("resize", updateLayout);
   }, []);

   const itemWidth = cardWidth + gap;
   const centerOffset = (containerWidth / 2) - (cardWidth / 2);

   useEffect(() => {
      // Sync initial position
      if (cardWidth > 0 && containerWidth > 0) {
         controls.set({ x: -currentIndex * itemWidth + centerOffset });
      }
    }, [cardWidth, containerWidth, gap]);

   // Auto-play
   useEffect(() => {
      if (isPaused || cardWidth <= 0) return;
      const interval = setInterval(() => {
         handleNext();
      }, 5000);
      return () => clearInterval(interval);
   }, [isPaused, currentIndex, cardWidth]);

   const slideTo = async (index: number) => {
      if (cardWidth <= 0) return;
      setCurrentIndex(index);
      await controls.start({
         x: -index * itemWidth + centerOffset,
         transition: { type: "spring", stiffness: 200, damping: 25 }
      });

      // Loop logic
      if (index >= destinations.length * 2) {
         setCurrentIndex(destinations.length);
         controls.set({ x: -destinations.length * itemWidth + centerOffset });
      } else if (index < destinations.length) {
         setCurrentIndex(destinations.length * 2 - 1);
         controls.set({ x: -(destinations.length * 2 - 1) * itemWidth + centerOffset });
      }
   };

   const handleNext = () => slideTo(currentIndex + 1);
   const handlePrev = () => slideTo(currentIndex - 1);

   return (
      <section id="destinations" className="py-16 overflow-hidden" ref={containerRef}>
         <div className="container mx-auto px-6 mb-10 flex flex-col md:flex-row justify-between items-end gap-6 text-center md:text-left">
            <div className="space-y-3">
               <span className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-[10px] lg:text-xs">Top Destinations</span>
               <h2 className="text-section text-white">
                  Flow into <br /> <span className="text-gradient">Paradise</span>
               </h2>
            </div>
            <p className="max-w-md text-body">
               Handpicked Indian experiences, designed for the modern explorer.
            </p>
         </div>

         <div className="relative w-full group/carousel px-4 lg:px-12">
            {/* Nav Arrows - Hide on small mobile */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 hidden sm:flex justify-between px-4 lg:px-6 z-40 pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500">
               <button onClick={handlePrev} className="pointer-events-auto h-12 w-12 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 transition-all shadow-2xl hover:scale-110 active:scale-90">
                  <ArrowLeft className="h-5 w-5" />
               </button>
               <button onClick={handleNext} className="pointer-events-auto h-12 w-12 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 transition-all shadow-2xl hover:scale-110 active:scale-90">
                  <ArrowRight className="h-5 w-5" />
               </button>
            </div>

            <div 
               className="overflow-hidden"
               onMouseEnter={() => setIsPaused(true)}
               onMouseLeave={() => setIsPaused(false)}
            >
               <motion.div
                  animate={controls}
                  initial={{ x: -destinations.length * itemWidth + centerOffset }}
                  style={{ width: "max-content", gap: gap }}
                  className="flex py-4"
               >
                  {duplicatedItems.map((dest, idx) => (
                     <div
                        key={`${dest.id}-${idx}`}
                        onClick={() => router.push("/auth/login")}
                        className={cn(
                           "relative flex-shrink-0 overflow-hidden rounded-[2rem] glass-card cursor-pointer group/card active:scale-95 transition-all duration-700",
                           idx === currentIndex ? "opacity-100 scale-100 shadow-[0_20px_40px_-10px_rgba(6,182,212,0.1)] ring-2 ring-cyan-500/10" : "opacity-30 scale-[0.9] blur-[1px] pointer-events-none"
                        )}
                        style={{ width: cardWidth || 300, height: 480 }}
                     >
                        <div className="absolute inset-0 z-0">
                           <img 
                              src={dest.image} 
                              alt={dest.title} 
                              crossOrigin="anonymous"
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110" 
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/20 to-transparent opacity-90" />
                        </div>

                        <div className="absolute top-4 left-4 z-10">
                           <span className="bg-cyan-500/20 backdrop-blur-xl border border-cyan-500/30 px-3 py-1 rounded-full text-[9px] font-bold text-cyan-400 uppercase tracking-widest shadow-lg">
                              {dest.tag}
                           </span>
                        </div>

                        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 z-10">
                           <div className="flex justify-between items-end gap-3">
                              <div className="space-y-2">
                                 <div className="flex items-center gap-1.5">
                                    <Star className="h-3 w-3 fill-cyan-500 text-cyan-500" />
                                    <span className="text-[10px] font-bold text-white tracking-wide">{dest.rating} <span className="opacity-40">({dest.reviews})</span></span>
                                 </div>
                                 <h3 className="text-card text-white tracking-tighter group-hover/card:text-cyan-400 transition-colors">
                                    {dest.title}
                                 </h3>
                                 <div className="flex flex-wrap items-center gap-3 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5 backdrop-blur-md bg-white/5 px-2 py-1 rounded-md border border-white/5"><Clock className="h-3 w-3 text-cyan-500" /> {dest.duration}</span>
                                    <span className="flex items-center gap-1.5 backdrop-blur-md bg-white/5 px-2 py-1 rounded-md border border-white/5"><Users className="h-3 w-3 text-cyan-500" /> 12 Slots</span>
                                 </div>
                              </div>

                              <div className="flex flex-col items-end gap-3">
                                 <div className="text-right">
                                    <span className="block text-[9px] text-cyan-500 font-bold uppercase tracking-widest leading-none mb-0.5">From</span>
                                    <span className="text-2xl lg:text-3xl font-bold font-heading text-white tracking-tighter">₹{(dest.price / 1000).toFixed(0)}k</span>
                                 </div>
                                 <div className="bg-white/5 hover:bg-cyan-500 text-cyan-400 hover:text-white p-3 rounded-xl transition-all group-hover/card:rotate-[360deg] duration-1000 border border-white/10">
                                    <ArrowUpRight className="h-5 w-5 lg:h-6 w-6" />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </motion.div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-10">
               {destinations.map((_, idx) => (
                  <button
                     key={idx}
                     onClick={() => slideTo(destinations.length + idx)}
                     className={cn(
                        "h-1.5 rounded-full transition-all duration-700",
                        (currentIndex % destinations.length) === idx ? "w-8 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "w-1.5 bg-white/10 hover:bg-white/30"
                     )}
                  />
               ))}
            </div>
         </div>
      </section>
   );
};

export default DestinationsGrid;





