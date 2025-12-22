import React, { useState } from 'react';
import {  ArrowRight, Info } from 'lucide-react';

const FeeCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number | string>(50000);
  const [role, setRole] = useState<'seller' | 'buyer'>('seller');

  // Configuration (You can change these values)
  const FEE_PERCENTAGE = 0.015; // 1.5%
  const MAX_FEE = 25000; // Cap fee at 25k Naira (Optional cap)

  // Calculation Logic
  const numAmount = Number(amount) || 0;
  let fee = numAmount * FEE_PERCENTAGE;
  
  // Apply Cap if needed
  if (fee > MAX_FEE) fee = MAX_FEE;
  
  // Minimum fee (e.g., 100 Naira)
  if (fee < 100 && numAmount > 0) fee = 100;

  const total = role === 'seller' ? numAmount - fee : numAmount + fee;

  // Currency Formatter
  const formatNaira = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className="py-24 bg-pri text-white relative overflow-hidden">
      
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Text Content */}
          <div className="lg:w-1/2">
      
            
            <h2 className="text-4xl font-bold mb-6 leading-tight text-white">
              Know exactly what you get. <br />
              <span className="text-white">No hidden math.</span>
            </h2>
            
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              We charge a flat <strong>1.5%</strong> service fee. Whether you are selling a gadget or a freelance service, calculate your exact settlement instantly.
            </p>

            <ul className="space-y-4 text-slate-300">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                Capped at ₦25,000 per transaction
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                Instant withdrawals to any Nigerian Bank
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                Fee is refundable if transaction is cancelled
              </li>
            </ul>
          </div>

          {/* Right: The Calculator Card */}
          <div className="lg:w-1/2 w-full max-w-md">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-slate-900">
              
              {/* Role Toggle */}
              <div className="bg-slate-100 p-1 rounded-lg flex mb-8">
                <button 
                  onClick={() => setRole('seller')}
                  className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                    role === 'seller' ? 'bg-white shadow text-pri' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  I am Selling
                </button>
                <button 
                  onClick={() => setRole('buyer')}
                  className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                    role === 'buyer' ? 'bg-white shadow text-pri' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  I am Buying
                </button>
              </div>

              {/* Input Field */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Transaction Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-medium">₦</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-4 mb-8 border-t border-slate-100 pt-6">
                <div className="flex justify-between items-center text-slate-500">
                  <div className="flex items-center text-sm">
                    SafeEscrow Fee (1.5%)
                    <Info className="h-3 w-3 ml-1 cursor-help" />
                  </div>
                  <span className="font-medium">- {formatNaira(fee)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-900 font-bold text-lg">
                    {role === 'seller' ? 'You Receive' : 'Total You Pay'}
                  </span>
                  <span className="text-3xl font-extrabold text-pri">
                    {formatNaira(total)}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-pri hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all active:scale-95">
                Start Transaction
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeeCalculator;