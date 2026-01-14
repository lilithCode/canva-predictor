"use client";
import { useState } from "react";
import Canvas from "../src/components/Canvas";

export default function Home() {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGuess = async (canvas: HTMLCanvasElement) => {
    setIsProcessing(true);

    console.log("Analyzing canvas pixels...");

    setTimeout(() => {
      setPrediction("Thinking...");
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Pacifico&family=Playfair+Display:wght@600;800&display=swap"
        rel="stylesheet"
      />

      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F8F2EA] to-[#F2E9DF] text-[#4B3428]">
        <div className="max-w-4xl w-full text-center mb-8">
          <h1
            className="text-5xl font-extrabold mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "-0.02em",
            }}
          >
            Lilith's{" "}
            <span
              className="text-[#7F4F2B] inline-block"
              style={{ fontFamily: "'Pacifico', cursive" }}
            >
              Canvas
            </span>
          </h1>
          <p className="text-[#6b4f3a] font-medium">
            Draw something and let the AI guess it
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <Canvas onGuess={handleGuess} />

          <div className="w-80 flex flex-col items-center text-center">
            <div className="bg-[#FFF8F2] p-8 rounded-2xl shadow-[0_10px_30px_rgba(75,52,40,0.12)] border border-[#E6D7C8] w-full min-h-[200px] flex flex-col justify-center">
              <h2 className="text-sm uppercase tracking-widest text-[#9a7b66] font-bold mb-4">
                AI Prediction
              </h2>
              {isProcessing ? (
                <div className="animate-pulse text-[#7F4F2B] font-bold text-xl">
                  Analyzing...
                </div>
              ) : (
                <div className="text-4xl font-black text-[#4B3428] lowercase">
                  {prediction || "---"}
                </div>
              )}
            </div>

            <p className="mt-6 text-xs text-[#8e6f58] leading-relaxed">
              Tip: Draw clearly in the center. Use the brush size and color preview
              to experiment with strokes.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
