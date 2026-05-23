import React, { useRef, useEffect, useState } from 'react';
import { HandTracker, waitForMediaPipe } from '../modules/handTracking';

const CameraView = ({ onResults }) => {
  const videoRef = useRef(null);
  const trackerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    let frameId;
    let stopped = false;

    const startCamera = async () => {
      try {
        // Wait for MediaPipe CDN scripts to finish loading
        const HandsConstructor = await waitForMediaPipe();

        if (stopped) return;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user',
          },
        });

        if (stopped) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
          startTracking(HandsConstructor);
        };
      } catch (err) {
        console.error('Camera / MediaPipe error:', err);
        setError(err.message);
      }
    };

    const startTracking = (HandsConstructor) => {
      trackerRef.current = new HandTracker(HandsConstructor, onResults);

      const processFrame = async () => {
        if (stopped) return;
        if (video.readyState === 4) {
          await trackerRef.current.send(video);
        }
        frameId = requestAnimationFrame(processFrame);
      };

      processFrame();
    };

    startCamera();

    return () => {
      stopped = true;
      cancelAnimationFrame(frameId);
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [onResults]);

  if (error) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1a0514',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
      }}>
        <div style={{
          color: 'rgba(255,100,100,0.9)',
          fontSize: '14px',
          textAlign: 'center',
          padding: '24px',
          maxWidth: '400px',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📷</div>
          <strong>Câmera indisponível</strong>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '8px', fontSize: '12px' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      zIndex: -1,
      backgroundColor: '#000',
    }}>
      <video
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'scaleX(-1)',
          filter: 'brightness(0.65) saturate(0.8)',
        }}
        playsInline
      />
      {/* Overlay escura leve para os traços neon se destacarem */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(26, 5, 20, 0.35)',
        pointerEvents: 'none',
      }} />
    </div>
  );
};

export default CameraView;
