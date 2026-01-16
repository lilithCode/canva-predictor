"use client";
import { motion, AnimatePresence } from "framer-motion";
import LilithAvatar, { Mood } from "./LilithAvatar";
import React from "react";

type Props = {
  mood: string;
  dialogue: string;
  highlight?: string;
};

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default function Lilith({
  mood,
  dialogue,
  highlight,
}: Props) {
  const renderDialogue = (text: string, term?: string) => {
    if (!term) return <>{text}</>;
    const parts = text.split(new RegExp(`(${escapeRegExp(term)})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === term.toLowerCase() ? (
            <span key={i} className="text-[#ff8e8e] font-black">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={dialogue}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="mb-6 relative bg-white border-4 border-[#ffefef] p-6 rounded-3xl shadow-xl max-w-[280px] text-center"
        >
          <p className="text-[#5d4a4a] font-bold text-lg leading-tight">
            {renderDialogue(dialogue, highlight)}
          </p>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-b-4 border-r-4 border-[#ffefef] rotate-45" />
        </motion.div>
      </AnimatePresence>

      <LilithAvatar mood={mood} />

      <div className="mt-4 px-4 py-1 bg-[#ffafaf] text-white text-xs font-black rounded-full tracking-widest uppercase">
        Lilith
      </div>
    </div>
  );
}
