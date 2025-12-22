import React, { useState } from 'react';
import { ArrowRight, Info, Calculator } from 'lucide-react';

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
    <section className="py-24 bg-[#053b2f] text-white relative overflow-hidden font-sans">
      
      {/* --- Background Decorations --- */}
      {/* Lime glow top right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#bef264] rounded-full blur-[120px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* --- Left Text Content --- */}
          <div className="lg:w-1/2">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
              <Calculator className="w-4 h-4 text-[#bef264]" />
              <span className="text-xs font-bold tracking-widest text-[#bef264] uppercase">
                Fee Calculator
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-[1.1] text-white">
              Know exactly what you get. <br />
              <span className="text-[#bef264]">No hidden math.</span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-lg">
              We charge a flat <strong>1.5%</strong> service fee. Whether you are selling a gadget or a freelance service, calculate your exact settlement instantly.
            </p>

            <ul className="space-y-5 text-gray-200">
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-[#bef264]/20 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#bef264] rounded-full" />
                </div>
                Capped at ₦25,000 per transaction
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-[#bef264]/20 flex items-center justify-center">
                   <div className="w-2 h-2 bg-[#bef264] rounded-full" />
                </div>
                Instant withdrawals to any Nigerian Bank
              </li>
              <li className="flex items-center gap-4">
                 <div className="w-6 h-6 rounded-full bg-[#bef264]/20 flex items-center justify-center">
                   <div className="w-2 h-2 bg-[#bef264] rounded-full" />
                 </div>
                Fee is refundable if transaction is cancelled
              </li>
            </ul>
          </div>

          {/* --- Right: The Calculator Card --- */}
          <div className="lg:w-1/2 w-full max-w-md">
            <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-black/20 text-[#053b2f] border border-white/10 relative">
              
              {/* Role Toggle */}
              <div className="bg-[#f2f8f3] p-1.5 rounded-xl flex mb-8 relative">
                <button 
                  onClick={() => setRole('seller')}
                  className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-300 z-10 ${
                    role === 'seller' ? 'text-white bg-[#053b2f] shadow-md' : 'text-gray-500 hover:text-[#053b2f]'
                  }`}
                >
                  I am Selling
                </button>
                <button 
                  onClick={() => setRole('buyer')}
                  className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-300 z-10 ${
                    role === 'buyer' ? 'text-white bg-[#053b2f] shadow-md' : 'text-gray-500 hover:text-[#053b2f]'
                  }`}
                >
                  I am Buying
                </button>
              </div>

              {/* Input Field */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Transaction Amount
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-medium group-focus-within:text-[#053b2f] transition-colors">₦</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 bg-[#f2f8f3] border border-transparent rounded-2xl text-2xl font-bold text-[#053b2f] placeholder-gray-300 focus:outline-none focus:bg-white focus:border-[#bef264] focus:ring-4 focus:ring-[#bef264]/20 transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-4 mb-8 border-t border-dashed border-gray-200 pt-6">
                <div className="flex justify-between items-center text-gray-500">
                  <div className="flex items-center text-sm font-medium">
                    SafeEscrow Fee (1.5%)
                    <Info className="h-3 w-3 ml-1 text-gray-400 cursor-help" />
                  </div>
                  <span className="font-medium text-red-500">- {formatNaira(fee)}</span>
                </div>
                
                <div className="flex justify-between items-center bg-[#f2f8f3] p-4 rounded-xl">
                  <span className="text-[#053b2f] font-bold text-sm uppercase tracking-wide">
                    {role === 'seller' ? 'You Receive' : 'Total You Pay'}
                  </span>
                  <span className="text-2xl font-bold text-[#053b2f]">
                    {formatNaira(total)}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="group w-full bg-[#053b2f] hover:bg-[#094537] text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg shadow-[#053b2f]/20">
                Start Transaction
                <div className="bg-white/10 p-1 rounded-full ml-3 group-hover:bg-white/20 transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeeCalculator;