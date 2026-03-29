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
    <div className="min-h-screen bg-background pt-24 pb-12 px-6 lg:px-12 flex gap-8">
      {/* Sidebar - Dashboard Navigation */}
      <aside className="hidden lg:flex flex-col w-72 h-[calc(100vh-120px)] sticky top-24 glass-card rounded-[2.5rem] border border-glass-border p-8 justify-between shadow-2xl">
         <div className="space-y-12">
            <div className="flex items-center gap-4 group">
               <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center p-2.5">
                  <UserIcon className="h-full w-full text-orange-400" />
               </div>
               <div className="flex flex-col leading-none">
                  <span className="text-foreground font-bold">Adnin Flow</span>
                  <span className="text-[10px] text-muted uppercase tracking-widest mt-1">Free Tier Explorer</span>
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
           className="flex items-center gap-4 text-muted hover:text-red-400 transition-colors p-3 rounded-2xl group"
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
               <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground">Your Hub</h1>
               <p className="text-muted">Manage your active flows and upcoming adventures.</p>
            </div>
            <div className="flex bg-background/50 rounded-2xl p-1.5 border border-glass-border">
                {(['active', 'upcoming', 'past'] as const).map(tab => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={cn(
                       "px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all",
                       activeTab === tab ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20" : "text-muted hover:text-foreground"
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
                  className="group glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full border border-glass-border hover:border-orange-500/30 transition-all shadow-lg"
               >
                 <div className="relative h-48 overflow-hidden">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4">
                       <span className="glass-card backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold text-white border border-white/20 tracking-widest bg-black/40">
                          {tour.status}
                       </span>
                    </div>
                 </div>

                 <div className="p-8 flex flex-col flex-1 space-y-6">
                    <div className="space-y-3">
                       <h3 className="text-2xl font-bold font-heading group-hover:text-orange-500 transition-colors text-foreground">{tour.title}</h3>
                       <div className="flex items-center gap-6 text-muted text-sm font-medium">
                          <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {tour.members} joined</span>
                          {'date' in tour && (
                             <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {tour.date}</span>
                          )}
                       </div>
                    </div>

                    {'progress' in tour && (
                       <div className="space-y-3">
                          <div className="flex justify-between text-xs font-bold text-muted uppercase tracking-widest">
                             <span>Completion Flow</span>
                             <span className="text-orange-500">{tour.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-orange-500/10 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${tour.progress}%` }}
                               transition={{ duration: 1, delay: 0.5 }}
                               className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500 rounded-full"
                             />
                          </div>
                       </div>
                    )}

                    <div className="pt-4 mt-auto">
                       <Link 
                         href={`/tour/${tour.id}`}
                         className="w-full bg-background/50 hover:bg-orange-500/10 p-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition-all group-hover:border-orange-500/30 border border-glass-border text-foreground"
                       >
                          <span>Manage Booking</span>
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                       </Link>
                    </div>
                 </div>
              </motion.div>
            ))}
            
            {tours[activeTab].length === 0 && (
               <div className="col-span-full py-24 text-center glass-card rounded-[2.5rem] border border-dashed border-glass-border">
                  <p className="text-muted font-bold uppercase tracking-widest text-xs">No flows found in this stream</p>
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
       active ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20" : "text-muted hover:text-foreground hover:bg-orange-500/5"
     )}
   >
     <Icon className={cn("h-5 w-5", active ? "text-white" : "group-hover:text-orange-400")} />
     <span>{label}</span>
   </Link>
);

export default UserDashboard;
