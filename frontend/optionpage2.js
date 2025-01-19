(function () {
    // Create and inject CSS styles
    const style = document.createElement('style');
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
  
      .circle.active {
        box-shadow: 0 0 30px rgba(255, 255, 0, 0.5);
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
        gap: 1rem; /* Controls the space between the icon and text */
        cursor: pointer;
        transition: background-color 0.3s;
      }
  
      .light, .volume {
        width: 50px;
        height: 50px;
        margin: 0;
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
  
      body.dark-mode {
        background-color: #2d2d2d;
        color: white;
      }
  
      body.dark-mode .controls-section {
        background-color: #3d3d3d;
      }
  
      body.dark-mode .circle-section {
        background-color: #4d4d4d;
      }
    `;
    document.head.appendChild(style);
  
    // Create HTML structure dynamically
    const container = document.createElement('div');
    container.classList.add('container');
  
    const circleSection = document.createElement('div');
    circleSection.classList.add('circle-section');
    circleSection.innerHTML = `
      <div class="circle-frame">
        <video id="camera" autoplay></video>
      </div>
    `;
    container.appendChild(circleSection);
  
    const controlsSection = document.createElement('div');
    controlsSection.classList.add('controls-section');
    controlsSection.innerHTML = `
      <div class="control-item">
        <span class="emoji">😊</span>
        <button class="control-button" id="lightButton">
          <img class="light" src="images/light.svg" />
          <span>Light</span>
        </button>
        <span class="percentage" id="lightPercentage">50%</span>
      </div>
      <div class="control-item">
        <span class="emoji">😞</span>
        <button class="control-button" id="volumeButton">
          <img class="volume" src="images/volume.svg" />
          <span>Volume</span>
        </button>
        <span class="percentage" id="volumePercentage">50%</span>
      </div>
      <div class="toggle-container">
        <div class="toggle-item">
          <span>Wifi</span>
          <div class="toggle-switch" id="wifiToggle"></div>
        </div>
        <div class="toggle-item">
          <span>Airplane mode</span>
          <div class="toggle-switch" id="airplaneToggle"></div>
        </div>
        <div class="toggle-item">
          <span>Dark Mode 🌙</span>
          <div class="toggle-switch" id="darkModeToggle"></div>
        </div>
      </div>
    `;
    container.appendChild(controlsSection);
    document.body.appendChild(container);
  
    // JavaScript logic for camera, controls, and toggles
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        const videoElement = document.getElementById('camera');
        videoElement.srcObject = stream;
      })
      .catch(function (error) {
        console.log('Error accessing the camera: ', error);
      });
  
    // Handle toggles
    const wifiToggle = document.getElementById('wifiToggle');
    const airplaneToggle = document.getElementById('airplaneToggle');
    const darkModeToggle = document.getElementById('darkModeToggle');
  
    wifiToggle.addEventListener('click', () => {
      wifiToggle.classList.toggle('active');
    });
  
    airplaneToggle.addEventListener('click', () => {
      airplaneToggle.classList.toggle('active');
    });
  
    darkModeToggle.addEventListener('click', () => {
      darkModeToggle.classList.toggle('active');
      document.body.classList.toggle('dark-mode');
    });
  })();
  