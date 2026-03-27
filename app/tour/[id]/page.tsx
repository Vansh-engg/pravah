"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, MapPin, Users, Star, Calendar, ChevronRight, CheckCircle2, ShieldCheck, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { formatCurrency, cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

const TourDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [bookingLoading, setBookingLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Mock Tour Data
  const tour = {
    id: "1",
    title: "Bali Coastal Expedition",
    price: 85000,
    duration: "7 Days",
    rating: 4.9,
    reviews: 120,
    slots: 12,
    availableSlots: 4,
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552678446-bd81b7ecf1a0?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Experience the ultimate flow between the lush jungles and crystal clear waters of Bali. This curated 7-day expedition takes you beyond the tourist traps into the heart of Indonesian spirituality and natural mystery.",
    itinerary: [
      { day: 1, title: "Arrival & Coastal Flow", desc: "Arrive at Denpasar. Private transfer to our clifftop eco-resort. Welcome sunset flow dinner." },
      { day: 2, title: "Sacred Water Temple", desc: "Experience the cleansing rituals at Tirta Empul. Afternoon meditation in the rice terraces." },
      { day: 3, title: "Hidden Waterfall Trek", desc: "A guided journey into the Sekumpul forest to discover the island's most majestic waterfalls." },
      { day: 4, title: "Ocean Secrets", desc: "Private boat expedition for snorkeling and hidden beach explorations." },
    ]
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleBooking = async () => {
    if (!currentUser) {
      toast.error("Please sign in to secure your journey.");
      router.push("/auth/login");
      return;
    }

    setBookingLoading(true);
    const loadingToast = toast.loading("Initializing secure payment gateway...");

    try {
      // In a real app, you'd call a server action to get the orderId
      // const order = await createOrder(tour.price); 
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: tour.price * 100,
        currency: "INR",
        name: "Pravah Holidays",
        description: `Booking for ${tour.title}`,
        handler: async function (response: any) {
           const { error } = await supabase.from("bookings").insert({
              user_id: currentUser.id,
              tour_id: tour.id,
              amount_paid: tour.price,
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              status: "confirmed"
           });

           if (error) {
              toast.error("Payment received but booking failed to log. Contact support.");
              return;
           }

           toast.success("Payment successful! Accessing travel flow...", { id: loadingToast });
           router.push("/user/dashboard");
        },
        prefill: {
          email: currentUser.email,
        },
        theme: {
          color: "#06b6d4"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast.error("Failed to initialize payment gateway", { id: loadingToast });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#05070a] pb-32">
      {/* Cinematic Header Gallery */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <motion.div 
           initial={{ scale: 1.1, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 1.5 }}
           className="absolute inset-0 z-0"
        >
           <img src={tour.images[0]} alt={tour.title} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#05070a]" />
        </motion.div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end container mx-auto px-6 pb-20 space-y-6">
           <Link href="/" className="inline-flex items-center text-xs font-bold text-cyan-400 gap-2 hover:translate-x-[-4px] transition-transform mb-4">
              <ArrowLeft className="h-4 w-4" /> Discover More Flows
           </Link>
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-7xl font-bold font-heading max-w-4xl"
           >
              {tour.title}
           </motion.h1>
           <div className="flex flex-wrap items-center gap-6 text-white/80 font-medium">
              <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-cyan-400" /> Bali, Indonesia</span>
              <span className="flex items-center gap-2"><Clock className="h-5 w-5 text-cyan-400" /> {tour.duration}</span>
              <span className="flex items-center gap-2"><Star className="h-5 w-5 fill-yellow-500 text-yellow-500" /> {tour.rating} ({tour.reviews} Reviews)</span>
           </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16 relative z-10">
         {/* Left Side: Details & Itinerary */}
         <div className="lg:col-span-8 space-y-20">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold font-heading">The Experience</h2>
               <p className="text-xl text-slate-400 leading-relaxed font-light">{tour.description}</p>
            </div>

            <div className="space-y-12">
               <h2 className="text-3xl font-bold font-heading">Journey Itinerary</h2>
               <div className="relative space-y-12 pl-12 border-l border-white/5">
                  {tour.itinerary.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative"
                    >
                       <div className="absolute -left-[61px] top-0 w-12 h-12 bg-[#05070a] border border-cyan-500/50 rounded-full flex items-center justify-center text-xs font-bold text-cyan-400 z-10">
                          {item.day}
                       </div>
                       <div className="glass rounded-[2rem] p-8 space-y-3 group hover:bg-white/5 transition-colors border border-white/5">
                          <h3 className="text-xl font-bold font-heading group-hover:text-cyan-400 transition-colors">Day {item.day}: {item.title}</h3>
                          <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* Gallery Bento Preview */}
            <div className="space-y-8">
               <h2 className="text-3xl font-bold font-heading">Captured Mystery</h2>
               <div className="grid grid-cols-2 gap-6 h-[400px]">
                  <div className="rounded-[2rem] overflow-hidden glass">
                     <img src={tour.images[1]} className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-[2rem] overflow-hidden glass">
                     <img src={tour.images[2]} className="w-full h-full object-cover" />
                  </div>
               </div>
            </div>
         </div>

         {/* Right Side: Booking Card (Sticky) */}
         <div className="lg:col-span-4 relative">
            <aside className="sticky top-32 glass rounded-[3rem] p-10 space-y-10 border border-white/5 shadow-2xl overflow-hidden">
               {/* Decorative Gradient Blob */}
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-3xl animate-pulse" />

               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Base Investment</span>
                     <span className="text-4xl font-bold font-heading text-white">{formatCurrency(tour.price)}</span>
                  </div>
                  <div className="h-[1px] bg-white/10" />
               </div>

               <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-400 flex items-center gap-2"><Users className="h-4 w-4" /> Group Capacity</span>
                     <span className="font-bold text-white">{tour.slots} Explore Keys</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-400 flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Remaining Flux</span>
                     <span className="font-bold text-cyan-400">{tour.availableSlots} Slots Left</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <button 
                    onClick={handleBooking}
                    disabled={bookingLoading}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 p-6 rounded-3xl font-bold text-lg text-white shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-3 group transition-all active:scale-95 disabled:opacity-50"
                  >
                     <CreditCard className="h-5 w-5" />
                     <span>Secure Travel Key</span>
                     <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest">
                     Payments encrypted & verified by Razorpay
                  </p>
               </div>

               <div className="space-y-4 pt-6">
                  <span className="text-xs font-bold text-white uppercase tracking-widest pl-2 flex items-center gap-2">
                     <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Includes
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                     {["Luxury Stay", "Transfers", "Guide", "Equipment"].map((inc, i) => (
                        <div key={i} className="text-xs text-slate-400 bg-white/5 p-3 rounded-2xl flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" /> {inc}
                        </div>
                     ))}
                  </div>
               </div>
            </aside>
         </div>
      </div>
    </div>
  );
};

export default TourDetailsPage;
