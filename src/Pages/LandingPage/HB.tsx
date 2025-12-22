import React from 'react';
import { Wifi, Lock, ShieldCheck } from 'lucide-react';

const HeroBottom: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-20 lg:mt-32 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 items-end gap-12 lg:gap-4 relative">
        
        {/* --- Left Column: Statistics --- */}
        <div className="flex flex-col gap-10 lg:pl-10 relative z-20">
          <div>
            <h3 className="text-5xl lg:text-6xl font-serif font-bold text-[#053b2f]">70K</h3>
            <p className="text-gray-500 mt-2 font-medium">Transactions</p>
          </div>
          <div>
            <h3 className="text-5xl lg:text-6xl font-serif font-bold text-[#053b2f]">56</h3>
            <p className="text-gray-500 mt-2 font-medium">Countries operated</p>
          </div>
          <div>
            <h3 className="text-5xl lg:text-6xl font-serif font-bold text-[#053b2f] italic">24/7</h3>
            <p className="text-gray-500 mt-2 font-medium">Live support</p>
          </div>
        </div>

        {/* --- Center Column: 3D Sphere & Ripples --- */}
        <div className="relative flex justify-center items-center h-full min-h-[300px]">
          {/* Ripple Effects (CSS Rings) */}
          <div className="absolute w-[120%] h-[120%] border border-green-200/40 rounded-full scale-110" />
          <div className="absolute w-[120%] h-[120%] border border-green-200/30 rounded-full scale-150" />
          <div className="absolute w-[120%] h-[120%] border border-green-200/20 rounded-full scale-[2]" />
          
          {/* The Sphere (CSS Gradient Simulation) */}
          <div 
            className="w-48 h-48 lg:w-64 lg:h-64 rounded-full shadow-2xl relative z-10"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #dcfce7 20%, #86efac 50%, #4ade80 80%, #15803d 100%)',
              boxShadow: '0 25px 50px -12px rgba(22, 101, 52, 0.5), inset -10px -10px 20px rgba(0,0,0,0.1)'
            }}
          >
            {/* Glossy Reflection Highlight */}
            <div className="absolute top-8 left-8 w-16 h-10 bg-white opacity-40 blur-md rounded-[100%]" />
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#166534] opacity-20 blur-xl rounded-full" />
          </div>
        </div>

        {/* --- Right Column: Interactive UI Elements --- */}
        <div className="flex flex-col gap-6 relative z-20 lg:pr-4">
          
          {/* Browser Bar */}
          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg flex items-center justify-between border border-white/50 max-w-sm ml-auto w-full">
            <div className="flex items-center gap-2 pl-4 text-gray-600 text-sm overflow-hidden whitespace-nowrap">
              <Lock className="w-3 h-3" />
              <span className="opacity-80">https://pentaclay.com/support</span>
            </div>
            <button className="bg-[#053b2f] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#0f4c3a] transition-colors">
              Go
            </button>
          </div>

          {/* Glassmorphism Credit Card */}
          <div className="relative group max-w-sm ml-auto w-full">
            <div className="absolute inset-0 bg-green-200 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
            
            <div className="relative bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-xl text-[#053b2f] overflow-hidden">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-8">
                {/* Mastercard-style circles */}
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#053b2f] opacity-80" />
                  <div className="w-8 h-8 rounded-full bg-[#053b2f] opacity-50" />
                </div>
                <Wifi className="w-6 h-6 rotate-90 opacity-70" />
              </div>

              {/* Card Number */}
              <div className="mb-6">
                <p className="text-[10px] uppercase opacity-60 tracking-wider mb-1">Credit Card No.</p>
                <p className="font-mono text-xl font-bold tracking-widest">1602 0911 2019 2021</p>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase opacity-60 tracking-wider mb-1">Name</p>
                  <p className="font-bold text-sm">Hridoy Ahmed</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase opacity-60 tracking-wider mb-1">Exp.</p>
                  <p className="font-bold text-sm">09/11</p>
                </div>
                {/* Chip simulation */}
                <div className="w-8 h-6 bg-[#053b2f]/10 border border-[#053b2f]/20 rounded flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 opacity-50" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HeroBottom;