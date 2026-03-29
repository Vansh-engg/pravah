"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  ChevronRight, 
  ChevronLeft,
  Coffee,
  Car,
  Home,
  User,
  ShieldCheck,
  Plane
} from 'lucide-react';
import Link from "next/link";
import { cn } from '@/lib/utils';

// --- Data ---
const packages = [
  {
    id: "himachal-01",
    title: "Heavenly Himachal",
    subtitle: "Mountains & Valleys",
    price: "₹16,999",
    priceLabel: "PP",
    duration: "6 Days / 5 Nights",
    dates: "18 May 2026",
    locations: ["Amritsar", "Atari Border", "Kullu", "Manali", "Solang Valley", "Kasol"],
    inclusions: [
      { icon: Car, label: "Transport" },
      { icon: Home, label: "Stay" },
      { icon: Coffee, label: "Meals" },
      { icon: User, label: "Guide" }
    ],
    image: "/destinations/himachal.png",
    rating: 4.9,
    tag: "Trending",
  },
  {
    id: "nivati-01",
    title: "Nivati Beach",
    subtitle: "Konkan Escape",
    price: "₹4,999",
    priceLabel: "Full Trip",
    duration: "3 Days / 2 Nights",
    dates: "09 April – 12 April",
    locations: ["Nivati Beach", "Sindhudurg Fort", "Karli Backwaters"],
    inclusions: [
      { icon: Car, label: "Transport" },
      { icon: Home, label: "Stay" },
      { icon: MapPin, label: "Sightseeing" },
      { icon: User, label: "Tour Guide" }
    ],
    image: "/destinations/nivati.png",
    rating: 4.7,
    tag: "Budget Friendly",
  },
  {
    id: "leh-01",
    title: "Leh Ladakh",
    subtitle: "Ultimate Road Trip",
    price: "₹29,999",
    priceLabel: "PP",
    duration: "11 Nights / 12 Days",
    dates: "01 Oct 2026",
    locations: ["Leh", "Pangong Lake", "Nubra Valley", "Khardung La"],
    inclusions: [
      { icon: Car, label: "SUV/Bike" },
      { icon: Home, label: "Stay" },
      { icon: ShieldCheck, label: "Permits" },
      { icon: Plane, label: "Airport Transfer" }
    ],
    image: "/destinations/leh_ladakh.png",
    rating: 5.0,
    tag: "Adventure",
  },
  {
    id: "amarnath-01",
    title: "Amarnath Yatra",
    subtitle: "via Pahalgam Path",
    price: "₹18,000",
    priceLabel: "PP",
    duration: "8 Days / 7 Nights",
    dates: "30 June 2026",
    locations: ["Katra", "Pahalgam", "Chandanwari", "Sheshnag", "Amarnath Cave"],
    inclusions: [
      { icon: Plane, label: "Helicopter" },
      { icon: Home, label: "Stay" },
      { icon: ShieldCheck, label: "Medical" },
      { icon: User, label: "Registration" }
    ],
    image: "/destinations/amarnath.png",
    rating: 4.8,
    tag: "Spiritual",
  }
];

// --- Components ---

const PackageCard = ({ pkg }: { pkg: typeof packages[0] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative flex-shrink-0 w-[300px] md:w-[380px] h-[480px] rounded-[2rem] overflow-hidden group snap-start border border-glass-border shadow-2xl transition-all hover:border-primary/50"
    >
      {/* Background Image */}
      <img 
        src={pkg.image} 
        alt={pkg.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Price Tag */}
      <div className="absolute top-4 right-4 z-10 px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-lg">
        {pkg.price}
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-8 z-10">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">
          {pkg.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span>{pkg.duration.split(' / ')[0]}</span>
            <div className="w-1 h-1 rounded-full bg-primary" />
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span>{pkg.rating}</span>
            </div>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function PackageCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
               Explore Planned Trips
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full" />
          </div>

          <div className="flex items-center gap-8">
            <div className="flex gap-4">
              <button 
                onClick={() => scroll('left')}
                className="p-3 rounded-full bg-slate-100 text-slate-400 hover:bg-primary hover:text-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="p-3 rounded-full bg-slate-100 text-slate-400 hover:bg-primary hover:text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <Link href="/top-destinations" className="hidden md:flex items-center gap-2 text-primary font-bold text-sm group">
              View All Destinations
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 md:gap-8 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory"
        >
          {/* Add padding on start and end for centering/spacing */}
          <div className="flex-shrink-0 w-0 md:w-4" />
          
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}

          <div className="flex-shrink-0 w-0 md:w-4" />
        </div>

        {/* Mobile Indicator */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
           {packages.map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-foreground/10" />
           ))}
        </div>
      </div>
    </section>
  );
}
