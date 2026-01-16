"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  
  const [welcomeLine, setWelcomeLine] = useState("");

  useEffect(() => {
    
    const welcomeLines = [
      "Wait, let me find my glasses...",
      "Is your art better than last time? Let's see.",
      "Checking if the canvas is properly dusted...",
      "Hold on, I'm trying to remember where I put your brush.",
      "Doodling is like a therapy, is that for you too?",
      "Hope you know the difference between maroon and burgundy!",
    ];

    const randomLine =
      welcomeLines[Math.floor(Math.random() * welcomeLines.length)];
    setWelcomeLine(randomLine);
  }, []);

  
  
  if (!welcomeLine) {
    return <div className="fixed inset-0 bg-[#fffcf9]" />; 
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fffcf9] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center px-6"
      >
        <img
          src="/LilithSVG/Welcome.svg"
          className="w-98 h-98 mb-8 drop-shadow-lg"
          alt="Welcome"
        />
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-[#ff8e8e] italic tracking-tighter">
            "{welcomeLine}"
          </h1>
          <p className="text-[#5d4a4a] font-medium tracking-wide text-lg">
            Lilith is waking up... <br />
            <span className="text-sm opacity-60 italic uppercase tracking-[0.3em] mt-2 block">
              Have I seen you before?
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
