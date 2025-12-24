import React, { useEffect } from 'react';
import { Stickynote, TickCircle, ArrowRight, Bank, CodeCircle } from 'iconsax-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <section id="pricing"  className="bg-white py-24 border-t border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- SHARP HEADER --- */}
        <div 
            className="mb-20 border-l-4 border-[#053b2f] pl-6 py-2"
            data-aos="fade-right" // Animation: Slides in from left
        >
          <div className="flex items-center gap-3 mb-2">
            <Stickynote color='currentColor' size={28} variant="Bold" className="text-[#053b2f]" />
            <h2 className="text-3xl font-black uppercase tracking-tighter text-[#053b2f]">
              Fee_Structure
            </h2>
          </div>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
            Transaction Cost & Limits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* --- PLAN 01: STANDARD --- */}
          <div 
            className="group relative bg-white border border-gray-200 p-8 rounded-sm hover:border-[#053b2f] hover:shadow-2xl hover:shadow-[#053b2f]/10 transition-all duration-300"
            data-aos="fade-up"      // Animation: Rise up
            data-aos-delay="100"    // Animation: Starts first
          >
            
            {/* Top Badge */}
            <div className="absolute top-0 right-0 p-4">
               <span className="bg-[#f2f8f3] text-[#053b2f] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm border border-[#053b2f]/10">
                 Most Popular
               </span>
            </div>

            {/* Header */}
            <div className="mb-8">
               <div className="w-12 h-12 bg-[#053b2f] flex items-center justify-center rounded-sm mb-6 group-hover:scale-105 transition-transform">
                  <Bank size={24} color="#fff" variant="Bold" />
               </div>
               <h3 className="text-xl font-bold text-[#053b2f] uppercase tracking-tight mb-2">Standard Escrow</h3>
               <p className="text-gray-400 text-sm font-mono">For Freelancers & P2P Traders</p>
            </div>

            {/* Price Tag */}
            <div className="mb-8 pb-8 border-b border-dashed border-gray-200">
               <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#053b2f]">1.5%</span>
                  <span className="text-gray-400 font-medium">/ txn</span>
               </div>
               <p className="text-sm text-gray-500 mt-2">
                  Capped at <span className="font-bold text-[#053b2f]">₦25,000</span> max fee.
               </p>
            </div>

            {/* Features List */}
            <ul className="space-y-4 mb-10">
               {[
                 "Instant Bank Settlements",
                 "Standard Fraud Protection",
                 "Dispute Resolution Center",
                 "No Monthly Subscription"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3">
                    <TickCircle size={18} className="text-[#053b2f] flex-shrink-0" variant="Bold"/>
                    <span className="text-gray-600 text-sm">{item}</span>
                 </li>
               ))}
            </ul>

            {/* Action Button */}
            <Link to="/signup"  className="w-full py-4 border-2 border-[#053b2f] text-[#053b2f] font-bold uppercase tracking-widest text-xs hover:bg-[#053b2f] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn">
               Start Transaction
               <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>


          {/* --- PLAN 02: ENTERPRISE / API --- */}
          <div 
            className="group relative bg-[#053b2f] border border-[#053b2f] p-8 rounded-sm shadow-xl"
            data-aos="fade-up"      // Animation: Rise up
            data-aos-delay="300"    // Animation: Starts after standard card
          >
            
            {/* Top Badge (Lime) */}
            <div className="absolute top-0 right-0 p-4">
               <span className="bg-[#bef264] text-[#053b2f] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                 For Platforms
               </span>
            </div>

            {/* Header */}
            <div className="mb-8">
               <div className="w-12 h-12 bg-[#bef264] flex items-center justify-center rounded-sm mb-6 group-hover:rotate-3 transition-transform">
                  <CodeCircle size={24} color="#053b2f" variant="Bold" />
               </div>
               <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">SafeQly API</h3>
               <p className="text-gray-300 text-sm font-mono">For Marketplaces & SaaS</p>
            </div>

            {/* Price Tag */}
            <div className="mb-8 pb-8 border-b border-dashed border-white/20">
               <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">Custom</span>
               </div>
               <p className="text-sm text-gray-300 mt-2">
                  Volume-based discounts available.
               </p>
            </div>

            {/* Features List */}
            <ul className="space-y-4 mb-10">
               {[
                 "Full API Access (Rest/gRPC)",
                 "White-label Checkout",
                 "Dedicated Account Manager",
                 "Custom Settlement Logic"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3">
                    <TickCircle size={18} className="text-[#bef264] flex-shrink-0" variant="Bold"/>
                    <span className="text-gray-200 text-sm">{item}</span>
                 </li>
               ))}
            </ul>

            {/* Action Button (Lime) */}
            <button className="w-full py-4 bg-[#bef264] text-[#053b2f] font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 group/btn">
               Contact Sales
               <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Pricing;