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
    <div style={{ display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#fef4d4'}}>
      <h1 style={{ marginBottom: '20px' , fontSize: '3rem'}}>
        Scan Your Face</h1> {}
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div
          style={{
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '5px solid #000',
            position: 'relative',
            margin: '0 auto',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)', // Mirror the camera feed
            }}
          />
        </div>
      )}
    </div>
  );
}
