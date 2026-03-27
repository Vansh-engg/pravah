"use client";

import { motion } from "framer-motion";
import { Compass, Calendar, Clock, MapPin, Users, ChevronRight, LayoutDashboard, History, Settings, LogOut, LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const UserDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'past'>('active');

  const handleSignOut = async () => {
    document.cookie = "demo-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    await supabase.auth.signOut();
    router.push("/");
  };

  const tours: Record<'active' | 'upcoming' | 'past', any[]> = {
    active: [
      { id: "1", title: "Bali Coastal Expedition", members: 12, status: "Ongoing", progress: 65, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80" }
    ],
    upcoming: [
      { id: "2", title: "Iceland Northern Lights", members: 8, status: "Starting in 3 days", date: "April 15, 2026", image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=400&q=80" }
    ],
    past: [
       { id: "3", title: "Kyoto Autumn Flow", members: 15, status: "Completed", date: "Oct 2025", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#05070a] pt-24 pb-12 px-6 lg:px-12 flex gap-8">
      {/* Sidebar - Dashboard Navigation */}
      <aside className="hidden lg:flex flex-col w-72 h-[calc(100vh-120px)] sticky top-24 glass rounded-[2.5rem] border border-white/5 p-8 justify-between shadow-2xl">
         <div className="space-y-12">
            <div className="flex items-center gap-4 group">
               <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center p-2.5">
                  <UserIcon className="h-full w-full text-cyan-400" />
               </div>
               <div className="flex flex-col leading-none">
                  <span className="text-white font-bold">Adnin Flow</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Free Tier Explorer</span>
               </div>
            </div>

            <nav className="space-y-4">
               <SidebarLink icon={LayoutDashboard} label="Dashboard" active />
               <SidebarLink icon={Compass} label="Find Journeys" />
               <SidebarLink icon={History} label="Booking Records" />
               <SidebarLink icon={Settings} label="Identity Config" />
            </nav>
         </div>

         <button 
           onClick={handleSignOut}
           className="flex items-center gap-4 text-slate-500 hover:text-red-400 transition-colors p-3 rounded-2xl group"
         >
            <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Sign Out Identity</span>
         </button>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 space-y-12 max-w-6xl mx-auto">
         {/* Top Welcome Section */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
               <h1 className="text-4xl md:text-5xl font-bold font-heading">Your Hub</h1>
               <p className="text-slate-400">Manage your active flows and upcoming adventures.</p>
            </div>
            <div className="flex bg-white/5 rounded-2xl p-1.5 border border-white/5">
                {(['active', 'upcoming', 'past'] as const).map(tab => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={cn(
                       "px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all",
                       activeTab === tab ? "bg-cyan-500 text-white shadow-xl shadow-cyan-500/20" : "text-slate-500 hover:text-white"
                     )}
                   >
                     {tab}
                   </button>
                ))}
            </div>
         </div>

         {/* Content Grid */}
         <motion.div 
           key={activeTab}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
         >
            {tours[activeTab].map((tour, idx) => (
              <motion.div
                 key={tour.id}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: idx * 0.1 }}
                 className="group glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full ring-1 ring-white/5 hover:ring-white/20"
              >
                 <div className="relative h-48 overflow-hidden">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4">
                       <span className="glass backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold text-white border border-white/10 tracking-widest">
                          {tour.status}
                       </span>
                    </div>
                 </div>

                 <div className="p-8 flex flex-col flex-1 space-y-6">
                    <div className="space-y-3">
                       <h3 className="text-2xl font-bold font-heading group-hover:text-cyan-400 transition-colors">{tour.title}</h3>
                       <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
                          <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {tour.members} joined</span>
                          {'date' in tour && (
                             <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {tour.date}</span>
                          )}
                       </div>
                    </div>

                    {'progress' in tour && (
                       <div className="space-y-3">
                          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                             <span>Completion Flow</span>
                             <span className="text-cyan-400">{tour.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${tour.progress}%` }}
                               transition={{ duration: 1, delay: 0.5 }}
                               className="h-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-purple-500 rounded-full"
                             />
                          </div>
                       </div>
                    )}

                    <div className="pt-4 mt-auto">
                       <Link 
                         href={`/tour/${tour.id}`}
                         className="w-full bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition-all group-hover:border-cyan-500/30 border border-transparent"
                       >
                          <span>Manage Booking</span>
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                       </Link>
                    </div>
                 </div>
              </motion.div>
            ))}
            
            {tours[activeTab].length === 0 && (
               <div className="col-span-full py-24 text-center glass rounded-[2.5rem] border border-dashed border-white/10">
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No flows found in this stream</p>
               </div>
            )}
         </motion.div>
      </main>
    </div>
  );
};

const UserIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const SidebarLink = ({ icon: Icon, label, active = false }: { icon: LucideIcon, label: string, active?: boolean }) => (
  <Link 
    href="#" 
    className={cn(
      "flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all group",
      active ? "bg-cyan-500 text-white shadow-xl shadow-cyan-500/20" : "text-slate-500 hover:text-white hover:bg-white/5"
    )}
  >
    <Icon className={cn("h-5 w-5", active ? "text-white" : "group-hover:text-cyan-400")} />
    <span>{label}</span>
  </Link>
);

export default UserDashboard;
