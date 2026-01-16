import React from "react";
import { MessageCircle, HelpCircle } from "lucide-react";

export default function VideoCallAssistantOverlay() {
  return (
    <div  className="w-full bg-gray-100 py-20 ">

<div  className=" flex justify-end items-center w-full  px-6 max-w-6xl mx-auto  bg-red-200 rounded-t-2xl    p-1 ">
                
                <a href="">me</a>
                <a href="">this</a>
                <a href="">that</a>
            </div>

     <div className=" w-full py-20 max-w-6xl mx-auto  justify-center items-center  rounded-b-2xl bg-gradient-to-br from-orange-200 via-pink-200 to-blue-300 flex  justify-center ">
       
   
       
         {/* Video Call Container */}
      <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-black   ">
      
      <div className="flex items-center justify-between px-6 py-1 bg-gray-900 text-sm text-neutral-300">
          <div className="flex gap-4">
          {/* Mac-style window buttons */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Close"
              className="w-3 h-3 rounded-full bg-red-500 border border-red-400 hover:brightness-95 transition-all"
            ></button>
            <button
              aria-label="Minimize"
              className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-300 hover:brightness-95 transition-all"
            ></button>
            <button
              aria-label="Wide"
              className="w-3 h-3 rounded-full bg-green-500 border border-green-400 hover:brightness-95 transition-all"
            ></button>
          </div>
          </div>
          <button className="px-3 py-1 rounded-md bg-red-600 text-white">End</button>
        </div>

        {/* Fake video grid */}
        <div className="grid grid-cols-2 h-[490px] gap-4 p-8  ">
          <div className=" flex items-center h-106 justify-center text-neutral-400">
            
            
          <video
            className="w-full h-full object-cover object-top rounded-lg"
            autoPlay
            loop
            muted
            playsInline
            src="https://www.pexels.com/download/video/6100901/"
            aria-label="Participant A video"
          />
          </div>
          <div className=" flex items-center justify-center text-neutral-300">
            <video
              className="w-full h-full object-cover rounded-lg"
              autoPlay
              loop
              muted
              playsInline
              src="https://www.pexels.com/download/video/5442623/"
              aria-label="Participant B video"
            />
          </div>
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between px-6 py-3 bg-gray-900 text-sm text-neutral-300">
          <div className="flex gap-4">
            <button className="hover:text-white">Unmute</button>
            <button className="hover:text-white">Start Video</button>
          </div>
          <button className="px-3 py-1 rounded-md bg-red-600 text-white">End</button>
        </div>

        {/* Assistant Overlay */}
        {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-xl rounded-2xl bg-black/70 backdrop-blur-xl p-6 text-white shadow-xl pointer-events-auto">
            Chat bubble */}
            {/* <div className="flex justify-end mb-4">
              <span className="bg-blue-600 px-4 py-2 rounded-full text-sm shadow">
                What should I say?
              </span>
            </div> */}

            {/* Suggested response */}
            {/* <p className="text-sm leading-relaxed text-neutral-100 mb-4">
              “A discounted cash flow model values a company by projecting future
              free cash flows and discounting them to present value using the
              weighted average cost of capital.”
            </p> */}

            {/* Footer actions */}
            {/* <div className="flex items-center gap-6 text-xs text-neutral-300">
              <button className="flex items-center gap-1 hover:text-white">
                <HelpCircle size={14} /> What should I say?
              </button>
              <button className="flex items-center gap-1 hover:text-white">
                <MessageCircle size={14} /> Follow-up questions
              </button>
            </div> */}

            {/* Input */}
            {/* <div className="mt-4">
              <input
                type="text"
                placeholder="Ask anything about the screen or conversation"
                className="w-full rounded-lg bg-neutral-900/80 px-4 py-2 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div> */}



      </div>
     </div>
    </div>
  );
}
