"use client";

import { useEffect, useRef } from "react";
import { FilesetResolver, FaceLandmarker, DrawingUtils } from "@mediapipe/tasks-vision";

export default function CameraWithLandmarks() {
  const videoRef = useRef(null); // Reference to the video feed
  const canvasRef = useRef(null); // Reference to the canvas for overlay

  useEffect(() => {
    let faceLandmarker;

    const initializeFaceLandmarker = async () => {
      // Load the Face Landmarker
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float32/1/face_landmarker.task",
        },
        runningMode: "VIDEO", // Real-time video processing
        numFaces: 1, // Detect a single face
      });

      // Access the webcam
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadeddata = () => {
            processVideoFrame(); // Start processing video frames
          };
        }
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
    };

    const processVideoFrame = async () => {
      const canvasCtx = canvasRef.current.getContext("2d");

      const drawMesh = (landmarks) => {
        const drawingUtils = new DrawingUtils(canvasCtx);

        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear the canvas
        canvasCtx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height); // Draw the video feed

        // Draw the face mesh
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, {
          color: "#C0C0C0",
          lineWidth: 0.5,
        });
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, {
          color: "#FF3030",
        });
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, {
          color: "#30FF30",
        });
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, {
          color: "#E0E0E0",
        });
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, {
          color: "#E0E0E0",
        });
      };

      const processFrame = async () => {
        if (!faceLandmarker || !videoRef.current) return;

        const results = await faceLandmarker.detectForVideo(
          videoRef.current,
          performance.now()
        );

        if (results.faceLandmarks.length > 0) {
          drawMesh(results.faceLandmarks[0]); // Draw landmarks for the first detected face
        }

        requestAnimationFrame(processFrame); // Process the next frame
      };

      processFrame(); // Start processing frames
    };

    initializeFaceLandmarker();

    return () => {
      if (faceLandmarker) faceLandmarker.close(); // Cleanup the landmarker
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Face Landmark Detection</h1>
      <div style={{ position: "relative", width: "640px", height: "480px" }}>
        {/* Video feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scaleX(-1)", // Mirror the video feed
          }}
        />
        {/* Canvas for landmarks */}
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
    </div>
  );
}
