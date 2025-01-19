let systemControls = {
    displayAndBrightness: {
        screenBrightness: 50,
        nightLight: false,
    },
    audioControls: {
        volumeLevel: 50,
        muteStatus: false,
    },
    connectivitySetting: {
        wifiStatus: false,
        bluetoothStatus: true,
        airplaneMode: false,
    },
    windowManagement: {
        webPageStatus: 'open',
        scrollPosition: 0,
    }
};

// Control the value for Display & Brightness Category
function adjustValue(category, prop, change) {
    systemControls[category][prop] = Math.min(100, Math.max(0, systemControls.category.prop + change));
    console.log("Screen Brightness: " + systemControls.category.prop);
}

function toggleMode(category, prop) {
    systemControls[category][prop] = !systemControls.category.prop;
    console.log("Night Light: " + (systemControls.category.prop ? "On" : "Off"));
}