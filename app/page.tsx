"use client";
import { useState, useEffect } from "react";
import Canvas from "../src/components/Canvas";
import { predict, loadModel } from "../src/lib/tensorflow";

export default function Home() {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadModel();
        setIsModelReady(true);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    }
    prepare();
  }, []);

  const handleGuess = async (paths: number[][][]) => {
    if (!isModelReady || paths.length === 0) return;

    setIsProcessing(true);
    try {
      const results = await predict(paths);
      if (results && results.length > 0) {
        const best = results[0];
        const score = (best.probability * 100).toFixed(1);
        setPrediction(`i'm ${score}% sure it's a ${best.className}`);
      } else {
        setPrediction("Draw something!");
      }
    } catch (error) {
      console.error(error);
      setPrediction("error guessing...");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#F8F2EA]">
      <div className="max-w-4xl w-full text-center mb-8">
        <h1 className="text-5xl font-extrabold mb-2 text-[#4B3428]">
          Lilith's <span className="text-[#7F4F2B]">Canvas</span>
        </h1>
        <p className="text-[#6b4f3a]">Draw and let the AI guess</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <Canvas onGuess={handleGuess} />

        <div className="w-80 bg-[#FFF8F2] p-8 rounded-2xl shadow-xl border border-[#E6D7C8] text-center min-h-[200px] flex flex-col justify-center">
          <h2 className="text-sm uppercase tracking-widest text-[#9a7b66] font-bold mb-4">
            AI Prediction
          </h2>
          {isProcessing ? (
            <div className="animate-pulse text-[#7F4F2B] font-bold text-xl">
              Analyzing...
            </div>
          ) : (
            <div className="text-3xl font-black text-[#4B3428]">
              {prediction || "---"}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
