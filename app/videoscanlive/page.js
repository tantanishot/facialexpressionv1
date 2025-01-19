"use client";

import { useEffect, useRef } from "react";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

export default function CameraWithLandmarks() {
    const videoRef = useRef(null); // Camera feed
    const canvasRef = useRef(null); // Canvas to draw landmarks

    useEffect(() => {
        let faceLandmarker = null;

        const initializeFaceLandmarker = async () => {
            try {
                // Load MediaPipe WASM Files
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
                );

                // Initialize Face Landmarker
                faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                    },
                    runningMode: "VIDEO",
                    numFaces: 1, // Detect a single face
                });

                // Access Camera
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                console.log("Camera stream initialized");

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;

                    // Process Video Frames
                    videoRef.current.onloadeddata = () => {
                        console.log("Video feed loaded");
                        const processFrame = async () => {
                            if (faceLandmarker && videoRef.current) {
                                try {
                                    // Process the current video frame
                                    const results = await faceLandmarker.detectForVideo(videoRef.current, performance.now());
                                    
                                    // Check if landmarks are found and draw them
                                    if (results.faceLandmarks) {
                                        drawLandmarks(results.faceLandmarks);
                                    }
                                } catch (error) {
                                    console.log("Error detecting landmarks: ", error);
                                }

                                // Continue processing the next frame
                                requestAnimationFrame(processFrame);
                            }
                        };

                        processFrame(); // Start processing frames
                    };
                }
            } catch (error) {
                console.error("Error initializing MediaPipe Face Landmarker or accessing webcam:", error);
                alert("Unable to access the webcam. Please check your browser settings and permissions.");
            }
        };

        const drawLandmarks = (landmarksArray) => {
            if (canvasRef.current) {
                const canvasCtx = canvasRef.current.getContext("2d");
                canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

                landmarksArray.forEach((landmarks) => {
                    // Draw Each Facial Landmark
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

        // Cleanup when the component unmounts
        return () => {
            if (faceLandmarker) faceLandmarker.close();
        };
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Facial Landmark Detection</h1>
            <div style={{ position: "relative", width: "640px", height: "480px" }}>
                {/* Video Feed */}
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
                {/* Canvas for Landmarks */}
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








