import Hero from "@/components/home/Hero";
import DestinationsGrid from "@/components/home/DestinationsGrid";
import StatsSection from "@/components/home/StatsSection";
import WhyPravah from "@/components/home/WhyPravah";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Immersive Cinematic Experience */}
      <Hero />
      
      {/* Popular Destinations - Unified Responsive Grid */}
      <DestinationsGrid />

      {/* Stats - Animated numbers and premium proof */}
      <StatsSection />
      
      {/* Why Choose Us - Floating panels system */}
      <WhyPravah />
      
      {/* CTA - Final invitation with dynamic background */}
      <CTASection />

      <footer className="container mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm gap-8 relative z-10">
        <div className="flex flex-col space-y-2">
           <span className="text-white font-bold font-heading text-lg">Pravah Holidays</span>
           <p className="max-w-xs leading-relaxed text-xs">A luxury travel experience where every journey flows like water, guided by our passion for the unknown.</p>
        </div>
        <div className="flex gap-12">
            <div className="flex flex-col space-y-3">
               <span className="text-white font-semibold text-xs tracking-widest uppercase mb-1">Company</span>
               <a href="#" className="hover:text-cyan-400">Our Vision</a>
               <a href="#" className="hover:text-cyan-400">Join our Hub</a>
               <a href="#" className="hover:text-cyan-400">Impact Tracker</a>
            </div>
            <div className="flex flex-col space-y-3">
               <span className="text-white font-semibold text-xs tracking-widest uppercase mb-1">Contact</span>
               <a href="#" className="hover:text-cyan-400 underline decoration-cyan-500/30">Connect@Pravah.com</a>
               <a href="#" className="hover:text-cyan-400">+1 234 567 8900</a>
            </div>
        </div>
        <span className="md:self-end">© 2026 Pravah Inc. Crafting flows.</span>
      </footer>
    </div>
  );
}
