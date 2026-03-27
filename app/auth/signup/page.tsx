"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, User, ShieldCheck, ChevronRight, ArrowLeft, Mail, Users, Key } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase";

const SignupPage = () => {
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Initializing identity record...");
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role,
            full_name: email.split('@')[0], // Mock full name
          }
        }
      });

      if (error) throw error;

      toast.success("Identity initialized successfully!", { id: loadingToast });
      router.push(role === 'admin' ? "/admin/dashboard" : "/user/dashboard");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to create identity", { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
      {/* Background glow visual */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,#a855f7_0%,transparent_50%)] blur-[120px]" />
      </div>

      <motion.div
         initial={{ opacity: 0, scale: 0.9, y: 30 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         className="relative z-10 w-full max-w-lg glass rounded-[3rem] p-10 md:p-14 border border-white/5 shadow-2xl space-y-10"
      >
        <div className="space-y-4 text-center">
           <Link href="/" className="inline-flex items-center text-xs font-bold text-purple-400 gap-1.5 hover:translate-x-[-4px] transition-transform mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Base
           </Link>
           <h1 className="text-4xl font-bold font-heading">Join the Flow</h1>
           <p className="text-slate-400">Initialize your travel identity within the Pravah system.</p>
        </div>

        {/* Role Selection - Immersive Toggle */}
        <div className="space-y-4">
           <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-2">Select Clearance Level</label>
           <div className="grid grid-cols-2 gap-4 p-2 bg-white/5 rounded-[2rem] border border-white/10 relative">
              <motion.div 
                 animate={{ x: role === 'user' ? 0 : '100%' }}
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
                 className="absolute inset-[8px] w-[calc(50%-8px)] bg-cyan-500 rounded-2xl shadow-xl shadow-cyan-500/20 z-0"
              />
              <button 
                 onClick={() => setRole('user')}
                 className={`relative z-10 py-4 flex flex-col items-center gap-1 transition-colors ${role === 'user' ? 'text-white font-bold' : 'text-slate-400'}`}
              >
                 <Users className="h-5 w-5 mb-1" />
                 <span className="text-sm">Tourist</span>
              </button>
              <button 
                 onClick={() => setRole('admin')}
                 className={`relative z-10 py-4 flex flex-col items-center gap-1 transition-colors ${role === 'admin' ? 'text-white font-bold' : 'text-slate-400'}`}
              >
                 <ShieldCheck className="h-5 w-5 mb-1" />
                 <span className="text-sm">Organizer</span>
              </button>
           </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
           <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-2">Email Identity</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="connect@pravah.com"
                className="w-full p-5 rounded-3xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                required
              />
           </div>
           
           <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-2">Security Pin</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-5 rounded-3xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                required
              />
           </div>

           <button 
             type="submit" 
             className="w-full bg-purple-500 hover:bg-purple-600 p-5 rounded-3xl font-bold text-white shadow-xl shadow-purple-500/20 flex items-center justify-center gap-2 group transform active:scale-95 transition-all mt-4"
           >
              <span>Initialize Identity</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
           </button>
        </form>

        <p className="text-center text-slate-500 text-sm">
           Already in the Hub? <Link href="/auth/login" className="text-purple-400 font-bold hover:text-purple-300">Unlock your keys</Link>
        </p>

        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-600 uppercase tracking-widest pt-4">
           <Key className="h-3 w-3" /> Encrypted Endpoint
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
