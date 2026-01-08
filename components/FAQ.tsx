'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  // 1. DATA FROM THE IMAGE
  const faqs = [
    {
      question: "Why real-time vs. a regular AI notetaker?",
      answer: "Unlike regular AI notetakers like Otter or Granola that work after your meeting ends, Cluely provides real-time meeting intelligence during your calls. While other AI meeting assistants create meeting summaries afterward, Cluely helps you answer technical questions, handle objections, and perform better during high-stakes conversations."
    },
    {
      question: "Who is Cluely for?",
      answer: "Cluely is designed for sales professionals, founders, and customer success managers who need instant access to information during high-pressure meetings."
    },
    {
      question: "Is Cluely free?",
      answer: "We offer a generous free tier that includes essential features. For power users needing unlimited real-time assistance, we offer a Pro plan."
    },
    {
      question: "How is it undetectable in meetings?",
      answer: "Cluely runs locally on your system and captures audio directly from your output device. It does not join the call as a bot, so no one else knows it's there."
    },
    {
      question: "What languages and apps are supported?",
      answer: "We currently support Zoom, Google Meet, and Microsoft Teams in English, with multi-language support coming soon."
    },
    {
      question: "Can I talk to customer support?",
      answer: "Yes, our support team is available via email and live chat to help you with any setup or technical questions."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default like the image

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h2 className="text-4xl font-semibold text-gray-900 mb-12 tracking-tight">
          Frequently asked questions
        </h2>

        {/* List */}
        <div className="border-t border-gray-100">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className="border-b border-gray-100"
              >
                {/* Question Row (Clickable) */}
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 flex items-center cursor-pointer justify-between text-left focus:outline-none group"
                >
                  <span className="text-lg font-medium text-gray-900 pr-8">
                    {faq.question}
                  </span>
                  
                  {/* Chevron Icon with Rotation */}
                  <ChevronDown 
                    className={`text-gray-400 transition-transform duration-300 ease-in-out flex-shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                    size={20} 
                  />
                </button>

                {/* Answer Row (Animated Height) */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0 mb-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-500 leading-relaxed text-[15px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;