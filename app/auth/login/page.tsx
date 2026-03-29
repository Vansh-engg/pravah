"use client";

import { motion } from "framer-motion";
import { LogIn, User, Mail, ShieldCheck, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Function to clear the demo-role cookie and sign out
  const handleSignOut = async () => {
    document.cookie = "demo-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Verifying identity flow...");

    // Demo Bypassing Logic
    if (email === "admin@pravah.com" && password === "admin123") {
      document.cookie = "demo-role=admin; path=/";
      toast.success("Entering Admin Flow (Demo Mode)", { id: loadingToast });
      router.push("/admin/dashboard");
      router.refresh();
      return;
    }
    if (email === "user@pravah.com" && password === "user123") {
      document.cookie = "demo-role=user; path=/";
      toast.success("Entering Explorer Flow (Demo Mode)", { id: loadingToast });
      router.push("/user/dashboard");
      router.refresh();
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check role from profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      const role = profile?.role || 'user';

      toast.success("Identity verified! Welcome back.", { id: loadingToast });
      router.push(role === 'admin' ? "/admin/dashboard" : "/user/dashboard");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to unlock dashboard", { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
      {/* Background visual */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary-glow)_0%,transparent_50%)] blur-[120px]" />
      </div>

      <motion.div
         initial={{ opacity: 0, scale: 0.9, y: 30 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         className="relative z-10 w-full max-w-lg glass-card rounded-[3rem] p-10 md:p-14 border border-glass-border shadow-2xl space-y-10"
      >
        <div className="space-y-4 text-center">
           <Link href="/" className="inline-flex items-center text-xs font-bold text-orange-400 gap-1.5 hover:translate-x-[-4px] transition-transform mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Base
           </Link>
           <h1 className="text-4xl font-bold font-heading text-foreground">Secure Access</h1>
           <p className="text-muted">Continue your flow. Access your premium journeys.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button className="flex items-center justify-center gap-2 p-4 rounded-3xl bg-background/50 border border-glass-border hover:bg-orange-500/10 transition-colors font-semibold group text-foreground">
              <User className="h-5 w-5 text-orange-400" />
              <span>Identity</span>
           </button>
           <button className="flex items-center justify-center gap-2 p-4 rounded-3xl bg-background/50 border border-glass-border hover:bg-orange-500/10 transition-colors font-semibold group text-foreground">
              <Mail className="h-5 w-5 text-orange-400" />
              <span>Google</span>
           </button>
        </div>

        <div className="relative">
           <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-glass-border" /></div>
           <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-muted font-bold tracking-widest">or stream in</span></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
           <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted pl-2">Email Identity</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="connect@pravah.com"
                className="w-full p-5 rounded-3xl bg-background/50 border border-glass-border focus:border-orange-500/50 outline-none transition-all focus:ring-4 focus:ring-orange-500/10 text-foreground"
                required
              />
           </div>
           
           <div className="space-y-2">
              <div className="flex justify-between items-center pl-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-muted">Secure Pin</label>
                 <a href="#" className="text-xs font-semibold text-orange-400 hover:text-orange-500">Lost keys?</a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-5 rounded-3xl bg-background/50 border border-glass-border focus:border-orange-500/50 outline-none transition-all focus:ring-4 focus:ring-orange-500/10 text-foreground"
                required
              />
           </div>

           <button 
             type="submit" 
             className="w-full bg-orange-500 hover:bg-orange-600 p-5 rounded-3xl font-bold text-white shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 group transform active:scale-95 transition-all mt-4"
           >
              <span>Unlock Dashboard</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
           </button>
        </form>

        <div className="flex flex-col space-y-6">
           <p className="text-center text-muted text-sm">
              New to Pravah? <Link href="/auth/signup" className="text-orange-400 font-bold hover:text-orange-500">Join our Hub</Link>
           </p>

           <div className="pt-6 border-t border-glass-border space-y-4">
              <p className="text-center text-[10px] text-muted uppercase tracking-widest font-bold">Quick Access (Demo)</p>
              <div className="grid grid-cols-2 gap-4">
                 <button 
                   onClick={() => {
                     document.cookie = "demo-role=admin; path=/";
                     toast.success("Entering Admin Flow (Demo Mode)");
                     router.push("/admin/dashboard");
                     router.refresh();
                   }}
                   className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/20 transition-all text-orange-400 text-xs font-bold flex items-center justify-center gap-2 group"
                 >
                    <ShieldCheck className="h-4 w-4 group-hover:scale-110 transition-transform" /> 
                    <span>Admin Hub</span>
                 </button>
                 <button 
                   onClick={() => {
                     document.cookie = "demo-role=user; path=/";
                     toast.success("Entering User Flow (Demo Mode)");
                     router.push("/user/dashboard");
                     router.refresh();
                   }}
                   className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/20 transition-all text-amber-500 text-xs font-bold flex items-center justify-center gap-2 group"
                 >
                    <User className="h-4 w-4 group-hover:scale-110 transition-transform" /> 
                    <span>Explorer Hub</span>
                 </button>
              </div>
           </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] text-muted uppercase tracking-widest pt-4">
           <ShieldCheck className="h-3 w-3" /> Encrypted Endpoint
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
