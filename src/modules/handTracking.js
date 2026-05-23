// Using global MediaPipe from CDN (added in index.html) to avoid Vite bundling issues

/**
 * Waits until window.Hands is available (CDN script loaded).
 * Retries every 100ms up to 10 seconds.
 */
export const waitForMediaPipe = () =>
  new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.Hands) {
      return resolve(window.Hands);
    }
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (window.Hands) {
        clearInterval(interval);
        resolve(window.Hands);
      } else if (attempts > 100) {
        clearInterval(interval);
        reject(new Error('MediaPipe Hands CDN failed to load after 10s. Check your internet connection.'));
      }
    }, 100);
  });

export class HandTracker {
  constructor(HandsConstructor, onResults) {
    this.hands = new HandsConstructor({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    this.hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    this.hands.onResults(onResults);
  }

  async send(image) {
    await this.hands.send({ image });
  }
}
