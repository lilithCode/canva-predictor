"use client";
import React, { useRef, useEffect, useState } from "react";
import { Undo2, Redo2, Eraser, Sparkles } from "lucide-react";

export default function Canvas({
  onGuess,
  isProcessing,
}: {
  onGuess: any;
  isProcessing: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState<number[][][]>([]);
  const [redoStack, setRedoStack] = useState<number[][][]>([]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 600, 600);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 12;
    ctx.strokeStyle = "#5d4a4a";

    paths.forEach((stroke) => {
      ctx.beginPath();
      stroke.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
  }, [paths]);

  const startDrawing = (e: any) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x =
      ((e.clientX || e.touches[0].clientX) - rect.left) * (600 / rect.width);
    const y =
      ((e.clientY || e.touches[0].clientY) - rect.top) * (600 / rect.height);
    setIsDrawing(true);
    setPaths([...paths, [[x, y]]]);
    setRedoStack([]);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const x =
      ((e.clientX || e.touches[0].clientX) - rect.left) * (600 / rect.width);
    const y =
      ((e.clientY || e.touches[0].clientY) - rect.top) * (600 / rect.height);
    const newPaths = [...paths];
    newPaths[newPaths.length - 1].push([x, y]);
    setPaths(newPaths);
  };

  const undo = () => {
    if (paths.length === 0) return;
    setRedoStack([...redoStack, paths[paths.length - 1]]);
    setPaths(paths.slice(0, -1));
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    setPaths([...paths, redoStack[redoStack.length - 1]]);
    setRedoStack(redoStack.slice(0, -1));
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative p-6 bg-[#fffcf9] rounded-[50px] border-8 border-[#ffefef] shadow-[0_25px_0_#ffefef]">
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)} // This fixes the "out-of-bounds" drawing bug
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={() => setIsDrawing(false)}
          className="w-full max-w-[450px] aspect-square bg-white rounded-[40px] cursor-crosshair touch-none"
        />

        <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          <button
            onClick={undo}
            className="p-4 bg-white border-4 border-[#ffefef] rounded-2xl shadow-lg hover:bg-pink-50 transition-all text-[#ff8e8e]"
          >
            <Undo2 />
          </button>
          <button
            onClick={redo}
            className="p-4 bg-white border-4 border-[#ffefef] rounded-2xl shadow-lg hover:bg-pink-50 transition-all text-[#ff8e8e]"
          >
            <Redo2 />
          </button>
          <button
            onClick={() => setPaths([])}
            className="p-4 bg-white border-4 border-[#ffefef] rounded-2xl shadow-lg hover:bg-red-50 transition-all text-red-300"
          >
            <Eraser />
          </button>
        </div>
      </div>

      <button
        disabled={isProcessing || paths.length === 0}
        onClick={() => onGuess(paths)}
        className="px-12 py-5 bg-[#ff8e8e] text-white text-2xl font-black rounded-full shadow-[0_10px_0_#e57373] hover:translate-y-1 active:shadow-none transition-all flex items-center gap-4 disabled:opacity-50"
      >
        <Sparkles fill="white" />{" "}
        {isProcessing ? "JUDGING YOUR ART..." : "REVEAL!"}
      </button>
    </div>
  );
}
