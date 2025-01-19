(function () {
    // Create and inject CSS styles
    const style = document.createElement('style');
    style.textContent = `
      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
      }
  
      body {
          font-family: 'Josefin Sans', sans-serif;
          background-color: #ffffff;
          min-height: 100vh;
          min-width: 100vw;
          display: flex;
          flex-direction: column;
      }
  
      .container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          margin: 0 auto;
          padding: 20px;
      }
  
      header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
      }
  
      .back-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          padding: 10px;
      }
  
      h1 {
          padding: 20px;
          font-size: 36px;
          font-weight: bold;
      }
  
      main {
          flex: 1;
          display: flex;
          gap: 40px;
      }
  
      .light-preview {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #FFF1C1;
          border-radius: 20px;
          padding: 20px;
      }
  
      .circle {
          width: 553px;
          height: 549px;
          background-color: #C0C0C0;
          border-radius: 50%;
          border: 2px solid #000;
          overflow: hidden;
          transition: box-shadow 0.3s ease-in-out;
      }
  
      .glowing-green {
          box-shadow: 0 0 15px 5px #83E049;
      }
  
      .glowing-red {
          box-shadow: 0 0 15px 5px #FF9696;
      }
  
      #camera {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scaleX(-1);
      }
  
      .controls {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 30px;
      }
  
      .brightness-controls {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 20px;
      }
  
      .control-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #000;
          background: #FFF1C1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
      }
  
      .slider {
          flex: 1;
          height: 20px;
          background: #FFF1C1;
          border-radius: 10px;
          position: relative;
      }
  
      .slider-fill {
          width: 50%;
          height: 100%;
          background: #FFBF7A;
          border-radius: 10px;
      }
  
      .feedback {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 24px;
      }
  
      .percentage {
          font-size: 20px;
      }
  
      .mood-buttons {
          display: flex;
          gap: 20px;
          margin-top: 20px;
      }
  
      .mood-btn {
          padding: 30px 45px;
          border-radius: 15px;
          border: none;
          cursor: pointer;
          font-size: 24px;
      }
  
      .focus {
          background-color: #FFB8B8;
      }
  
      .relax {
          background-color: #E0F0A8;
      }
  
      .sleep {
          background-color: #CEEEFE;
      }
  
      @media (max-width: 768px) {
          main {
              flex-direction: column;
          }
  
          .circle {
              width: 200px;
              height: 200px;
          }
  
          .controls {
              padding: 20px;
          }
      }
    `;
    document.head.appendChild(style);
  
    // Create HTML structure dynamically
    const container = document.createElement('div');
    container.classList.add('container');
  
    const header = document.createElement('header');
    header.innerHTML = `
      <button class="back-button">←</button>
      <h1>Light</h1>
    `;
    container.appendChild(header);
  
    const main = document.createElement('main');
    const lightPreview = document.createElement('div');
    lightPreview.classList.add('light-preview');
    lightPreview.innerHTML = `
      <div class="circle">
        <video id="camera" autoplay></video>
      </div>
    `;
    main.appendChild(lightPreview);
  
    const controls = document.createElement('div');
    controls.classList.add('controls');
    controls.innerHTML = `
      <img src="images/light.svg" width="200" />
      <div class="brightness-controls">
        <button class="control-btn decrease">−</button>
        <div class="slider">
          <div class="slider-fill"></div>
        </div>
        <button class="control-btn increase">+</button>
      </div>
      <div class="feedback">
        <span class="emoji">☹️</span>
        <span class="percentage">50%</span>
        <span class="emoji">🙂</span>
      </div>
      <div class="mood-buttons">
        <button class="mood-btn focus">Focus</button>
        <button class="mood-btn relax">Relax</button>
        <button class="mood-btn sleep">Sleep</button>
      </div>
    `;
    main.appendChild(controls);
    container.appendChild(main);
    document.body.appendChild(container);
  
    // JavaScript logic to handle camera and brightness
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        const videoElement = document.getElementById('camera');
        videoElement.srcObject = stream;
      })
      .catch(function (error) {
        console.log('Error accessing the camera: ', error);
      });
  
    const circle = document.querySelector('.circle');
    const sliderFill = document.querySelector('.slider-fill');
    const increaseBtn = document.querySelector('.increase');
    const decreaseBtn = document.querySelector('.decrease');
    let brightness = 50;
  
    function updateBrightness() {
      sliderFill.style.width = `${brightness}%`;
      const percentage = document.querySelector('.percentage');
      percentage.textContent = `${brightness}%`;
    }
  
    increaseBtn.addEventListener('click', () => {
      if (brightness < 100) {
        brightness += 10;
        updateBrightness();
        circle.classList.remove('glowing-red');
        circle.classList.add('glowing-green');
      }
    });
  
    decreaseBtn.addEventListener('click', () => {
      if (brightness > 0) {
        brightness -= 10;
        updateBrightness();
        circle.classList.remove('glowing-green');
        circle.classList.add('glowing-red');
      }
    });
  
    updateBrightness();
  })();
  