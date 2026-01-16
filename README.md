# Canvas Predictor

A real-time drawing recognition web application built with Next.js and TensorFlow.js. The app runs fully in the browser, uses a small Convolutional Neural Network (CNN) to classify user sketches from canvas pixel data, and provides instant feedback with a modern Tailwind CSS UI.

## Features
- Real-time inference in the browser with TensorFlow.js
- Image preprocessing: resizing and normalization of canvas pixel data
- Lightweight CNN architecture optimized for client-side inference
- Interactive drawing canvas and prediction UI built with Next.js + Tailwind CSS
- Simple pipeline to convert/train models and load them in the web app

### Live Demo
You can view the live application here:  
https://lilith-canvas.vercel.app/


## Demo / Usage
1. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn
```

2. Start dev server:
```bash
npm run dev
```
Open http://localhost:3000 and draw on the canvas. Predictions update in real time.

3. Build for production:
```bash
npm run build
npm run start
```
##
Enjoy :)
