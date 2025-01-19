"use client";

import { useState, useEffect, useRef } from "react";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

export default function CameraWithLandmarks() {
  const videoRef = useRef(null); // Camera feed
  const canvasRef = useRef(null); // Canvas to draw landmarks
  const [brightness, setBrightness] = useState(50); // Default brightness value
  const socketRef = useRef(null); // WebSocket reference

  // WebSocket connection for brightness updates
  // useEffect(() => {
  //   // Listen for messages from the backend (brightness updates)
  //   socketRef.current.onmessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     if (message.type === "brightness") {
  //       setBrightness(message.value);
  //     }
  //   };

  //   return () => {
  //     if (socketRef.current) {
  //       socketRef.current.close();
  //     }
  //   };
  // }, []);

  // Initialize MediaPipe Face Landmarker
  useEffect(() => {
    let faceLandmarker = null;

    const initializeFaceLandmarker = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
        );

        faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          },
          runningMode: "VIDEO",
          numFaces: 1, // Detect a single face
        });

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadeddata = () => {
            const processFrame = async () => {
              if (faceLandmarker && videoRef.current) {
                try {
                  const results = await faceLandmarker.detectForVideo(
                    videoRef.current,
                    performance.now()
                  );
                  drawLandmarks(results.faceLandmarks);
                } catch (error) {
                  console.log("Error detecting landmarks: ", error);
                }

                requestAnimationFrame(processFrame);
              }
            };

            processFrame(); // Start processing frames
          };
        }
      } catch (error) {
        console.error(
          "Error initializing MediaPipe Face Landmarker or accessing webcam:",
          error
        );
        alert(
          "Unable to access the webcam. Please check your browser settings and permissions."
        );
      }
    };

    const drawLandmarks = (landmarksArray) => {
      if (canvasRef.current) {
        const canvasCtx = canvasRef.current.getContext("2d");
        canvasCtx.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        landmarksArray.forEach((landmarks) => {
          canvasCtx.fillStyle = "red";
          landmarks.forEach((landmark) => {
            const x = (1 - landmark.x) * canvasRef.current.width;
            const y = landmark.y * canvasRef.current.height;
            canvasCtx.beginPath();
            canvasCtx.arc(x, y, 2, 0, 2 * Math.PI); // Small red circle for each landmark
            canvasCtx.fill();
          });
        });
      }
    };

    initializeFaceLandmarker();

    return () => {
      if (faceLandmarker) faceLandmarker.close();
    };
  }, []);

  // Increase brightness by 10%
  const increaseBrightness = () => {
    setBrightness((prevBrightness) => Math.min(prevBrightness + 10, 100)); // Max brightness is 100%
  };

  // Decrease brightness by 10%
  const decreaseBrightness = () => {
    setBrightness((prevBrightness) => Math.max(prevBrightness - 10, 0)); // Min brightness is 0%
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fef4d4",
      }}
    >
      {/* Circle-shaped camera feed */}
      <div
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "5px solid #000",
          position: "relative",
          marginLeft: "2rem",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scaleX(-1)",
          }}
        />
        <canvas
          ref={canvasRef}
          width="400"
          height="400"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>

      {/* Control Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginLeft: "3rem",
          width: "300px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <span
            style={{
              fontSize: "5rem",
              width: "60px",
              textAlign: "center",
            }}
          >
            😊
          </span>
          <button
            style={{
              width: "200px",
              height: "80px",
              backgroundColor: "#FFBF7A",
              border: "none",
              borderRadius: "2rem",
              padding: "1.5rem 3rem",
              fontSize: "2rem",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#FFD4A3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#FFBF7A")}
          >
            Light
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginTop: "1.5rem",
          }}
        >
          {/* Minus Button */}
          <button
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "2px solid #000",
              backgroundColor: "#FFF1C1",
              fontSize: "24px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={decreaseBrightness}
          >
            −
          </button>

          {/* Slider */}
          <div
            style={{
              flex: "1",
              height: "30px",
              width: "300px",
              backgroundColor: "#FFF1C1",
              borderRadius: "10px",
              border: "2px solid #000",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${brightness}%`, // Dynamically adjust the width of the slider
                height: "100%",
                backgroundColor: "#FFBF7A",
                borderRadius: "10px",
              }}
            ></div>
          </div>

          {/* Plus Button */}
          <button
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "2px solid #000",
              backgroundColor: "#FFF1C1",
              fontSize: "24px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={increaseBrightness}
          >
            +
          </button>

          {/* Slider Percentage */}
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginLeft: "10px",
            }}
          >
            {brightness}%
          </span>
        </div>
      </div>
    </div>
  );
}
