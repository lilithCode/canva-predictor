"use client";
import React, { useRef, useEffect, useState } from "react";

interface CanvasProps {
  onGuess: (paths: number[][][]) => void;
}

export default function Canvas({ onGuess }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(12);
  const [brushColor, setBrushColor] = useState("#0f172a");
  const [paths, setPaths] = useState<number[][][]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const getPointer = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x =
      "touches" in e && e.touches.length
        ? e.touches[0].clientX - rect.left
        : "clientX" in e
        ? e.clientX - rect.left
        : 0;
    const y =
      "touches" in e && e.touches.length
        ? e.touches[0].clientY - rect.top
        : "clientY" in e
        ? e.clientY - rect.top
        : 0;
    return { x, y };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const { x, y } = getPointer(e);
    // Start a new stroke path
    setPaths((prev) => [...prev, [[x, y]]]);

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = brushColor;
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { x, y } = getPointer(e);

    // Record coordinate
    setPaths((prev) => {
      const newPaths = [...prev];
      newPaths[newPaths.length - 1].push([x, y]);
      return newPaths;
    });

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    setPaths([]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-[#FFF8F2] p-4 rounded-2xl shadow-[0_8px_24px_rgba(75,52,40,0.10)] border border-[#E9DCCF]">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="border-4 border-[#7F4F2B] rounded-xl cursor-crosshair bg-[#FFF8F2] touch-none max-w-[90vw] md:max-w-[600px]"
          style={{ touchAction: "none" }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-center">
        <div className="flex items-center gap-4 bg-[#FFF5EE] p-3 rounded-lg border border-[#E6D7C8]">
          <label className="text-sm text-[#6b4f3a] font-medium">Brush</label>
          <input
            type="range"
            min={4}
            max={40}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="canva-range"
            style={{ "--thumb": brushColor, "--track": "#7F4F2B" } as any}
          />
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="canva-color"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={clearCanvas}
            className="bg-[#EAD9C9] text-[#6b4f3a] px-5 py-2 rounded-lg font-semibold hover:bg-[#E0CBB6] transition shadow-sm"
          >
            Clear
          </button>
          <button
            onClick={() => onGuess(paths)}
            className="bg-[#7F4F2B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#5f3a25] transition shadow-lg"
          >
            Now Guess!
          </button>
        </div>
      </div>

      <style jsx>{`
        .canva-range {
          appearance: none;
          width: 150px;
          height: 8px;
          background: #7f4f2b;
          border-radius: 5px;
        }
        .canva-range::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--thumb);
          cursor: pointer;
          border: 2px solid white;
        }
        .canva-color {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
