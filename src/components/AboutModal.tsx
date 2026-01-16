"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, MessageSquare, Coffee } from "lucide-react";

export default function AboutModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[150]"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed left-0 top-0 h-full w-full max-w-sm bg-white z-[200] p-8 shadow-2xl border-r-8 border-[#ffefef] flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-pink-50 rounded-full transition-colors"
            >
              <X className="text-[#ff8e8e]" />
            </button>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <img
                src="/LilithSVG/AboutLilith.svg"
                className="w-32 h-32 mb-4"
                alt="Icon"
              />
              <h2 className="text-3xl font-black text-[#ff8e8e] italic tracking-tight">
                Lilith's Diary
              </h2>
              <div className="h-1.5 w-16 bg-[#ffc1c1] rounded-full mt-2 mb-6" />

              <div className="space-y-6 text-[#5d4a4a] text-sm font-medium">
                <section>
                  <h4 className="font-black text-[10px] uppercase tracking-widest text-[#ffc1c1] mb-2">
                    Lil Background
                  </h4>
                  <p>
                    Lilith lives in your browser and spends 90% of her time
                    wondering if you're out there drawing on real paper without
                    her. She’s powered by TensorFlow.js and a steady diet of
                    virtual snacks.
                  </p>
                </section>

                <section className="bg-pink-50 p-4 rounded-2xl border-2 border-[#ffefef]">
                  <h4 className="font-black text-[10px] uppercase tracking-widest text-[#ff8e8e] mb-2 flex items-center gap-2">
                    <Coffee size={12} /> Between You and Me
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-xs opacity-80">
                    <li>
                      If I get it wrong, just tell everyone it was "Abstract
                      Art."
                    </li>
                    <li>Keep things simple as much as you can.</li>
                    <li>Try not to draw too small; I'm a bit near-sighted.</li>
                  </ul>
                </section>

                <div className="pt-6 space-y-4">
                  <a
                    href="https://github.com/lilithCode/canva-predictor"
                    target="_blank"
                    className="flex items-center gap-3 p-4 bg-[#fffcf9] border-4 border-[#ffefef] rounded-2xl hover:bg-white transition-all"
                  >
                    <Github className="text-[#ff8e8e]" size={20} />
                    <span className="font-bold text-sm">
                      Improve my brain on GitHub
                    </span>
                  </a>
                  <p className="text-[10px] opacity-50 italic text-center">
                    Found a bug? Wanna teach me something new? Or just want to
                    say hi? Click on the repo above and drop a message!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
