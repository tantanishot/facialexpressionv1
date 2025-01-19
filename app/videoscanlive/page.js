"use client";

import { useEffect, useRef, useState } from 'react';

export default function CameraPage() {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Access the camera
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream; // Set the camera stream to the video element
        }
      } catch (err) {
        console.error('Error accessing the camera:', err);
        setError('Error accessing the camera. Please ensure a camera is connected and permissions are granted.');
      }
    };

    enableCamera();
  }, []); // Run only once when the component is mounted

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <h1>Camera Feed</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '640px',
            height: '480px',
            border: '2px solid black',
            borderRadius: '10px',
          }}
        />
      )}
    </div>
  );
}