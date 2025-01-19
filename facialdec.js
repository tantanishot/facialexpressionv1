import { systemControls, adjustValue, toggleMode } from './variables.js';
import * as faceMesh from '@mediapipe/face_mesh';
import * as tf from '@tensorflow/tfjs';

let smileStartTime = null;
let frownStartTime = null;
let smileDuration = 3000;
let frownDuration = 3000;

navigator.mediaDevices.getUserMedia({ video: true }).then((webcamStream) => {
    const videoElement = document.getElementById('videoElement');
    videoElement.srcObject = webcamStream;
    videoElement.play();

    const faceMeshModel = new faceMesh.FaceMesh({
        locateLandmarks: true,
    });

    faceMeshModel.onResults(onFaceResults);

    function sendVideoFrame() {
        faceMeshModel.send({ image: videoElement });
        requestAnimationFrame(sendVideoFrame);
    }

    sendVideoFrame();
})
    .catch((err) => {
        console.error('Error accessing webcam: ', err);
    });

function onFaceResults(results) {
    if (results.multiFaceLandmarks) {
        results.multiFaceLandmarks.forEach((landmarks, index) => {
            let expression = detectExpression(landmarks);
            processFacialExpression(expression, index);
        });
    }
}

function detectExpression(landmarks) {
    let expression = '';
    if (detectSmile(landmarks)) {
        expression = 'smile';
    } else if (detectFrown(landmarks)) {
        expression = "frown";
    }

    return expression;
}

function processFacialExpression(expression, faceId) {
    console.log(`Face ${faceId}: Detected expression - ${expression}`);
    switch (expression) {
        case 'smile':
            handleSmile();
            break;
        case 'frown':
            handleFrown();
            break;
        default:
            console.log('No action detected');
    }
}

function detectSmile(landmarks) {
    const mouthLeft = landmarks[61];
    const mouthRight = landmarks[291];
    const mouthTop = landmarks[13];

    let mouthWidth = Math.sqrt(
        Math.pow(mouthRight.x - mouthLeft.x, 2) +
        Math.pow(mouthRight.y - mouthLeft.y, 2)
    );

    let mouthHeight = Math.sqrt(
        Math.pow(mouthTop.x - (mouthLeft.x + mouthRight.x) / 2, 2) +
        Math.pow(mouthTop.y - (mouthLeft.y + mouthRight.y) / 2, 2)
    );

    return mouthWidth > 1.5 * mouthHeight;
}

function detectFrown(landmarks) {
    const mouthLeft = landmarks[61];
    const mouthRight = landmarks[291];
    const mouthTop = landmarks[13];

    let mouthWidth = Math.sqrt(
        Math.pow(mouthRight.x - mouthLeft.x, 2) +
        Math.pow(mouthRight.y - mouthLeft.y, 2)
    );

    let mouthHeight = Math.sqrt(
        Math.pow(mouthBottom.x - (mouthLeft.x + mouthRight.x) / 2, 2) +
        Math.pow(mouthBottom.y - (mouthLeft.y + mouthRight.y) / 2, 2)
    );

    return mouthHeight > mouthWidth; 
}

function handleSmile() {
    if(smileStartTime === null ) {
        smileStartTime = Date.now();
        console.log('Smile detected, starting timer...');
    } else {
        let elapsedTime = Date.now() - smileStartTime;

        if (elapsedTime >= smileDuration) {
            adjustValue('displayAndBrightness', 'screenBrightness', 10);
            console.log('Smile duration reached 3 seconds, increasing brightness!');
            smileStartTime = null; 
        }
    }
}

function handleFrown() {
    if(frownStartTime === null ) {
        frownStartTime = Date.now();
        console.log('Frown detected, starting timer...');
    } else {
        let elapsedTime = Date.now() - frownStartTime;

        if (elapsedTime >= frownDuration) {
            adjustValue('displayAndBrightness', 'screenBrightness', -10);
            console.log('Smile duration reached 3 seconds, decreasing brightness!');
            frownStartTime = null; 
        }
    }
}


