"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, Map, Users, Settings, LogOut, Plus, TrendingUp, 
  DollarSign, ShieldCheck, Check, X, Clock, Trash2, Zap, LucideIcon,
  Edit2, MoreVertical, CheckCircle2, ChevronRight, History
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const router = useRouter();
  const [activeView, setActiveView] = useState<'overview' | 'tours' | 'bookings'>('overview');

  const handleSignOut = async () => {
    document.cookie = "demo-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    await supabase.auth.signOut();
    router.push("/");
  };

  const stats = [
    { label: "Active Revenue", value: "₹45.2L", icon: DollarSign, color: "text-emerald-500", trend: "+12.5%" },
    { label: "Total Managed Flows", value: "24", icon: Map, color: "text-info", trend: "+4" },
    { label: "Identity Counts", value: "1.2k", icon: Users, color: "text-orange-400", trend: "+120" },
    { label: "Flow Efficiency", value: "98%", icon: Zap, color: "text-amber-500", trend: "Steady" },
  ];

  const recentTours = [
    { id: "1", title: "Bali Coastal Expedition", price: 85000, bookings: 12, status: "Active", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=100&q=80" },
    { id: "2", title: "Iceland Northern Lights", price: 120000, bookings: 8, status: "Draft", image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=100&q=80" },
    { id: "3", title: "Kyoto Autumn Flow", price: 95000, bookings: 15, status: "Active", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=100&q=80" },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6 lg:px-12 flex gap-8">
      {/* Sidebar - Admin Navigation */}
      <aside className="hidden lg:flex flex-col w-72 h-[calc(100vh-120px)] sticky top-24 glass-card rounded-[2.5rem] border border-glass-border p-8 justify-between shadow-2xl">
         <div className="space-y-12">
            <div className="flex items-center gap-4 group">
               <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center p-2.5">
                  <ShieldCheck className="h-full w-full text-orange-400" />
               </div>
               <div className="flex flex-col leading-none">
                  <span className="text-foreground font-bold">Admin Hub</span>
                  <span className="text-[10px] text-muted uppercase tracking-widest mt-1">Super Clearance</span>
               </div>
            </div>

            <nav className="space-y-4">
               <SidebarLink icon={LayoutDashboard} label="Overview" active={activeView === 'overview'} onClick={() => setActiveView('overview')} />
               <SidebarLink icon={Map} label="Manage Tours" active={activeView === 'tours'} onClick={() => setActiveView('tours')} />
               <SidebarLink icon={Users} label="Identity Management" active={activeView === 'bookings'} onClick={() => setActiveView('bookings')} />
               <SidebarLink icon={Settings} label="System Config" />
            </nav>
         </div>

         <button 
           onClick={handleSignOut}
           className="flex items-center gap-4 text-muted hover:text-red-400 transition-colors p-3 rounded-2xl group"
         >
            <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Sign Out Admin</span>
         </button>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 space-y-12 max-w-6xl mx-auto">
         {/* Top Header Section */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
               <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground">Control Panel</h1>
               <p className="text-muted">Manage the global flow of Pravah Holidays.</p>
            </div>
            <Link 
              href="#"
              onClick={() => toast.success("Opening multi-step form...")}
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-3xl font-bold text-white shadow-xl shadow-orange-500/20 flex items-center gap-3 transition-all active:scale-95 group"
            >
               <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
               <span>Create New Journey</span>
            </Link>
         </div>

         {/* Stats Cards Row */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 className="p-8 glass-card rounded-[2.5rem] space-y-4 border border-glass-border"
              >
                 <div className="flex justify-between items-start">
                    <div className={`p-4 bg-background/50 rounded-2xl border border-glass-border ${stat.color}`}>
                       <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-400/10 px-2 py-1 rounded-full uppercase">
                       <TrendingUp className="h-3 w-3" /> {stat.trend}
                    </div>
                 </div>
                 <div className="space-y-1">
                    <span className="text-xs font-bold text-muted uppercase tracking-widest">{stat.label}</span>
                    <h3 className="text-3xl font-bold font-heading text-foreground">{stat.value}</h3>
                 </div>
              </motion.div>
            ))}
         </div>

         {/* Management Section (Overview View) */}
         {activeView === 'overview' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
              {/* Tour Management Table (Mockup) */}
              <div className="md:col-span-2 glass-card rounded-[3rem] p-10 border border-glass-border space-y-8 shadow-xl">
                 <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold font-heading text-foreground">Recent Journey Streams</h2>
                    <button className="text-xs font-bold uppercase tracking-widest text-orange-500 hover:underline">View All Flows</button>
                 </div>
                 <div className="space-y-4">
                    {recentTours.map((tour, idx) => (
                      <div key={idx} className="flex items-center justify-between p-6 rounded-3xl hover:bg-orange-500/5 border border-transparent hover:border-glass-border transition-all group">
                         <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden glass-card">
                               <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="space-y-1">
                               <h4 className="font-bold text-lg group-hover:text-orange-500 transition-colors text-foreground">{tour.title}</h4>
                               <div className="flex items-center gap-4 text-xs font-bold text-muted uppercase tracking-widest">
                                  <span>₹{(tour.price/1000).toFixed(0)}k Base</span>
                                  <span>•</span>
                                  <span className="text-orange-500">{tour.bookings} booked</span>
                               </div>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <button className="p-3 bg-background/50 border border-glass-border rounded-xl hover:bg-orange-500/10 transition-colors text-muted hover:text-orange-500">
                               <Edit2 className="h-4 w-4" />
                            </button>
                            <button className="p-3 bg-background/50 border border-glass-border rounded-xl hover:bg-orange-500/10 transition-colors text-muted hover:text-orange-500">
                               <MoreVertical className="h-4 w-4" />
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

               {/* Identity Verification Queue (Mockup) */}
               <div className="glass-card rounded-[3rem] p-10 border border-glass-border space-y-8 shadow-xl">
                  <div className="flex flex-col space-y-1">
                     <h2 className="text-2xl font-bold font-heading text-foreground">Identity Queue</h2>
                     <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Awaiting Clearance</span>
                  </div>
                  <div className="space-y-6">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="flex flex-col p-6 rounded-3xl bg-background/50 space-y-4 border border-glass-border">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center font-bold text-xs text-orange-400">U{i}</div>
                             <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">Explorer Identity #{i*452}</span>
                                <span className="text-[10px] text-muted">Bali Tour Booking Request</span>
                             </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                             <button className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> APPROVE
                             </button>
                             <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[10px] font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-1">
                                <Trash2 className="h-3 w-3" /> REJECT
                             </button>
                          </div>
                       </div>
                     ))}
                  </div>
                  <button className="w-full py-4 text-xs font-bold text-muted uppercase tracking-widest border border-glass-border rounded-2xl hover:bg-orange-500/10 transition-colors">
                     Manage Full Fleet
                  </button>
               </div>
            </div>
         )}
      </main>
    </div>
  );
};

const SidebarLink = ({ icon: Icon, label, active = false, onClick }: { icon: LucideIcon, label: string, active?: boolean, onClick?: () => void }) => (
   <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all group",
      active ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20" : "text-muted hover:text-foreground hover:bg-orange-500/5"
    )}
  >
    <Icon className={cn("h-5 w-5", active ? "text-white" : "group-hover:text-orange-400")} />
    <span>{label}</span>
  </button>
);

export default AdminDashboard;
