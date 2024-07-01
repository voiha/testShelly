(() => {
    $document = $(document);

    $document.ready(() => {
    })
})();

function getRandomReading() {
    return (Math.random() * 100).toFixed(2); // Generate a random number between 0 and 100
}

function updateReadings() {
    document.getElementById('light1').innerText = getRandomReading() + ' lx'; // Light reading
    document.getElementById('co2-1').innerText = getRandomReading() + ' ppm'; // CO2 reading
    document.getElementById('sensorTemp').innerText = getRandomReading() + ' °C'; // Temperature reading
    document.getElementById('sensorHumidity').innerText = getRandomReading() + ' %'; // Humidity reading
}

// Update readings every 5 seconds
setInterval(updateReadings, 2000);

// Initial update
updateReadings();
