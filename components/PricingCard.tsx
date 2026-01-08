import React from 'react';
import { Check, ChevronDown } from 'lucide-react';

const PricingCard = () => {
  // Data for the 3 cards
  const plans = [
    {
      title: "Starter",
      price: "Free",
      description: "All essential features.",
      buttonText: "Get for Mac",
      features: [
        "Limited AI responses",
        "Limited meeting notetaking",
        "Customize instructions & upload files",
        "Ask AI about all your past meetings",
      ]
    },
    {
      title: "Pro",
      price: "$19",
      description: "For power users.",
      buttonText: "Subscribe",
      features: [
        "Unlimited AI responses",
        "Unlimited meeting notetaking",
        "Advanced custom instructions",
        "Priority support via email",
      ]
    },
    {
      title: "Team",
      price: "$49",
      description: "For growing teams.",
      buttonText: "Contact Sales",
      features: [
        "Everything in Pro",
        "Admin dashboard & analytics",
        "Centralized billing",
        "SSO & Enterprise security",
      ]
    }
  ];

  return (
    // Outer container with background
    // Added 'flex-wrap' and 'gap-8' to handle multiple cards nicely on different screens
    <div className="bg-white min-h-screen flex flex-wrap items-center justify-center p-8 gap-8">
      
      {plans.map((plan, index) => (
        <div 
          key={index}
          className="bg-white/40 rounded-[32px] p-8 w-full max-w-[400px] relative flex flex-col"
          // This style combines the original soft shadow with a new, hard white inner shadow
          // on the top and left edges to create the "shine" effect.
          style={{
            boxShadow: `
              0 20px 40px -15px rgba(0,0,0,0.1),  /* The original soft drop shadow */
              inset 1px 1px 0px 0px rgb(255, 255, 255), /* The top/left white shine */
              -1px -1px 0px 0px rgba(230, 230, 230, 0.5) /* A subtle outer border for definition */
            `
          }}
        >
          {/* Header text */}
          <div className="mb-8">
            <h4 className="text-gray-500 font-medium text-md mb-2">{plan.title}</h4>
            <h3 className="text-[3rem] leading-none  text-black tracking-tight">{plan.price}</h3>
          </div>

          {/* Dark Split Button */}
          <div className="mb-8 mt-auto">
            <div className="w-full bg-[#1A1C20] text-white rounded-xl overflow-hidden flex shadow-sm cursor-pointer hover:bg-[#25282e] transition-colors">
              <div className="flex-grow py-4 px-6 text-center font-medium text-lg">
                {plan.buttonText}
              </div>
              <div className="border-l border-gray-700/50 py-4 px-4 flex items-center justify-center bg-[#1F2125]">
                 <ChevronDown size={24} className="text-gray-300" />
              </div>
            </div>
          </div>

          {/* Divider section */}
          <div className="mb-8">
            <p className="text-gray-500 text-lg mb-6">{plan.description}</p>
            <hr className="border-gray-100" />
          </div>

          {/* Features List */}
          <ul className="space-y-5">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <Check className="text-blue-600 mr-4 mt-[2px] flex-shrink-0 w-6 h-6" strokeWidth={2.5} />
                <span className="text-gray-800 text-lg leading-tight">{feature}</span>
              </li>
            ))}
          </ul>

        </div>
      ))}

    </div>
  );
};

export default PricingCard;