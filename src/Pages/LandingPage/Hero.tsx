import React from 'react';
import {  ArrowRight, PlayCircle, } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-white">
      
      {/* 1. Technical Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* 2. Radial Gradient Spotlight */}
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>

      <div className="max-w-7xl pt-[2rem] lg:pt-[6rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-4xl mx-auto">
          
   
          
          {/* Main Headline with Gradient */}
          <h1 className="text-4xl   md:text-7xl font-extrabold text-slate-900 tracking-tight mb-4 leading-[1.1]">
            Secure Payments for <br className="hidden md:block" />
            <span className="">
              The Trust Economy
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="lg:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            We hold the funds in a secure vault until the work is approved. 
            Protecting <strong>Freelancers</strong> and <strong>Clients</strong> from fraud, one transaction at a time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button className="flex items-center justify-center bg-pri text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 hover:-translate-y-1 transition-all duration-200 shadow-xl shadow-slate-900/20">
              Start a Transaction
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="flex items-center justify-center bg-white text-pri border  px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 border-pri transition-all duration-200 group">
              <PlayCircle className="mr-2 h-5 w-5 text-pri group-hover:text-blue-600 transition-colors" />
              How it Works
            </button>
          </div>

          {/* Social Proof / Trust Indicators */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-xs font-bold text-pri">
                +2k
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Trusted by 2,000+ freelancers and agencies
            </p>
          </div>

        </div>



      </div>
    </section>
  );
};

export default Hero;