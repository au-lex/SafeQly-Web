import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: "Is my money really safe?",
    answer: "Absolutely. Funds are held in a regulated, non-interest-bearing trust account (The Vault). Neither the buyer nor the seller can touch the money until the agreed terms of the transaction are met."
  },
  {
    question: "What happens if the seller doesn't deliver?",
    answer: "If the seller fails to deliver or the work doesn't match the agreement, you can raise a dispute. Our 'Judge's Seat' team reviews the evidence and can return the funds to the Buyer if the claim is valid."
  },
  {
    question: "How much does SafeEscrow cost?",
    answer: "We charge a flat fee of 1.5% per transaction, capped at $20. There are no hidden fees or monthly subscriptions. You only pay when you use the service."
  },
  {
    question: "How long does the release take?",
    answer: "Once the Buyer clicks 'Approve', the funds are released instantly to the Seller's wallet. Withdrawals to local bank accounts typically take 1-2 business days depending on your bank."
  },
  {
    question: "Can I use this for non-digital items?",
    answer: "Yes! SafeEscrow works for physical goods (sneakers, electronics), freelance services, and even domain flipping. If it has a price and a deliverable, we can secure it."
  }
];

const FAQ: React.FC = () => {
  // State to track which FAQ is currently open (null means all closed)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 shadow-sm">
            <HelpCircle className="w-4 h-4 text-[#bef264] fill-[#053b2f]" />
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Support
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#053b2f] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-lg">
            Everything you need to know about the platform.
          </p>
        </div>

        {/* --- Accordion Container --- */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-[#053b2f] bg-[#f2f8f3] shadow-md' 
                    : 'border-gray-100 bg-white hover:border-[#bef264] hover:shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                >
                  <span className={`font-bold text-lg transition-colors duration-300 ${
                    isOpen ? 'text-[#053b2f]' : 'text-gray-700 group-hover:text-[#053b2f]'
                  }`}>
                    {faq.question}
                  </span>
                  
                  {/* Icon Bubble */}
                  <span className={`ml-6 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    isOpen ? 'bg-[#053b2f] text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-[#bef264] group-hover:text-[#053b2f]'
                  }`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                {/* Answer Dropdown */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-600 leading-relaxed border-t border-[#053b2f]/10 pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Contact Support Link --- */}
        <div className="mt-16 text-center">
          <div className="inline-block p-1 rounded-full bg-gray-50 border border-gray-100 pr-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#053b2f] text-white p-2 rounded-full">
                <MessageCircle className="w-4 h-4" />
              </div>
              <p className="text-gray-500 text-sm font-medium">
                Still have questions?{' '}
                <a href="#" className="text-[#053b2f] font-bold hover:underline decoration-[#bef264] underline-offset-4 decoration-2 transition-all">
                  Chat with our support team
                </a>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;