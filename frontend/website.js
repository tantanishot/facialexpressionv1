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

lightButton.addEventListener('click', () => {
    isLightActive = !isLightActive;
    lightButton.classList.toggle('active');
    mainCircle.classList.toggle('active');
    lightValue = isLightActive ? 75 : 50;
    lightPercentage.textContent = lightValue + '%';
});

volumeButton.addEventListener('click', () => {
    isVolumeActive = !isVolumeActive;
    volumeButton.classList.toggle('active');
    volumeValue = isVolumeActive ? 75 : 50;
    volumePercentage.textContent = volumeValue + '%';
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

setupToggle(wifiToggle);
setupToggle(airplaneToggle);
setupToggle(darkModeToggle);