"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogIn, ChevronRight, Compass, ShieldCheck, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<{ role: 'user' | 'admin' } | null>(null);

  const syncUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      setUser({ role: (profile?.role as 'user' | 'admin') || 'user' });
    } else {
      // Fallback to Demo Cookie (Clean whitespace first)
      const cookieMatch = document.cookie
        .split(';')
        .map(c => c.trim())
        .find(c => c.startsWith('demo-role='));
        
      if (cookieMatch) {
        const role = cookieMatch.split('=')[1] as 'user' | 'admin';
        setUser({ role });
      } else {
        setUser(null);
      }
    }
  };

  useEffect(() => {
    syncUser();
  }, [pathname]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      syncUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    // Clear Demo Cookie
    document.cookie = "demo-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
    // Clear Supabase Session
    await supabase.auth.signOut();
    
    setUser(null);
    router.push("/");
    router.refresh(); // Force refresh to ensure all layers sync
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 20);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-300",
        scrolled ? "glass-dark py-3 backdrop-blur-xl border-b border-white/5 shadow-black/20 shadow-xl" : "bg-transparent"
      )}
    >
      {/* Logo Section - Left Column */}
      <div className="flex-1">
         <Link href="/" className="flex items-center gap-3 group outline-none w-fit">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-cyan-500/20 flex items-center justify-center p-2 group-hover:bg-cyan-500/30 transition-all duration-500 shadow-lg shadow-cyan-500/10">
               <Compass className="h-6 w-6 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <span className="text-2xl font-bold font-heading tracking-tight flex flex-col leading-none">
               <span className="text-white">Pravah</span>
               <span className="text-[11px] text-cyan-400 uppercase tracking-[0.2em] mt-0.5">Holidays</span>
            </span>
         </Link>
      </div>

      {/* Center Nav Items (Desktop) - Center Column */}
      <div className="hidden lg:flex items-center justify-center space-x-10 text-sm font-bold tracking-widest uppercase text-slate-400/80">
         <Link href="/top-destinations" className="hover:text-cyan-400 transition-all py-2 px-1 relative group">
           Destinations
           <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
         </Link>
         <Link href="/experiences" className="hover:text-cyan-400 transition-all py-2 px-1 relative group">
           Experiences
           <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
         </Link>
         <Link href="/about" className="hover:text-cyan-400 transition-all py-2 px-1 relative group">
           Our Vision
           <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
         </Link>
      </div>

      {/* Auth/Dash Access (Desktop) - Right Column */}
      <div className="flex-1 hidden md:flex items-center justify-end space-x-6">
        {!user ? (
          <>
            <Link 
              href="/auth/login" 
              className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link 
              href="/auth/signup" 
              className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all active:scale-95 group overflow-hidden"
            >
              <span>Get Started</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Link 
              href={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-colors"
            >
              {user.role === 'admin' ? (
                <ShieldCheck className="h-5 w-5 text-purple-400" />
              ) : (
                <User className="h-5 w-5 text-cyan-400" />
              )}
              <span className="text-sm font-medium">My Space</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Log Out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden text-white p-2 focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-full left-4 right-4 mt-4 glass-dark rounded-3xl p-6 flex flex-col space-y-4 md:hidden border border-white/10 shadow-2xl"
          >
            <Link href="/top-destinations" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-2">Destinations</Link>
            <Link href="/experiences" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-2">Experiences</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-2">Our Vision</Link>
            <div className="h-[1px] bg-white/10 my-2" />
            {!user ? (
               <div className="grid grid-cols-2 gap-4">
                  <Link href="/auth/login" className="py-3 text-center rounded-2xl bg-white/5 border border-white/10">Log In</Link>
                  <Link href="/auth/signup" className="py-3 text-center rounded-2xl bg-cyan-500 font-bold">Sign Up</Link>
               </div>
            ) : (
               <div className="flex flex-col gap-3">
                 <Link 
                   href={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} 
                   onClick={() => setMobileMenuOpen(false)}
                   className="py-4 text-center rounded-2xl bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/20"
                 >
                    Dashboard
                 </Link>
                 <button 
                   onClick={() => {
                     setMobileMenuOpen(false);
                     handleLogout();
                   }}
                   className="py-4 text-center rounded-2xl bg-white/5 border border-white/10 text-slate-400 font-bold flex items-center justify-center gap-2"
                 >
                    <LogOut className="h-5 w-5" /> Log Out
                 </button>
               </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
