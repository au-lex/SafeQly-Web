import React, { useState, useEffect } from 'react';
import { ShieldTick, Wallet, DocumentText, Box, Coin } from 'iconsax-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface StepItem {
  id: number;
  phase: string;
  action: string;
  tech: string;
  logoLetter: string;
  stepNumber: string;
  title: string;
  description: string;
  icon?: React.ReactNode; 
}

const escrowData: StepItem[] = [
  {
    id: 1,
    phase: "Initiation",
    action: "contract.build",
    tech: "Smart Agreement",
    logoLetter: "01",
    stepNumber: "Step 01",
    title: "Agree Terms",
    description: "Buyer and Seller agree on price and scope using the contract builder. Terms are locked into the system pending approval.",
    icon: <DocumentText size="20" color="#fff" variant="Bold" />
  },
  {
    id: 2,
    phase: "Securing Funds",
    action: "vault.deposit",
    tech: "Escrow Vault",
    logoLetter: "02",
    stepNumber: "Step 02",
    title: "Buyer Deposits",
    description: "Buyer secures funds in the Vault. The system verifies the transaction and instantly notifies the Seller to start working.",
    icon: <Wallet size="20" color="#fff" variant="Bold" />
  },
  {
    id: 3,
    phase: "Fulfillment",
    action: "seller.ship",
    tech: "Tracking API",
    logoLetter: "03",
    stepNumber: "Step 03",
    title: "Work & Deliver",
    description: "Seller completes the work or ships the physical item. The Buyer reviews the delivery against the original agreed terms.",
    icon: <Box size="20" color="#fff" variant="Bold" />
  },
  {
    id: 4,
    phase: "Settlement",
    action: "funds.release",
    tech: "Auto-Payout",
    logoLetter: "04",
    stepNumber: "Step 04",
    title: "Money Released",
    description: "Once approved by the Buyer, the secure funds are instantly released to the Seller's wallet. The transaction loop is closed.",
    icon: <Coin size="20" color="#fff" variant="Bold" />
  }
];

export const EscrowProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true, // Animation happens only once
      easing: 'ease-out-cubic',
    });

    // Your existing active step interval
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % escrowData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-12 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4">
        
        {/* --- SHARP HEADER --- */}
        <div 
          className="mb-16 border-l-4 border-[#053b2f] pl-6 py-2"
          data-aos="fade-right" // Animation: Slide in from left
        >
          <div className="flex items-center gap-3 mb-2">
            <ShieldTick size={28} color='currentColor' variant="Bold" className="text-[#053b2f]" />
            <h2 className="text-3xl font-black uppercase tracking-tighter text-[#053b2f]">
               Escrow Process
            </h2>
          </div>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              Escrow Transaction Protocol
          </p>
        </div>

        {/* --- HYBRID LAYOUT CONTAINER --- */}
        <div className="relative">

          {/* MOBILE RAIL LINE */}
          <div className="absolute left-[19px] top-4 bottom-10 w-[1px] bg-gray-200 md:hidden" />

          {/* GRID WRAPPER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
            
            {escrowData.map((item, index) => {
              const isActive = index === activeStep;

              return (
                <div 
                  key={item.id} 
                  className="relative group flex flex-col h-full"
                  data-aos="fade-up"           // Animation: Slide up
                  data-aos-delay={index * 150} // Stagger: Each card waits 150ms longer
                >
                  
                  {/* --- MOBILE ONLY: The Node on the Rail --- */}
                  <div className={`
                      absolute left-0 top-0 w-10 h-10 flex items-center justify-center md:hidden z-10 bg-white
                  `}>
                       <div className={`
                          w-4 h-4 border-2 transition-all duration-300 flex items-center justify-center
                          ${isActive 
                              ? 'border-[#053b2f] shadow-[0_0_0_4px_rgba(5,59,47,0.1)] scale-110' 
                              : 'border-gray-300 bg-white'}
                       `}>
                          <div className={`w-1.5 h-1.5 ${isActive ? 'bg-[#053b2f]' : 'bg-gray-300'} transition-colors`} />
                       </div>
                  </div>

                  {/* --- THE CARD --- */}
                  <div className={`
                     relative flex-1 bg-white border p-6 sm:p-8 rounded-lg transition-all duration-500 ease-in-out pl-14 md:pl-8
                     ${isActive 
                        ? 'border-[#053b2f] shadow-xl shadow-[#053b2f]/10 scale-[1.02] z-10' 
                        : 'border-gray-200 hover:border-[#053b2f]/40 hover:shadow-md'}
                  `}>
                      
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-6">
                          <span className={`
                              font-mono text-xs font-bold uppercase tracking-widest px-2 py-1 border rounded-sm transition-colors duration-300
                              ${isActive 
                                  ? 'bg-[#053b2f]/5 border-[#053b2f] text-[#053b2f]' 
                                  : 'bg-gray-50 border-gray-200 text-gray-400'}
                          `}>
                              {item.stepNumber}
                          </span>

                          {/* --- DESKTOP ONLY: Node --- */}
                          <div className={`
                              hidden md:flex w-4 h-4 border-2 items-center justify-center transition-all duration-300
                              ${isActive ? 'border-[#053b2f] animate-pulse' : 'border-gray-200'}
                          `}>
                              <div className={`w-1.5 h-1.5 ${isActive ? 'bg-[#053b2f]' : 'bg-gray-300'} transition-colors duration-300`} />
                          </div>
                      </div>

                      {/* Icon & Title */}
                      <div className="flex items-start gap-4 mb-4">
                          <div className={`
                            w-12 h-12 flex-shrink-0 shadow-md flex items-center justify-center rounded-sm text-white transition-all duration-500
                            ${isActive ? 'bg-[#053b2f] scale-110' : 'bg-gray-800 scale-100'}
                          `}>
                              {item.icon}
                          </div>
                          
                          <div>
                              <h3 className={`text-xl font-bold transition-colors duration-300 ${isActive ? 'text-[#053b2f]' : 'text-gray-700'}`}>
                                  {item.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                  <span className="text-gray-900 font-medium text-sm">{item.phase}</span>
                                  <span className="text-gray-300">/</span>
                                  <span className="text-gray-400 text-xs font-mono uppercase tracking-wide">{item.tech}</span>
                              </div>
                          </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-gray-100 pl-4 mb-4 transition-colors">
                          {item.description}
                      </p>
                    
                      {/* Action ID Footer */}
                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                         {isActive && (
                           <span className="flex items-center gap-1 text-[10px] font-bold text-[#053b2f] uppercase tracking-wider">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#053b2f] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#053b2f]"></span>
                              </span>
                              Running...
                           </span>
                         )}
                      </div>

                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default EscrowProcess;