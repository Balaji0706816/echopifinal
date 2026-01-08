'use client'

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const Header: React.FC = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-primary-100 selection:text-primary-900">
      <Navbar />
      <main>
        <Hero />
       
      </main>
      
      {/* Add custom keyframe animations via style tag since we aren't using an external CSS file */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
            animation: float 5s ease-in-out infinite 1s;
        }
      `}</style>
    </div>
  );
};

export default Header;