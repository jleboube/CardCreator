import GIF from 'gif.js';

/**
 * Generate an animated GIF from front and back canvas images
 * @param {HTMLCanvasElement} frontCanvas - The front card canvas
 * @param {HTMLCanvasElement} backCanvas - The back card canvas
 * @param {number} delay - Delay between frames in milliseconds (default: 1500ms)
 * @returns {Promise<string>} - Base64 encoded GIF data URL
 */
export const generateAnimatedGif = (frontCanvas, backCanvas, delay = 1500) => {
  return new Promise((resolve, reject) => {
    try {
      // Create GIF encoder
      const gif = new GIF({
        workers: 2,
        quality: 10,
        width: frontCanvas.width,
        height: frontCanvas.height,
        workerScript: process.env.PUBLIC_URL + '/gif.worker.js'
      });

      // Add front frame
      gif.addFrame(frontCanvas, { delay: delay });

      // Add back frame
      gif.addFrame(backCanvas, { delay: delay });

      // Handle completion
      gif.on('finished', (blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      // Handle errors
      gif.on('error', reject);

      // Render the GIF
      gif.render();
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Generate an animated GIF from stage refs (for React Konva)
 * @param {Object} frontStageRef - React ref to front stage
 * @param {Object} backStageRef - React ref to back stage
 * @param {number} delay - Delay between frames in milliseconds
 * @returns {Promise<string>} - Base64 encoded GIF data URL
 */
export const generateAnimatedGifFromRefs = async (frontStageRef, backStageRef, delay = 1500) => {
  // Get canvas elements from stage refs
  const frontCanvas = frontStageRef.current.toCanvas({ pixelRatio: 2 });
  const backCanvas = backStageRef.current.toCanvas({ pixelRatio: 2 });

  return generateAnimatedGif(frontCanvas, backCanvas, delay);
};
