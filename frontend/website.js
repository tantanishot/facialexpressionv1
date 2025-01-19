const lightButton = document.getElementById('lightButton');
const volumeButton = document.getElementById('volumeButton');
const faceCircle = document.getElementById('faceCircle');

const wifiToggle = document.getElementById('wifiToggle');
const airplaneToggle = document.getElementById('airplaneToggle');
const darkModeToggle = document.getElementById('darkModeToggle');

const lightPercentage = document.getElementById('lightPercentage');
const volumePercentage = document.getElementById('volumePercentage');


let isLightActive = false;
let isVolumeActive = false;
let lightValue = 50;
let volumeValue = 50;

// Function to switch to the light control page
function showLightControlPage() {
    optionPage.style.display = 'none'; // Hide option page
    lightControlPage.style.display = 'block'; // Show light control page
}

// Function to go back to the option page
function showOptionPage() {
    lightControlPage.style.display = 'none'; // Hide light control page
    optionPage.style.display = 'block'; // Show option page
}

// Event listener to handle light button click
lightButton.addEventListener('click', () => {
    isLightActive = !isLightActive;
    lightButton.classList.toggle('active');
    mainCircle.classList.toggle('active');
    lightValue = isLightActive ? 75 : 50;
    lightPercentage.textContent = lightValue + '%';
    
    // Show light control page when light button is clicked
    showLightControlPage();
});

// Event listener to handle volume button click
volumeButton.addEventListener('click', () => {
    isVolumeActive = !isVolumeActive;
    volumeButton.classList.toggle('active');
    volumeValue = isVolumeActive ? 75 : 50;
    volumePercentage.textContent = volumeValue + '%';
});

// Event listener for the back button in light control page
backButton.addEventListener('click', () => {
    // Go back to the option page
    showOptionPage();
});


function setupToggle(element) {
    element.addEventListener('click', () => {
        element.classList.toggle('active');

        if (element === darkModeToggle) {
            document.body.classList.toggle('dark-mode');
        }

        if (element === airplaneToggle && element.classList.contains('active')) {
            wifiToggle.classList.remove('active');
        }

        if (element === wifiToggle && element.classList.contains('active')) {
            airplaneToggle.classList.remove('active');
        }
    });
}

// Access the camera
navigator.mediaDevices.getUserMedia({ video: true })
.then(function(stream) {
  // Get the video element
  var videoElement = document.getElementById('camera');
  
  // Set the stream as the video source
  videoElement.srcObject = stream;
})
.catch(function(error) {
  console.log('Error accessing the camera: ', error);
});


setupToggle(wifiToggle);
setupToggle(airplaneToggle);
setupToggle(darkModeToggle);



  