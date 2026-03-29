"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogIn, ChevronRight, Compass, ShieldCheck, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<{ role: 'user' | 'admin' } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        scrolled ? "bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-3" : "bg-transparent"
      )}
    >
      {/* Logo Section - Left Column */}
      <div className="flex-1">
         <Link href="/" className="flex items-center gap-3 group outline-none w-fit">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
               <img src="/logo.png" alt="Pravah Holiday Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col -space-y-1">
               <span className="text-2xl font-bold font-heading tracking-tighter transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  <span className="text-info">Pravah</span> <span className="text-primary">Holiday</span>
               </span>
               <span className={cn(
                  "text-[10px] font-medium italic flex items-center gap-1.5 transition-colors duration-300",
                  scrolled ? "text-white/70" : "text-secondary"
               )}>
                  <div className={cn("w-1 h-1 rounded-full", scrolled ? "bg-primary" : "bg-accent")} />
                  Survive on dream
               </span>
            </div>
         </Link>
      </div>

      {/* Center Nav Items (Desktop) - Center Column */}
      <div className="hidden lg:flex items-center justify-center space-x-10 text-sm font-bold text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
         <Link href="/" className={cn(
           "hover:text-info transition-all py-2 px-1 relative group",
           pathname === "/" && "text-info"
         )}>
           Home
           <div className={cn(
             "absolute -bottom-1 left-0 h-[2px] bg-info shadow-[0_0_8px_rgba(46,163,198,0.5)] transition-all",
             pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
           )} />
         </Link>
         <Link href="/top-destinations" className={cn(
            "hover:text-info transition-all py-2 px-1 relative group",
            pathname === "/top-destinations" && "text-info"
         )}>
           Trips
           <div className={cn(
             "absolute -bottom-1 left-0 h-[2px] bg-info shadow-[0_0_8px_rgba(46,163,198,0.5)] transition-all",
             pathname === "/top-destinations" ? "w-full" : "w-0 group-hover:w-full"
           )} />
         </Link>
         <Link href="/about" className={cn(
            "hover:text-info transition-all py-2 px-1 relative group",
            pathname === "/about" && "text-info"
         )}>
           About
           <div className={cn(
             "absolute -bottom-1 left-0 h-[2px] bg-info shadow-[0_0_8px_rgba(46,163,198,0.5)] transition-all",
             pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"
           )} />
         </Link>
         <Link href="/contact" className={cn(
            "hover:text-info transition-all py-2 px-1 relative group",
            pathname === "/contact" && "text-info"
         )}>
           Contact
           <div className={cn(
             "absolute -bottom-1 left-0 h-[2px] bg-info shadow-[0_0_8px_rgba(46,163,198,0.5)] transition-all",
             pathname === "/contact" ? "w-full" : "w-0 group-hover:w-full"
           )} />
         </Link>
      </div>

      {/* Auth/Dash Access (Desktop) - Right Column */}
      <div className="flex-1 hidden md:flex items-center justify-end space-x-6">
        {!user ? (
          <>
            <Link 
              href="/auth/signup" 
              className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-full text-sm font-bold text-white shadow-xl hover:shadow-primary/20 transition-all active:scale-95 flex items-center gap-2 group"
            >
              Book Now
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Link 
              href={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
              className="flex items-center gap-3 bg-background hover:bg-orange-500/5 px-4 py-2 rounded-full border border-glass-border text-foreground transition-colors"
            >
              {user.role === 'admin' ? (
                <ShieldCheck className="h-5 w-5 text-amber-500" />
              ) : (
                <User className="h-5 w-5 text-orange-500" />
              )}
              <span className="text-sm font-medium">My Space</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full bg-background border border-glass-border text-muted hover:text-foreground hover:bg-orange-500/5 transition-colors"
              title="Log Out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        )}

      </div>

      {/* Mobile Toggle */}
      <button 
        className={cn(
          "md:hidden p-2 focus:outline-none transition-colors",
          "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
        )}
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
            className="absolute top-full left-4 right-4 mt-4 glass-card backdrop-blur-3xl rounded-3xl p-6 flex flex-col space-y-4 md:hidden border border-glass-border shadow-2xl"
          >
            <Link href="/top-destinations" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold py-2 text-primary hover:text-info transition-colors">Destinations</Link>
            <Link href="/experiences" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold py-2 text-primary hover:text-info transition-colors">Experiences</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold py-2 text-primary hover:text-info transition-colors">Our Vision</Link>
            <div className="h-[1px] bg-slate-200 my-2" />
            {!user ? (
               <div className="flex flex-col gap-4">
                  <Link href="/auth/login" className="py-4 text-center rounded-2xl bg-slate-100 text-slate-900 font-bold">Log In</Link>
                  <Link href="/auth/signup" className="py-4 text-center rounded-2xl bg-primary font-bold text-white shadow-lg">Book Now</Link>
               </div>
            ) : (
               <div className="flex flex-col gap-3">
                 <Link 
                   href={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} 
                   onClick={() => setMobileMenuOpen(false)}
                   className="py-4 text-center rounded-2xl bg-primary/10 text-primary font-bold border border-primary/20"
                 >
                    My Space
                 </Link>
                 <button 
                   onClick={() => {
                     setMobileMenuOpen(false);
                     handleLogout();
                   }}
                   className="py-4 text-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 font-bold flex items-center justify-center gap-2"
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
