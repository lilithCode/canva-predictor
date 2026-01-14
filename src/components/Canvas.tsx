"use client";
import React, { useRef, useEffect, useState } from "react";


interface CanvasProps {
  onGuess: (canvas: HTMLCanvasElement) => void;
}

export default function Canvas({ onGuess }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(12);
  const [brushColor, setBrushColor] = useState("#0f172a"); 

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      
      canvas.width = 600;
      canvas.height = 600;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = brushSize;
        ctx.strokeStyle = brushColor;
        ctx.fillStyle = "#FFFFFF"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    
  }, []);

  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = brushColor;
    }
  }, [brushSize, brushColor]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.beginPath(); 
    }
  };

  const getPointer = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x =
      "touches" in e && e.touches.length
        ? e.touches[0].clientX - rect.left
        : ("clientX" in e ? e.clientX - rect.left : 0);
    const y =
      "touches" in e && e.touches.length
        ? e.touches[0].clientY - rect.top
        : ("clientY" in e ? e.clientY - rect.top : 0);
    return { x, y };
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { x, y } = getPointer(e);

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.fillStyle = "#FFF8F2";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-[#FFF8F2] p-4 rounded-2xl shadow-[0_8px_24px_rgba(75,52,40,0.10)] border border-[#E9DCCF]">
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="border-4 border-[#7F4F2B] rounded-xl cursor-crosshair bg-[#FFF8F2] shadow-inner touch-none max-w-[90vw] md:max-w-[600px]"
          style={{ touchAction: "none" }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-center">
        <div className="flex items-center gap-4 bg-[#FFF5EE] p-3 rounded-lg border border-[#E6D7C8]">
          <label className="text-sm text-[#6b4f3a] font-medium">Brush</label>

          <input
            aria-label="Brush size"
            type="range"
            min={1}
            max={60}
            value={brushSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBrushSize(Number(e.target.value))
            }
            className="canva-range"
            
            style={
              {
                ["--thumb" as any]: brushColor,
                ["--track" as any]: "#7F4F2B",
              } as React.CSSProperties
            }
          />

          <div className="flex items-center gap-2">
            <input
              ref={colorInputRef}
              aria-label="Brush color"
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              className="canva-color"
              title="Brush color"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={clearCanvas}
            className="bg-[#EAD9C9] text-[#6b4f3a] px-5 py-2 rounded-lg font-semibold hover:bg-[#E0CBB6] transition shadow-sm"
          >
            Clear
          </button>

          <button
            onClick={() => canvasRef.current && onGuess(canvasRef.current)}
            className="bg-[#7F4F2B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#5f3a25] transition shadow-lg"
          >
            Now Guess!
          </button>
        </div>
      </div>

      <style>{`
        .canva-range {
          -webkit-appearance: none;
          appearance: none;
          width: 170px;
          height: 10px;
          background: var(--track, #7F4F2B);
          border-radius: 999px;
          outline: none;
          padding: 0;
        }

       
        .canva-range::-webkit-slider-runnable-track {
          height: 10px;
          border-radius: 999px;
          background: var(--track, #7F4F2B);
        }
        .canva-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          margin-top: -6px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--thumb, #0f172a);
          border: 3px solid #FFF8F2;
          box-shadow: 0 2px 6px rgba(75,52,40,0.25);
          cursor: pointer;
        }

       
        .canva-range::-moz-range-track {
          height: 10px;
          border-radius: 999px;
          background: var(--track, #7F4F2B);
        }
        .canva-range::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--thumb, #0f172a);
          border: 3px solid #FFF8F2;
          box-shadow: 0 2px 6px rgba(75,52,40,0.25);
          cursor: pointer;
        }

       
        .canva-color {
          -webkit-appearance: none;
          appearance: none;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          padding: 0;
          border: 3px solid #fff;
          box-shadow: 0 3px 8px rgba(75,52,40,0.12);
          cursor: pointer;
          overflow: hidden;
          background: transparent;
        }
       
        .canva-color::-webkit-color-swatch-wrapper {
          padding: 0;
        }
        .canva-color::-webkit-color-swatch {
          border: none;
          border-radius: 50%;
        }
       
        .canva-color::-moz-color-swatch {
          border: none;
          border-radius: 50%;
        }

       
        @media (max-width: 640px) {
          .canva-range { width: 120px; }
        }
      `}</style>
    </div>
  );
}
