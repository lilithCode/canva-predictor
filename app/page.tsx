"use client";
import { useState, useEffect } from "react";
import Canvas from "../src/components/Canvas";
import Lilith from "../src/components/Lilith";
import LoadingScreen from "../src/components/LoadingScreen";
import AboutModal from "../src/components/AboutModal";
import { predict, loadModel } from "../src/lib/tensorflow";

export default function Home() {
  const [mood, setMood] = useState<any>("idle");
  const [dialogue, setDialogue] = useState(
    "Draw something! I promise I won't judge your skills (much)."
  );
  const [highlight, setHighlight] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    loadModel().then(() => setTimeout(() => setLoading(false), 2500));
  }, []);

  const getRandom = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const handleGuess = async (paths: any) => {
    setMood("thinking");
    setConfidence(0);
    setHighlight("");
    setDialogue(
      getRandom([
        "whoops I was holding it upside down...",
        "One sec, I need to look at this from a different angle.",
        "My brain is doing 1,000 math problems right now. Bear with me.",
        "Wait, let me put my glasses on...",
        "Squinting really hard right now. Just a sec.",
        "Is that a curve or did your hand slip? lemme check my notes...",
        "One sec, my brain is buffering. This looks complex!",
        
      ])
    );

    const results = await predict(paths);
    const best = results[0];

    setTimeout(() => {
      const probPercent = Math.round(best.probability * 100);
      setConfidence(probPercent);
      setHighlight(best.className);

      if (best.probability > 0.45) {
        setMood("starry");
        setDialogue(
          getRandom([
            `A perfect ${best.className}. You're actually a pro!`,
            `I'd bet on my kidney that this is a ${best.className}!`,
            `I know that's ${best.className}. Where did you learn to draw like that?`,
            `Yo! I'd recognize that ${best.className} anywhere.`,
            `I'm sure that's ${best.className}. Your drawing is really something something `,
            `10/10. I'm framing this ${best.className} on my wall.`,
            `Yea! My eyes don't deceive me. That is a ${best.className}.`,
          ])
        );
      } else {
        setMood("puzzled");
        setDialogue(
          getRandom([
            `Is that a ${best.className}? Or is it a potato? It's a mystery.`,
            `I'm guessing ${best.className}, but don't tell the others if I'm wrong.`,
            `My code says ${best.className}, but my heart says 'try again'.`,
            `Maybe it's a ${best.className}? `,
            `I'm about 40% sure it's a ${best.className} and 60% sure you were distracted while drawing.`,
            `Hmm, let's call it a ${best.className}. If I'm wrong, we'll just say it's 'Experimental Art'.`,
          ])
        );
      }
    }, 1500);
  };

  if (loading) return <LoadingScreen />;

  return (
    <main className="min-h-screen bg-[#fffcf9] flex flex-col items-center py-12 px-6 relative selection:bg-[#ffc1c1]">
      <button
        onClick={() => setIsAboutOpen(true)}
        className="fixed top-6 left-6 z-[140] p-4 bg-white border-4 border-[#ffefef] rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all group"
      >
        <img
          src="/LilithSVG/About.svg"
          className="w-8 h-8 group-hover:rotate-12 transition-transform"
          alt="About"
        />
      </button>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      <header className="mb-16 flex flex-col items-center gap-2 text-center">
        <h1 className="text-5xl font-black text-[#ff8e8e] italic tracking-tighter">
          Lilith's <span className="text-[#ffc1c1]">Canvas</span>
        </h1>
        <div className="px-6 py-1 bg-[#ffefef] rounded-full text-[#ff8e8e] text-[10px] font-black uppercase tracking-[0.3em]">
          Doodle and let Lilith guess!
        </div>
      </header>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-20 w-full max-w-7xl">
        <Lilith mood={mood} dialogue={dialogue} highlight={highlight} />

        <Canvas onGuess={handleGuess} isProcessing={mood === "thinking"} />

        <div className="hidden xl:flex flex-col gap-6 w-72">
          <div className="bg-white p-8 rounded-[40px] border-4 border-[#ffefef] shadow-sm">
            <h4 className="text-[10px] font-black text-[#ffc1c1] uppercase tracking-widest mb-4">
              Lilith's Confidence
            </h4>

            <div className="w-full bg-[#ffefef] h-6 rounded-full overflow-hidden relative">
              <div
                className="bg-[#ff8e8e] h-full transition-all duration-1000 ease-out flex items-center justify-end px-2"
                style={{ width: `${confidence}%` }}
              >
                {confidence > 20 && (
                  <span className="text-[8px] font-black text-white">
                    {confidence}%
                  </span>
                )}
              </div>
            </div>

            <p className="mt-4 text-xs font-medium text-[#5d4a4a]/60 leading-relaxed italic">
              {confidence === 0
                ? "Blank space is scary! Why don't you draw something!"
                : confidence > 85
                ? "I'd stake my reputation on this guess. Totally sure!"
                : confidence > 50
                ? "I'm fairly sure, but a little more detail wouldn't hurt!"
                : confidence > 20
                ? "Are we going for mystery vibes? Because I am really confused."
                : "I have no idea what's happening, but I like the vibes."}
            </p>
          </div>

          <div className="text-[10px] font-black text-[#ffc1c1] uppercase tracking-[0.2em] text-center">
            Ink Level: Stable
          </div>
        </div>
      </div>
    </main>
  );
}
