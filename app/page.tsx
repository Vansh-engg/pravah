import Hero from "@/components/home/Hero";
import PackageCarousel from "@/components/home/PackageCarousel";
import WhyPravah from "@/components/home/WhyPravah";
import ContactSection from "@/components/home/ContactSection";
import Link from "next/link";
import { Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Explore Planned Trips */}
      <PackageCarousel />

      {/* Why Choose Us */}
      <WhyPravah />
      
      {/* Contact Section */}
      <ContactSection />

      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12">
                   <img src="/logo.png" alt="Pravah Holiday" className="w-full h-full object-contain" />
                </div>
<div className="flex flex-col -space-y-1">
   <span className="text-xl font-bold text-slate-900 leading-none"><span className="text-info">Pravah</span> <span className="text-primary">Holiday</span></span>
   <span className="text-[9px] text-primary/80 font-medium italic">Survive on dream</span>
</div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Creating the world's most beautiful escapes with a touch of ethereal grace.
              </p>
              <div className="flex gap-4">
                <Globe className="h-5 w-5 text-slate-400 hover:text-orange-500 cursor-pointer transition-colors" />
                <Globe className="h-5 w-5 text-slate-400 hover:text-orange-500 cursor-pointer transition-colors" />
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Explore</h4>
              <ul className="space-y-3">
                <li><Link href="/top-destinations" className="text-slate-500 text-sm hover:text-orange-500 transition-colors">Destinations</Link></li>
                <li><Link href="/top-destinations" className="text-slate-500 text-sm hover:text-orange-500 transition-colors">Special Deals</Link></li>
                <li><Link href="/top-destinations" className="text-slate-500 text-sm hover:text-orange-500 transition-colors">Travel Blog</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Connect</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-500 text-sm hover:text-orange-500 transition-colors">Instagram</a></li>
                <li><a href="#" className="text-slate-500 text-sm hover:text-orange-500 transition-colors">Pinterest</a></li>
                <li><a href="#" className="text-slate-500 text-sm hover:text-orange-500 transition-colors">LinkedIn</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-slate-500 text-sm hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-slate-500 text-sm hover:text-orange-500 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-slate-400 text-xs">© 2026 Pravah Holidays. Crafted for the Ethereal Traveler.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
