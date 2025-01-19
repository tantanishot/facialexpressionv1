// Create and configure the <html> element
const html = document.documentElement;
html.lang = "en";
document.appendChild(html);

// Create and configure the <head> element
const head = document.createElement("head");
html.appendChild(head);

// Meta tags
const charsetMeta = document.createElement("meta");
charsetMeta.setAttribute("charset", "UTF-8");
head.appendChild(charsetMeta);

const viewportMeta = document.createElement("meta");
viewportMeta.setAttribute("name", "viewport");
viewportMeta.setAttribute("content", "width=device-width, initial-scale=1.0");
head.appendChild(viewportMeta);

// Title
const title = document.createElement("title");
title.textContent = "Face Control Interface";
head.appendChild(title);

// Google Fonts
const preconnect1 = document.createElement("link");
preconnect1.rel = "preconnect";
preconnect1.href = "https://fonts.googleapis.com";
head.appendChild(preconnect1);

const preconnect2 = document.createElement("link");
preconnect2.rel = "preconnect";
preconnect2.href = "https://fonts.gstatic.com";
preconnect2.crossOrigin = "anonymous";
head.appendChild(preconnect2);

const googleFonts = document.createElement("link");
googleFonts.rel = "stylesheet";
googleFonts.href =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap";
head.appendChild(googleFonts);

// Styles
const style = document.createElement("style");
style.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Josefin Sans', sans-serif;
  }
  
  body {
    min-height: 100vh;
    display: flex;
  }
  
  .container {
    display: flex;
    width: 100%;
  }
  
  .circle-section {
    flex: 1;
    background-color: #FFBF7A;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
  
  .circle-frame {
    width: 600px; 
    height: 600px;
    border-radius: 50%; 
    overflow: hidden; 
    border: 5px solid #000; 
    margin: 0 auto; 
  }
  
  #camera {
    width: 100%; 
    height: 100%;
    object-fit: cover; 
    transform: scaleX(-1);
  }
  
  .controls-section {
    flex: 1;
    background-color: #fff5e0;
    padding: 5rem; 
  }
  
  .control-item {
    display: flex;
    align-items: center;
    margin-bottom: 3rem; 
    gap: 2rem; 
  }
  
  .emoji {
    font-size: 5rem; 
    width: 60px; 
    text-align: center;
  }
  
  .control-button {
    background-color: #FFBF7A;
    border: none;
    border-radius: 2rem;
    padding: 1.5rem 3rem; 
    font-size: 2rem; 
    display: flex;
    align-items: center;
    gap: 2rem; 
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .control-button:hover {
    background-color: #FFBF7A;
  }
  
  .toggle-container {
    margin-top: 5rem; 
  }
  
  .toggle-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem; 
    font-size: 2rem; 
  }
  
  .toggle-switch {
    width: 100px; 
    height: 50px; 
    background-color: #ffcca3;
    border-radius: 25px; 
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .toggle-switch::after {
    content: '';
    position: absolute;
    width: 46px; 
    height: 46px;
    background-color: white;
    border-radius: 50%;
    top: 2px;
    right: 2px;
    transition: transform 0.3s;
  }
  
  .toggle-switch.active {
    background-color: #FFBF7A;
  }
  
  .toggle-switch.active::after {
    transform: translateX(-50px); 
  }
  
  .percentage {
    font-size: 2rem; 
    margin-left: auto;
  }
`;
head.appendChild(style);

// Create and configure the <body> element
const body = document.createElement("body");
html.appendChild(body);

// Container
const container = document.createElement("div");
container.className = "container";
body.appendChild(container);

// Circle Section
const circleSection = document.createElement("div");
circleSection.className = "circle-section";

const circleFrame = document.createElement("div");
circleFrame.className = "circle-frame";

const video = document.createElement("video");
video.id = "camera";
video.autoplay = true;

circleFrame.appendChild(video);
circleSection.appendChild(circleFrame);
container.appendChild(circleSection);

// Controls Section
const controlsSection = document.createElement("div");
controlsSection.className = "controls-section";

const controls = [
  {
    emoji: "😊",
    label: "Light",
    id: "lightButton",
    percentageId: "lightPercentage",
    imageSrc: "images/light.svg",
    imageClass: "light",
  },
  {
    emoji: "😞",
    label: "Volume",
    id: "volumeButton",
    percentageId: "volumePercentage",
    imageSrc: "images/volume.svg",
    imageClass: "volume",
  },
];

controls.forEach((control) => {
  const controlItem = document.createElement("div");
  controlItem.className = "control-item";

  const emoji = document.createElement("span");
  emoji.className = "emoji";
  emoji.textContent = control.emoji;

  const button = document.createElement("button");
  button.className = "control-button";
  button.id = control.id;

  const image = document.createElement("img");
  image.className = control.imageClass;
  image.src = control.imageSrc;

  const label = document.createElement("span");
  label.style.marginLeft = "2rem";
  label.textContent = control.label;

  const percentage = document.createElement("span");
  percentage.className = "percentage";
  percentage.id = control.percentageId;
  percentage.textContent = "50%";

  button.appendChild(image);
  button.appendChild(label);
  controlItem.appendChild(emoji);
  controlItem.appendChild(button);
  controlItem.appendChild(percentage);
  controlsSection.appendChild(controlItem);
});

// Toggle Container
const toggleContainer = document.createElement("div");
toggleContainer.className = "toggle-container";

const toggles = ["Wifi", "Airplane mode", "Dark Mode 🌙"];

toggles.forEach((toggle) => {
  const toggleItem = document.createElement("div");
  toggleItem.className = "toggle-item";

  const label = document.createElement("span");
  label.textContent = toggle;

  const toggleSwitch = document.createElement("div");
  toggleSwitch.className = "toggle-switch";

  toggleItem.appendChild(label);
  toggleItem.appendChild(toggleSwitch);
  toggleContainer.appendChild(toggleItem);
});

controlsSection.appendChild(toggleContainer);
container.appendChild(controlsSection);

// Webcam script
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((error) => {
    console.error("Error accessing the camera:", error);
  });

