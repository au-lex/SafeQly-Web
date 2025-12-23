import React, { useState, useEffect } from 'react';
import { MessageQuestion, Add, Minus, SmsTracking, QuoteDown } from 'iconsax-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const faqs = [
  {
    id: "Q-101",
    question: "Is my money really safe?",
    answer: "Absolutely. Funds are held in a regulated, non-interest-bearing trust account (The SafeQly Vault). Neither the buyer nor the seller can touch the money until the agreed terms of the transaction are met."
  },
  {
    id: "Q-102",
    question: "What happens if the seller doesn't deliver?",
    answer: "If the seller fails to deliver or the work doesn't match the agreement, you can raise a dispute. Our Dispute Resolution Team reviews the evidence and can return the funds to the Buyer if the claim is valid."
  },
  {
    id: "Q-103",
    question: "How much does SafeQly cost?",
    answer: "We charge a flat fee of 1.5% per transaction, capped at $20. There are no hidden fees or monthly subscriptions. You only pay when you successfully use the service."
  },
  {
    id: "Q-104",
    question: "How long does the release take?",
    answer: "Once the Buyer clicks 'Approve', the funds are released instantly to the Seller's SafeQly wallet. Withdrawals to local bank accounts typically take 1-2 business days depending on your bank."
  },
  {
    id: "Q-105",
    question: "Can I use this for non-digital items?",
    answer: "Yes! SafeQly works for physical goods (sneakers, electronics), freelance services, and even domain flipping. If it has a price and a deliverable, we can secure it."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white border-t border-gray-100 font-sans overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- SHARP HEADER --- */}
        <div 
          className="mb-16 border-l-4 border-[#053b2f] pl-6 py-2"
          data-aos="fade-right" // Animation: Slide in from left
        >
          <div className="flex items-center gap-3 mb-2">
            <MessageQuestion size={28}  color='currentColor' variant="Bold" className="text-[#053b2f]" />
            <h2 className="text-3xl font-black uppercase tracking-tighter text-[#053b2f]">
              Knowledge_Base
            </h2>
          </div>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
            Common Protocol Queries & Specs
          </p>
        </div>

        {/* --- Accordion Container --- */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index}
                data-aos="fade-up"           // Animation: Slide up
                data-aos-delay={index * 100} // Animation: Cascading delay
                className={`group border rounded-sm transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-[#053b2f] bg-white shadow-[0_4px_20px_-10px_rgba(5,59,47,0.15)]' 
                    : 'border-gray-200 bg-white hover:border-[#053b2f]/40'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start sm:items-center justify-between p-6 text-left focus:outline-none"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    {/* Tech ID Label */}
                    <span className={`hidden sm:block font-mono text-xs font-bold uppercase tracking-widest px-2 py-1 border rounded-sm transition-colors ${
                      isOpen 
                        ? 'bg-[#053b2f] text-white border-[#053b2f]' 
                        : 'bg-gray-50 text-gray-400 border-gray-200 group-hover:text-[#053b2f] group-hover:border-[#053b2f]/30'
                    }`}>
                      {faq.id}
                    </span>

                    <span className={`font-bold text-lg leading-tight transition-colors duration-300 ${
                      isOpen ? 'text-[#053b2f]' : 'text-gray-700 group-hover:text-[#053b2f]'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Icon Box */}
                  <span className={`ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-sm border transition-all duration-300 ${
                    isOpen 
                      ? 'bg-[#053b2f] border-[#053b2f] text-white' 
                      : 'bg-white border-gray-200 text-gray-400 group-hover:border-[#053b2f] group-hover:text-[#053b2f]'
                  }`}>
                    {isOpen ? <Minus  color='currentColor' size={16} /> : <Add  color='currentColor' size={16} />}
                  </span>
                </button>

                {/* Answer Dropdown */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-0 sm:pl-[5.5rem]"> {/* Indent to align with text */}
                      
                      <div className="flex items-start gap-3 pt-4 border-t border-dashed border-gray-200">
                        <QuoteDown size={20} color='currentColor'  className="text-[#bef264] flex-shrink-0 mt-1" variant="Bold"/>
                        <p className="text-gray-500 leading-relaxed text-base">
                          {faq.answer}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Footer / Ticket Action --- */}
        <div 
          className="mt-16 flex justify-center"
          data-aos="fade-up"        // Animation: Slide up
          data-aos-delay="400"      // Animation: Waits for list to finish
        >
          <a href="#" className="group flex items-center gap-4 px-6 py-3 bg-[#f2f8f3] border border-[#053b2f]/10 rounded-sm hover:border-[#053b2f] hover:bg-white transition-all duration-300">
            <div className="bg-[#053b2f] text-white p-2 rounded-sm group-hover:bg-[#bef264] group-hover:text-[#053b2f] transition-colors">
              <SmsTracking size={20} color='currentColor' />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                Unresolved Query?
              </p>
              <p className="text-[#053b2f] font-bold text-sm group-hover:underline decoration-[#bef264] underline-offset-4 decoration-2">
                Open a Support Ticket
              </p>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQ;