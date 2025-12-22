import React, { useState } from 'react';
import { Calculator, Money, InfoCircle, ArrowRight } from 'iconsax-react';

const FeeCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number | string>(50000);
  const [role, setRole] = useState<'seller' | 'buyer'>('seller');

  // Configuration
  const FEE_PERCENTAGE = 0.015; // 1.5%
  const MAX_FEE = 25000; // Cap at 25k

  // Calculation Logic
  const numAmount = Number(amount) || 0;
  let fee = numAmount * FEE_PERCENTAGE;
  
  if (fee > MAX_FEE) fee = MAX_FEE;
  if (fee < 100 && numAmount > 0) fee = 100;

  const total = role === 'seller' ? numAmount - fee : numAmount + fee;

  const formatNaira = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className="py-24 bg-[#053b2f] relative overflow-hidden text-white">
      
      {/* --- Background Decorations --- */}
      {/* Lime glow effect in top right corner */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#bef264] rounded-full blur-[150px] opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/3" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- SHARP HEADER (Lime Accent) --- */}
        <div className="mb-16 border-l-4 border-[#bef264] pl-6 py-2">
          <div className="flex items-center gap-3 mb-2">
            <Calculator size={28} color='currentColor' variant="Bold" className="text-[#bef264]" />
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
              Pricing Calculator
            </h2>
          </div>
          <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">
             Fee Computation & Settlement
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* --- Left: Value Proposition --- */}
          <div className="lg:w-1/2 pt-4">
             <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Transparent math. <br/>
                <span className="text-[#bef264]">No hidden logic.</span>
             </h3>
             
             <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-md">
               We charge a flat <span className="text-white font-bold">1.5%</span> service fee. Whether you are selling a gadget or a freelance service, the math stays simple.
             </p>

             {/* Tech-Style List */}
             <div className="space-y-6">
                {[
                    { label: "Cap Limit", text: "Max fee capped at ₦25,000" },
                    { label: "Settlement", text: "Instant bank withdrawal" },
                    { label: "Security", text: "Funds held in regulated vault" }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 group">
                        <div className="w-5 h-5 mt-1 border border-gray-600 group-hover:border-[#bef264] flex items-center justify-center transition-colors">
                             <div className="w-2 h-2 bg-[#bef264]" />
                        </div>
                        <div>
                            <span className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">
                                {item.label}
                            </span>
                            <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
                                {item.text}
                            </span>
                        </div>
                    </div>
                ))}
             </div>
          </div>

          {/* --- Right: The Calculator Widget --- */}
          <div className="lg:w-1/2 w-full">
        
            <div className="relative bg-white text-[#053b2f] border border-white/10 shadow-2xl shadow-black/30 rounded-lg p-1">
        

                <div className="p-6 md:p-8">
                    
                    {/* Role Toggle */}
                    <div className="flex p-1 bg-gray-100 rounded mb-8">
                        {['seller', 'buyer'].map((r) => (
                            <button
                                key={r}
                                onClick={() => setRole(r as 'seller' | 'buyer')}
                                className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm ${
                                    role === r 
                                    ? 'bg-[#053b2f] text-white shadow-sm' 
                                    : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                {r} Mode
                            </button>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="mb-8">
                        <label className="flex items-center gap-2 text-xs font-bold text-[#053b2f] uppercase tracking-wider mb-3">
                            <Money size={16} /> Transaction Value
                        </label>
                        <div className="relative group">
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-gray-200 py-2 pl-8 pr-4 text-3xl font-bold text-[#053b2f] focus:outline-none focus:border-[#bef264] transition-colors placeholder-gray-200"
                                placeholder="0"
                            />
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl text-gray-300 font-serif">₦</span>
                        </div>
                    </div>

                    {/* Computation Block */}
                    <div className="bg-[#f2f8f3] border border-[#053b2f]/10 rounded p-6 space-y-4">
                        
                        {/* Row 1: Fee */}
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2 text-gray-500">
                                <InfoCircle size={14} className="text-gray-400" />
                                <span className="font-medium">Escrow Fee (1.5%)</span>
                            </div>
                            <span className="font-mono text-red-500 font-medium">
                                - {formatNaira(fee)}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-[#053b2f]/10 border-t border-dashed border-[#053b2f]/20" />

                        {/* Row 2: Total */}
                        <div className="flex justify-between items-end">
                            <div className="text-xs font-mono text-[#053b2f] uppercase tracking-wider mb-1">
                                {role === 'seller' ? 'Net Settlement' : 'Total Payable'}
                            </div>
                            <div className="text-3xl font-bold text-[#053b2f] tracking-tight">
                                {formatNaira(total)}
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-6 bg-[#053b2f] hover:bg-[#084e3e] text-white py-4 rounded flex items-center justify-center gap-3 transition-all duration-300 group shadow-lg shadow-[#053b2f]/20">
                        <span className="font-bold tracking-wide text-white">INITIALIZE TRANSACTION</span>
                        <ArrowRight size={18} className="text-[#bef264] group-hover:translate-x-1 transition-transform" />
                    </button>

                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeeCalculator;