/* Here's what we're doing
        Canvas Image [height, width, 3]
        ↓
        Tensor [1,28,28,1]
        ↓
        model.predict()
        ↓
        Tensor [1,numClasses] where 1 is batch image and numClasses is number of possible classes from model
        ↓
        .data() to get typed array
        ↓
        [probabilities]
*/
import * as tf from "@tensorflow/tfjs";
export function preprocessImage(canvas: HTMLCanvasElement) {
  return tf.tidy(() => { //auto delete the intermediate tensors to free memory
    const tensor = tf.browser
      .fromPixels(canvas) //this give the shape [height, width, 3]
      .resizeNearestNeighbor([28, 28]) //new shape is [28, 28, 3]
      .mean(2) //convert to grayscale as mean of rgb channels becomes single channel [28, 28]
      .expandDims(0) //add batch dimension, new shape is [1, 28, 28]
      .expandDims(-1) //add channel dimension, new shape is [1, 28, 28, 1]
      .toFloat();  //convert to float32

    const normalized = tensor.div(tf.scalar(255.0)); //normalize to [0, 1]
    const inverted = tf.scalar(1.0).sub(normalized); //invert colors: background black, drawing white

    return inverted;
  });

}
let cachedModel: tf.LayersModel | null = null;

export async function loadModel(): Promise<tf.LayersModel> {
  if (cachedModel) return cachedModel; // Return immediately if already loaded

  try {
    cachedModel = await tf.loadLayersModel("/model/model.json");
    console.log("Model loaded successfully!");
    return cachedModel;
  } catch (error) {
    console.error("Failed to load model:", error);
    throw error;
  }
}

// Make prediction from the canvas using the loaded model and return as array of possibilities
export async function makePrediction(canvas: HTMLCanvasElement, model: tf.LayersModel): Promise<number[]> {
    const preprocessed = preprocessImage(canvas);
    const prediction = model.predict(preprocessed) as tf.Tensor; 
    const predictionArray = await prediction.data(); // get data as typed array
    preprocessed.dispose();
    prediction.dispose();
    return Array.from(predictionArray); // convert to regular array
}
