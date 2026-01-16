"use client";
import React from "react";
import { motion } from "framer-motion";

export type Mood =
  | "idle"
  | "thinking"
  | "happy"
  | "puzzled"
  | "angry"
  | "starry";

export default function LilithAvatar({ mood }: { mood: Mood }) {
  const getFile = () => {
    switch (mood) {
      case "thinking":
        return "think.svg";
      case "puzzled":
        return "think2.svg";
      case "happy":
        return "Normal2.svg";
      case "starry":
        return "Normal2.svg";
      case "angry":
        return "think2.svg";
      default:
        return "Normal.svg";
    }
  };

  return (
    <motion.div
      className="w-64 h-80 relative flex items-center justify-center"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <img
        src={`/LilithSVG/${getFile()}`}
        alt="Lilith"
        className="w-full h-full object-contain drop-shadow-xl"
      />
    </motion.div>
  );
}
