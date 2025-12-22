import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

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
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600">
            Everything you need to know about the platform.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`border rounded-xl transition-all duration-200 ${
                  isOpen ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-semibold text-lg ${isOpen ? 'text-blue-700' : 'text-slate-900'}`}>
                    {faq.question}
                  </span>
                  <span className={`ml-6 flex-shrink-0 text-blue-600`}>
                    {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </button>

                {/* Answer Dropdown */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support Link */}
        <div className="mt-12 text-center">
          <p className="text-slate-600">
            Still have questions?{' '}
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Chat with our support team
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};

export default FAQ;