import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import { LABELS } from "./labels";

let cachedModel: tf.LayersModel | null = null;

export async function loadModel() {
  if (cachedModel) return cachedModel;
  await tf.ready();
  cachedModel = await tf.loadLayersModel("/model/model.json");
  return cachedModel;
}

export async function predict(paths: number[][][]) {
  if (paths.length === 0) return [];
  const model = await loadModel();

  const procCanvas = document.createElement("canvas");
  procCanvas.width = 28;
  procCanvas.height = 28;
  const ctx = procCanvas.getContext("2d")!;

  // 1. Find the boundaries of the drawing
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  paths.forEach((stroke) => {
    stroke.forEach(([x, y]) => {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });
  });

  const width = maxX - minX;
  const height = maxY - minY;
  const maxDim = Math.max(width, height);
  const scale = maxDim === 0 ? 1 : 20 / maxDim; // Fit inside 20px (padding)
  const offsetX = (28 - width * scale) / 2;
  const offsetY = (28 - height * scale) / 2;

  // 2. Render to 28x28
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 28, 28);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 2.0;
  ctx.strokeStyle = "black";

  paths.forEach((stroke) => {
    ctx.beginPath();
    stroke.forEach(([x, y], i) => {
      const px = (x - minX) * scale + offsetX;
      const py = (y - minY) * scale + offsetY;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
  });

  // 3. Inference
  const results = tf.tidy(() => {
    const tensor = tf.browser.fromPixels(procCanvas, 1).toFloat().div(255);
    const inverted = tf.scalar(1.0).sub(tensor); // AI wants white lines on black
    const input = inverted.reshape([1, 28, 28, 1]);
    const prediction = model.predict(input) as tf.Tensor;
    return prediction.dataSync();
  });

  return Array.from(results)
    .map((prob, i) => ({
      className: LABELS[i],
      probability: prob as number,
    }))
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 3);
}
