import React, { useEffect } from 'react';
import { ShieldTick, WalletCheck, Global, Flash, Lock1 } from 'iconsax-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  sysRef: string;
}

const features: FeatureItem[] = [
  {
    id: "01",
    icon: <ShieldTick size={32} color='currentColor' variant="Bold" className="text-white" />,
    title: "Fraud-Proof Logic",
    description: "We act as the trusted impartial node. Funds are strictly locked until the buyer validates the boolean state of 'Satisfied'. Scams are architecturally impossible.",
    sysRef: "MOD_SECURE"
  },
  {
    id: "02",
    icon: <WalletCheck size={32} color='currentColor' variant="Bold" className="text-white" />,
    title: "Vault Custody",
    description: "Your money sits in a regulated, insured escrow vault. It is decoupled from the seller's wallet until the 'Release' trigger is fired manually.",
    sysRef: "SYS_VAULT"
  },
  {
    id: "03",
    icon: <Global size={32}  color='currentColor' variant="Bold" className="text-white" />,
    title: "Borderless Protocol",
    description: "Execute agreements globally. SafeQly bridges the trust gap between disparate geographic nodes, allowing seamless cross-border commerce.",
    sysRef: "NET_GLOBAL"
  },
  {
    id: "04",
    icon: <Flash size={32} color='currentColor' variant="Bold" className="text-white" />,
    title: "Instant Settlement",
    description: "Latency-free payouts. Once the approval bit is set, funds are routed instantly via our API rails. We eliminate legacy banking delays.",
    sysRef: "API_SPEED"
  },
];

const WhyChooseUs: React.FC = () => {
  
  // Initialize AOS (Optional if done globally in App.tsx)
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <section className="py-24 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- SHARP HEADER --- */}
        <div 
            className="mb-20 border-l-4 border-[#053b2f] pl-6 py-2"
            data-aos="fade-right" // Animation: Slides in from left
        >
          <div className="flex items-center gap-3 mb-2">
            <Lock1 size={28} color='currentColor' variant="Bold" className="text-[#053b2f]" />
            <h2 className="text-3xl font-black uppercase tracking-tighter text-[#053b2f]">
              Why Choose Us
            </h2>
          </div>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
             Trust Infrastructure & Capabilities
          </p>
        </div>

        {/* --- Features Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              data-aos="fade-up"            // Animation: Slides up
              data-aos-delay={index * 150}  // Animation: Cascading effect (150ms delay per card)
              className="group relative bg-white border border-gray-200 hover:border-[#053b2f] hover:shadow-xl hover:shadow-[#053b2f]/10 transition-all duration-300 flex flex-col p-6 rounded-sm"
            >
              
              {/* Icon Box */}
              <div className="mb-6 relative">
                 <div className="w-16 h-16 bg-[#053b2f] rounded-sm flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 relative z-10">
                    {feature.icon}
                 </div>
                 {/* Decorative offset box */}
                 <div className="absolute top-2 left-2 w-16 h-16 border-2 border-[#bef264] rounded-sm -z-0 opacity-100 transition-opacity duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#053b2f] mb-3 group-hover:translate-x-1 transition-transform duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow border-l-2 border-[#bef264] pl-3 transition-all duration-300">
                {feature.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;